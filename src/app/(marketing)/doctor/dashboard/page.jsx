"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

function getAuthPayload() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function fmt(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-GB", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const STATUS_OPTIONS = ["All", "Confirmed", "Completed", "Cancelled", "No-show"];

const STATUS_STYLE = {
  Confirmed:  { bg: "#ECFDF5", color: "#059669" },
  Completed:  { bg: "#EFF6FF", color: "#2563EB" },
  Cancelled:  { bg: "#FEF2F2", color: "#DC2626" },
  "No-show":  { bg: "#FFF7ED", color: "#D97706" },
};

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("appointments");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const payload = getAuthPayload();
    if (!payload) { router.push("/login"); return; }
    if (payload.role !== "doctor") {
      router.push(payload.role === "admin" ? "/admin" : "/dashboard");
      return;
    }
    load(payload.doctorId);
  }, []);

  async function load(doctorId) {
    try {
      const [docRes, apptRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/doctors/${doctorId}`, { headers: authHeaders() }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/doctor/${doctorId}`, { headers: authHeaders() }),
      ]);
      if (docRes.ok) setDoctor(await docRes.json());
      if (apptRes.ok) setAppointments(await apptRes.json());
    } catch {}
    finally { setLoading(false); }
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function updateStatus(appt, newStatus) {
    setActionLoading(appt.AppointmentId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${appt.AppointmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ ...appt, Status: newStatus }),
        }
      );
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => a.AppointmentId === appt.AppointmentId ? { ...a, Status: newStatus } : a)
        );
        showToast(`Marked as ${newStatus}`);
      } else {
        showToast("Action failed", "error");
      }
    } catch {
      showToast("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 86400000);
  const weekEnd = new Date(todayStart.getTime() + 7 * 86400000);

  const stats = useMemo(() => ({
    total: appointments.length,
    today: appointments.filter((a) => { const d = new Date(a.StartAt); return d >= todayStart && d < todayEnd; }).length,
    upcoming: appointments.filter((a) => { const d = new Date(a.StartAt); return d >= now && d < weekEnd && a.Status === "Confirmed"; }).length,
    completed: appointments.filter((a) => {
      if (a.Status !== "Completed") return false;
      const d = new Date(a.StartAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
  }), [appointments]);

  const filteredAppts = useMemo(() =>
    appointments
      .filter((a) => statusFilter === "All" || a.Status === statusFilter)
      .sort((a, b) => new Date(b.StartAt) - new Date(a.StartAt)),
    [appointments, statusFilter]
  );

  if (loading) return <div className="dd-loading">Loading your dashboard...</div>;

  return (
    <div className="dd">
      {toast && (
        <div className={`dd__toast dd__toast--${toast.type}`}>{toast.message}</div>
      )}

      {/* Hero */}
      <div className="dd__hero">
        <div className="dd__hero-inner">
          <div>
            <div className="dd__hero-badge">Doctor Portal</div>
            <h1 className="dd__title">{doctor?.Name ?? "Doctor"}</h1>
            <p className="dd__subtitle">{doctor?.Occupation} {doctor?.WorkingHours ? `· ${doctor.WorkingHours}` : ""}</p>
          </div>
          <button className="dd__logout" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      {/* Stats */}
      <div className="dd__body">
        <div className="dd__stats">
          {[
            { label: "Total Appointments", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "Upcoming This Week", value: stats.upcoming },
            { label: "Completed This Month", value: stats.completed },
          ].map((s) => (
            <div key={s.label} className="dd__stat">
              <div className="dd__stat-value">{s.value}</div>
              <div className="dd__stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dd__tabs">
          <button className={`dd__tab ${tab === "appointments" ? "dd__tab--active" : ""}`} onClick={() => setTab("appointments")}>
            Appointments
          </button>
          <button className={`dd__tab ${tab === "profile" ? "dd__tab--active" : ""}`} onClick={() => setTab("profile")}>
            My Profile
          </button>
        </div>

        {/* Appointments tab */}
        {tab === "appointments" && (
          <div className="dd__section">
            <div className="dd__filters">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`dd__filter-btn ${statusFilter === s ? "dd__filter-btn--active" : ""}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {filteredAppts.length === 0 ? (
              <div className="dd__empty">No appointments found.</div>
            ) : (
              <div className="dd__appt-list">
                {filteredAppts.map((a) => {
                  const style = STATUS_STYLE[a.Status] ?? { bg: "#F3F4F6", color: "#6B7280" };
                  const busy = actionLoading === a.AppointmentId;
                  return (
                    <div key={a.AppointmentId} className="dd__appt-card">
                      <div className="dd__appt-header">
                        <span className="dd__appt-date">{fmt(a.StartAt)}</span>
                        <span className="dd__badge" style={{ background: style.bg, color: style.color }}>
                          {a.Status}
                        </span>
                      </div>
                      <div className="dd__appt-body">
                        <div className="dd__appt-row">
                          <span className="dd__appt-label">Patient</span>
                          <span className="dd__appt-value">{a.PatientName || "—"}</span>
                        </div>
                        <div className="dd__appt-row">
                          <span className="dd__appt-label">Service</span>
                          <span className="dd__appt-value">{a.ServiceName || "—"}</span>
                        </div>
                      </div>
                      <div className="dd__appt-actions">
                        {a.Status === "Confirmed" && (
                          <>
                            <button
                              className="dd__action-btn dd__action-btn--complete"
                              disabled={busy}
                              onClick={() => updateStatus(a, "Completed")}
                            >
                              Complete
                            </button>
                            <button
                              className="dd__action-btn dd__action-btn--noshow"
                              disabled={busy}
                              onClick={() => updateStatus(a, "No-show")}
                            >
                              No-show
                            </button>
                            <button
                              className="dd__action-btn dd__action-btn--cancel"
                              disabled={busy}
                              onClick={() => updateStatus(a, "Cancelled")}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {a.Status !== "Confirmed" && (
                          <span className="dd__action-done">No actions available</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Profile tab */}
        {tab === "profile" && doctor && (
          <div className="dd__section dd__profile">
            <div className="dd__profile-grid">
              <div className="dd__profile-card">
                <div className="dd__profile-avatar">{(doctor.Name ?? "?").split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                <div className="dd__profile-name">{doctor.Name}</div>
                <div className="dd__profile-occ">{doctor.Occupation}</div>
                <span className={`dd__profile-status ${doctor.Status === "Active" ? "dd__profile-status--active" : "dd__profile-status--inactive"}`}>
                  {doctor.Status}
                </span>
              </div>

              <div className="dd__profile-details">
                {[
                  { label: "Email", value: doctor.Email },
                  { label: "Phone", value: doctor.Phone },
                  { label: "Location", value: doctor.Location },
                  { label: "Experience", value: doctor.Experience ? `${doctor.Experience} years` : null },
                  { label: "Working hours", value: doctor.WorkingHours },
                  { label: "Qualifications", value: doctor.Qualifications },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="dd__profile-row">
                    <span className="dd__profile-key">{label}</span>
                    <span className="dd__profile-val">{value}</span>
                  </div>
                ) : null)}

                {doctor.Bio && (
                  <div className="dd__profile-bio">
                    <div className="dd__profile-key">Bio</div>
                    <p className="dd__profile-bio-text">{doctor.Bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
