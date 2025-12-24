'use client';

import React, { useState } from 'react';
import { Search, Package, TrendingUp, Truck, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OrderStatus =
  | 'تم التسليم'
  | 'قيد التحضير'
  | 'قيد التنفيذ'
  | 'قيد الانتظار'
  | 'مجدول'
  | 'ملغي'
  | 'في الطريق';

interface Order {
  id: string;
  status: OrderStatus;
  customerName: string;
  date: string;
  time: string;
  total: number;
}

const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    'تم التسليم': 'bg-green-100 text-green-700',
    'قيد التحضير': 'bg-yellow-100 text-yellow-700',
    'قيد التنفيذ': 'bg-orange-100 text-orange-700',
    'قيد الانتظار': 'bg-gray-100 text-gray-700',
    مجدول: 'bg-blue-100 text-blue-700',
    ملغي: 'bg-red-100 text-red-700',
    'في الطريق': 'bg-purple-100 text-purple-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const OrdersManagement: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: '#123456',
      status: 'تم التسليم',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 125,
    },
    {
      id: '#123456',
      status: 'قيد التحضير',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 895,
    },
    {
      id: '#123456',
      status: 'قيد التنفيذ',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 214,
    },
    {
      id: '#123456',
      status: 'تم التسليم',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 264,
    },
    {
      id: '#123456',
      status: 'قيد الانتظار',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 142,
    },
    {
      id: '#123456',
      status: 'مجدول',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 325,
    },
    {
      id: '#123456',
      status: 'ملغي',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 325,
    },
    {
      id: '#123456',
      status: 'في الطريق',
      customerName: 'محمد أحمد',
      date: '12 ديسمبر 2025',
      time: '12:23 pm',
      total: 125,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div dir="ltr">
          <h1 className=" text-3xl font-bold text-gray-900">مرحباً أحمد</h1>
          <p className="text-gray-500 text-sm mt-1">20 DEC 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell size={20} />
          </Button>
          {/* Search */}
          <div className="relative ">
            <input
              type="text"
              placeholder="بحث عن طلب"
              className="w-80 pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">طلبات تم توصيلها</p>
              <p className="text-3xl font-bold text-gray-900">32</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Truck className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">إجمالي مبيعات اليوم</p>
              <p className="text-3xl font-bold text-gray-900">ج 1023.85</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">طلبات جديدة</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">الطلبات</h2>
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span>مقارنة الطلبات</span>
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">رقم الطلب</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">
                تاريخ الطلب
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">
                توقيت الطلب
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">اسم العميل</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">الإجمالي</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500">حالة الطلب</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.time}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">ج {order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;
