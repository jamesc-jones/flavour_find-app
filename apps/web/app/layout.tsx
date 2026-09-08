import type { ReactNode } from 'react';
import { ClerkClientProvider } from '@/components/ClerkClientProvider';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkClientProvider>
          {children}
          <FloatingChatWidget />
        </ClerkClientProvider>
      </body>
    </html>
  );
}
