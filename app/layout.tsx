import React from 'react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Nav } from '@/components/Nav';

import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Website Template',
  description: 'Starter template for a personal website with projects and blog.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
