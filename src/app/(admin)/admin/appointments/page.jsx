"use client";

import { useEffect, useState } from "react";
import "./appointments.css";
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

export default function AdminAppointmentsPage() {
  const { pushToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    Promise.all([loadAppointments(), loadDoctors(), loadServices()]);
  }, []);

  async function loadAppointments() {
    try {
      setLoading(true);
      const data = await api.get("/api/admin/appointments");
      setAppointments(data);
    } catch {
      pushToast({ type: "error", title: "Failed to load appointments" });
    } finally {
      setLoading(false);
    }
  }

  async function loadDoctors() {
    try {
      const data = await api.get("/api/admin/doctors");
      setDoctors(data);
    } catch {}
  }

  async function loadServices() {
    try {
      const data = await api.get("/api/admin/services");
      setServices(data);
    } catch {}
  }

  const filtered = appointments.filter((a) => {
    if (filterDoctor && String(a.DoctorId) !== filterDoctor) return false;
    if (filterService && String(a.ServiceId) !== filterService) return false;
    if (filterStatus && a.Status !== filterStatus) return false;
    return true;
  });

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(a) {
    setEditing(a);
    setOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const date = fd.get("date");
    const time = fd.get("time");
    const startAt = date && time ? new Date(`${date}T${time}`).toISOString() : null;

    const doctorId = Number(fd.get("doctorId")) || null;
    const serviceId = Number(fd.get("serviceId")) || null;

    const selectedDoctor = doctors.find((d) => d.DoctorId === doctorId);
    const selectedService = services.find((s) => s.ServiceId === serviceId);

    const body = {
      PatientName: fd.get("patientName"),
      DoctorId: doctorId,
      ServiceId: serviceId,
      DoctorName: selectedDoctor?.Name ?? "",
      ServiceName: selectedService?.Name ?? "",
      Status: fd.get("status"),
      StartAt: startAt,
    };

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/appointments/${editing.AppointmentId}`, body);
        pushToast({ type: "success", title: "Appointment updated" });
      } else {
        await api.post("/api/admin/appointments", body);
        pushToast({ type: "success", title: "Appointment created" });
      }
      setOpen(false);
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(a) {
    if (!confirm("Delete this appointment? This cannot be undone.")) return;
    try {
      await api.del(`/api/admin/appointments/${a.AppointmentId}`);
      pushToast({ type: "success", title: "Appointment deleted" });
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Delete failed" });
    }
  }

  async function handleCancel(a) {
    try {
      await api.put(`/api/admin/appointments/${a.AppointmentId}`, { ...a, Status: "Cancelled" });
      pushToast({ type: "success", title: "Appointment cancelled" });
      await loadAppointments();
    } catch {
      pushToast({ type: "error", title: "Action failed" });
    }
  }

  const editDate = editing?.StartAt ? editing.StartAt.slice(0, 10) : "";
  const editTime = editing?.StartAt ? editing.StartAt.slice(11, 16) : "";

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Appointments</h1>
          <p className="page__subtitle">View and manage all appointments.</p>
        </div>
        <div className="row">
          <button className={`btn ${view === "calendar" ? "btn--primary" : "btn--ghost"}`} onClick={() => setView("calendar")}>Calendar</button>
          <button className={`btn ${view === "list" ? "btn--primary" : "btn--ghost"}`} onClick={() => setView("list")}>List</button>
          <button className="btn btn--primary" onClick={openCreate}>Create</button>
        </div>
      </div>

      <div className="filters">
        <select className="select" value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)}>
          <option value="">All Doctors</option>
          {doctors.map((d) => (
            <option key={d.DoctorId} value={d.DoctorId}>{d.Name}</option>
          ))}
        </select>
        <select className="select" value={filterService} onChange={(e) => setFilterService(e.target.value)}>
          <option value="">All Services</option>
          {services.map((s) => (
            <option key={s.ServiceId} value={s.ServiceId}>{s.Name}</option>
          ))}
        </select>
        <select className="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {view === "calendar" ? (
        <div className="card">
          <div className="card__title">Calendar (UI placeholder)</div>
          <div className="calendar-placeholder">Calendar UI will go here later (month/week/day).</div>
        </div>
      ) : (
        <div className="tableCard">
          {loading ? (
            <div className="empty">Loading...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Client</th>
                  <th>Doctor</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.AppointmentId}>
                    <td>{fmt(a.StartAt)}</td>
                    <td>{a.PatientName}</td>
                    <td>{a.DoctorName}</td>
                    <td>{a.ServiceName}</td>
                    <td>
                      <span className={`pill ${
                        a.Status === "Confirmed" ? "pill--ok" :
                        a.Status === "Completed" ? "pill--ok" :
                        "pill--muted"
                      }`}>{a.Status}</span>
                    </td>
                    <td className="actions">
                      <button className="btn btn--ghost" onClick={() => openEdit(a)}>Edit</button>
                      <button className="btn btn--ghost" onClick={() => handleCancel(a)}>Cancel</button>
                      <button className="btn btn--danger" onClick={() => handleDelete(a)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div className="empty">No appointments found.</div>
          )}
        </div>
      )}

      <Modal
        open={open}
        title={editing ? "Edit Appointment" : "Create Appointment"}
        onClose={() => setOpen(false)}
      >
        <form key={editing?.AppointmentId ?? "new"} className="form" onSubmit={handleSave}>
          <div className="grid2">
            <div className="field">
              <label>Doctor *</label>
              <select className="select" name="doctorId" required defaultValue={editing?.DoctorId ?? ""}>
                <option value="" disabled>Choose doctor</option>
                {doctors.map((d) => (
                  <option key={d.DoctorId} value={d.DoctorId}>{d.Name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Service *</label>
              <select className="select" name="serviceId" required defaultValue={editing?.ServiceId ?? ""}>
                <option value="" disabled>Choose service</option>
                {services.map((s) => (
                  <option key={s.ServiceId} value={s.ServiceId}>{s.Name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Client name *</label>
              <input className="input" name="patientName" defaultValue={editing?.PatientName ?? ""} required />
            </div>
            <div className="field">
              <label>Status</label>
              <select className="select" name="status" defaultValue={editing?.Status ?? "Confirmed"}>
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Date *</label>
              <input className="input" name="date" type="date" defaultValue={editDate} required />
            </div>
            <div className="field">
              <label>Time *</label>
              <input className="input" name="time" type="time" defaultValue={editTime} required />
            </div>
          </div>

          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
