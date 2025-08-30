'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navigation: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: '📊' },
  { name: 'Data Inventory', href: '/dashboard/data-inventory', icon: '🗄️' },
  { name: 'Consent Management', href: '/dashboard/consent', icon: '✅' },
  { name: 'DSR Automation', href: '/dashboard/dsr', icon: '📨' },
  { name: 'Privacy Policies', href: '/dashboard/policies', icon: '📜' },
  { name: 'Vendors', href: '/dashboard/vendors', icon: '🏢' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-sm h-full flex flex-col">
      <div className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="px-2 py-4 border-t border-gray-200">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="mr-3 text-lg">🚪</span>
          <span>Sign out</span>
        </button>
      </div>
    </nav>
  );
}
