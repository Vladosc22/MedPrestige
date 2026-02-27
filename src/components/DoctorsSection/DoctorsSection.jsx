import DoctorsCard from '../DoctorsCard/DoctorsCard'
import './DoctorsSection.css'

const DoctorsSection = () => {
    return (
        <section className="about-team">
            <div className="about-section-header">
                <span className="about-label">Our team</span>
                <h2 className="about-heading">Meet our specialists</h2>
                <p className="about-text about-text--centered">
                    Our doctors are experts in their fields, dedicated to providing the best possible care.
                </p>
            </div>
            <DoctorsCard />
        </section>
    )
}

export default DoctorsSection