import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DentaHub',
  description:
    'Simplify dental care management with DentaHub. Patients easily schedule appointments and view treatment history. Dental professionals manage patient schedules, track procedures, and streamline practice operations all in one platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'bg-dark-300 min-h-screen antialiased',
          nunito.className
        )}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: '#3e1716',
                color: '#DDA497',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
