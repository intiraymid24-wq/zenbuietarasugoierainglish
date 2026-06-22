'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',           icon: '🏠', label: 'ホーム' },
  { href: '/categories', icon: '📚', label: 'カテゴリ' },
  { href: '/review',     icon: '🔁', label: '復習' },
  { href: '/history',    icon: '📊', label: '履歴' },
  { href: '/settings',   icon: '⚙️', label: '設定' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex flex-col items-center justify-center py-2 px-3 min-w-[60px]',
                'transition-colors duration-150',
                isActive
                  ? 'text-indigo-600'
                  : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              <span className="text-2xl leading-none">{icon}</span>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
