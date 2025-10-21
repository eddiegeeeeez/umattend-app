import ProtectedRoute from '@/components/protected-routes';

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
