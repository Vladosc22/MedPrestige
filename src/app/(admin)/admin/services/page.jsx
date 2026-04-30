"use client";

import { useEffect, useState } from "react";
import "./services.css";
import Modal from "@/components/admin/Modal";
import { useToast } from "@/components/admin/ToastProvider";
import { api } from "@/lib/api";

export default function AdminServicesPage() {
  const { pushToast } = useToast();
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([loadServices(), loadDoctors()]);
  }, []);

  async function loadServices() {
    try {
      setLoading(true);
      const data = await api.get("/api/admin/services");
      setServices(data);
    } catch {
      pushToast({ type: "error", title: "Failed to load services" });
    } finally {
      setLoading(false);
    }
  }

  async function loadDoctors() {
    try {
      const data = await api.get("/api/admin/doctors");
      setDoctors(data);
    } catch {
      // silently fail — doctors list is only needed for the assign dropdown
    }
  }

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(s) {
    setEditing(s);
    setOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {
      Name: fd.get("name"),
      Description: fd.get("description"),
      Duration: Number(fd.get("duration")),
      Price: Number(fd.get("price")),
      Status: fd.get("status"),
    };

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/services/${editing.ServiceId}`, body);
        pushToast({ type: "success", title: "Service updated" });
      } else {
        await api.post("/api/admin/services", body);
        pushToast({ type: "success", title: "Service created" });
      }
      setOpen(false);
      await loadServices();
    } catch {
      pushToast({ type: "error", title: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s) {
    if (!confirm(`Delete "${s.Name}"? This cannot be undone.`)) return;
    try {
      await api.del(`/api/admin/services/${s.ServiceId}`);
      pushToast({ type: "success", title: "Service deleted" });
      await loadServices();
    } catch {
      pushToast({ type: "error", title: "Delete failed" });
    }
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Services</h1>
          <p className="page__subtitle">Create services and assign doctors.</p>
        </div>
        <button className="btn btn--primary" onClick={openCreate}>Add New Service</button>
      </div>

      <div className="tableCard">
        {loading ? (
          <div className="empty">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th style={{ width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.ServiceId}>
                  <td>{s.Name}</td>
                  <td>{s.Duration} min</td>
                  <td>{s.Price}</td>
                  <td>
                    <span className={`pill ${s.Status === "Active" ? "pill--ok" : "pill--muted"}`}>
                      {s.Status ?? "—"}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn btn--ghost" onClick={() => openEdit(s)}>Edit</button>
                    <button className="btn btn--danger" onClick={() => handleDelete(s)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && services.length === 0 && (
          <div className="empty">No services yet. Add one to get started.</div>
        )}
      </div>

      <Modal
        open={open}
        title={editing ? "Edit Service" : "Add New Service"}
        onClose={() => setOpen(false)}
      >
        <form key={editing?.ServiceId ?? "new"} className="form" onSubmit={handleSave}>
          <div className="field">
            <label>Service name *</label>
            <input className="input" name="name" defaultValue={editing?.Name ?? ""} required />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea className="textarea" name="description" defaultValue={editing?.Description ?? ""} />
          </div>

          <div className="grid2">
            <div className="field">
              <label>Duration (minutes) *</label>
              <input className="input" name="duration" type="number" min="1" defaultValue={editing?.Duration ?? ""} required />
            </div>
            <div className="field">
              <label>Price *</label>
              <input className="input" name="price" type="number" min="0" defaultValue={editing?.Price ?? ""} required />
            </div>
          </div>

          <div className="field">
            <label>Status</label>
            <select className="select" name="status" defaultValue={editing?.Status ?? "Active"}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {doctors.length > 0 && (
            <div className="field">
              <label>Assign doctors</label>
              <select className="select" multiple style={{ height: 140 }}>
                {doctors.map((d) => (
                  <option key={d.DoctorId} value={d.DoctorId}>{d.Name}</option>
                ))}
              </select>
            </div>
          )}

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
