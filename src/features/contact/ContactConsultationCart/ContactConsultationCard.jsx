"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./ContactConsultationCard.css";

function getAuthPayload() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

const CustomSelect = ({ options, placeholder, value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className={`custom-select__trigger${open ? " open" : ""}${disabled ? " custom-select__trigger--disabled" : ""}`}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={selected ? undefined : "custom-select__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="custom-select__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="custom-select__menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`custom-select__option${value === opt.value ? " custom-select__option--selected" : ""}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ContactConsultationCard = () => {
  const [authUser, setAuthUser] = useState(null);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const payload = getAuthPayload();
    if (payload) {
      setAuthUser(payload);
      const parts = (payload.name ?? "").split(" ");
      setFirstName(parts[0] ?? "");
      setLastName(parts.slice(1).join(" ") ?? "");
      setEmail(payload.email ?? "");
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setServices(data.map((s) => ({ value: s.ServiceId, label: s.Name }))))
      .catch(() => {});
  }, []);

  async function handleServiceChange(id) {
    setServiceId(id);
    setDoctorId(null);
    setDoctors([]);
    if (!id) return;
    setLoadingDoctors(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}/doctors`);
      const data = res.ok ? await res.json() : [];
      setDoctors(data.map((d) => ({ value: d.DoctorId, label: d.Name, occupation: d.Occupation })));
    } catch {}
    finally { setLoadingDoctors(false); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!serviceId) { setStatus({ type: "error", message: "Please select a specialist." }); return; }
    if (!date || !time) { setStatus({ type: "error", message: "Please select a date and time." }); return; }

    if (!doctorId) { setStatus({ type: "error", message: "Please select a doctor." }); return; }

    setSubmitting(true);
    setStatus(null);

    try {
      const doctor = doctors.find((d) => d.value === doctorId) ?? null;

      const startAt = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        time.getHours(), time.getMinutes()
      ).toISOString();

      const selectedService = services.find((s) => s.value === serviceId);
      const patientName = `${firstName} ${lastName}`.trim();

      const body = {
        PatientId: authUser?.patientId ? Number(authUser.patientId) : null,
        PatientName: patientName,
        DoctorId: doctor?.value ?? null,
        DoctorName: doctor?.label ?? "",
        ServiceId: serviceId,
        ServiceName: selectedService?.label ?? "",
        StartAt: startAt,
        Status: "Confirmed",
      };

      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Your appointment has been booked! We will confirm within 24 hours." });
        if (!authUser) { setFirstName(""); setLastName(""); setEmail(""); }
        setServiceId(null);
        setDoctorId(null);
        setDoctors([]);
        setDate(null);
        setTime(null);
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "Could not connect to the server. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const locked = !!authUser;

  return (
    <section className="consult-card" aria-labelledby="consult-title">
      <h2 id="consult-title" className="consult-card__title">Book an Appointment</h2>
      <p className="consult-card__subtitle">
        Complete the form below and our team will confirm your visit within 24 hours.
      </p>

      {locked && (
        <div className="consult-card__logged-in">
          Booking as <strong>{authUser.name}</strong>
        </div>
      )}

      <form className="consult-card__form" onSubmit={handleSubmit}>
        {status && (
          <div className={`consult-card__alert consult-card__alert--${status.type}`}>
            {status.message}
          </div>
        )}

        <div className="field">
          <label htmlFor="firstName">First name<span aria-hidden="true">*</span></label>
          <input
            id="firstName" name="firstName" type="text" placeholder="John"
            required value={firstName} onChange={(e) => setFirstName(e.target.value)}
            readOnly={locked} className={locked ? "input--readonly" : ""}
          />
        </div>

        <div className="field">
          <label htmlFor="lastName">Last name<span aria-hidden="true">*</span></label>
          <input
            id="lastName" name="lastName" type="text" placeholder="Smith"
            required value={lastName} onChange={(e) => setLastName(e.target.value)}
            readOnly={locked} className={locked ? "input--readonly" : ""}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email address<span aria-hidden="true">*</span></label>
          <input
            id="email" name="email" type="email" placeholder="john@example.com"
            required value={email} onChange={(e) => setEmail(e.target.value)}
            readOnly={locked} className={locked ? "input--readonly" : ""}
          />
        </div>

        <div className="field">
          <label htmlFor="specialist">Specialist<span aria-hidden="true">*</span></label>
          <CustomSelect
            id="specialist"
            options={services}
            placeholder={services.length ? "Choose a specialist" : "Loading..."}
            value={serviceId}
            onChange={handleServiceChange}
          />
        </div>

        {serviceId && (
          <div className="field">
            <label htmlFor="doctor">Doctor<span aria-hidden="true">*</span></label>
            {loadingDoctors ? (
              <div className="consult-card__loading">Loading available doctors...</div>
            ) : doctors.length === 0 ? (
              <div className="consult-card__no-doctors">No doctors available for this service.</div>
            ) : (
              <CustomSelect
                id="doctor"
                options={doctors.map((d) => ({ value: d.value, label: `${d.label}${d.occupation ? ` — ${d.occupation}` : ""}` }))}
                placeholder="Choose a doctor"
                value={doctorId}
                onChange={setDoctorId}
              />
            )}
          </div>
        )}

        <div className="field">
          <label htmlFor="appt-date">Preferred date<span aria-hidden="true">*</span></label>
          <DatePicker
            id="appt-date" selected={date} onChange={setDate}
            dateFormat="MMMM d, yyyy" placeholderText="Select a date"
            minDate={new Date()} className="dp-input dp-input--date"
          />
        </div>

        <div className="field">
          <label htmlFor="appt-time">Preferred time<span aria-hidden="true">*</span></label>
          <DatePicker
            id="appt-time" selected={time} onChange={setTime}
            showTimeSelect showTimeSelectOnly timeIntervals={30}
            timeCaption="Time" dateFormat="h:mm aa"
            placeholderText="Select a time" className="dp-input dp-input--time"
          />
        </div>

        <button className="consult-card__button" type="submit" disabled={submitting}>
          {submitting ? "Booking..." : "Request Appointment"}
        </button>

        {!locked && (
          <p className="consult-card__login-hint">
            Already have an account?{" "}
            <a href="/login" className="consult-card__login-link">Log in</a>{" "}
            to auto-fill your details.
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactConsultationCard;
