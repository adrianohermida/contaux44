import React from 'react';

/**
 * ResponsiveTable - Converts to card-based layout on mobile
 * @param {Object} props
 * @param {Array} props.columns - Column definitions with key, label, render function
 * @param {Array} props.data - Table data
 * @param {React.ReactNode} props.children - Custom table/card content
 * @param {string} props.className - Additional CSS classes
 */
export default function ResponsiveTable({ columns, data, children, className = '' }) {
  if (children) {
    return children;
  }

  return (
    <>
      {/* Desktop Table */}
      <div className={`hidden md:block overflow-x-auto ${className}`}>
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={`${row.id || idx}-${col.key}`}
                    className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((row, idx) => (
          <div
            key={row.id || idx}
            className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700"
          >
            {columns.map((col) => (
              <div key={`${row.id || idx}-${col.key}`} className="flex justify-between py-2 last:pb-0">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {col.label}
                </span>
                <span className="text-sm text-slate-900 dark:text-slate-100 text-right">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}