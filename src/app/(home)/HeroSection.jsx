import Link from "next/link";
import "./hero-section.css";

const HeroSection = () => {
    return (
        <section className="hero">
            {/* Background video */}
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=900&fit=crop&crop=center"
            >
                <source src="https://assets.mixkit.co/videos/29933/29933-720.mp4" type="video/mp4" />
            </video>

            {/* Fallback image shown when video is hidden (reduced-motion) */}
            <div className="hero-video-fallback" aria-hidden="true" />

            {/* Overlays */}
            <div className="hero-overlay" aria-hidden="true" />
            <div className="hero-overlay-gradient" aria-hidden="true" />

            {/* Content */}
            <div className="hero-container">
                <div className="hero-content">
                    {/* Trust badge */}
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Trusted by 16,800+ patients worldwide
                    </div>

                    <h1 className="hero-title">
                        Advanced Healthcare <br />
                        <span className="hero-title-accent">Made Personal</span>
                    </h1>

                    <p className="hero-description">
                        World-class specialists, state-of-the-art diagnostics,
                        and compassionate care — all under one roof. Your health
                        journey starts here.
                    </p>

                    {/* CTAs */}
                    <div className="hero-ctas">
                        <Link href="/contact" className="hero-btn-primary">
                            Book Appointment
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="hero-btn-arrow"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                        <Link href="/about" className="hero-btn-secondary">
                            Learn More
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-number">120+</span>
                            <span className="hero-stat-label">Specialists</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="hero-stat-number">16k+</span>
                            <span className="hero-stat-label">Patients Helped</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="hero-stat-number">4.9</span>
                            <span className="hero-stat-label">Average Rating</span>
                        </div>
                    </div>
                </div>

                {/* Floating cards */}
                <div className="hero-floats">
                    {/* Rating card */}
                    <div className="hero-float-card hero-float-rating">
                        <div className="hero-float-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </div>
                        <div>
                            <div className="hero-float-value">4.9 / 5</div>
                            <div className="hero-float-stars">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFD700">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="hero-float-sub">2,847 verified reviews</div>
                        </div>
                    </div>

                    {/* Availability card */}
                    <div className="hero-float-card hero-float-avail">
                        <div className="hero-float-avail-dot" />
                        <div>
                            <div className="hero-float-value">Available Now</div>
                            <div className="hero-float-sub">Next slot: Today, 2:00 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
