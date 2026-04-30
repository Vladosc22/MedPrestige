"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [d, s, a] = await Promise.all([
          api.get("/api/admin/doctors"),
          api.get("/api/admin/services"),
          api.get("/api/admin/appointments"),
        ]);
        setDoctors(d);
        setServices(s);
        setAppointments(a);
      } catch {
        // silently fail — show zeros
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 86400000);
  const weekEnd = new Date(todayStart.getTime() + 7 * 86400000);

  const todayAppts = appointments.filter((a) => {
    const d = new Date(a.StartAt);
    return d >= todayStart && d < todayEnd;
  }).length;

  const upcomingWeek = appointments.filter((a) => {
    const d = new Date(a.StartAt);
    return d >= now && d < weekEnd && a.Status === "Confirmed";
  }).length;

  const recentAppts = [...appointments]
    .sort((a, b) => new Date(b.StartAt) - new Date(a.StartAt))
    .slice(0, 10);

  const doctorAppointmentCounts = doctors
    .map((d) => ({
      name: d.Name,
      count: appointments.filter((a) => a.DoctorId === d.DoctorId).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  function fmt(dt) {
    if (!dt) return "—";
    return new Date(dt).toLocaleString("ro-RO", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="dash">
      <div className="dash__header">
        <div>
          <h1 className="dash__title">Welcome back, Admin 👋</h1>
          <p className="dash__subtitle">Here's what's happening at your clinic today.</p>
        </div>
      </div>

      <section className="dash__kpis">
        <div className="kpi">
          <div className="kpi__label">Total Doctors</div>
          <div className="kpi__value">{loading ? "—" : doctors.length}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Total Services</div>
          <div className="kpi__value">{loading ? "—" : services.length}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Today's Appointments</div>
          <div className="kpi__value">{loading ? "—" : todayAppts}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Upcoming This Week</div>
          <div className="kpi__value">{loading ? "—" : upcomingWeek}</div>
        </div>
      </section>

      <section className="dash__grid">
        <div className="card">
          <div className="card__title">Doctors with most appointments</div>
          <div className="table-scroll" role="region" aria-label="Doctors with most appointments table" tabIndex={0}>
            {loading ? (
              <div className="empty">Loading...</div>
            ) : (
              <table className="table table--compact">
                <thead>
                  <tr><th>Doctor</th><th>Appointments</th></tr>
                </thead>
                <tbody>
                  {doctorAppointmentCounts.map(({ name, count }) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                  {doctorAppointmentCounts.length === 0 && (
                    <tr><td colSpan={2}>No data yet.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card card--full">
          <div className="card__title">Recent Appointments</div>
          <div className="table-scroll" role="region" aria-label="Recent appointments table" tabIndex={0}>
            {loading ? (
              <div className="empty">Loading...</div>
            ) : (
              <table className="table table--wide">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Client</th>
                    <th>Doctor</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppts.map((a) => (
                    <tr key={a.AppointmentId}>
                      <td>{fmt(a.StartAt)}</td>
                      <td>{a.PatientName}</td>
                      <td>{a.DoctorName}</td>
                      <td>{a.ServiceName}</td>
                      <td>{a.Status}</td>
                    </tr>
                  ))}
                  {recentAppts.length === 0 && (
                    <tr><td colSpan={5}>No appointments yet.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
