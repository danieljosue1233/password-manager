import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './styles/globals.css';
import { Toaster } from '@components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'TarrePassword',
  description: 'Creating a password manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
