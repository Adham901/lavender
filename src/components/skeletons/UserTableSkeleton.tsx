import { Skeleton } from '@/components/ui/skeleton';

export default function UserTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" /> {/* عنوان */}
        <Skeleton className="h-10 w-40 rounded-md" /> {/* زرّ إضافة */}
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        {/* Search Skeleton */}
        <Skeleton className="h-10 w-full mb-5" />

        {/* Table Skeleton */}
        <div className="space-y-3">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-100 p-3 rounded-md">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 p-3 border-b items-center">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-16" /> {/* Edit button */}
                <Skeleton className="h-8 w-16" /> {/* Delete button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
