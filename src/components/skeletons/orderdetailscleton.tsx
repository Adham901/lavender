import React from 'react';
import { Package, Calendar, DollarSign, ShoppingBag, CheckCircle } from 'lucide-react';

// Component to be used inside your Dialog
const OrderDetailsEnhanced = ({ orderDetails, statusLabels }: any) => {
  if (!orderDetails) {
    return null;
  }

  const statusColors: Record<number, string> = {
    8: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    1: 'bg-blue-100 text-blue-800 border-blue-200',
    2: 'bg-purple-100 text-purple-800 border-purple-200',
    3: 'bg-orange-100 text-orange-800 border-orange-200',
    4: 'bg-red-100 text-red-800 border-red-200',
    5: 'bg-green-100 text-green-800 border-green-200',
    6: 'bg-pink-100 text-pink-800 border-pink-200',
    7: 'bg-teal-100 text-teal-800 border-teal-200',
    9: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* بطاقات المعلومات العامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* رقم الطلب */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-600 mb-1">رقم الطلب</p>
              <p className="font-bold text-gray-800">{orderDetails.orderNumber}</p>
            </div>
          </div>
        </div>

        {/* التاريخ */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-purple-600 mb-1">تاريخ الطلب</p>
              <p className="font-bold text-gray-800">{orderDetails.date}</p>
            </div>
          </div>
        </div>

        {/* الإجمالي */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">إجمالي السعر</p>
              <p className="font-bold text-gray-800">{orderDetails.priceAfterDiscount} ج.م</p>
            </div>
          </div>
        </div>

        {/* عدد المنتجات */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 shadow-sm border border-orange-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-orange-600 mb-1">عدد المنتجات</p>
              <p className="font-bold text-gray-800">{orderDetails.totalOrderItems}</p>
            </div>
          </div>
        </div>

        {/* الحالة */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 shadow-sm border border-teal-200 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-teal-600 mb-1">حالة الطلب</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[orderDetails.status]}`}
              >
                {statusLabels[orderDetails.status]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* قسم المنتجات */}
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-purple-600" />
          المنتجات المطلوبة
        </h3>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {orderDetails.orderItems.map((item: any) => (
            <div
              key={item.orderItemId}
              className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md hover:border-purple-300 transition-all duration-200"
            >
              {/* صورة المنتج */}
              <div className="relative group flex-shrink-0">
                <img
                  src={
                    Array.isArray(item.product.path)
                      ? item.product.path[0]?.path
                      : item.product.path?.path
                  }
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
              </div>

              {/* معلومات المنتج */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 mb-2 text-lg truncate">
                  {item.product.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">السعر:</span>
                    <span className="font-semibold text-gray-700">{item.price} ج.م</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">الكمية:</span>
                    <span className="font-semibold text-white bg-purple-600 px-2 py-1 rounded-lg text-center min-w-[2rem]">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">الإجمالي:</span>
                    <span className="font-bold text-green-600">{item.cost} ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default OrderDetailsEnhanced;
