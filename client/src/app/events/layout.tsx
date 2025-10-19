import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/protected-routes';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
