"use client";

import { useEffect, useMemo, useState } from "react";
import "./doctors.css";
import Modal from "@/components/admin/Modal";
import { useToast } from "@/components/admin/ToastProvider";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminDoctorsPage() {
  const { pushToast } = useToast();
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  useEffect(() => {
    loadDoctors();
    loadServices();
  }, []);

  async function loadDoctors() {
    try {
      setLoading(true);
      const data = await api.get("/api/admin/doctors");
      setDoctors(data);
    } catch {
      pushToast({ type: "error", title: "Failed to load doctors" });
    } finally {
      setLoading(false);
    }
  }

  async function loadServices() {
    try {
      const data = await api.get("/api/admin/services");
      setServices(data);
    } catch {}
  }

  const rows = useMemo(() => {
    return doctors.filter((d) => {
      const name = d.Name ?? "";
      const occupation = d.Occupation ?? "";
      const email = d.Email ?? "";
      const okQuery =
        name.toLowerCase().includes(query.toLowerCase()) ||
        occupation.toLowerCase().includes(query.toLowerCase()) ||
        email.toLowerCase().includes(query.toLowerCase());
      const okStatus = status === "All" ? true : d.Status === status;
      return okQuery && okStatus;
    });
  }, [doctors, query, status]);

  function openCreate() {
    setEditing(null);
    setSelectedServiceIds([]);
    setOpen(true);
  }

  function openEdit(d) {
    setEditing(d);
    setSelectedServiceIds(d.ServiceIds ?? []);
    setOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {
      Name: fd.get("name"),
      Occupation: fd.get("specialty"),
      Email: fd.get("email"),
      Phone: fd.get("phone"),
      Status: fd.get("status"),
      Bio: fd.get("bio") || "",
      Image: fd.get("image") || null,
      WorkingHours: fd.get("workingHours") || null,
      Qualifications: fd.get("qualifications") || null,
      Password: fd.get("password") || null,
      Details: [],
      ServiceIds: selectedServiceIds,
    };

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/admin/doctors/${editing.DoctorId}`, body);
        pushToast({ type: "success", title: "Doctor updated" });
      } else {
        await api.post("/api/admin/doctors", body);
        pushToast({ type: "success", title: "Doctor created" });
      }
      setOpen(false);
      await loadDoctors();
    } catch {
      pushToast({ type: "error", title: "Save failed", message: "Check that all fields are valid." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(d) {
    if (!confirm(`Delete ${d.Name}? This cannot be undone.`)) return;
    try {
      await api.del(`/api/admin/doctors/${d.DoctorId}`);
      pushToast({ type: "success", title: "Doctor deleted" });
      await loadDoctors();
    } catch {
      pushToast({ type: "error", title: "Delete failed" });
    }
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Doctors</h1>
          <p className="page__subtitle">Manage doctor profiles, status, and appointments.</p>
        </div>
        <button className="btn btn--primary" onClick={openCreate}>Add New Doctor</button>
      </div>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Search doctors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="tableCard">
        {loading ? (
          <div className="empty">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.DoctorId}>
                  <td>
                    <div className="avatar" aria-hidden="true">
                      {(d.Name ?? "?").split(" ").slice(1, 2).join("").slice(0, 1) || "?"}
                    </div>
                  </td>
                  <td>{d.Name}</td>
                  <td>{d.Occupation}</td>
                  <td>{d.Email}</td>
                  <td>{d.Phone}</td>
                  <td>
                    <span className={`pill ${d.Status === "Active" ? "pill--ok" : "pill--muted"}`}>
                      {d.Status}
                    </span>
                  </td>
                  <td className="actions">
                    <Link className="btn btn--ghost" href={`/admin/doctors/${d.DoctorId}`}>View</Link>
                    <button className="btn btn--ghost" onClick={() => openEdit(d)}>Edit</button>
                    <button className="btn btn--danger" onClick={() => handleDelete(d)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && rows.length === 0 && (
          <div className="empty">No results. Try a different search.</div>
        )}
      </div>

      <Modal
        open={open}
        title={editing ? "Edit Doctor" : "Add New Doctor"}
        onClose={() => setOpen(false)}
      >
        <form key={editing?.DoctorId ?? "new"} className="form" onSubmit={handleSave}>
          <div className="grid2">
            <div className="field">
              <label>Full name *</label>
              <input className="input" name="name" defaultValue={editing?.Name ?? ""} required />
            </div>
            <div className="field">
              <label>Specialty *</label>
              <input className="input" name="specialty" defaultValue={editing?.Occupation ?? ""} required />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Email *</label>
              <input className="input" name="email" type="email" defaultValue={editing?.Email ?? ""} required />
            </div>
            <div className="field">
              <label>Phone *</label>
              <input className="input" name="phone" defaultValue={editing?.Phone ?? ""} required />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Qualifications</label>
              <input className="input" name="qualifications" placeholder="e.g. MD, PhD" defaultValue={editing?.Qualifications ?? ""} />
            </div>
            <div className="field">
              <label>Status</label>
              <select className="select" name="status" defaultValue={editing?.Status ?? "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Bio</label>
            <textarea className="textarea" name="bio" rows={3} placeholder="Brief description about the doctor..." defaultValue={editing?.Bio ?? ""} />
          </div>

          {services.length > 0 && (
            <div className="field">
              <label>Assigned services</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                {services.map((s) => {
                  const checked = selectedServiceIds.includes(s.ServiceId);
                  return (
                    <label key={s.ServiceId} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelectedServiceIds((prev) =>
                            checked ? prev.filter((id) => id !== s.ServiceId) : [...prev, s.ServiceId]
                          )
                        }
                      />
                      {s.Name}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="field">
            <label>{editing ? "Password (leave blank to keep current)" : "Password *"}</label>
            <input className="input" name="password" type="password" placeholder="••••••••" required={!editing} minLength={6} />
          </div>

          <div className="field">
            <label>Photo URL</label>
            <input className="input" name="image" type="url" placeholder="https://example.com/photo.jpg" defaultValue={editing?.Image ?? ""} />
          </div>

          <div className="field">
            <label>Working hours</label>
            <input className="input" name="workingHours" placeholder="Mon–Fri 09:00–17:00" defaultValue={editing?.WorkingHours ?? ""} />
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
