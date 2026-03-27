import React from 'react'
import Link from 'next/link'
import PagesHero from '../../../components/PagesHero/PagesHero'
import ContactCardFooter from '@/components/ContactCardFooter/ContactCardFooter'
import ServicesListAnimations from './ServicesListAnimations'
import './services.css'

const services = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    label: 'Heart & Vascular',
    description: 'Our cardiology department offers comprehensive care for all heart and vascular conditions. From preventive screenings to advanced interventional procedures, our specialists are equipped to diagnose and treat a full spectrum of cardiovascular diseases.',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 42S6 30 6 17a9 9 0 0 1 18 0 9 9 0 0 1 18 0c0 13-18 25-18 25Z" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 24h6l3-6 4 12 3-6h6" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'radiology',
    name: 'Radiology',
    label: 'Imaging & Diagnostics',
    description: 'Our radiology unit uses the latest imaging technology including MRI, CT scans, and ultrasound to provide accurate and timely diagnoses. We support all clinical departments with high-quality imaging and expert radiological interpretation.',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" stroke="#2F73F2" strokeWidth="2"/>
        <circle cx="24" cy="24" r="10" stroke="#2F73F2" strokeWidth="2"/>
        <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="#2F73F2"/>
      </svg>
    ),
  },
  {
    id: 'gynecology',
    name: 'Gynecology',
    label: "Women's Health",
    description: "We provide complete women's health services, from routine gynecological exams to complex reproductive health treatments. Our team of experienced specialists offers compassionate, personalized care at every stage of a woman's life.",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="14" stroke="#2F73F2" strokeWidth="2"/>
        <circle cx="24" cy="20" r="8" stroke="#2F73F2" strokeWidth="2"/>
        <path d="M24 34v10M20 40h8" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sports-injury',
    name: 'Sports Injury',
    label: 'Orthopedics & Rehabilitation',
    description: 'Our sports medicine team specializes in the prevention, diagnosis, and treatment of injuries related to physical activity. Whether you are a professional athlete or a weekend enthusiast, we help you recover faster and perform better.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="8" r="4" stroke="#2F73F2" strokeWidth="2"/>
        <path d="M24 14v10M18 20l6 4 6-4M16 36l8-12 8 12" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 30h8" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 16l4 4M36 16l-4 4" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'lung-diseases',
    name: 'Lung Diseases',
    label: 'Pulmonology',
    description: 'Our pulmonology department provides expert care for respiratory conditions including asthma, COPD, pneumonia, and sleep disorders. We use advanced diagnostic tools and evidence-based treatments to improve your breathing and quality of life.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 10v16" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 18c-4 0-8 2-10 6s-3 10-1 14c1 2 3 3 5 3h6V18Z" stroke="#2F73F2" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24 18c4 0 8 2 10 6s3 10 1 14c-1 2-3 3-5 3h-6V18Z" stroke="#2F73F2" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M18 28h4M26 28h4M20 34h3M25 34h3" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'eye-care',
    name: 'Eye Care',
    label: 'Ophthalmology',
    description: 'Our ophthalmology team offers a full range of eye care services, from routine vision checks to surgical interventions for cataracts, glaucoma, and retinal conditions. We are committed to preserving and improving your vision at every age.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700&h=560&fit=crop&crop=center',
    icon: (
      <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24Z" stroke="#2F73F2" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="6" stroke="#2F73F2" strokeWidth="2"/>
        <circle cx="24" cy="24" r="2" fill="#2F73F2"/>
        <path d="M24 10V6M18 11l-1-3M30 11l1-3M14 14l-2-2M34 14l2-2" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const Services = () => {
  return (
    <main>
      <ServicesListAnimations />
      <PagesHero
        title="Our Services"
        subtitle="Specialized medical care across six disciplines — delivered by board-certified specialists with the latest technology."
      />

      <div className="services-list">
        {services.map((service, index) => (
          <div
            className={`service-row${index % 2 !== 0 ? ' service-row--reverse' : ''}`}
            key={service.id}
          >
            {/* Visual */}
            <div className="service-row-visual">
              <div className="service-row-img-wrap">
                <img src={service.image} alt={service.name} />
              </div>
              <div className="service-row-icon-badge" aria-hidden="true">
                {service.icon}
              </div>
            </div>

            {/* Content */}
            <div className="service-row-content">
              <span className="service-row-number">0{index + 1}</span>
              <span className="service-row-label">{service.label}</span>
              <h2 className="service-row-title">{service.name}</h2>
              <p className="service-row-description">{service.description}</p>
              <Link href={`/services/${service.id}`} className="service-row-link">
                Learn more
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ContactCardFooter />
    </main>
  )
}

export default Services
