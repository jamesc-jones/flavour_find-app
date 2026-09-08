import type { ReactNode } from 'react';
import { ClerkClientProvider } from '@/components/ClerkClientProvider';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkClientProvider>{children}</ClerkClientProvider>
      </body>
    </html>
  );
}
