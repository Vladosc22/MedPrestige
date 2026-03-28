import React from "react";
import Link from "next/link";
import PagesHero from "@/components/PagesHero/PagesHero";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import "./doctor-profile.css";
import DoctorProfileAnimations from "./DoctorProfileAnimations";
import CheckIcon from "@/components/Icons/CheckIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import TwitterXIcon from "@/components/Icons/TwitterXIcon";

export const dynamic = 'force-dynamic'

const DoctorProfilePage = async ({ params }) => {
    const { doctorID } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${doctorID}`);
    if (!res.ok) {
        return (
            <main>
                <PagesHero title="Doctor Not Found" subtitle="The doctor you are looking for does not exist." />
                <ContactCardFooter />
            </main>
        );
    }

    const d = await res.json();

    const details = d.Details || [];
    const skills       = details.filter(x => x.Type === "skill").map(x => x.Value);
    const certificates = details.filter(x => x.Type === "certificate").map(x => x.Value);
    const awards       = details.filter(x => x.Type === "award").map(x => x.Value);

    const profileFields = [
        { label: "Specialty",    value: d.Occupation },
        { label: "Experience",   value: d.Experience ? `${d.Experience} years` : "—" },
        { label: "Location",     value: d.Location },
        { label: "Phone",        value: d.Phone },
        { label: "Email",        value: d.Email },
        ...(certificates.length ? [{ label: "Certificates", value: certificates.join(", ") }] : []),
    ];

    return (
        <main>
            <DoctorProfileAnimations />
            <PagesHero title={d.Name} subtitle={d.Occupation} />

            <div className="doctor-profile">
                <div className="doctor-profile__container">

                    {/* ── Sidebar ── */}
                    <aside className="doctor-sidebar">
                        <div className="doctor-sidebar__photo-wrap">
                            <img src={d.Image} alt={`Portrait of ${d.Name}`} className="doctor-sidebar__photo" />
                        </div>

                        <div className="doctor-sidebar__card">
                            <span className="doctor-sidebar__specialty">{d.Occupation}</span>

                            <ul className="doctor-sidebar__meta">
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Experience</span>
                                        {d.Experience ? `${d.Experience} years` : "—"}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Location</span>
                                        {d.Location}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17v-.08z" /></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Phone</span>
                                        {d.Phone}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Email</span>
                                        {d.Email}
                                    </span>
                                </li>
                            </ul>

                            <ul className="doctor-sidebar__socials">
                                {[
                                    { label: "LinkedIn",    Icon: LinkedInIcon },
                                    { label: "Facebook",    Icon: FacebookIcon },
                                    { label: "Twitter / X", Icon: TwitterXIcon },
                                ].map(({ label, Icon }) => (
                                    <li key={label}>
                                        <a href="#" className="doctor-sidebar__social-btn" aria-label={`${d.Name} on ${label}`}>
                                            <Icon />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className="doctor-sidebar__cta">
                                Book Appointment
                            </Link>
                        </div>
                    </aside>

                    {/* ── Content ── */}
                    <div className="doctor-content">

                        {/* Biography */}
                        <section className="doctor-section" aria-labelledby="bio-title">
                            <span className="doctor-eyebrow">About</span>
                            <h2 id="bio-title" className="doctor-section__title">Biography</h2>
                            <p className="doctor-section__text">{d.Bio}</p>
                        </section>

                        {/* Profile */}
                        <section className="doctor-section" aria-labelledby="profile-title">
                            <span className="doctor-eyebrow">Credentials</span>
                            <h2 id="profile-title" className="doctor-section__title">Profile</h2>
                            <div className="doctor-profile-grid">
                                {profileFields.map(({ label, value }) => (
                                    <div className="doctor-profile-item" key={label}>
                                        <span className="doctor-profile-label">{label}</span>
                                        <span className="doctor-profile-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Awards */}
                        {awards.length > 0 && (
                            <section className="doctor-section" aria-labelledby="awards-title">
                                <span className="doctor-eyebrow">Recognition</span>
                                <h2 id="awards-title" className="doctor-section__title">Awards &amp; Honors</h2>
                                <ul className="doctor-awards-list">
                                    {awards.map((award, i) => (
                                        <li key={i} className="doctor-award-item">
                                            <span className="doctor-award-icon" aria-hidden="true"><CheckIcon size={14} strokeWidth={3} /></span>
                                            {award}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <section className="doctor-section doctor-skills-section" aria-labelledby="skills-title">
                                <span className="doctor-eyebrow">Expertise</span>
                                <h2 id="skills-title" className="doctor-section__title">Areas of Expertise</h2>
                                <ul className="doctor-skills-tags">
                                    {skills.map((skill) => (
                                        <li key={skill} className="doctor-skill-tag">
                                            <CheckIcon size={13} />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                    </div>
                </div>
            </div>

            <ContactCardFooter />
        </main>
    );
};

export default DoctorProfilePage;
