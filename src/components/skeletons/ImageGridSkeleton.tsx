import { Skeleton } from '@/components/ui/skeleton';

export default function SliderCardSkeleton() {
  return (
    <div className="p-5 border-purple-200 rounded-xl shadow relative">
      {/* Title */}
      <Skeleton className="h-6 w-1/2 mb-3 rounded-md" />

      {/* Images Grid */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-24 rounded-xl border border-purple-300" />
        ))}
      </div>

      {/* Status */}
      <Skeleton className="h-4 w-24 mt-2 rounded-md" />
    </div>
  );
}
