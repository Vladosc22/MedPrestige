import React from 'react'
import PagesHero from '../../../../components/PagesHero/PagesHero'
import ContactCardFooter from '@/components/ContactCardFooter/ContactCardFooter'
import DoctorCard from '@/components/DoctorsCard/DoctorCard'
import ServiceDetailAnimations from './ServiceDetailAnimations'
import '../services.css'

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const servicesData = {
  cardiology: {
    name: 'Cardiology',
    label: 'Heart & Vascular',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=700&h=560&fit=crop&crop=center',
    description: 'Our cardiology department offers comprehensive care for all heart and vascular conditions. From preventive screenings to advanced interventional procedures, our specialists are equipped to diagnose and treat a full spectrum of cardiovascular diseases.',
    extendedDescription: 'We combine cutting-edge technology with a patient-centered approach to deliver the highest standard of cardiac care. Our team works closely with other departments to ensure coordinated, holistic treatment for every patient.',
    procedures: [
      'Electrocardiogram (ECG)', 'Echocardiography', 'Stress Testing',
      'Holter Monitoring', 'Coronary Angiography', 'Cardiac Catheterization',
      'Pacemaker Implantation', 'Arrhythmia Management', 'Heart Failure Treatment',
    ],
    doctors: [
      { id: 1, name: 'Dr. Jessica Joan',  specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face', hasSocial: false },
      { id: 2, name: 'Dr. Alexandra Kim', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face', hasSocial: true  },
    ],
  },
  radiology: {
    name: 'Radiology',
    label: 'Imaging & Diagnostics',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=700&h=560&fit=crop&crop=center',
    description: 'Our radiology unit uses the latest imaging technology including MRI, CT scans, and ultrasound to provide accurate and timely diagnoses.',
    extendedDescription: 'Our state-of-the-art equipment and experienced radiologists ensure that every scan is interpreted with precision. We prioritize fast turnaround times so that your care team can act quickly on results.',
    procedures: [
      'MRI Scan', 'CT Scan', 'Ultrasound',
      'X-Ray', 'Mammography', 'Bone Density Scan',
      'PET Scan', 'Fluoroscopy', 'Interventional Radiology',
    ],
    doctors: [
      { id: 3, name: 'Dr. Kimberly Hayes', specialty: 'Radiology', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face', hasSocial: false },
    ],
  },
  gynecology: {
    name: 'Gynecology',
    label: "Women's Health",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=560&fit=crop&crop=center',
    description: "We provide complete women's health services, from routine gynecological exams to complex reproductive health treatments.",
    extendedDescription: "Our gynecology team is committed to supporting women's health through every life stage. We offer a safe, confidential environment where patients feel heard and respected.",
    procedures: [
      'Annual Gynecological Exam', 'Pap Smear', 'Colposcopy',
      'Pelvic Ultrasound', 'Hysteroscopy', 'Laparoscopy',
      'Contraception Counseling', 'Menopause Management', 'Fertility Assessment',
    ],
    doctors: [
      { id: 4, name: 'Dr. Bella Carol',   specialty: 'Gynecology', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face', hasSocial: true  },
      { id: 5, name: 'Dr. Rebecca Rose',  specialty: 'Gynecology', image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=500&fit=crop&crop=face', hasSocial: false },
    ],
  },
  'sports-injury': {
    name: 'Sports Injury',
    label: 'Orthopedics & Rehabilitation',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=560&fit=crop&crop=center',
    description: 'Our sports medicine team specializes in the prevention, diagnosis, and treatment of injuries related to physical activity.',
    extendedDescription: 'Whether you are recovering from a ligament tear, a fracture, or chronic joint pain, our rehabilitation specialists create personalized recovery plans to get you back to peak performance.',
    procedures: [
      'Musculoskeletal Assessment', 'Physiotherapy', 'Joint Injections',
      'Arthroscopy', 'ACL Reconstruction', 'Fracture Management',
      'Sports Rehabilitation', 'Ultrasound-Guided Therapy', 'Return-to-Sport Programs',
    ],
    doctors: [
      { id: 6, name: 'Dr. Stephanie Sue', specialty: 'Sports Medicine', image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face', hasSocial: true },
    ],
  },
  'lung-diseases': {
    name: 'Lung Diseases',
    label: 'Pulmonology',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700&h=560&fit=crop&crop=center',
    description: 'Our pulmonology department provides expert care for respiratory conditions including asthma, COPD, pneumonia, and sleep disorders.',
    extendedDescription: 'Our pulmonologists work with patients to manage chronic conditions, treat acute illness, and develop long-term strategies for maintaining lung health.',
    procedures: [
      'Spirometry', 'Bronchoscopy', 'Sleep Study (Polysomnography)',
      'Chest X-Ray & CT', 'Allergy Testing', 'Asthma Management',
      'COPD Treatment', 'Pulmonary Rehabilitation', 'Oxygen Therapy',
    ],
    doctors: [
      { id: 7, name: 'Dr. Penelope Morgan', specialty: 'Pulmonology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=500&fit=crop&crop=face', hasSocial: false },
    ],
  },
  'eye-care': {
    name: 'Eye Care',
    label: 'Ophthalmology',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700&h=560&fit=crop&crop=center',
    description: 'Our ophthalmology team offers a full range of eye care services, from routine vision checks to surgical interventions for cataracts, glaucoma, and retinal conditions.',
    extendedDescription: 'Our eye care specialists use the latest diagnostic and surgical technologies to detect and treat conditions early, helping patients maintain healthy vision for life.',
    procedures: [
      'Comprehensive Eye Exam', 'Visual Acuity Testing', 'Glaucoma Screening',
      'Retinal Examination', 'Cataract Surgery', 'LASIK Consultation',
      'Diabetic Eye Care', 'Dry Eye Treatment', 'Contact Lens Fitting',
    ],
    doctors: [
      { id: 8, name: 'Dr. Lauren Leah', specialty: 'Ophthalmology', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face', hasSocial: true },
    ],
  },
}

const ServiceDetail = async ({ params }) => {
  const { serviceID } = await params
  const service = servicesData[serviceID]

  if (!service) {
    return (
      <main>
        <PagesHero title="Service Not Found" subtitle="The service you are looking for does not exist." />
        <ContactCardFooter />
      </main>
    )
  }

  return (
    <main>
      <ServiceDetailAnimations />
      <PagesHero title={service.name} subtitle={service.label} />

      <div className="service-detail">

        {/* ── Intro ── */}
        <div className="service-detail-intro">
          <div className="service-detail-content">
            <span className="service-detail-eyebrow">Overview</span>
            <p className="service-detail-description">{service.description}</p>
            <p className="service-detail-description">{service.extendedDescription}</p>

            <div className="service-highlights">
              <div className="service-highlight-item">
                <span className="service-highlight-value">{service.procedures.length}</span>
                <span className="service-highlight-label">Procedures</span>
              </div>
              <div className="service-highlight-item">
                <span className="service-highlight-value">{service.doctors.length}</span>
                <span className="service-highlight-label">Specialists</span>
              </div>
              <div className="service-highlight-item">
                <span className="service-highlight-value">Same day</span>
                <span className="service-highlight-label">Appointments</span>
              </div>
            </div>
          </div>

          <div className="service-detail-img-wrap">
            <img src={service.image} alt={service.name} />
          </div>
        </div>

        {/* ── Procedures ── */}
        <div className="service-section">
          <span className="service-section-eyebrow">What we offer</span>
          <h2 className="service-section-heading">Procedures &amp; Treatments</h2>
          <div className="service-procedures-grid">
            {service.procedures.map((procedure) => (
              <div className="service-procedure-card" key={procedure}>
                <span className="service-procedure-icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span className="service-procedure-name">{procedure}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Specialists ── */}
        <div className="service-section">
          <span className="service-section-eyebrow">Meet the team</span>
          <h2 className="service-section-heading">Our Specialists</h2>
          <div className="service-doctors-grid">
            {service.doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>

      </div>

      <ContactCardFooter />
    </main>
  )
}

export default ServiceDetail
