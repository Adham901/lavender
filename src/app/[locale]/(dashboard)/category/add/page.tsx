'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ChevronDown, UserCircle } from 'lucide-react';

export default function AddCategoryPage() {
  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-8" dir="rtl">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3 text-right">
          <UserCircle size={40} className="text-[#5a426f]" />
          <div>
            <p className="font-bold text-[#5a426f]">مرحباً ، أحمد</p>
            <p dir="ltr" className="text-xs text-gray-400">
              20 DEC 2025
            </p>
          </div>
        </div>
      </header>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="
    w-[554px]
    h-[60px]
    text-[32px]
    font-semibold
         font-['Cairo']
    leading-[100%]
    tracking-[0]
    text-right
    text-[#898989]
    opacity-100
  "
        >
          إدارة التصنيفات والمقالات{' '}
          <span
            className="
      text-[32px]
      font-semibold
    
      leading-[100%]
      tracking-[0]
      text-[#5A426F]
      text-right
    "
          >
            / إضافة تصنيف
          </span>
        </h1>

        <Button
          variant="secondary"
          className="
    w-[161px]
    h-[52px]
    flex items-center justify-center gap-2
    bg-[#5A426F]
    text-white
    hover:bg-[#5a3f7a]
    opacity-100
  "
        >
          الرجوع للتصنيفات
          <ArrowLeft size={16} />
        </Button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl  ">
        <h2
          className="
    w-[144px]
    h-[45px]
    text-[24px]
    font-semibold
    font-['Cairo']
    leading-[100%]
    tracking-[0]
    text-right
    text-[#5a426f]
    opacity-100
  "
        >
          بيانات التصنيف
        </h2>

        {/* Form */}
        <div
          className=" w-full
           max-w-[1366px]
           min-h-[234px] p-9  rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 border border-[#583F6C1A]"
        >
          {/* اسم التصنيف */}
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm text-gray-600">اسم التصنيف</label>
            <Input
              placeholder="أدخل اسم التصنيف"
              className="
    w-[429.2357px]
    h-[52px]
    rounded-[8px]
    bg-[#5A426F1A]
    border-none
    focus-visible:ring-0
     pr-[71px]
    pl-[200px]
    py-[7.5px]
     placeholder:text-center
    placeholder:text-gray-400
  "
            />
          </div>

          {/* حالة التصنيف */}
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm text-gray-600">حالة التصنيف</label>
            <Select defaultValue="inactive">
              <SelectTrigger
                dir="rtl"
                className="
      relative
      bg-[#5A426F1A]
      border-none
      focus:ring-0
      focus-visible:ring-0
      w-[429px]
      h-[52px]
      rounded-[8px]
       pr-[71px]
      pl-[71px]
      py-[7.5px]

      text-center
      text-gray-400
      
    "
              >
                {/* السهم على الشمال */}

                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">مفعل</SelectItem>
                <SelectItem value="inactive">غير مفعل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div
          dir="ltr"
          className="
    flex
    justify-between
    items-center
    mt-10
    w-full
    max-w-[1366px]
    h-[86px]
    opacity-100
  "
        >
          <Button
            variant="outline"
            className="
            mr-8
      flex-1
      h-[64px]
      bg-[#f3f1f4]
      text-[#5a426f]
      text-lg
      font-medium
      rounded-lg
      border-none
      hover:bg-[#ebe8ed]
    "
          >
            إلغاء
          </Button>

          {/* زر حفظ */}
          <Button
            className="
       flex-1
      h-[64px]
      bg-[#5a426f]
      hover:bg-[#4a355c]
      text-white
      text-lg
      font-medium
      rounded-lg
    "
          >
            حفظ
          </Button>
        </div>
      </div>
    </div>
  );
}
