import { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Clock, 
  Menu,
  Activity,
  TrendingUp,
  TrendingDown,
  Timer,
  Home,
  Monitor as MonitorIcon,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import { PSCard } from '../app/components/photosensor/PSCard';
import { PSStatusBadge } from '../app/components/photosensor/PSStatusBadge';
import { PSConnectionStatus } from '../app/components/photosensor/PSConnectionStatus';
import { PSStatCard } from '../app/components/photosensor/PSStatCard';
import { PSThemeToggle } from '../app/components/photosensor/PSThemeToggle';
import { MonitorPage } from '../app/components/MonitorPage';
import { LogsPage } from '../app/components/LogsPage';
import { TrendChart } from '../app/components/TrendChart';

// Integration Hook
import { useMonitorData } from '../features/monitor/useMonitorData';

// Helper functions
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
  });
};

const formatUptime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

type PageType = 'dashboard' | 'monitor' | 'logs';

function App() {
  // -- REAL DATA FROM BACKEND (SOCKET / CURRENT) --
  // Hook ini menangani data Real-time untuk Dashboard & Monitor
  const {
    counterInput,
    counterOutput,
    rpmInput,      // D200 - RPM Motor Conveyor
    rpmOutput,      // D201 - RPM Motor Rotator
    systemUptime,
    isConnected,
    history // History pendek (RAM) khusus untuk TrendChart live
  } = useMonitorData();

  // State UI lokal
  const [activePage, setActivePage] = useState<PageType>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Logic status sederhana
  const statusInput = counterInput > 0;
  const statusOutput = counterOutput > 0;

  // -- SIDE EFFECTS --
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLastUpdate(new Date());
  }, [counterInput, counterOutput]);

  return (
    <div className="min-h-screen ps-gradient-bg pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e88e5] to-[#1976d2] text-white shadow-lg">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="h-[70px] flex items-center justify-between gap-4">
            
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg items-center justify-center">
                <Activity className="w-7 h-7" />
              </div>
              
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold truncate">
                  Conveyor Monitoring Sistem
                </h1>
                <p className="hidden md:block text-xs text-white/80">
                  Real-time monitoring dashboard
                </p>
              </div>
            </div>

            {/* Center: Time & Connection Status */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(currentTime)}</span>
              </div>
              <PSConnectionStatus 
                isConnected={isConnected} 
                label={isConnected ? "System Live" : "Disconnected"}
                showIcon={false}
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <PSThemeToggle />
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Settings">
                <Settings className="w-5 h-5" />
              </button>
              
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-[70px] left-0 bottom-0 w-64 bg-[var(--ps-surface)] shadow-2xl z-50 p-4 lg:hidden overflow-y-auto"
            >
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: Home, label: 'Dashboard' },
                  { id: 'monitor', icon: MonitorIcon, label: 'Monitor' },
                  { id: 'logs', icon: FileText, label: 'Logs' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id as PageType);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activePage === item.id 
                        ? 'bg-[var(--ps-primary)] text-white' 
                        : 'hover:bg-[var(--ps-surface-hover)] text-[var(--ps-text-primary)]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-[94px] pb-8">
        
        {/* Mobile Time & Connection Status */}
        <div className="md:hidden mb-6 flex items-center justify-between p-4 bg-[var(--ps-surface)] rounded-lg ps-card-shadow">
          <div className="flex items-center gap-2 text-[var(--ps-text-primary)]">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(currentTime)}</span>
          </div>
          <PSConnectionStatus 
            isConnected={isConnected} 
            label={isConnected ? "Live" : "Offline"}
            showIcon={false}
          />
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          
          {/* --- DASHBOARD PAGE (Uses Real-time Props) --- */}
          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Real-time Status Cards */}
              <div className="mb-8 ps-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
                  
                  {/* Input Sensor */}
                  <PSCard borderColor="info" hover={true} className="relative overflow-hidden">
                    <div className="p-6">
                      <div className="absolute top-4 right-4">
                        <PSStatusBadge status={statusInput ? 'on' : 'off'} size="md" pulse={statusInput} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2196f3]/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#2196f3]" />
                        </div>
                        <span className="text-sm text-[var(--ps-text-secondary)]">📥 RPM MOTOR ROLLER CONVEYOR</span>
                      </div>
                      <motion.div
                        key={rpmInput}
                        initial={{ scale: 1.1, color: '#2196f3' }}
                        animate={{ scale: 1, color: 'var(--ps-text-primary)' }}
                        className="mb-2"
                      >
                        <p className="text-5xl sm:text-6xl font-bold" style={{ color: 'inherit' }}>
                          {rpmInput.toLocaleString()}
                        </p>
                      </motion.div>
                      <p className="text-xs text-[var(--ps-text-secondary)]">RPM</p>
                    </div>
                  </PSCard>

                  {/* Output Sensor */}
                  <PSCard borderColor="warning" hover={true} className="relative overflow-hidden">
                    <div className="p-6">
                      <div className="absolute top-4 right-4">
                        <PSStatusBadge status={statusOutput ? 'on' : 'off'} size="md" pulse={statusOutput} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ff9800]/10 flex items-center justify-center">
                          <TrendingDown className="w-5 h-5 text-[#ff9800]" />
                        </div>
                        <span className="text-sm text-[var(--ps-text-secondary)]">📤 RPM MOTOR ROTATOR</span>
                      </div>
                      <motion.div
                        key={rpmOutput}
                        initial={{ scale: 1.1, color: '#ff9800' }}
                        animate={{ scale: 1, color: 'var(--ps-text-primary)' }}
                        className="mb-2"
                      >
                        <p className="text-5xl sm:text-6xl font-bold" style={{ color: 'inherit' }}>
                          {rpmOutput.toLocaleString()}
                        </p>
                      </motion.div>
                      <p className="text-xs text-[var(--ps-text-secondary)]">RPM</p>
                    </div>
                  </PSCard>
                </div>

                {/* Connection Info Bar */}
                <div className="flex items-center justify-between p-4 bg-[var(--ps-surface)] rounded-lg ps-card-shadow">
                  <PSConnectionStatus 
                    isConnected={isConnected}
                    label={isConnected ? "System Live & Syncing" : "Connection Lost"}
                  />
                  <p className="text-sm text-[var(--ps-text-secondary)]">
                    Last Update: <span className="font-medium text-[var(--ps-text-primary)]">
                      {formatTime(lastUpdate)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="mb-8">
                <h2 className="text-xl mb-4 text-[var(--ps-text-primary)]">System Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PSStatCard
                    label="Total Input"
                    value={counterInput.toLocaleString()}
                    icon={TrendingUp}
                    borderColor="primary"
                  />
                  <PSStatCard
                    label="Total Output"
                    value={counterOutput.toLocaleString()}
                    icon={TrendingDown}
                    borderColor="success"
                  />
                  <PSStatCard
                    label="System Uptime"
                    value={formatUptime(systemUptime)}
                    icon={Timer}
                    borderColor="accent"
                  />
                  <PSStatCard
                    label="Last Update"
                    value={formatTime(lastUpdate)}
                    icon={Clock}
                    borderColor="info"
                  />
                </div>
              </div>

              {/* Trend Chart (Short term history from Hook) */}
              <div className="mb-8">
                <TrendChart history={history} />
              </div>

            </motion.div>
          )}

          {/* --- MONITOR PAGE (Uses Real-time Props) --- */}
          {activePage === 'monitor' && (
            <motion.div
              key="monitor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <MonitorPage 
                counterInput={counterInput}
                counterOutput={counterOutput}
                systemUptime={systemUptime}
                isConnected={isConnected}
              />
            </motion.div>
          )}

          {/* --- LOGS PAGE (FETCHES OWN DATA) --- */}
          {activePage === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* PERBAIKAN: Tidak perlu kirim props, dia fetch sendiri dari API history */}
              <LogsPage />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[var(--ps-surface)] border-t border-[var(--ps-border)] shadow-lg z-40">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'monitor', icon: MonitorIcon, label: 'Monitor' },
              { id: 'logs', icon: FileText, label: 'Logs' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as PageType)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'text-[var(--ps-primary)] bg-[var(--ps-primary)]/10'
                    : 'text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
