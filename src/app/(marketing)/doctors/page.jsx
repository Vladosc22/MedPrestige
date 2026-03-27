import React from "react";
import PagesHero from "@/components/PagesHero/PagesHero";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import DoctorsCard from "@/components/DoctorsCard/DoctorsCard";
import DoctorsAnimations from "./DoctorsAnimations";

const MeetOurDoctors = () => {
    return (
        <main>
            <DoctorsAnimations />
            <PagesHero
                title="Meet Our Doctors"
                subtitle="Board-certified specialists dedicated to delivering exceptional, compassionate care across every discipline."
            />
            <DoctorsCard />
            <ContactCardFooter />
        </main>
    );
};

export default MeetOurDoctors;
