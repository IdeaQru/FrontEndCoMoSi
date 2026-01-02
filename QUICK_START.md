# Photosensor Design System - Quick Start Guide

## 🚀 Getting Started

### Navigation Structure

The application consists of **3 main pages** accessible via bottom navigation:

1. **Dashboard** - Real-time sensor monitoring with counters & charts
2. **Monitor** - Detailed statistics & performance metrics
3. **Logs** - System event logs with filtering & search

Navigation is handled automatically with smooth page transitions. Use the bottom navigation bar or mobile menu to switch between pages.

### Import Components
```tsx
import {
  PSHeader,
  PSCard,
  PSStatCard,
  PSStatusBadge,
  PSNavigationFooter,
  PSChart,
  PSTable,
  PSButton,
  PSInput,
  PSSelect,
  PSLoadingSpinner,
  PSAlert,
  PSModal,
  PSThemeToggle,
  PSConnectionStatus,
  PSProgressBar,
} from './components/photosensor';

// Import page components
import { MonitorPage } from './components/MonitorPage';
import { LogsPage } from './components/LogsPage';
```

## 📄 Pages Overview

### Dashboard Page
- **Real-time sensor cards** with large counters (Input & Output)
- **Quick stats** grid (4 metrics)
- **24-hour activity chart** (dual-line)
- **Connection status** with pulse animation
- **Auto-updates** every 2 seconds

### Monitor Page
- **4 metric cards** (Input Total, Output Total, Total Updates, System Uptime)
- **Performance bar chart** (24-hour request counts)
- **Status section** (Backend, Database, WebSocket with latencies)
- **Change indicators** on metric updates
- **Real-time tracking** of all counters

### Logs Page
- **Real-time log stream** with color-coded event types
- **Search & filter** functionality
- **Expandable log details** with smooth animations
- **Pagination** (50 logs per page, max 100 in memory)
- **Event types**: Sensor Update, System Event, Alert, Connection, Error
- **Auto-append** new logs at top with slide-in animation

## 📦 Component Examples

### 1. Basic Layout
```tsx
function MyApp() {
  return (
    <div className="min-h-screen ps-gradient-bg pb-20">
      <PSHeader title="My Dashboard" />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Your content */}
      </main>
      <PSNavigationFooter activeTab="dashboard" onTabChange={setTab} />
    </div>
  );
}
```

### 2. Stat Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <PSStatCard
    label="Active Sensors"
    value="24"
    icon={Activity}
    borderColor="primary"
    trend={{ value: 12.5, isPositive: true }}
  />
</div>
```

### 3. Charts
```tsx
const data = [
  { name: '00:00', value: 245 },
  { name: '04:00', value: 312 },
];

<PSChart
  data={data}
  title="Light Intensity"
  type="area"
  color="var(--ps-primary)"
/>
```

### 4. Tables
```tsx
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
];

const data = [
  { id: 1, name: 'Sensor 1' },
];

<PSTable columns={columns} data={data} title="Logs" />
```

### 5. Buttons
```tsx
<PSButton variant="primary" icon={Download} onClick={handleClick}>
  Download
</PSButton>

<PSButton variant="secondary" loading>
  Loading...
</PSButton>

<PSButton variant="error" disabled>
  Disabled
</PSButton>
```

### 6. Forms
```tsx
<PSInput
  label="Sensor Name"
  value={name}
  onChange={setName}
  placeholder="Enter name"
  icon={Activity}
  fullWidth
/>

<PSSelect
  label="Sensor Type"
  options={[
    { value: 'ps1', label: 'Photosensor 1' },
  ]}
  value={selected}
  onChange={setSelected}
  fullWidth
/>
```

### 7. Alerts
```tsx
<PSAlert
  type="success"
  title="Success"
  message="Operation completed!"
  dismissible
  onDismiss={handleDismiss}
/>
```

### 8. Modal
```tsx
<PSModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  footer={
    <>
      <PSButton variant="secondary" onClick={close}>Cancel</PSButton>
      <PSButton variant="primary">Save</PSButton>
    </>
  }
>
  {/* Modal content */}
</PSModal>
```

### 9. Status & Progress
```tsx
<PSStatusBadge status="on" pulse size="md" />
<PSConnectionStatus isConnected={true} />
<PSProgressBar value={75} label="CPU Usage" color="primary" />
```

## 🎨 Color Palette Quick Reference

```tsx
// Border Colors
borderColor="primary"   // Blue
borderColor="accent"    // Yellow
borderColor="success"   // Green
borderColor="error"     // Red
borderColor="warning"   // Orange
borderColor="info"      // Light Blue

// Status Types
status="on"      // Green
status="off"     // Red
status="warning" // Yellow
status="error"   // Red
status="info"    // Blue

// Button Variants
variant="primary"   // Blue
variant="secondary" // Outline
variant="success"   // Green
variant="error"     // Red
variant="warning"   // Yellow
```

## 🌗 Dark Mode

```tsx
// Toggle Component
<PSThemeToggle />

// Manual Toggle
document.documentElement.classList.add('dark');    // Enable
document.documentElement.classList.remove('dark'); // Disable
```

## 📱 Responsive Classes

```tsx
// Use Tailwind responsive prefixes
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Common Breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
```

## 💡 Pro Tips

1. **Container Max Width**: Always wrap content in `max-w-7xl mx-auto px-4`
2. **Bottom Navigation Spacing**: Add `pb-20` to main container when using footer nav
3. **Loading States**: All data components support `loading={true}`
4. **Icons**: Use `lucide-react` for consistent icons
5. **Gradients**: Use `ps-gradient-bg` class for background
6. **Shadows**: Use `ps-card-shadow` or `ps-card-shadow-lg`

## 🔥 Common Patterns

### Dashboard Grid
```tsx
<div className="space-y-6">
  {/* Stats */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <PSStatCard {...} />
  </div>
  
  {/* Charts */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <PSChart {...} />
  </div>
  
  {/* Table */}
  <PSTable {...} />
</div>
```

### Form Layout
```tsx
<PSCard borderColor="primary">
  <div className="p-6 space-y-4">
    <PSInput {...} fullWidth />
    <PSSelect {...} fullWidth />
    <PSButton variant="primary" fullWidth>Submit</PSButton>
  </div>
</PSCard>
```

### Action Bar
```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <PSThemeToggle />
    <PSStatusBadge status="on" pulse />
  </div>
  <div className="flex gap-2">
    <PSButton variant="secondary" icon={RefreshCw}>Refresh</PSButton>
    <PSButton variant="primary" icon={Download}>Export</PSButton>
  </div>
</div>
```

## 📚 Full Documentation

For complete API reference, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🎯 Component Status

✅ Production Ready:
- All 17 components fully tested
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Loading states
- Error handling
- Accessibility features

## 🤝 Need Help?

Check out the demo in `App.tsx` for live examples of all components!