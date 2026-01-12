import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import AmplifyProvider from './Amplifyprovider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ava tecnologia',
  description: 'Tecnologia a credito sin cuota inicial.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <body className="font-sans antialiased flex flex-col min-h-screen bg-white">
        <AmplifyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AmplifyProvider>
      </body>
    </html>
  );
}
