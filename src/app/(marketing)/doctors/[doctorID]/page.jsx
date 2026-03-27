import React from "react";
import Link from "next/link";
import PagesHero from "@/components/PagesHero/PagesHero";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import "./doctor-profile.css";
import DoctorProfileAnimations from "./DoctorProfileAnimations";

/* ── Icon helpers ─────────────────────────────────────────────── */
const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterXIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

/* ── Profile component ────────────────────────────────────────── */
const DoctorProfile = ({
    name,
    image,
    biography,
    occupation,
    experience,
    certificates = [],
    skills = [],
    location,
    phone,
    email,
    awards = [],
    awardNote,
    skillNote,
}) => {
    const profileFields = [
        { label: "Occupation",   value: occupation },
        { label: "Experience",   value: experience },
        { label: "Location",     value: location   },
        { label: "Phone",        value: phone      },
        { label: "Email",        value: email      },
        { label: "Certificates", value: certificates.join(", ") },
        { label: "Skills",       value: skills.join(", ")       },
    ];

    return (
        <main>
            <DoctorProfileAnimations />

            <PagesHero title={name} subtitle={occupation} />

            <div className="doctor-profile">
                <div className="doctor-profile__container">

                    {/* ── Sidebar ── */}
                    <aside className="doctor-sidebar">
                        <div className="doctor-sidebar__photo-wrap">
                            <img
                                src={image}
                                alt={`Portrait of ${name}`}
                                className="doctor-sidebar__photo"
                            />
                        </div>

                        <div className="doctor-sidebar__card">
                            <span className="doctor-sidebar__specialty">{occupation}</span>

                            <ul className="doctor-sidebar__meta">
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Experience</span>
                                        {experience}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Location</span>
                                        {location}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17v-.08z"/></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Phone</span>
                                        {phone}
                                    </span>
                                </li>
                                <li className="doctor-sidebar__meta-item">
                                    <span className="doctor-sidebar__meta-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    </span>
                                    <span>
                                        <span className="doctor-sidebar__meta-label">Email</span>
                                        {email}
                                    </span>
                                </li>
                            </ul>

                            <ul className="doctor-sidebar__socials">
                                {[
                                    { label: "LinkedIn",    Icon: LinkedInIcon  },
                                    { label: "Facebook",    Icon: FacebookIcon  },
                                    { label: "Twitter / X", Icon: TwitterXIcon  },
                                ].map(({ label, Icon }) => (
                                    <li key={label}>
                                        <a href="#" className="doctor-sidebar__social-btn" aria-label={`${name} on ${label}`}>
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
                            <p className="doctor-section__text">{biography}</p>
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
                        <section className="doctor-section" aria-labelledby="awards-title">
                            <span className="doctor-eyebrow">Recognition</span>
                            <h2 id="awards-title" className="doctor-section__title">Awards &amp; Honors</h2>
                            {awardNote && <p className="doctor-awards-note">{awardNote}</p>}
                            <ul className="doctor-awards-list">
                                {awards.map((award, i) => (
                                    <li key={i} className="doctor-award-item">
                                        <span className="doctor-award-icon" aria-hidden="true"><CheckIcon /></span>
                                        {award}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Skills */}
                        <section className="doctor-section doctor-skills-section" aria-labelledby="skills-title">
                            <span className="doctor-eyebrow">Expertise</span>
                            <h2 id="skills-title" className="doctor-section__title">Areas of Expertise</h2>
                            {skillNote && <p className="doctor-skills-note">{skillNote}</p>}
                            <ul className="doctor-skills-tags">
                                {skills.map((skill) => (
                                    <li key={skill} className="doctor-skill-tag">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>
                </div>
            </div>

            <ContactCardFooter />
        </main>
    );
};

/* ── Page (hardcoded data) ────────────────────────────────────── */
const DoctorProfilePage = () => (
    <DoctorProfile
        name="Dr. Jessica Joan"
        image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=720&fit=crop&crop=face"
        occupation="Cardiologist"
        biography="Dr. Jessica Joan is a board-certified cardiologist with over 20 years of experience in diagnosing and treating complex cardiovascular conditions. She earned her medical degree from Istanbul University and completed her residency and fellowship at leading institutions in Europe and the United States. Dr. Joan is known for her patient-centered approach, combining the latest evidence-based treatments with genuine compassion to deliver outstanding outcomes for every patient she cares for."
        experience="20 years"
        certificates={["Robert L. Nobel Prize", "Edison Awards"]}
        skills={[
            "Interventional Cardiology",
            "Echocardiography",
            "Cardiac Rehabilitation",
            "Paediatric & Adult Cardiology",
            "Heart Failure Management",
            "Preventive Cardiology",
            "Electrophysiology",
        ]}
        location="Prestige Clinic, Istanbul, Turkey"
        phone="+90 212 555 0100"
        email="jessica.joan@medprestige.com"
        awardNote="Dr. Joan has been recognised by leading medical institutions for her contributions to cardiovascular research and patient care excellence."
        awards={[
            "Robert L. Nobel Prize for Medical Research",
            "Edison Medical Innovation Award",
            "Canadian Cardiovascular Society Excellence Award",
            "Research in Developmental Cardiology Grant",
        ]}
        skillNote=""
    />
);

export default DoctorProfilePage;
