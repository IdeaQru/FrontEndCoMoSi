import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  X, 
  FileSpreadsheet, 
  File as FileIcon, 
  Calendar,
  Clock,
  Filter,
  RefreshCw,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components
import { PSCard } from './photosensor/PSCard';
import { PSInput } from './photosensor/PSInput';
import { PSButton } from './photosensor/PSButton';

// --- Types ---
export type LogType = 'sensor-update' | 'system-event' | 'alert' | 'connection' | 'error';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: LogType;
  message: string;
  source?: string;
  relatedData?: {
    inputValue?: number;
    outputValue?: number;
  };
}

// Helper: Format Date for Display/CSV
const formatDateTimeClean = (date: Date) => {
  const datePart = date.toLocaleDateString('en-CA'); 
  const timePart = date.toLocaleTimeString('en-GB', { hour12: false });
  return `${datePart} ${timePart}`;
};

// Helper: Format Date for HTML Input (YYYY-MM-DDTHH:mm)
const formatDateForInput = (date: Date) => {
  // Menggeser waktu ke zona waktu lokal (WIB)
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);
  return localISOTime;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function LogsPage() {
  
  // Data State
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  
  // Loading State
  const [loading, setLoading] = useState(false);
  const [fetchedCount, setFetchedCount] = useState(0);

  // Filter State
  const [activeShortcut, setActiveShortcut] = useState<'1h' | 'today' | 'week' | 'month' | 'custom'>('today');
  
  // Default: Today (00:00 - Now)
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return formatDateForInput(d);
  });
  
  const [endDate, setEndDate] = useState<string>(() => {
    return formatDateForInput(new Date());
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 15;

  // --- LOGIC: Handle Shortcut Click ---
  const applyShortcut = (range: '1h' | 'today' | 'week' | 'month') => {
    setActiveShortcut(range);
    const now = new Date();
    let start = new Date();

    if (range === '1h') {
      start = new Date(now.getTime() - 60 * 60 * 1000);
    } else if (range === 'today') {
      start = new Date(now.setHours(0, 0, 0, 0));
    } else if (range === 'week') {
      start = new Date(now.setDate(now.getDate() - 7));
    } else if (range === 'month') {
      start = new Date(now.setMonth(now.getMonth() - 1));
    }

    setStartDate(formatDateForInput(start));
    setEndDate(formatDateForInput(new Date())); // End date selalu NOW
  };

  // --- SMART FETCH LOGIC (Re-fetch when dates change) ---
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setFetchedCount(0);
    setLogs([]); 
    
    // Kirim parameter tanggal ke backend agar filtering terjadi di server (lebih efisien)
    // Jika backend belum support filter tanggal, kita akan filter di client (lihat logic bawah)
    const BATCH_SIZE = 100;
    let offset = 0;
    let keepFetching = true;
    let allFetchedLogs: LogEntry[] = [];
    
    // Konversi string input ke object Date untuk filter client-side (backup)
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);

    try {
      while (keepFetching) {
        // Request ke API Backend
        const response = await fetch(`http://localhost:3000/api/v1/sensors/history?limit=${BATCH_SIZE}&offset=${offset}`);
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const json = await response.json();
        
        // Parsing Data Robust
        let rawArray: any[] = [];
        if (Array.isArray(json)) rawArray = json;
        else if (json.data && Array.isArray(json.data.data)) rawArray = json.data.data;
        else if (json.data && Array.isArray(json.data)) rawArray = json.data;

        if (!Array.isArray(rawArray) || rawArray.length === 0) {
          keepFetching = false;
          break;
        }

        // Mapping
        const mappedBatch: LogEntry[] = rawArray.map((item: any) => ({
          id: item.id ? `LOG-${item.id}` : `LOG-${Math.random().toString(36).substr(2, 5)}`,
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
          type: 'sensor-update',
          message: `Sensor Update: In ${item.counter_input ?? 0} / Out ${item.counter_output ?? 0}`,
          source: 'Database',
          relatedData: {
            inputValue: Number(item.counter_input) || 0,
            outputValue: Number(item.counter_output) || 0
          }
        }));

        // --- FILTERING LOGIC (CLIENT SIDE BACKUP) ---
        // Jika backend belum support parameter ?startDate=... kita filter manual disini
        // Hanya ambil data yang masuk rentang tanggal yang dipilih
        const filteredBatch = mappedBatch.filter(log => 
          log.timestamp >= startObj && log.timestamp <= endObj
        );

        // Optimization: Jika kita menemukan data yang lebih tua dari startDate, stop fetching (karena data diurutkan DESC)
        const oldestInBatch = mappedBatch[mappedBatch.length - 1].timestamp;
        if (oldestInBatch < startObj) {
           keepFetching = false;
        }

        allFetchedLogs = [...allFetchedLogs, ...filteredBatch];
        setFetchedCount(prev => prev + rawArray.length); // Total scanned rows

        if (rawArray.length < BATCH_SIZE) {
          keepFetching = false;
        } else {
          offset += BATCH_SIZE;
          await delay(100); 
        }

        // Safety limit untuk mencegah browser hang jika rentang waktu terlalu lebar
        if (allFetchedLogs.length >= 5000) keepFetching = false;
      }

      setLogs(allFetchedLogs);
    } catch (error) {
      console.error("Gagal mengambil history:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]); // Re-run jika startDate/endDate berubah

  // Trigger fetch saat tanggal berubah
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // --- Client Filtering (Search Query) ---
  useEffect(() => {
    let result = logs;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.id.toLowerCase().includes(q) || 
        log.message.toLowerCase().includes(q)
      );
    }

    // Sort Descending
    result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setFilteredLogs(result);
    setCurrentPage(1); 
  }, [logs, searchQuery]);

  // --- Export Logic ---
  const handleDownloadCSV = () => {
    const headers = ["Timestamp", "Input Value", "Output Value", "Log ID"];
    const rows = filteredLogs.map(log => [
      formatDateTimeClean(log.timestamp),
      log.relatedData?.inputValue ?? '-',
      log.relatedData?.outputValue ?? '-',
      log.id
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sensor_history_${activeShortcut}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text(`Sensor Logs Report (${activeShortcut})`, 14, 20);
      doc.setFontSize(10);
      doc.text(`Range: ${startDate.replace('T', ' ')} to ${endDate.replace('T', ' ')}`, 14, 26);

      autoTable(doc, {
        startY: 30,
        head: [['Timestamp', 'Input', 'Output', 'Log ID']],
        body: filteredLogs.map(log => [
          formatDateTimeClean(log.timestamp),
          log.relatedData?.inputValue ?? '-',
          log.relatedData?.outputValue ?? '-',
          log.id
        ]),
        headStyles: { fillColor: [33, 150, 243] }
      });

      doc.save('sensor_report.pdf');
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    }
  };

  // --- Pagination ---
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage, 
    currentPage * logsPerPage
  );

  return (
    <div className="space-y-6 ps-fade-in">
      
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ps-text-primary)] flex items-center gap-2">
            <Filter className="w-6 h-6" /> Data History
          </h1>
          <p className="text-sm text-[var(--ps-text-secondary)]">
            Analyze historical data from server
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh / Status */}
          <div className="flex items-center gap-2 mr-2">
            {loading && (
              <span className="text-xs text-[var(--ps-primary)] flex items-center gap-1 bg-[var(--ps-surface)] px-2 py-1 rounded border border-[var(--ps-primary)]/20">
                <Loader2 className="w-3 h-3 animate-spin" /> 
                Reading DB: {fetchedCount} rows...
              </span>
            )}
            <PSButton 
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={fetchHistory} // Manual Refresh akan re-fetch data based on current date range
              disabled={loading} children={undefined}             
            />
          </div>

           {/* Time Shortcuts */}
          <div className="flex bg-[var(--ps-surface)] p-1 rounded-lg border border-[var(--ps-border)]">
            {(['1h', 'today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => applyShortcut(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  activeShortcut === range
                    ? 'bg-[var(--ps-primary)] text-white shadow-sm'
                    : 'text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)] hover:bg-[var(--ps-surface-hover)]'
                }`}
              >
                {range === '1h' ? '1 Hour' : range}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-l border-[var(--ps-border)] pl-2">
            <PSButton variant="secondary" size="sm" icon={FileSpreadsheet} onClick={handleDownloadCSV} disabled={loading}>
              CSV
            </PSButton>
            <PSButton variant="primary" size="sm" icon={FileIcon} onClick={handleDownloadPDF} disabled={loading}>
              PDF
            </PSButton>
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar (Connected to Logic) */}
      <PSCard borderColor="primary" hover={false}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          <div className="flex items-center gap-2 md:col-span-2">
            <div className="flex items-center gap-2 bg-[var(--ps-surface-hover)] px-3 py-2 rounded-lg border border-[var(--ps-border)] w-full sm:w-auto">
              <Calendar className="w-4 h-4 text-[var(--ps-text-secondary)]" />
              <input 
                type="datetime-local" 
                className="bg-transparent border-none text-xs text-[var(--ps-text-primary)] focus:outline-none"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setActiveShortcut('custom'); // Switch ke custom jika user edit manual
                }}
              />
              <span className="text-[var(--ps-text-secondary)]">-</span>
              <input 
                type="datetime-local" 
                className="bg-transparent border-none text-xs text-[var(--ps-text-primary)] focus:outline-none"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setActiveShortcut('custom');
                }}
              />
            </div>
            
            {activeShortcut === 'custom' && (
              <PSButton 
                variant="secondary"
                size="sm"
                icon={X}
                onClick={() => applyShortcut('today')} // Reset ke Today
              >
                Reset
              </PSButton>
            )}
          </div>

          <div className="w-full">
            <PSInput 
              icon={Search} 
              placeholder="Search ID..." 
              value={searchQuery}
              onChange={setSearchQuery}
              fullWidth
            />
          </div>
        </div>
      </PSCard>

      {/* Data Table */}
      <PSCard borderColor="primary" hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--ps-surface-hover)] border-b border-[var(--ps-border)]">
                <th className="p-4 text-xs font-semibold text-[var(--ps-text-secondary)] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Timestamp
                  </div>
                </th>
                <th className="p-4 text-xs font-semibold text-[var(--ps-text-secondary)] uppercase tracking-wider text-center">
                  Input Value
                </th>
                <th className="p-4 text-xs font-semibold text-[var(--ps-text-secondary)] uppercase tracking-wider text-center">
                  Output Value
                </th>
                <th className="p-4 text-xs font-semibold text-[var(--ps-text-secondary)] uppercase tracking-wider text-right">
                  Log ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ps-border)]">
              {loading && currentLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[var(--ps-text-secondary)]">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-[var(--ps-primary)]" />
                      <p className="text-sm font-medium">Fetching Data...</p>
                      <p className="text-xs">Scanning {fetchedCount} records...</p>
                    </div>
                  </td>
                </tr>
              ) : currentLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--ps-text-secondary)]">
                    No data found between {formatDateTimeClean(new Date(startDate))} and {formatDateTimeClean(new Date(endDate))}
                  </td>
                </tr>
              ) : (
                currentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[var(--ps-surface-hover)] transition-colors">
                    <td className="p-4 text-sm font-mono text-[var(--ps-text-primary)] whitespace-nowrap">
                      {formatDateTimeClean(log.timestamp)}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md font-mono text-sm font-bold border border-blue-500/20">
                        {log.relatedData?.inputValue ?? '-'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 rounded-md font-mono text-sm font-bold border border-orange-500/20">
                        {log.relatedData?.outputValue ?? '-'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[var(--ps-text-secondary)] text-right font-mono text-xs">
                      {log.id}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredLogs.length > logsPerPage && (
          <div className="p-4 border-t border-[var(--ps-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--ps-text-secondary)]">
              Page {currentPage} of {totalPages} ({filteredLogs.length} total)
            </span>
            <div className="flex gap-2">
              <PSButton 
                variant="secondary" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </PSButton>
              <PSButton 
                variant="secondary" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PSButton>
            </div>
          </div>
        )}
      </PSCard>
    </div>
  );
}
