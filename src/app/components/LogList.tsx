import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Kita import tipe data dari parent (atau bisa dipisah ke types.ts)
import { LogEntry, LogType } from './LogsPage';

interface LogListProps {
  logs: LogEntry[];
  loading?: boolean;
}

// Konfigurasi warna badge
const logTypeConfig: Record<LogType, { label: string; color: string; bgColor: string; borderColor: string }> = {
  'sensor-update': { label: 'Sensor Update', color: '#2196f3', bgColor: '#2196f320', borderColor: '#2196f3' },
  'system-event': { label: 'System Event', color: '#4caf50', bgColor: '#4caf5020', borderColor: '#4caf50' },
  'alert': { label: 'Alert', color: '#f44336', bgColor: '#f4433620', borderColor: '#f44336' },
  'connection': { label: 'Connection', color: '#ffc107', bgColor: '#ffc10720', borderColor: '#ffc107' },
  'error': { label: 'Error', color: '#ff5722', bgColor: '#ff572220', borderColor: '#ff5722' },
};

export function LogList({ logs, loading = false }: LogListProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    }) + '.' + String(date.getMilliseconds()).padStart(3, '0');
  };

  return (
    <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {logs.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-12 text-center"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-[var(--ps-text-secondary)] opacity-50" />
            <h3 className="text-lg font-medium text-[var(--ps-text-primary)] mb-2">No logs found</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          logs.map((log, index) => {
            const config = logTypeConfig[log.type];
            const isExpanded = expandedLog === log.id;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className={`border-b border-[var(--ps-border)] transition-colors ${
                  isEven ? 'bg-white dark:bg-[var(--ps-surface)]' : 'bg-[#f9f9f9] dark:bg-[var(--ps-surface-hover)]'
                } hover:bg-[var(--ps-surface-hover)] cursor-pointer`}
                onClick={() => setExpandedLog(isExpanded ? null : log.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Timestamp */}
                    <span className="font-mono text-xs text-[var(--ps-info)] whitespace-nowrap flex-shrink-0 pt-1">
                      {formatTimestamp(log.timestamp)}
                    </span>

                    <span className="text-[var(--ps-text-secondary)] pt-1">|</span>

                    {/* Badge */}
                    <span
                      className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0"
                      style={{
                        backgroundColor: config.bgColor,
                        color: config.color,
                        border: `1px solid ${config.borderColor}`
                      }}
                    >
                      {config.label}
                    </span>

                    {/* Message */}
                    <p className="flex-1 text-sm text-[var(--ps-text-primary)] min-w-0 pt-0.5">
                      {log.message}
                    </p>

                    {/* Icon */}
                    <button className="flex-shrink-0 p-1 hover:bg-[var(--ps-border)] rounded transition-colors">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[var(--ps-text-secondary)]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[var(--ps-text-secondary)]" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[var(--ps-border)]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-[var(--ps-text-secondary)]">Log ID: </span>
                              <span className="font-mono text-[var(--ps-text-primary)]">{log.id}</span>
                            </div>
                            <div>
                              <span className="text-[var(--ps-text-secondary)]">Source: </span>
                              <span className="text-[var(--ps-text-primary)]">{log.source || 'System'}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-[var(--ps-text-secondary)]">Full Timestamp: </span>
                              <span className="font-mono text-[var(--ps-text-primary)]">{log.timestamp.toLocaleString()}</span>
                            </div>
                            
                            {log.relatedData && (
                              <div className="sm:col-span-2 bg-[var(--ps-background)] p-2 rounded border border-[var(--ps-border)]">
                                <span className="text-[var(--ps-text-secondary)] block mb-1 text-xs uppercase tracking-wider">Related Data</span>
                                <div className="font-mono text-xs text-[var(--ps-text-primary)]">
                                  {JSON.stringify(log.relatedData, null, 2)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
