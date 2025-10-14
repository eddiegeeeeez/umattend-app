import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-border/40 border-t">
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p>Powered by UMAttend Engineering Team</p>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;