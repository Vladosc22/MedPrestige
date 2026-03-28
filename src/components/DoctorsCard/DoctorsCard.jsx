import React from "react";
import DoctorCard from "@/components/DoctorsCard/DoctorCard";
import "./DoctorsCard.css";

// const doctors = [
//     { id: 1, name: "Dr. Jessica Joan",    specialty: "Nephrology",       image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face", hasSocial: false },
//     { id: 2, name: "Dr. Alexandra Kim",   specialty: "Gastroenterology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face",  hasSocial: true  },
//     { id: 3, name: "Dr. Kimberly Hayes",  specialty: "Neurology",        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face", hasSocial: false },
//     { id: 4, name: "Dr. Bella Carol",     specialty: "Obstetrics",       image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face", hasSocial: true  },
//     { id: 5, name: "Dr. Rebecca Rose",    specialty: "Gynecology",       image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=500&fit=crop&crop=face", hasSocial: false },
//     { id: 6, name: "Dr. Stephanie Sue",   specialty: "Haematology",      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face", hasSocial: true  },
//     { id: 7, name: "Dr. Penelope Morgan", specialty: "Physiotherapy",    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=500&fit=crop&crop=face", hasSocial: false },
//     { id: 8, name: "Dr. Lauren Leah",     specialty: "Oncology",         image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face", hasSocial: true  },
// ];

const DoctorsCard = ({ doctors }) => {
    return (
        <div className="doctors-grid">
            {doctors.map((doctor) => (
                <DoctorCard
                    key={doctor.DoctorId}
                    id={doctor.DoctorId}
                    name={doctor.Name}
                    specialty={doctor.Occupation}
                    image={doctor.Image}
                />
            ))}
        </div>
    );
};

export default DoctorsCard;
