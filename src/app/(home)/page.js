import HeroSection from "./HeroSection";
import HomeAnimations from "./HomeAnimations";
import AboutSection from "./AboutSection";
import ServicesSection from "./sections/ServicesSection";
import SupportGroupsSection from "./sections/SupportGroupsSection";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import DoctorsSection from "@/components/DoctorsSection/DoctorsSection";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
    const doctors = res.ok ? await res.json() : []

    return (
        <main>
            <HomeAnimations />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <SupportGroupsSection />
            <DoctorsSection doctors={doctors} />
            <ContactCardFooter />
        </main>
    );
}
