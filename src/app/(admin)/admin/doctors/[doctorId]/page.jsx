"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import "./doctor-detail.css";
import Modal from "@/components/admin/Modal";
import { useToast } from "@/components/admin/ToastProvider";
import { api } from "@/lib/api";

const STATUS_OPTIONS = ["Confirmed", "Completed", "Cancelled", "No-show"];

function fmt(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("ro-RO", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function DoctorDetailPage() {
  const { doctorId } = useParams();
  const { pushToast } = useToast();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("basic");
  const [openEdit, setOpenEdit] = useState(false);
  const [openAppt, setOpenAppt] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!doctorId) return;
    Promise.all([loadDoctor(), loadAppointments(), loadServices()]);
  }, [doctorId]);

  async function loadDoctor() {
    try {
      setLoading(true);
      const data = await api.get(`/api/admin/doctors/${doctorId}`);
      setDoctor(data);
    } catch {
      pushToast({ type: "error", title: "Failed to load doctor" });
    } finally {
      setLoading(false);
    }
  }

  async function loadAppointments() {
    try {
      const data = await api.get(`/api/admin/appointments/doctor/${doctorId}`);
      setAppointments(data);
    } catch {
      pushToast({ type: "error", title: "Failed to load appointments" });
    }
  }

  async function loadServices() {
    try {
      const data = await api.get("/api/admin/services");
      setServices(data);
    } catch {}
  }

  const filtered = useMemo(() => {
    return appointments.filter((a) => statusFilter === "All" ? true : a.Status === statusFilter);
  }, [appointments, statusFilter]);

  const initials = doctor
    ? (doctor.Name ?? "").split(" ").map((w) => w[0]).slice(0, 2).join("")
    : "?";

  async function handleSaveDoctor(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {
      Name: fd.get("name"),
      Occupation: fd.get("specialty"),
      Email: fd.get("email"),
      Phone: fd.get("phone"),
      Bio: fd.get("bio"),
      Status: doctor?.Status ?? "Active",
      Details: [],
    };
    setSaving(true);
    try {
      await api.put(`/api/admin/doctors/${doctorId}`, body);
      pushToast({ type: "success", title: "Doctor updated" });
      setOpenEdit(false);
      await loadDoctor();
    } catch {
      pushToast({ type: "error", title: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  function openCreateAppt() {
    setEditingAppt(null);
    setOpenAppt(true);
  }

  function openEditAppt(a) {
    setEditingAppt(a);
    setOpenAppt(true);
  }

  async function handleSaveAppt(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const date = fd.get("date");
    const time = fd.get("time");
    const startAt = date && time ? new Date(`${date}T${time}`).toISOString() : null;
    const serviceId = Number(fd.get("serviceId")) || null;
    const selectedService = services.find((s) => s.ServiceId === serviceId);

    const body = {
      DoctorId: Number(doctorId),
      DoctorName: doctor?.Name ?? "",
      ServiceId: serviceId,
      ServiceName: selectedService?.Name ?? "",
      PatientName: fd.get("patientName"),
      Status: fd.get("status"),
      StartAt: startAt,
    };

    setSaving(true);
    try {
      if (editingAppt) {
        await api.put(`/api/admin/appointments/${editingAppt.AppointmentId}`, body);
        pushToast({ type: "success", title: "Appointment updated" });
      } else {
        await api.post("/api/admin/appointments", body);
        pushToast({ type: "success", title: "Appointment created" });
      }
      setOpenAppt(false);
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function handleCompleteAppt(a) {
    try {
      await api.put(`/api/admin/appointments/${a.AppointmentId}`, { ...a, Status: "Completed" });
      pushToast({ type: "success", title: "Marked as completed" });
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Action failed" });
    }
  }

  async function handleCancelAppt(a) {
    try {
      await api.put(`/api/admin/appointments/${a.AppointmentId}`, { ...a, Status: "Cancelled" });
      pushToast({ type: "success", title: "Appointment cancelled" });
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Action failed" });
    }
  }

  if (loading) return <div className="doc"><div className="empty">Loading...</div></div>;
  if (!doctor) return <div className="doc"><div className="empty">Doctor not found.</div></div>;

  const editApptDate = editingAppt?.StartAt ? editingAppt.StartAt.slice(0, 10) : "";
  const editApptTime = editingAppt?.StartAt ? editingAppt.StartAt.slice(11, 16) : "";

  const totalAppts = appointments.length;
  const completedThisMonth = appointments.filter((a) => {
    if (a.Status !== "Completed") return false;
    const d = new Date(a.StartAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const upcomingThisWeek = appointments.filter((a) => {
    if (a.Status !== "Confirmed") return false;
    const d = new Date(a.StartAt);
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() + 7);
    return d >= now && d <= weekEnd;
  }).length;

  return (
    <div className="doc">
      <div className="doc__top">
        <div className="doc__profile">
          <div className="doc__avatar" aria-hidden="true">{initials}</div>
          <div>
            <h1 className="doc__name">{doctor.Name}</h1>
            <div className="doc__meta">
              <span className={`pill ${doctor.Status === "Active" ? "pill--ok" : "pill--muted"}`}>{doctor.Status}</span>
              <span className="doc__sep">•</span>
              <span>{doctor.Occupation}</span>
            </div>
          </div>
        </div>
        <div className="doc__actions">
          <button className="btn btn--ghost" onClick={() => setOpenEdit(true)}>Edit doctor</button>
          <button className="btn btn--primary" onClick={openCreateAppt}>Add appointment</button>
        </div>
      </div>

      <div className="doc__stats">
        <div className="stat">
          <div className="stat__label">Total appointments</div>
          <div className="stat__value">{totalAppts}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Upcoming this week</div>
          <div className="stat__value">{upcomingThisWeek}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Completed this month</div>
          <div className="stat__value">{completedThisMonth}</div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "basic" ? "is-active" : ""}`} onClick={() => setTab("basic")}>
          Basic Information
        </button>
        <button className={`tab ${tab === "appts" ? "is-active" : ""}`} onClick={() => setTab("appts")}>
          Client Appointments
        </button>
      </div>

      {tab === "basic" && (
        <section className="card">
          <div className="card__title">Doctor profile</div>
          <div className="kv">
            <div><div className="k">Email</div><div className="v">{doctor.Email}</div></div>
            <div><div className="k">Phone</div><div className="v">{doctor.Phone}</div></div>
            <div><div className="k">Location</div><div className="v">{doctor.Location ?? "—"}</div></div>
            <div><div className="k">Experience</div><div className="v">{doctor.Experience ? `${doctor.Experience} years` : "—"}</div></div>
            <div className="kv--full"><div className="k">Bio</div><div className="v">{doctor.Bio || "—"}</div></div>
          </div>
        </section>
      )}

      {tab === "appts" && (
        <section className="card">
          <div className="card__headRow">
            <div className="card__title">Appointments for this doctor</div>
            <div className="row">
              <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="btn btn--primary" onClick={openCreateAppt}>Add appointment</button>
            </div>
          </div>

          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th style={{ width: 240 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.AppointmentId}>
                    <td>{fmt(a.StartAt)}</td>
                    <td>{a.PatientName}</td>
                    <td>{a.ServiceName}</td>
                    <td>
                      <span className={`pill ${
                        a.Status === "Confirmed" || a.Status === "Completed" ? "pill--ok" : "pill--muted"
                      }`}>{a.Status}</span>
                    </td>
                    <td className="actions">
                      <button className="btn btn--ghost" onClick={() => openEditAppt(a)}>Edit</button>
                      <button className="btn btn--ghost" onClick={() => handleCancelAppt(a)}>Cancel</button>
                      <button className="btn btn--ghost" onClick={() => handleCompleteAppt(a)}>Complete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="empty">No appointments found.</div>
            )}
          </div>
        </section>
      )}

      <Modal open={openEdit} title="Edit Doctor" onClose={() => setOpenEdit(false)}>
        <form key={doctor.DoctorId} className="form" onSubmit={handleSaveDoctor}>
          <div className="grid2">
            <div className="field">
              <label>Full name *</label>
              <input className="input" name="name" defaultValue={doctor.Name} required />
            </div>
            <div className="field">
              <label>Specialty *</label>
              <input className="input" name="specialty" defaultValue={doctor.Occupation} required />
            </div>
          </div>
          <div className="grid2">
            <div className="field">
              <label>Email *</label>
              <input className="input" name="email" type="email" defaultValue={doctor.Email} required />
            </div>
            <div className="field">
              <label>Phone *</label>
              <input className="input" name="phone" defaultValue={doctor.Phone} required />
            </div>
          </div>
          <div className="field">
            <label>Bio</label>
            <textarea className="textarea" name="bio" defaultValue={doctor.Bio ?? ""} />
          </div>
          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={() => setOpenEdit(false)}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={openAppt} title={editingAppt ? "Edit Appointment" : "Add Appointment"} onClose={() => setOpenAppt(false)}>
        <form key={editingAppt?.AppointmentId ?? "new-appt"} className="form" onSubmit={handleSaveAppt}>
          <div className="field">
            <label>Doctor</label>
            <input className="input" value={doctor.Name} disabled />
          </div>
          <div className="grid2">
            <div className="field">
              <label>Client name *</label>
              <input className="input" name="patientName" defaultValue={editingAppt?.PatientName ?? ""} required />
            </div>
            <div className="field">
              <label>Service *</label>
              <select className="select" name="serviceId" required defaultValue={editingAppt?.ServiceId ?? ""}>
                <option value="" disabled>Choose service</option>
                {services.map((s) => (
                  <option key={s.ServiceId} value={s.ServiceId}>{s.Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid2">
            <div className="field">
              <label>Date *</label>
              <input className="input" name="date" type="date" defaultValue={editApptDate} required />
            </div>
            <div className="field">
              <label>Time *</label>
              <input className="input" name="time" type="time" defaultValue={editApptTime} required />
            </div>
          </div>
          <div className="field">
            <label>Status</label>
            <select className="select" name="status" defaultValue={editingAppt?.Status ?? "Confirmed"}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={() => setOpenAppt(false)}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
