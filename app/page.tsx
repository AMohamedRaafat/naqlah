import HeroSection from '@/components/home/hero-section';
import PartnersSection from '@/components/home/partners-section';
import ServicesSection from '@/components/home/services-section';
import AboutSection from '@/components/home/about-section';
import ContactSection from '@/components/home/contact-section';
import NewsletterSection from '@/components/home/newsletter-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-expo-arabic">
      {/* Hero Section */}
      <HeroSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Form Section */}
      <ContactSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
