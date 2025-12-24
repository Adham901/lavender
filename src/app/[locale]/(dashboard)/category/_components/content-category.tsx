'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileText, Grid3x3, Package, ShoppingBag, Ticket, Users } from 'lucide-react';

const menuItems = [
  {
    label: 'الطلبات',
    icon: ShoppingBag,
    href: '/orders',
  },
  {
    label: 'المنتجات',
    icon: Package,
    href: '/products',
  },
  {
    label: 'التصنيفات',
    icon: Grid3x3,
    href: '/categories',
  },
  {
    label: 'العملاء',
    icon: Users,
    href: '/customers',
  },
  {
    label: 'الكوبونات والخصومات',
    icon: Ticket,
    href: '/coupons',
  },
  {
    label: 'التقارير',
    icon: FileText,
    href: '/reports',
  },
];

const ContentSection = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-full max-w-[301px] items-start gap-4">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={index} href={item.href} className="w-full">
            <Button
              variant="ghost"
              className={`relative w-full h-[52px] rounded-lg justify-start px-0
                hover:bg-[#623f7f] hover:text-white
                ${isActive ? 'bg-[#623f7f] text-white' : 'bg-white text-[#898989]'}`}
            >
              <span className="absolute top-[calc(50%-15px)] right-[14.60%] font-normal text-base [direction:rtl]">
                {item.label}
              </span>
              <Icon className="absolute top-[calc(50%-12px)] left-[238px] w-6 h-6" />
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default ContentSection;
