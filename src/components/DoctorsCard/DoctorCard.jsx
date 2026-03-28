import React from "react";
import Link from "next/link";
import "./DoctorCard.css";

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
