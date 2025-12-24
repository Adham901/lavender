'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersTableSkeleton() {
  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-md">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm border-b">
            <tr>
              <th className="py-3 px-4">رقم الطلب</th>
              <th className="py-3 px-4">التاريخ</th>
              <th className="py-3 px-4">الإجمالي</th>
              <th className="py-3 px-4">الحالة</th>
              <th className="py-3 px-4">عدد المنتجات</th>
              <th className="py-3 px-4">اسم العميل</th>
              <th className="py-3 px-4">تحديد</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-5 w-5 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
