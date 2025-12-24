'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsTableSkeleton() {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-right">
            <th className="p-3 border">معرّف المنتج</th>
            <th className="p-3 border">صورة المنتج</th>
            <th className="p-3 border">المنتج</th>
            <th className="p-3 border">السعر</th>
            <th className="p-3 border">الكمية</th>
            <th className="p-3 border">الحالة</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-3 border">
                <Skeleton className="h-4 w-16 mx-auto" />
              </td>

              <td className="p-3 border">
                <Skeleton className="h-16 w-16 mx-auto rounded-lg" />
              </td>

              <td className="p-3 border">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </td>

              <td className="p-3 border">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>

              <td className="p-3 border">
                <Skeleton className="h-4 w-10 mx-auto" />
              </td>

              <td className="p-3 border">
                <Skeleton className="h-4 w-16 mx-auto" />
              </td>

              <td className="p-3 border">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-8 w-16 rounded-lg" />
                  <Skeleton className="h-8 w-14 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
