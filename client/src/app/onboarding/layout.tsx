import ProtectedRoute from '@/components/protected-routes';

export default function OnboardingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
