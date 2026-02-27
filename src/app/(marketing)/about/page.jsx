import React from 'react'
import PagesHero from '../../../components/PagesHero/PagesHero'
import ContactCardFooter from '@/components/ContactCardFooter/ContactCardFooter'
import DoctorsCard from '@/components/DoctorsCard/DoctorsCard'
import EquipmentIcon from '@/components/Icons/EquipmentIcon'
import SpecialistIcon from '@/components/Icons/SpecialistIcon'
import SchedulingIcon from '@/components/Icons/SchedulingIcon'
import PrivacyIcon from '@/components/Icons/PrivacyIcon'
import './about.css'
import DoctorsSection from '@/components/DoctorsSection/DoctorsSection'

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
        description: 'All our doctors are board-certified with extensive experience in their fields.',
    },
    {
        icon: <SchedulingIcon />,
        title: 'Flexible scheduling',
        description: 'We offer same-day appointments and extended hours to fit your lifestyle.',
    },
    {
        icon: <PrivacyIcon />,
        title: 'Guaranteed privacy',
        description: 'Your personal and medical data is protected with the strictest security measures.',
    },
]

const About = () => {
    return (
        <main>
            {/* Hero */}
            <PagesHero
                title="About Us"
                subtitle="We are committed to delivering exceptional medical care with empathy and professionalism."
            />

            {/* Who we are */}
            <section className="about-who">
                <div className="about-who-image">
                    <img src="/contactdoctor.png" alt="MedPrestige medical team" />
                </div>
                <div className="about-who-content">
                    <span className="about-label">Who we are</span>
                    <h2 className="about-heading">Transforming healthcare in your community</h2>
                    <p className="about-text">
                        MedPrestige is a leading private medical center dedicated to providing the highest quality care to every patient.
                        We believe that exceptional healthcare should be accessible, personal, and compassionate.
                    </p>

                    <h3 className="about-subheading">Innovating for better outcomes</h3>
                    <p className="about-text">
                        Founded in 2014, our clinic has grown from a small practice into a full-service medical center with specialists
                        across multiple disciplines. Our history of innovation drives us to constantly improve the way care is delivered,
                        adopting new technologies and evidence-based treatments.
                    </p>

                    <h3 className="about-subheading">Recognized for quality care</h3>
                    <p className="about-text">
                        Our commitment to excellence has earned MedPrestige a reputation as one of the most trusted private clinics in
                        the region. With a 98% patient satisfaction rate and over 1,200 patients treated, we continue to set the standard
                        for compassionate, high-quality medicine.
                    </p>
                </div>
            </section>

            {/* Our impact */}
            <section className="about-impact">
                <div className="about-impact-content">
                    <span className="about-label">Our impact</span>
                    <h2 className="about-heading">Building a healthier community</h2>
                    <p className="about-text">
                        We think broadly and act with purpose to improve the health of our community. We share our knowledge,
                        support preventive care, and partner with others to create lasting change for a healthier region.
                    </p>

                    <h3 className="about-subheading">Improving health equity</h3>
                    <p className="about-text">
                        We partner with local organizations to expand access to care for underserved populations. Through education
                        programs and personalized treatment plans, we work to ensure that quality healthcare reaches everyone,
                        regardless of their background or circumstances.
                    </p>

                    <h3 className="about-subheading">Committed to prevention</h3>
                    <p className="about-text">
                        We invest in preventive care and patient education to reduce long-term health risks. Our specialists
                        work closely with patients to develop sustainable health habits, catching issues early and reducing
                        the need for more complex treatments down the line.
                    </p>
                </div>
                <div className="about-impact-image">
                    <img src="/contactdoctor.png" alt="MedPrestige community impact" />
                </div>
            </section>

            {/* Statistici */}
            <section className="about-stats">
                <div className="about-stats-grid">
                    {stats.map((stat) => (
                        <div className="about-stat-item" key={stat.label}>
                            <span className="about-stat-value">{stat.value}</span>
                            <span className="about-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Echipa */}
            <DoctorsSection />

            {/* De ce să ne alegi */}
            <section className="about-reasons">
                <div className="about-reasons-inner">
                    <div className="about-section-header">
                        <span className="about-label">Why MedPrestige</span>
                        <h2 className="about-heading">What sets us apart</h2>
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

            {/* Footer card */}
            <ContactCardFooter />
        </main>
    )
}

export default About
