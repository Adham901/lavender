'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WelcomeDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="w-full max-w-xl">
        <Card className="shadow-lg rounded-2xl border-none bg-white/80 backdrop-blur">
          <CardContent className="p-10 text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 animate-fade-up delay-200">
              أهلاً بك في
            </h1>

            <h2 className="text-4xl font-extrabold text-purple-700 animate-fade-up delay-400">
              نور الصباح
            </h2>

            <p className="text-gray-700 text-lg animate-fade-up delay-600">Dashboard</p>

            <div className="animate-fade-in delay-800">
              <Link href="/main">
                <Button className="px-10 py-6 text-lg rounded-2xl shadow bg-purple-700 hover:bg-purple-800 transition-all">
                  دخول إلى لوحة التحكم
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .animate-fade-up {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 600ms forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 700ms forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.35s;
        }
        .delay-600 {
          animation-delay: 0.55s;
        }
        .delay-800 {
          animation-delay: 0.75s;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
