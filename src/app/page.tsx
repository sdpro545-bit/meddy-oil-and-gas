import Hero from "@/components/Hero";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import MissionSection from "@/components/MissionSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyMeddy from "@/components/WhyMeddy";
import QHSEBanner from "@/components/QHSEBanner";
import HowWeWork from "@/components/HowWeWork";
import CareersBanner from "@/components/CareersBanner";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <MissionSection />
      <AboutSection />
      <ServicesSection />
      <WhyMeddy />
      <QHSEBanner />
      <HowWeWork />
      <CareersBanner />
      <ContactSection />
    </>
  );
}
