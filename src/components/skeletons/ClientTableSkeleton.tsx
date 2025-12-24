'use client';

export default function ClientsTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            {['الإيميل', 'العنوان', 'الهاتف', 'الاسم', 'ID'].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className="border-b">
              {Array.from({ length: 5 }).map((__, j) => (
                <td key={j} className="px-4 py-3">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
