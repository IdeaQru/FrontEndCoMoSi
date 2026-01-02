import React from 'react';
import { PSCard } from './PSCard';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface PSTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export function PSTable({ 
  columns, 
  data, 
  title,
  loading = false,
  emptyMessage = 'No data available'
}: PSTableProps) {
  return (
    <PSCard borderColor="primary" hover={false}>
      <div className="p-4 sm:p-6">
        {title && (
          <h3 className="text-base sm:text-lg mb-4 text-[var(--ps-text-primary)]">{title}</h3>
        )}
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-[var(--ps-border)]">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`px-4 sm:px-6 py-3 text-xs uppercase tracking-wider text-[var(--ps-text-secondary)] ${
                        column.align === 'right' 
                          ? 'text-right' 
                          : column.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[var(--ps-surface)] divide-y divide-[var(--ps-border)]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 sm:px-6 py-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data.length === 0 ? (
                  <tr>
                    <td 
                      colSpan={columns.length} 
                      className="px-4 sm:px-6 py-8 text-center text-[var(--ps-text-secondary)]"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr 
                      key={idx}
                      className="hover:bg-[var(--ps-surface-hover)] transition-colors"
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={`px-4 sm:px-6 py-4 text-sm text-[var(--ps-text-primary)] ${
                            column.align === 'right' 
                              ? 'text-right' 
                              : column.align === 'center'
                              ? 'text-center'
                              : 'text-left'
                          }`}
                        >
                          {column.render 
                            ? column.render(row[column.key], row)
                            : row[column.key]
                          }
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PSCard>
  );
}
