import type { ReactNode } from 'react';
import { ClerkClientProvider } from '@/components/ClerkClientProvider';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { TierBadge } from '@/components/TierBadge';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkClientProvider>
          <div className="fixed left-4 top-4 z-40">
            <TierBadge />
          </div>
          {children}
          <FloatingChatWidget />
        </ClerkClientProvider>
      </body>
    </html>
  );
}
