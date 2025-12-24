// components/CouponsTableSkeleton.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CouponsTableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden animate-pulse">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-purple-50">
            <TableRow>
              {[
                'ID',
                'Code',
                'Type',
                'Value',
                'Min Order',
                'Max Discount',
                'Start Date',
                'Expires',
                'Status',
                'Actions',
              ].map((head, i) => (
                <TableHead
                  key={i}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((_, i) => (
              <TableRow key={i} className="border-b">
                {Array.from({ length: 10 }).map((__, j) => (
                  <TableCell key={j} className="px-4 py-4">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
