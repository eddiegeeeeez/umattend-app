import ProtectedRoute from '@/components/protected-routes';

export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
