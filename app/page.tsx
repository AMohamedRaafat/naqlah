import HeroSection from '@/components/home/hero-section';
import PartnersSection from '@/components/home/partners-section';
import ServicesSection from '@/components/home/services-section';
import ContactSection from '@/components/home/contact-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-expo-arabic">
      {/* Hero Section */}
      <HeroSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Form Section */}
      <ContactSection />
    </main>
  );
}
