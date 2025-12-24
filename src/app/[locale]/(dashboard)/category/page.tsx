'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
  ListFilter,
  Plus,
  Search,
  Bell,
  UserCircle,
} from 'lucide-react';

const tableData = [
  { id: 1, category: 'بوكيهات الورد', productCount: 32, status: 'active', date: '12 اغسطس 2025' },
  { id: 2, category: 'فازات الورد', productCount: 18, status: 'active', date: '12 اغسطس 2025' },
  { id: 3, category: 'ورد مع شوكولاتة', productCount: 16, status: 'active', date: '12 اغسطس 2025' },
  { id: 4, category: 'مولود جديد', productCount: 8, status: 'active', date: '12 اغسطس 2025' },
  { id: 5, category: 'سلامتك', productCount: 9, status: 'active', date: '12 اغسطس 2025' },
  { id: 6, category: 'زفاف', productCount: 20, status: 'active', date: '12 اغسطس 2025' },
  { id: 7, category: 'أعياد ميلاد', productCount: 4, status: 'inactive', date: '12 اغسطس 2025' },
  { id: 8, category: 'الحب', productCount: 0, status: 'inactive', date: '12 اغسطس 2025' },
];

const statsData = [
  { label: 'إجمالي التصنيفات', value: '8' },
  { label: 'التصنيفات المفعلة', value: '6' },
  { label: 'التصنيفات غير المفعلة', value: '2' },
  { label: 'تصنيفات بدون منتجات', value: '1' },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] p-8 font-cairo" dir="rtl">
      <header dir="ltr" className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              dir="rtl"
              type="text"
              placeholder="بحث عن تصنيف"
              className="bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-[#5a426f]"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="font-bold text-[#5a426f]">مرحباً ، أحمد</p>
            <p className="text-xs text-gray-400">20 DEC 2025</p>
          </div>
          <UserCircle size={40} className="text-[#5a426f]" />
        </div>
      </header>
      {/* Header العنوان العلوي */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#5a426f]">إدارة التصنيفات</h1>
      </div>

      {/* Tabs التبويبات */}
      <div className="flex gap-1 mb-0">
        <div className="bg-[#5a426f] text-white px-10 py-3 rounded-t-2xl font-semibold cursor-pointer">
          التصنيفات
        </div>
      </div>

      {/* Main Container الصندوق الأبيض الرئيسي */}
      <div className="bg-white border border-[#F0F0F0] rounded-b-2xl rounded-tl-2xl p-8 shadow-sm">
        {/* Summary Section ملخص التصنيفات */}
        <section className="mb-12">
          <h2 className="text-[20px] font-bold text-[#5a426f] mb-6">ملخص التصنيفات</h2>
          <div className="grid grid-cols-4 w-full border-b border-[#F5F5F5] pb-8">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col  gap-2">
                <span className="text-[#A3A3A3] text-sm font-medium">{stat.label}</span>
                <span className="text-black text-2xl font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Table Header & Actions العنوان والأزرار */}
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] font-bold text-[#5a426f]">جدول التصنيفات</h2>
          </div>

          <div className="flex gap-3">
            <Button className="bg-[#5a426f] hover:bg-[#4a355a] text-white px-4 py-2 rounded-lg flex gap-2 items-center h-11">
              <Plus size={18} />
              <span>إضافة تصنيف</span>
            </Button>
            <Button
              variant="outline"
              className="border-[#EAEAEA] text-[#ADA7A7] flex gap-4 px-4 h-11"
            >
              <ArrowUpDown size={18} />
              <span>ترتيب التصنيفات</span>
            </Button>
            <Button
              variant="outline"
              className="border-[#EAEAEA] text-[#ADA7A7] flex gap-4 px-4 h-11"
            >
              <ListFilter size={18} />
              <span>فلترة التصنيفات</span>
            </Button>
          </div>
        </div>

        {/* Table الجدول */}
        <div className="overflow-hidden rounded-xl border border-[#F0F0F0]">
          <Table>
            <TableHeader className="bg-[#F1EEF3]">
              <TableRow>
                <TableHead className="text-center text-[#5a426f] font-bold">#</TableHead>
                <TableHead className="text-center text-[#5a426f] font-bold">التصنيف</TableHead>
                <TableHead className="text-center text-[#5a426f] font-bold">عدد المنتجات</TableHead>
                <TableHead className="text-center text-[#5a426f] font-bold">الحالة</TableHead>
                <TableHead className="text-center text-[#5a426f] font-bold">
                  تاريخ الإضافة
                </TableHead>
                <TableHead className="text-center text-[#5a426f] font-bold">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="border-b border-[#F9F9F9]">
                  <TableCell className="text-center font-medium">{row.id}</TableCell>
                  <TableCell className="text-center font-medium">{row.category}</TableCell>
                  <TableCell className="text-center font-medium">{row.productCount}</TableCell>
                  <TableCell className="text-center">
                    {row.status === 'active' ? (
                      <Badge className="bg-[#E8F2E9] text-[#426F43] hover:bg-[#E8F2E9] shadow-none rounded-full px-4 py-1 font-medium">
                        مفعل
                      </Badge>
                    ) : (
                      <Badge className="bg-[#F1F1F1] text-[#898989] hover:bg-[#F1F1F1] shadow-none rounded-full px-4 py-1 font-medium">
                        غير مفعل
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[#555]">{row.date}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-4">
                      <Pencil size={18} className="text-[#5a426f] cursor-pointer" />
                      <Trash2 size={18} className="text-[#5a426f] cursor-pointer" />
                      <Eye size={18} className="text-[#5a426f] cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
