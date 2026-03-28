import React from "react";
import PagesHero from "@/components/PagesHero/PagesHero";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import DoctorsCard from "@/components/DoctorsCard/DoctorsCard";
import DoctorsAnimations from "./DoctorsAnimations";

export const dynamic = 'force-dynamic'

const MeetOurDoctors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
    const doctors = res.ok ? await res.json() : []

    return (
        <main>
            <DoctorsAnimations />
            <PagesHero
                title="Meet Our Doctors"
                subtitle="Board-certified specialists dedicated to delivering exceptional, compassionate care across every discipline."
            />
            <DoctorsCard  doctors={doctors} />
            <ContactCardFooter />
        </main>
    );
};

export default MeetOurDoctors;
