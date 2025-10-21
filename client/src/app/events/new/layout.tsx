import ProtectedRoute from '@/components/protected-routes';

export default function NewEventLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute requireAdmin>{children}</ProtectedRoute>;
}
