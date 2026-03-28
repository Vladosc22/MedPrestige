import Image from "next/image";
import Link from "next/link";
import CheckIcon from "@/components/Icons/CheckIcon";
import "./about-section.css";

const features = [
    "Board-certified specialists across 15+ disciplines",
    "State-of-the-art diagnostics with same-day results",
    "Compassionate, patient-first care philosophy",
];

const AboutSection = () => {
    return (
        <section className="about">
            <div className="about-container">
                {/* Left — Image Grid */}
                <div className="about-images">
                    <div className="about-images-top">
                        <div className="about-img-card">
                            <Image
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=350&fit=crop&crop=center"
                                alt="Doctor examining patient"
                                width={280}
                                height={200}
                                className="about-img"
                                unoptimized
                            />
                        </div>
                        <div className="about-img-card about-img-video">
                            <iframe
                                src="https://www.youtube.com/embed/FfZZ5fBdTWs"
                                title="MedPrestige clinic overview"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="about-images-bottom">
                        <div className="about-img-card about-img-large">
                            <Image
                                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&h=500&fit=crop&crop=center"
                                alt="Medical examination"
                                width={560}
                                height={340}
                                className="about-img"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>

                {/* Right — Text Content */}
                <div className="about-content">
                    <span className="about-eyebrow">About MedPrestige</span>
                    <h2 className="about-title">
                        The Heart and Science <br /> Of Medicine Service
                    </h2>
                    <p className="about-description">
                        For over two decades, MedPrestige has been at the forefront of
                        personalized healthcare — combining the precision of modern medicine
                        with the warmth of genuine human connection. Every patient deserves
                        expert care tailored to their unique needs.
                    </p>

                    <ul className="about-features">
                        {features.map((f) => (
                            <li key={f} className="about-feature-item">
                                <span className="about-feature-icon">
                                    <CheckIcon />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Link href="/about" className="about-btn">
                        Read More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
