import React from 'react';

export default function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white shadow rounded-xl p-4 animate-pulse flex flex-col gap-4">
          {/* Image */}
          <div className="w-full h-40 bg-gray-200 rounded-lg" />

          {/* Name */}
          <div className="h-4 w-32 bg-gray-200 rounded" />

          {/* Status + Product Count */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="h-10 w-20 bg-gray-200 rounded-lg" />
            <div className="h-10 w-20 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
