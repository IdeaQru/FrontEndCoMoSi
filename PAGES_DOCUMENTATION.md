# Photosensor Monitoring System - Pages Documentation

Dokumentasi lengkap untuk semua page dalam Photosensor Monitoring Dashboard.

---

## 📄 Table of Contents

1. [Dashboard Page](#dashboard-page)
2. [Monitor Page](#monitor-page)
3. [Logs Page](#logs-page)
4. [Navigation System](#navigation-system)
5. [Shared Components](#shared-components)

---

## 1️⃣ Dashboard Page

### Overview
Dashboard utama untuk monitoring real-time photosensor dengan visualisasi counter, status, dan chart 24-jam.

### Sections

#### A. Real-time Sensor Cards
**Input Sensor Card**
- Border: Blue (#2196f3)
- Large counter: 56px bold
- Status badge: ON/OFF dengan pulse animation
- Icon: 📥 TrendingUp
- Auto-increment simulation setiap 2 detik
- Hover: Shadow increase + translateY(-2px)

**Output Sensor Card**
- Border: Orange (#ff9800)
- Same layout sebagai Input
- Independent counter updates
- Icon: 📤 TrendingDown

**Connection Status Bar**
- Green pulse indicator
- "System Live" / "Connection Lost" label
- Last update timestamp dengan real-time format

#### B. System Overview (Quick Stats)
4 Stat Cards dalam responsive grid:
1. **Total Input Counts** - Primary border, TrendingUp icon
2. **Total Output Counts** - Success border, TrendingDown icon
3. **System Uptime** - Accent border, Timer icon (HH:MM:SS format)
4. **Last Update** - Info border, Clock icon

#### C. 24-Hour Activity Chart
- Type: Line chart (Recharts)
- Data: Input vs Output trends
- X-axis: Hours (0-23)
- Y-axis: Count values
- Dual lines: Blue (Input), Orange (Output)
- Interactive tooltip
- Legend dengan icon
- Auto-refresh setiap 5 menit

### Animations
```css
Counter Increment:  300ms ease-out scale + color flash
Status Badge:       Pulse animation 2s infinite (when ON)
Card Hover:         200ms transform + shadow
Page Load:          Fade-in animation
```

### Data Flow
```typescript
counterInput:   Auto-increment real-time
counterOutput:  Auto-increment real-time
statusInput:    Random toggle (demo)
statusOutput:   Random toggle (demo)
isConnected:    Connection simulation
lastUpdate:     Updates on counter change
```

---

## 2️⃣ Monitor Page

### Overview
Real-time statistics page dengan detailed metrics, performance charts, dan system status monitoring.

### Sections

#### A. Page Title
- Emoji: 📈
- Title: "Real-time Statistics"
- Subtitle: "System performance metrics dan uptime tracking"

#### B. Metrics Grid (2x2 responsive)

**Card 1: Input Counter Total**
- Border: Top 4px #2196f3
- Icon: 📥 dalam background circle
- Large number: 48px bold
- Label: "INPUT COUNTER" (uppercase, small)
- Change indicator: +15 (green, animates on update)
- Unit: "counts" (gray text)

**Card 2: Output Counter Total**
- Border: Top 4px #ff9800
- Icon: 📤
- Same layout sebagai Card 1
- Independent change tracking

**Card 3: Total Updates**
- Border: Top 4px #9c27b0 (purple)
- Icon: 📊
- Tracks total WebSocket updates received
- Label: "TOTAL UPDATES"
- Subtitle: "Real-time data points"

**Card 4: System Uptime**
- Border: Top 4px #00bcd4 (cyan)
- Icon: ⏱️
- Monospace font untuk uptime
- Format: HH:MM:SS
- Label: "SYSTEM UPTIME"
- Subtitle: "Running since startup"

#### C. Performance Chart Section
**Bar Chart (Recharts)**
- Title: "Performance Metrics (Last 24 Hours)"
- Type: Bar chart
- X-axis: Hours (0-23)
- Y-axis: Request count
- Two series:
  - Input requests (blue bars)
  - Output requests (orange bars)
- Rounded corners: [4, 4, 0, 0]
- Interactive tooltip
- Legend
- Height: 350px

#### D. Status Section (3 columns)

**Backend Status**
- Background: Green tint (#4caf50/10)
- Border: Green (#4caf50/20)
- Pulse dot: Animated green
- Icon: Activity
- Status: "Online"
- Response time: Dynamic (40-60ms)

**Database Status**
- Background: Blue tint (#2196f3/10)
- Border: Blue (#2196f3/20)
- Pulse dot: Animated blue
- Icon: Database
- Status: "Connected"
- Query time: Dynamic (8-18ms)

**WebSocket Status**
- Background: Yellow tint (#ffc107/10)
- Border: Yellow (#ffc107/20)
- Pulse dot: Animated yellow
- Icon: Wifi
- Status: "Active"
- Latency: Dynamic (5-15ms)

### Features
- Real-time counter tracking
- Change indicators (+1, +2, etc.)
- Live latency simulation
- Smooth animations on updates
- Responsive grid layout
- Auto-refresh metrics

### Data Updates
```typescript
Total Updates:    Increments on every counter change
Latency Values:   Random simulation every 3 seconds
Bar Chart:        Regenerates every 5 minutes
Counter Changes:  Tracks previous vs current
```

---

## 3️⃣ Logs Page

### Overview
Real-time system logs dengan filtering, search, expandable details, dan color-coded event types.

### Sections

#### A. Page Title
- Emoji: 📝
- Title: "System Logs"
- Subtitle: "Real-time event tracking dan system events"

#### B. Filter Bar
**Components:**
1. **Search Input**
   - Placeholder: "Search logs..."
   - Icon: Search (lucide-react)
   - Full width pada mobile
   - Live filtering

2. **Filter Dropdown**
   - Options:
     - All Events
     - Sensor Updates
     - System Events
     - Alerts
     - Connection
     - Errors
   - Width: 192px (sm:w-48)
   - Styled select element

3. **Clear Button**
   - Shows only when filters active
   - Icon: X (lucide-react)
   - Clears search + resets filter

#### C. Log List

**Log Item Structure:**
```
[14:30:45.123] | [Event Type Badge] Message text [Chevron]
```

**Components:**
1. **Timestamp**
   - Font: Monospace
   - Color: Blue (#2196f3)
   - Format: HH:MM:SS.mmm (24-hour)
   - Flex-shrink: 0 (always visible)

2. **Separator**
   - Character: "|"
   - Color: Secondary text

3. **Event Type Badge**
   - Rounded pill shape
   - Color-coded per type:
     - **Sensor Update**: Blue (#2196f3)
     - **System Event**: Green (#4caf50)
     - **Alert**: Red (#f44336)
     - **Connection**: Yellow (#ffc107)
     - **Error**: Deep Orange (#ff5722)
   - Background: 20% opacity
   - Border: 1px solid (same color)
   - Font: 12px medium

4. **Message**
   - Flex: 1 (takes remaining space)
   - Font: 14px
   - Truncate: No (full message shown)

5. **Expand Icon**
   - ChevronRight (collapsed)
   - ChevronDown (expanded)
   - Hover: Background highlight

**Expandable Detail:**
- Smooth height animation (200ms)
- Border-top separator
- Grid layout (2 columns on desktop, 1 on mobile)
- Shows:
  - Log ID (monospace)
  - Source (Backend/WebSocket/System)
  - Full timestamp
  - Related data (if sensor update)

**Visual States:**
- Alternating row colors:
  - Even: White / dark:surface
  - Odd: #f9f9f9 / dark:surface-hover
- Hover: Lighten background
- Expanded: Additional padding + border
- Cursor: Pointer on entire row

#### D. Pagination
**Footer Bar:**
- Showing: "Showing 1-50 of 250 logs"
- Previous button (disabled on first page)
- Next button (disabled on last page)
- Compact on mobile
- Hidden if < 50 logs

#### E. Empty State
**When no logs match:**
- Icon: 📋 FileText (16x16, opacity 50%)
- Heading: "No logs yet"
- Subtext: "Events akan muncul di sini"
- Center aligned
- Padding: 48px

### Log Types Configuration

```typescript
'sensor-update': {
  label: 'Sensor Update',
  color: '#2196f3',
  bgColor: '#2196f320',
  borderColor: '#2196f3',
}
'system-event': {
  label: 'System Event',
  color: '#4caf50',
  bgColor: '#4caf5020',
  borderColor: '#4caf50',
}
'alert': {
  label: 'Alert',
  color: '#f44336',
  bgColor: '#f4433620',
  borderColor: '#f44336',
}
'connection': {
  label: 'Connection',
  color: '#ffc107',
  bgColor: '#ffc10720',
  borderColor: '#ffc107',
}
'error': {
  label: 'Error',
  color: '#ff5722',
  bgColor: '#ff572220',
  borderColor: '#ff5722',
}
```

### Real-time Features
1. **Auto-append new logs**
   - Slide-in animation from top (300ms)
   - Stagger: 20ms per item
   - Max 100 logs kept in memory

2. **Log Generation**
   - On counter increment: Sensor Update log
   - Random system events: Every 5 seconds
   - Sample messages per type

3. **Filtering**
   - Live search: Searches ID, message, source
   - Type filter: Instant client-side filtering
   - Case-insensitive search
   - Resets to page 1 on filter change

### Animations
```css
New Log:        Slide-in from top, opacity 0→1
Row Hover:      Background color transition 200ms
Expand Detail:  Height auto animation 200ms
Page Fade:      Opacity + x-translate on mount
```

### Performance
- Max 100 logs in memory
- 50 logs per page
- Virtualization: Not needed (scroll container sufficient)
- Search: Debounced on typing

---

## 🧭 Navigation System

### Bottom Navigation Bar
**Fixed position bottom of screen**
- Background: Surface color
- Border-top: Border color
- Shadow: Large elevation
- Z-index: 40
- Height: 64px (16 * 4)

**Navigation Items:**
1. **Dashboard**
   - Icon: Home (lucide-react)
   - Label: "Dashboard"
   - Active state: Primary color + background tint

2. **Monitor**
   - Icon: Monitor (lucide-react)
   - Label: "Monitor"
   - Active state: Primary color + background tint

3. **Logs**
   - Icon: FileText (lucide-react)
   - Label: "Logs"
   - Active state: Primary color + background tint

**States:**
```typescript
// Active
className="text-[var(--ps-primary)] bg-[var(--ps-primary)]/10"

// Inactive
className="text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)]"
```

**Layout:**
- Flex justify-around
- Icon + label vertical layout
- Gap: 4px (gap-1)
- Padding: 8px 16px
- Rounded: lg
- Transition: All properties 200ms

### Mobile Menu
**Slide-in from left**
- Width: 256px (w-64)
- Background: Surface color
- Shadow: 2xl elevation
- Animation: Spring (damping: 25, stiffness: 200)
- Z-index: 50

**Menu Items:**
- Same as bottom nav
- Full width buttons
- Padding: 12px 16px
- Active: Primary background + white text
- Icons: 20x20 (w-5 h-5)

**Overlay:**
- Background: Black/50
- Z-index: 40
- Click to close
- Fade animation

### Page Transitions
**AnimatePresence mode="wait"**
```typescript
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 20 }}
transition={{ duration: 0.3 }}
```

---

## 🧩 Shared Components

### Header (Fixed Top)
**Height:** 70px
**Background:** Linear gradient #1e88e5 → #1976d2
**Z-index:** 50

**Sections:**
1. **Left:**
   - Burger menu (mobile only)
   - Logo (hidden sm:flex)
   - Title + subtitle (responsive)

2. **Center (md+):**
   - Real-time clock
   - Connection status

3. **Right:**
   - Theme toggle
   - Settings icon
   - User profile icon

### Mobile Time Display
**Shown below header on mobile (md:hidden)**
- Clock + Connection status
- Card background
- Shadow elevation
- Margin bottom: 24px

---

## 📊 Data Management

### Global State
```typescript
activePage:     PageType (dashboard/monitor/logs)
currentTime:    Date (updates every 1s)
counterInput:   number (auto-increment)
counterOutput:  number (auto-increment)
statusInput:    boolean (random toggle)
statusOutput:   boolean (random toggle)
systemUptime:   number (seconds, increments)
chartData:      array (regenerates every 5min)
isConnected:    boolean (random toggle)
lastUpdate:     Date (on counter change)
```

### Props Passing
```typescript
// MonitorPage
<MonitorPage 
  counterInput={counterInput}
  counterOutput={counterOutput}
  systemUptime={systemUptime}
  isConnected={isConnected}
/>

// LogsPage
<LogsPage 
  counterInput={counterInput}
  counterOutput={counterOutput}
/>
```

---

## 🎨 Responsive Breakpoints

### Desktop (≥1200px)
- Max width: 1200px container
- Multi-column grids
- Bottom nav visible
- Desktop header layout

### Tablet (768px - 1199px)
- Mixed column layouts
- Compact spacing
- Adjusted font sizes
- Bottom nav visible

### Mobile (320px - 767px)
- Single column stacks
- Burger menu
- Mobile time display
- Larger touch targets
- Bottom nav visible

---

## ⚡ Performance Optimizations

1. **Memoization**
   - Chart data generation
   - Filtered logs computation

2. **Virtualization**
   - Not needed (max 100 logs, paginated)

3. **Debouncing**
   - Search input: 300ms debounce (if implemented)

4. **Lazy Loading**
   - Page components: Code splitting ready
   - Icons: Tree-shaken from lucide-react

5. **Animation Performance**
   - CSS transforms (GPU accelerated)
   - Motion library optimizations
   - Stagger delays for lists

---

## 🔧 Customization Guide

### Change Update Intervals
```typescript
// Counter updates
setInterval(() => {}, 2000); // Change to desired ms

// Chart refresh
setInterval(() => {}, 300000); // 5 minutes

// System events
setInterval(() => {}, 5000); // Random events
```

### Modify Log Types
```typescript
// Add new type in LogsPage.tsx
const logTypeConfig: Record<LogType, ...> = {
  'custom-type': {
    label: 'Custom Event',
    color: '#hexcode',
    bgColor: '#hexcode20',
    borderColor: '#hexcode',
  },
};
```

### Adjust Metrics
```typescript
// MonitorPage.tsx - Add new metric card
<PSCard borderColor="success" hover={true}>
  <div className="p-6">
    {/* Custom metric */}
  </div>
</PSCard>
```

---

## 🐛 Troubleshooting

### Logs Not Appearing
**Check:**
- LogsPage component receiving correct props
- Log generation logic in useEffect
- Filter state not blocking all logs

### Charts Not Updating
**Check:**
- Data format matches Recharts requirements
- ResponsiveContainer has parent with defined width
- useEffect dependencies include data sources

### Navigation Not Working
**Check:**
- activePage state updates correctly
- AnimatePresence key matches page type
- Bottom nav onClick handlers

### Mobile Menu Not Closing
**Check:**
- setShowMobileMenu(false) in onClick
- Overlay onClick handler
- Z-index conflicts

---

## 📚 Dependencies

### Core
- React 18.3.1
- TypeScript (via JSX)

### UI & Animation
- motion/react 12.23.24 (Framer Motion)
- lucide-react 0.487.0

### Charts
- recharts 2.15.2

### Design System
- All PS* components from `/src/app/components/photosensor/`

---

## 📝 Future Enhancements

### Monitor Page
1. Add custom metric cards
2. Performance trend graphs (line charts)
3. System resource gauges
4. Alert threshold configuration

### Logs Page
1. Export logs to CSV
2. Advanced filtering (date range picker)
3. Log level severity icons
4. Real WebSocket integration
5. Log search highlighting
6. Infinite scroll instead of pagination

### Navigation
1. Breadcrumbs for sub-pages
2. Keyboard shortcuts
3. Back button support (React Router)
4. URL-based routing

---

**Version:** 1.0.0  
**Last Updated:** December 29, 2025  
**Maintainer:** Figma Make AI Assistant
