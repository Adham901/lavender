import React from 'react';

export default function DashboardSkeleton() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6 animate-pulse"
      dir="rtl"
    >
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-300/60 rounded mb-3" />
        <div className="h-4 w-64 bg-gray-300/50 rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-3xl bg-white shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              {/* Icon Skeleton */}
              <div className="w-14 h-14 rounded-2xl bg-gray-200" />
            </div>

            <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-20 bg-gray-300 rounded" />

            {/* Bottom Line */}
            <div className="h-1 bg-gray-200 mt-4 rounded" />
          </div>
        ))}
      </div>

      {/* Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
          <div className="h-6 w-52 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

          <div className="h-80 bg-gray-200 rounded-xl" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Growth Card */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/30 rounded-xl" />
              <div>
                <div className="h-4 w-20 bg-white/40 rounded mb-2" />
                <div className="h-6 w-16 bg-white/60 rounded" />
              </div>
            </div>
            <div className="h-px bg-white/20 my-4" />
            <div className="h-4 w-28 bg-white/40 rounded" />
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl space-y-4">
            <div className="h-6 w-40 bg-gray-300 rounded mb-4" />

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg" />
                  <div>
                    <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
