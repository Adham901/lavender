'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Package, LayoutGrid, Users, Tag, FileText, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navItems = [
  {
    label: 'الطلبات',
    href: '/orders',
    icon: ShoppingBag,
    bgColor: 'bg-[#5a4575]',
  },
  {
    label: 'المنتجات',
    href: '/products',
    icon: Package,
  },
  {
    label: 'التصنيفات',
    href: '/categories',
    icon: LayoutGrid,
  },
  {
    label: 'العملاء',
    href: '/customers',
    icon: Users,
  },
  {
    label: 'الكوبونات والعروضات',
    href: '/coupons',
    icon: Tag,
  },
  {
    label: 'التقارير',
    href: '/reports',
    icon: FileText,
  },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 h-screen w-64 bg-white shadow-lg flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-6 flex justify-center border-b">
        <Link href="/" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-[#5a4575] rounded-full flex items-center justify-center mb-2">
            <Home className="w-6 h-6 text-white" />
          </div>

          <span className="text-xs text-gray-500">لوحة التحكم</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b">
        <div className="relative">
          <Input
            type="text"
            placeholder="بحث"
            className="w-full pr-10 text-right"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation Items */}
      <div dir="ltr" className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-end gap-3 px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors ${
                item.bgColor ? item.bgColor + ' text-white hover:opacity-90' : ''
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>

      {/* Exit Button */}
      <div className="p-4 border-t">
        <Button
          variant="default"
          className="w-full bg-[#5a4575] hover:bg-[#4a3565] text-white gap-2"
        >
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </nav>
  );
}
