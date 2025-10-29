import AppLayoutWrapper from '@/components/layout/app-layout-wrapper';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>;
}
