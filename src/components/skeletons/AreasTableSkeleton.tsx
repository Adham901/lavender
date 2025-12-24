'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function AreasTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gradient-to-r from-purple-50 to-purple-100/50 hover:from-purple-50 hover:to-purple-100/50 border-b-2 border-purple-200">
          <TableHead className="text-right py-4">
            <Skeleton className="h-5 w-24 rounded-md" />
          </TableHead>
          <TableHead className="text-right py-4">
            <Skeleton className="h-5 w-28 rounded-md" />
          </TableHead>
          <TableHead className="text-right py-4">
            <Skeleton className="h-5 w-20 rounded-md" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRow key={i} className="border-b border-gray-100">
            {/* المنطقة */}
            <TableCell className="py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-5 w-32 rounded-md" />
              </div>
            </TableCell>

            {/* رسوم التوصيل */}
            <TableCell className="py-4">
              <Skeleton className="h-10 w-24 rounded-lg" />
            </TableCell>

            {/* الإجراءات */}
            <TableCell className="py-4">
              <div className="flex justify-end gap-2">
                <Skeleton className="h-10 w-20 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
