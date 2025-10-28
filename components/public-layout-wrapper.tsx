import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

/**
 * Layout wrapper for public pages (home, etc.)
 * Includes the main Navbar with navigation links and Footer
 */
export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}

