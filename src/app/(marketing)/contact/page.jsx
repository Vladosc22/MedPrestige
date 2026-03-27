import React from 'react'
import "./Contact.css";
import ContactAnimations from './ContactAnimations';
import ContactConsultationCard from '@/features/contact/ContactConsultationCart/ContactConsultationCard';
import PagesHero from '@/components/PagesHero/PagesHero';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import EmailIcon from '@/components/Icons/EmailIcon';
import CareersIcon from '@/components/Icons/CareersIcon';
import PhoneEmailIcon from '@/components/Icons/PhoneEmailIcon';

const Contact = () => {
  return (
    <main>
      <ContactAnimations />
      {/* Hero */}
      <PagesHero
        title="Get in Touch"
        subtitle="We're here to help. Reach out for appointments, general inquiries, or career opportunities."
      />

      {/* Contact info cards */}
      <section className="contact-info-section">
        <div className="contact-info-container">
          <InfoCard
            title="Email Us"
            text="Drop us a line and we'll respond as soon as possible — usually within one business day."
            linkText="Leave a message"
            href="/contact"
            icon={<EmailIcon />}
          />

          <InfoCard
            title="Call Us"
            text={<>+90 212 555 0100<br />Mon–Fri 08:00–20:00, Sat 09:00–17:00</>}
            linkText="Call the clinic"
            href="tel:+902125550100"
            icon={<PhoneEmailIcon />}
          />

          <InfoCard
            title="Careers"
            text="Join our team of specialists. We're always looking for talented healthcare professionals."
            linkText="Send an application"
            href="/careers"
            icon={<CareersIcon />}
          />
        </div>
      </section>

      {/* Map */}
      <section className="map-section" aria-label="Clinic location">
        <div className="map-container">
          <div className="map-header">
            <span className="map-eyebrow">Find Us</span>
            <h2 className="map-title">Prestige Clinic, Istanbul</h2>
            <p className="map-subtitle">Conveniently located in the heart of the medical district.</p>
          </div>
          <div className="map-frame-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.004883084026!2d28.80674491186229!3d41.00326631961358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f85b0c2b62b%3A0x3b3cb2d2b535a6a6!2sPrestige%20Clinic!5e0!3m2!1sro!2s!4v1771162792955!5m2!1sro!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prestige Clinic location"
            />
          </div>
        </div>
      </section>

      {/* Book appointment */}
      <section className="book-section">
        <div className="book-container">

          {/* Left — clinic info */}
          <div className="clinic-info">
            <span className="clinic-info__eyebrow">Book an Appointment</span>
            <h2 className="clinic-info__title">Visit Our Clinic</h2>
            <p className="clinic-info__lead">
              Fill in the form and one of our coordinators will confirm your appointment within 24 hours.
            </p>

            <ul className="clinic-info__list">
              <li className="clinic-info__item">
                <span className="clinic-info__icon-wrap" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <strong>Address</strong>
                  <p>Bağcılar Meydan, Prestige Clinic<br />34200 Istanbul, Turkey</p>
                </div>
              </li>

              <li className="clinic-info__item">
                <span className="clinic-info__icon-wrap" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <div>
                  <strong>Opening Hours</strong>
                  <p>Mon – Fri: 08:00 – 20:00<br />Saturday: 09:00 – 17:00<br />Sunday: Closed</p>
                </div>
              </li>

              <li className="clinic-info__item">
                <span className="clinic-info__icon-wrap" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17v-.08z"/></svg>
                </span>
                <div>
                  <strong>Phone</strong>
                  <p>+90 212 555 0100</p>
                </div>
              </li>
            </ul>

            <div className="clinic-info__badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Same-day appointments often available
            </div>
          </div>

          {/* Right — form */}
          <div className="book-form-wrap">
            <ContactConsultationCard />
          </div>

        </div>
      </section>
    </main>
  )
}

export default Contact
