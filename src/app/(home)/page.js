import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./333/ServicesSection";
import SupportGroupsSection from "./333/SupportGroupsSection";
import ContactCardFooter from "@/components/ContactCardFooter/ContactCardFooter";
import DoctorsSection from "@/components/DoctorsSection/DoctorsSection";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <SupportGroupsSection />
            <DoctorsSection />
            <ContactCardFooter />
        </main>
    );
}