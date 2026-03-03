'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="site-nav section-fade">
      <nav className="nav-frame" aria-label="Main navigation">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-mark" aria-hidden="true">
            ◆
          </span>
          <span>Matej's Homepage</span>
        </Link>
        <ul className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
