"use client";

import { useState } from "react";
import "./services-section.css";

const icons = {
  cardiology: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 42S6 30 6 17a9 9 0 0 1 18 0 9 9 0 0 1 18 0c0 13-18 25-18 25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 24h6l3-6 4 12 3-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  radiology: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  ),
  gynecology: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M24 34v10M20 40h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  injury: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M24 14v10M18 20l6 4 6-4M16 36l8-12 8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  lung: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 10v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 18c-4 0-8 2-10 6s-3 10-1 14c1 2 3 3 5 3h6V18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 18c4 0 8 2 10 6s3 10 1 14c-1 2-3 3-5 3h-6V18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  eye: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
};

const services = [
  { name: "Cardiology", key: "cardiology", description: "Personalized diagnostics and long-term cardiac monitoring programs." },
  { name: "Radiology", key: "radiology", description: "High-resolution imaging with rapid interpretation and specialist follow-up." },
  { name: "Gynecology", key: "gynecology", description: "Preventive and restorative care focused on every stage of women’s health." },
  { name: "Sports Injury", key: "injury", description: "Rehabilitation pathways for safe recovery and performance return." },
  { name: "Lung Diseases", key: "lung", description: "Respiratory screening, treatment planning, and ongoing condition management." },
  { name: "Eye Care", key: "eye", description: "Comprehensive vision assessments with modern corrective solutions." },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className="services-section">
      <div className="services-container">
        <span className="services-eyebrow">What We Offer</span>
        <h2 className="services-title">
          Highly Innovative Technology &amp; Services
        </h2>
        <p className="services-subtitle">
          Comprehensive medical specialties under one roof, each led by board-certified experts.
        </p>

        <div className="services-grid">
          {services.map((service, index) => {
            const active = activeIndex === index;
            return (
              <article
                key={service.name}
                className={`service-card ${active ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                <div className={`service-overlay ${active ? "show" : ""}`}>
                  <p className="service-description">{service.description}</p>
                </div>

                <div className={`service-icon ${active ? "hide" : ""}`}>{icons[service.key]}</div>

                <div className="service-footer">
                  <div className="service-separator" />
                  <div className="service-footer-row">
                    <span className="service-name">{service.name}</span>
                    <svg className={`service-arrow ${active ? "move" : ""}`} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button type="button" className="services-btn">View More</button>
      </div>
    </section>
  );
}
