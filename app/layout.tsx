import type { Metadata } from 'next';
import { Amplify } from 'aws-amplify';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
