"use client";

import { useEffect, useState } from "react";
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

function fmt(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-GB", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const STATUS_COLORS = {
  Confirmed: { bg: "#ECFDF5", color: "#059669" },
  Completed: { bg: "#EFF6FF", color: "#2563EB" },
  Cancelled: { bg: "#FEF2F2", color: "#DC2626" },
  "No-show":  { bg: "#FFF7ED", color: "#D97706" },
};

export default function PatientDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const payload = getAuthPayload();
    if (!payload) { router.push("/login"); return; }
    if (payload.role !== "patient") { router.push("/admin"); return; }
    setUser(payload);
    loadAppointments(payload.patientId);
  }, []);

  async function loadAppointments(patientId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/patient/${patientId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.ok) setAppointments(await res.json());
    } catch {}
    finally { setLoading(false); }
  }

  const now = new Date();

  const upcoming = appointments
    .filter((a) => a.Status === "Confirmed" && new Date(a.StartAt) >= now)
    .sort((a, b) => new Date(a.StartAt) - new Date(b.StartAt));

  const past = appointments
    .filter((a) => a.Status !== "Confirmed" || new Date(a.StartAt) < now)
    .sort((a, b) => new Date(b.StartAt) - new Date(a.StartAt));

  const shown = tab === "upcoming" ? upcoming : past;

  function handleLogout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  if (loading) return <div className="pd-loading">Loading your dashboard...</div>;

  return (
    <div className="pd">
      <div className="pd__hero">
        <div className="pd__hero-inner">
          <div>
            <h1 className="pd__title">Welcome back, {user?.name ?? "Patient"}</h1>
            <p className="pd__subtitle">Here are your appointments at MedPrestige.</p>
          </div>
          <button className="pd__logout" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div className="pd__body">
        <div className="pd__stats">
          <div className="pd__stat">
            <div className="pd__stat-value">{upcoming.length}</div>
            <div className="pd__stat-label">Upcoming</div>
          </div>
          <div className="pd__stat">
            <div className="pd__stat-value">{appointments.filter(a => a.Status === "Completed").length}</div>
            <div className="pd__stat-label">Completed</div>
          </div>
          <div className="pd__stat">
            <div className="pd__stat-value">{appointments.length}</div>
            <div className="pd__stat-label">Total</div>
          </div>
        </div>

        <div className="pd__tabs">
          <button className={`pd__tab ${tab === "upcoming" ? "pd__tab--active" : ""}`} onClick={() => setTab("upcoming")}>
            Upcoming ({upcoming.length})
          </button>
          <button className={`pd__tab ${tab === "past" ? "pd__tab--active" : ""}`} onClick={() => setTab("past")}>
            Past ({past.length})
          </button>
        </div>

        {shown.length === 0 ? (
          <div className="pd__empty">
            {tab === "upcoming"
              ? "You have no upcoming appointments."
              : "No past appointments found."}
          </div>
        ) : (
          <div className="pd__list">
            {shown.map((a) => {
              const colors = STATUS_COLORS[a.Status] ?? { bg: "#F3F4F6", color: "#6B7280" };
              return (
                <div key={a.AppointmentId} className="pd__card">
                  <div className="pd__card-header">
                    <div className="pd__card-date">{fmt(a.StartAt)}</div>
                    <span className="pd__badge" style={{ background: colors.bg, color: colors.color }}>
                      {a.Status}
                    </span>
                  </div>
                  <div className="pd__card-body">
                    <div className="pd__card-row">
                      <span className="pd__card-label">Doctor</span>
                      <span className="pd__card-value">{a.DoctorName || "—"}</span>
                    </div>
                    <div className="pd__card-row">
                      <span className="pd__card-label">Service</span>
                      <span className="pd__card-value">{a.ServiceName || "—"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
