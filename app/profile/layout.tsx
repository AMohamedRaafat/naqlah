import PublicLayoutWrapper from '@/components/layout/public-layout-wrapper';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayoutWrapper>{children}</PublicLayoutWrapper>;
}
