import React from 'react'
import PagesHero from '../../../../components/PagesHero/PagesHero'
import ContactCardFooter from '@/components/ContactCardFooter/ContactCardFooter'
import DoctorCard from '@/components/DoctorsCard/DoctorCard'
import ServiceDetailAnimations from './ServiceDetailAnimations'
import CheckIcon from '@/components/Icons/CheckIcon'
import '../services.css'


export const dynamic = 'force-dynamic'

const ServiceDetail = async ({ params }) => {
  const { serviceID } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceID}`)
  if (!res.ok) {
    return (
      <main>
        <PagesHero title="Service Not Found" subtitle="The service you are looking for does not exist." />
        <ContactCardFooter />
      </main>
    )
  }

  const data = await res.json()

  const doctorsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceID}/doctors`)
  const doctorsData = doctorsRes.ok ? await doctorsRes.json() : []

  const service = {
    name: data.Name,
    label: data.Description,
    image: data.Image,
    description: data.Description,
    extendedDescription: '',
    procedures: [],
    doctors: doctorsData.map(d => ({
      id: d.DoctorId,
      name: d.Name,
      specialty: d.Occupation,
      image: d.Image,
    })),
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
