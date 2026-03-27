"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./ContactConsultationCard.css";

const specialists = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "dentistry", label: "Dentistry" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
];

const CustomSelect = ({ id, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

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
        id={id}
        type="button"
        className={`custom-select__trigger${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? undefined : "custom-select__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className="custom-select__chevron"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="custom-select__menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={selected?.value === opt.value}
              className={`custom-select__option${selected?.value === opt.value ? " custom-select__option--selected" : ""}`}
              onClick={() => { setSelected(opt); setOpen(false); }}
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
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <section className="consult-card" aria-labelledby="consult-title">
      <h2 id="consult-title" className="consult-card__title">
        Book an Appointment
      </h2>
      <p className="consult-card__subtitle">
        Complete the form below and our team will confirm your visit within 24 hours.
      </p>

      <form className="consult-card__form">
        <div className="field">
          <label htmlFor="firstName">First name<span aria-hidden="true">*</span></label>
          <input id="firstName" name="firstName" type="text" placeholder="John" required />
        </div>

        <div className="field">
          <label htmlFor="lastName">Last name<span aria-hidden="true">*</span></label>
          <input id="lastName" name="lastName" type="text" placeholder="Smith" required />
        </div>

        <div className="field">
          <label htmlFor="email">Email address<span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" placeholder="john@example.com" required />
        </div>

        <div className="field">
          <label htmlFor="specialist">Specialist<span aria-hidden="true">*</span></label>
          <CustomSelect
            id="specialist"
            options={specialists}
            placeholder="Choose a specialist"
          />
        </div>

        <div className="field">
          <label htmlFor="appt-date">Preferred date<span aria-hidden="true">*</span></label>
          <DatePicker
            id="appt-date"
            selected={date}
            onChange={setDate}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            minDate={new Date()}
            className="dp-input dp-input--date"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="appt-time">Preferred time<span aria-hidden="true">*</span></label>
          <DatePicker
            id="appt-time"
            selected={time}
            onChange={setTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select a time"
            className="dp-input dp-input--time"
            required
          />
        </div>

        <button className="consult-card__button" type="submit">
          Request Appointment
        </button>
      </form>
    </section>
  );
};

export default ContactConsultationCard;
