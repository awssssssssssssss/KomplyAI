// Root layout
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'X-Komply-AI | DSGVO Compliance for German SMEs',
  description: 'AI-powered DSGVO compliance tool for German SMEs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white dark:bg-gray-900 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              X-Komply-AI
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a 
                    href="/" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href="/policies" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Policies
                  </a>
                </li>
                <li>
                  <a 
                    href="/compliance" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-700 dark:text-gray-300">
            <p>© {new Date().getFullYear()} X-Komply-AI. DSGVO Compliance Tool for German SMEs.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
