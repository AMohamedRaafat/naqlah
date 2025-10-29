import PublicLayoutWrapper from '@/components/layout/public-layout-wrapper';
import HeroSection from '@/components/home/hero-section';
import PartnersSection from '@/components/home/partners-section';
import ServicesSection from '@/components/home/services-section';
import ContactSection from '@/components/home/contact-section';
import BannerSection from '@/components/home/banner-section';

export default function Home() {
  return (
    <PublicLayoutWrapper>
      <main className="min-h-screen bg-white font-expo-arabic">
        {/* Hero Section */}
        <HeroSection />

        {/* Partners Section */}
        <PartnersSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Contact Form Section */}
        <ContactSection />

        {/* Banner Section */}
        <BannerSection />
      </main>
    </PublicLayoutWrapper>
  );
}
