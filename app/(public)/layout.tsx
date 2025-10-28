import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

/**
 * Layout for public pages (home, about, etc.)
 * Includes the main Navbar with navigation links and Footer
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
