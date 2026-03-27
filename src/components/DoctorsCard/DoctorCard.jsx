import React from "react";
import Link from "next/link";
import "./DoctorCard.css";

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterXIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const socials = [
    { label: "LinkedIn",   Icon: LinkedInIcon  },
    { label: "Facebook",   Icon: FacebookIcon  },
    { label: "Twitter / X", Icon: TwitterXIcon },
];

const DoctorCard = ({ id, name, specialty, image, hasSocial = false }) => {
    return (
        <article className="doctor-card">
            {/* Image */}
            <Link href={`/doctors/${id}`} className="doctor-card__img-link" aria-label={`View profile of ${name}`} tabIndex={-1}>
                <div className="doctor-card__figure">
                    <img
                        src={image}
                        alt={`Portrait of ${name}`}
                        className="doctor-card__img"
                    />
                    <div className="doctor-card__overlay" aria-hidden="true">
                        <span className="doctor-card__view-btn">View Profile →</span>
                    </div>
                </div>
            </Link>

            {/* Body */}
            <div className="doctor-card__body">
                <Link href={`/doctors/${id}`} className="doctor-card__name-link">
                    <h3 className="doctor-card__name">{name}</h3>
                </Link>
                <p className="doctor-card__specialty">{specialty}</p>

                {/* {hasSocial && (
                    <ul className="doctor-card__socials">
                        {socials.map(({ label, Icon }) => (
                            <li key={label}>
                                <a
                                    href="#"
                                    className="doctor-card__social-btn"
                                    aria-label={`${name} on ${label}`}
                                >
                                    <Icon />
                                </a>
                            </li>
                        ))}
                    </ul>
                )} */}
            </div>
        </article>
    );
};

export default DoctorCard;
