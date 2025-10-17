import ProtectedRoute from '@/components/protected-routes';

export default function AttendedEventLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute requireAdmin>{children}</ProtectedRoute>;
}
