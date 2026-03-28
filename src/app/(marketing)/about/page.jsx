import React from 'react'
import PagesHero from '../../../components/PagesHero/PagesHero'
import ContactCardFooter from '@/components/ContactCardFooter/ContactCardFooter'
import EquipmentIcon from '@/components/Icons/EquipmentIcon'
import SpecialistIcon from '@/components/Icons/SpecialistIcon'
import SchedulingIcon from '@/components/Icons/SchedulingIcon'
import PrivacyIcon from '@/components/Icons/PrivacyIcon'
import CheckIcon from '@/components/Icons/CheckIcon'
import './about.css'
import DoctorsSection from '@/components/DoctorsSection/DoctorsSection'
import Link from 'next/link'
import AboutAnimations from './AboutAnimations'

const stats = [
    { value: '1200+', label: 'Patients treated' },
    { value: '15+', label: 'Specialized doctors' },
    { value: '10', label: 'Years of experience' },
    { value: '98%', label: 'Satisfaction rate' },
]

const reasons = [
    {
        icon: <EquipmentIcon />,
        title: 'Modern equipment',
        description: 'Our clinic is equipped with state-of-the-art medical technology for precise diagnosis and treatment.',
    },
    {
        icon: <SpecialistIcon />,
        title: 'Certified specialists',
        description: 'All our doctors are board-certified with extensive experience in their respective fields.',
    },
    {
        icon: <SchedulingIcon />,
        title: 'Flexible scheduling',
        description: 'We offer same-day appointments and extended hours to fit your busy lifestyle.',
    },
    {
        icon: <PrivacyIcon />,
        title: 'Guaranteed privacy',
        description: 'Your personal and medical data is protected with the strictest security measures.',
    },
]

export const dynamic = 'force-dynamic'

const About = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
    const doctors = res.ok ? await res.json() : []
    return (
        <main>
            <AboutAnimations />
            {/* Hero */}
            <PagesHero
                title="About Us"
                subtitle="We are committed to delivering exceptional medical care with empathy, innovation, and professionalism."
            />

            {/* ── Who we are ── */}
            <section className="about-who">
                <div className="about-who-visual">
                    <div className="about-who-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=640&fit=crop&crop=center"
                            alt="MedPrestige medical team"
                        />
                    </div>
                    <div className="about-who-badge">
                        <span className="about-who-badge-year">2014</span>
                        <span className="about-who-badge-label">Year Founded</span>
                    </div>
                </div>

                <div className="about-who-content">
                    <span className="about-eyebrow">Who we are</span>
                    <h2 className="about-heading">Transforming healthcare in your community</h2>
                    <p className="about-text">
                        MedPrestige is a leading private medical center dedicated to providing the highest
                        quality care to every patient. We believe that exceptional healthcare should be
                        accessible, personal, and compassionate — from your first visit to ongoing care.
                    </p>
                    <p className="about-text">
                        Founded in 2014, our clinic has grown from a small practice into a full-service
                        medical center with specialists across multiple disciplines, continuously adopting
                        new technologies and evidence-based treatments.
                    </p>

                    <ul className="about-feature-list">
                        <li className="about-feature-item">
                            <span className="about-feature-check"><CheckIcon /></span>
                            Board-certified specialists across multiple disciplines
                        </li>
                        <li className="about-feature-item">
                            <span className="about-feature-check"><CheckIcon /></span>
                            State-of-the-art diagnostics and treatment technology
                        </li>
                        <li className="about-feature-item">
                            <span className="about-feature-check"><CheckIcon /></span>
                            98% patient satisfaction consistently since opening
                        </li>
                    </ul>

                    <Link href="/contact" className="about-cta">
                        Book an appointment
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </section>

            {/* ── Our impact ── */}
            <section className="about-impact-section">
                <div className="about-impact">
                    <div className="about-impact-content">
                        <span className="about-eyebrow">Our impact</span>
                        <h2 className="about-heading">Building a healthier community</h2>
                        <p className="about-text">
                            We think broadly and act with purpose to improve the health of our community.
                            We share our knowledge, support preventive care, and partner with others to
                            create lasting change across the region.
                        </p>

                        <div className="about-impact-items">
                            <div className="about-impact-item">
                                <span className="about-impact-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </span>
                                <div>
                                    <strong>Health equity</strong>
                                    <p>Partnering with local organisations to expand access to care for underserved populations.</p>
                                </div>
                            </div>

                            <div className="about-impact-item">
                                <span className="about-impact-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                </span>
                                <div>
                                    <strong>Preventive care</strong>
                                    <p>Investing in education and early intervention to reduce long-term health risks.</p>
                                </div>
                            </div>

                            <div className="about-impact-item">
                                <span className="about-impact-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                                </span>
                                <div>
                                    <strong>Continuous innovation</strong>
                                    <p>Adopting evidence-based treatments and technology to improve patient outcomes.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-impact-visual">
                        <div className="about-impact-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=640&fit=crop&crop=center"
                                alt="MedPrestige community impact"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="about-stats">
                <div className="about-stats-inner">
                    <div className="about-stats-header">
                        <span className="about-eyebrow about-eyebrow--light">By the numbers</span>
                        <h2 className="about-stats-title">A decade of trusted care</h2>
                    </div>
                    <div className="about-stats-grid">
                        {stats.map((stat) => (
                            <div className="about-stat-item" key={stat.label}>
                                <span className="about-stat-value">{stat.value}</span>
                                <span className="about-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <DoctorsSection doctors={doctors} />

            {/* ── Why MedPrestige ── */}
            <section className="about-reasons">
                <div className="about-reasons-inner">
                    <div className="about-section-header">
                        <span className="about-eyebrow">Why MedPrestige</span>
                        <h2 className="about-heading">What sets us apart</h2>
                        <p className="about-text about-text--centered">
                            We combine clinical excellence with genuine compassion to deliver an experience
                            that goes beyond a typical clinic visit.
                        </p>
                    </div>
                    <div className="about-reasons-grid">
                        {reasons.map((reason) => (
                            <div className="about-reason-card" key={reason.title}>
                                <div className="about-reason-icon">{reason.icon}</div>
                                <h3 className="about-reason-title">{reason.title}</h3>
                                <p className="about-reason-text">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer CTA ── */}
            <ContactCardFooter />
        </main>
    )
}

export default About
