# 📊 Photosensor Monitoring Dashboard

Full-stack monitoring dashboard untuk sistem photosensor dengan real-time updates, interactive charts, dan comprehensive logging system.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Monitoring** - Auto-updating sensor counters dengan smooth animations
- **Multi-page Navigation** - Dashboard, Monitor, dan Logs pages dengan seamless transitions
- **Interactive Charts** - Line & bar charts menggunakan Recharts
- **Event Logging** - Color-coded system logs dengan filtering & search
- **Dark Mode** - Full theme support dengan instant switching
- **Responsive Design** - Perfect untuk mobile, tablet, dan desktop (320px - 1200px+)

### 📱 Pages

#### 1. Dashboard Page
- 📥📤 **Sensor Cards** - Large counter displays dengan status badges (ON/OFF)
- 📊 **Quick Stats** - 4 metric cards (Input, Output, Uptime, Last Update)
- 📈 **24-Hour Chart** - Dual-line graph untuk Input vs Output trends
- 🔌 **Connection Status** - Live indicator dengan pulse animation
- ⚡ **Auto-updates** - Real-time counter increments setiap 2 detik

#### 2. Monitor Page
- 📋 **Metrics Grid** - 4 cards dengan top borders (Input, Output, Updates, Uptime)
- 📊 **Performance Chart** - Bar chart untuk request counts per hour
- 🟢 **System Status** - Backend, Database, WebSocket status dengan latencies
- 📈 **Change Indicators** - Visual feedback untuk counter increments (+1, +2, etc.)

#### 3. Logs Page
- 📝 **Real-time Logs** - Auto-appending event stream dengan slide-in animations
- 🎨 **Color-coded Types** - Blue (Sensor), Green (System), Red (Alert), Yellow (Connection), Orange (Error)
- 🔍 **Search & Filter** - Live filtering by type and search query
- 📖 **Expandable Details** - Click to view full log information
- 📄 **Pagination** - 50 logs per page, maintains max 100 in memory

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm/pnpm/yarn

### Installation

```bash
# Clone repository (if applicable)
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### First Run
1. App akan otomatis load di `localhost:5173` (Vite default)
2. Dashboard page adalah default landing page
3. Gunakan bottom navigation untuk switch antar pages
4. Toggle dark mode dengan icon di header (kanan atas)

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app dengan navigation
│   │   └── components/
│   │       ├── MonitorPage.tsx        # Monitor statistics page
│   │       ├── LogsPage.tsx           # System logs page
│   │       └── photosensor/           # Design system components
│   │           ├── PSCard.tsx
│   │           ├── PSStatCard.tsx
│   │           ├── PSChart.tsx
│   │           ├── PSStatusBadge.tsx
│   │           ├── PSConnectionStatus.tsx
│   │           ├── PSButton.tsx
│   │           ├── PSInput.tsx
│   │           ├── PSTable.tsx
│   │           ├── PSModal.tsx
│   │           ├── PSAlert.tsx
│   │           ├── PSThemeToggle.tsx
│   │           └── ... (17 total components)
│   └── styles/
│       ├── theme.css                  # Color system & CSS variables
│       ├── tailwind.css               # Tailwind imports
│       └── fonts.css                  # Font imports
├── DESIGN_SYSTEM.md                   # Complete component API docs
├── QUICK_START.md                     # Usage examples & patterns
├── DASHBOARD_GUIDE.md                 # Dashboard page documentation
├── PAGES_DOCUMENTATION.md             # Monitor & Logs pages docs
└── README.md                          # This file
```

---

## 🎨 Design System

### Color Palette
```css
Primary Blue:    #1e88e5  /* Main accent */
Accent Yellow:   #ffc107  /* Highlights */
Success Green:   #4caf50  /* Positive states */
Error Red:       #f44336  /* Errors & alerts */
Warning Orange:  #ff9800  /* Warnings */
Info Blue:       #2196f3  /* Information */
```

### Typography
- **Headings**: Poppins / Inter
- **Body**: Inter / Segoe UI
- **Monospace**: Default system monospace (untuk timestamps, uptime, IDs)

### Components (17 Total)
1. **PSHeader** - App header dengan logo, title, time, actions
2. **PSCard** - Flexible card container dengan colored borders
3. **PSStatCard** - Metric card dengan icon, value, trend
4. **PSChart** - Line/Area charts (Recharts wrapper)
5. **PSStatusBadge** - Color-coded status indicators (ON/OFF/WARNING/ERROR)
6. **PSConnectionStatus** - Live connection indicator dengan pulse
7. **PSButton** - Multi-variant buttons dengan loading states
8. **PSInput** - Text input dengan icons & validation
9. **PSSelect** - Dropdown select dengan custom styling
10. **PSTable** - Data table dengan sorting & custom renderers
11. **PSModal** - Modal dialog dengan header, body, footer
12. **PSAlert** - Alert messages (success/info/warning/error)
13. **PSProgressBar** - Progress indicators dengan labels
14. **PSLoadingSpinner** - Loading spinners (sm/md/lg/xl)
15. **PSThemeToggle** - Dark mode toggle dengan icon
16. **PSNavigationFooter** - Bottom tab navigation
17. **PSShowcase** - Component showcase/demo page

---

## 🔧 Tech Stack

### Core
- **React** 18.3.1 - UI framework
- **TypeScript** - Type safety (via JSX)
- **Vite** 6.3.5 - Build tool & dev server
- **Tailwind CSS** 4.1.12 - Utility-first styling

### UI & Animations
- **Motion (Framer Motion)** 12.23.24 - Smooth animations
- **Lucide React** 0.487.0 - Icon library
- **Recharts** 2.15.2 - Chart library

### State Management
- React Hooks (useState, useEffect)
- No external state library needed (simple app state)

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| **Mobile** | 320px - 767px | 1-column, stacked, burger menu |
| **Tablet** | 768px - 1199px | 2-column mixed, compact header |
| **Desktop** | 1200px+ | Multi-column, full header |

### Responsive Features
- Burger menu pada mobile dengan slide-in animation
- Bottom navigation always visible (all devices)
- Mobile time display below header (mobile only)
- Adaptive font sizes dan spacing
- Touch-friendly targets (min 44px)

---

## ⚡ Performance

### Optimizations
- **Chart Updates** - 5-minute intervals untuk chart data refresh
- **Counter Updates** - 2-second intervals untuk real-time feel
- **Log Management** - Max 100 logs in memory, paginated display
- **Lazy Loading** - Ready for code splitting (if needed)
- **CSS Transforms** - GPU-accelerated animations
- **Debounced Search** - Instant filtering tanpa lag

### Metrics
- **Initial Load** - < 2s (production build)
- **Page Transitions** - 300ms smooth animations
- **Counter Animations** - 300ms ease-out
- **Log Append** - Real-time dengan stagger (20ms per item)

---

## 🌗 Dark Mode

Toggle antara light/dark theme menggunakan:
1. **PSThemeToggle component** - Di header (recommended)
2. **Manual toggle**:
   ```javascript
   document.documentElement.classList.toggle('dark');
   ```

Dark mode preferences tersimpan di localStorage (jika implemented).

---

## 🎯 Use Cases

### Industrial IoT
- Photosensor monitoring di production lines
- Quality control systems
- Automated counting systems

### Smart Building
- Light level monitoring
- Occupancy detection
- Energy management

### Research & Development
- Sensor data collection
- Experimental monitoring
- Real-time analytics

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **WebSocket Integration** - Real backend connectivity
- [ ] **Data Export** - CSV/PDF export functionality
- [ ] **Alert System** - Threshold-based notifications
- [ ] **User Authentication** - Login & role management
- [ ] **Historical Data** - Date range selection & archives
- [ ] **Multi-sensor Support** - Add/remove sensors dynamically
- [ ] **Advanced Analytics** - Predictive analytics & trends
- [ ] **API Integration** - REST API endpoints
- [ ] **Database Persistence** - Save logs & metrics
- [ ] **Email Notifications** - Alert system via email

### Enhancement Ideas
- Keyboard shortcuts untuk navigation
- URL-based routing (React Router)
- Infinite scroll untuk logs
- Log export to JSON/CSV
- Custom dashboard widgets
- Sensor grouping & categorization
- Performance benchmarking tools

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Complete component API reference dengan props & examples |
| [QUICK_START.md](./QUICK_START.md) | Quick examples & common patterns |
| [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md) | Dashboard page deep dive |
| [PAGES_DOCUMENTATION.md](./PAGES_DOCUMENTATION.md) | Monitor & Logs pages documentation |

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Charts not displaying**
- Solution: Check that data format matches Recharts requirements (array of objects with name/value keys)

**Issue: Dark mode not persisting**
- Solution: Implement localStorage save in PSThemeToggle component

**Issue: Logs not auto-updating**
- Solution: Verify useEffect cleanup functions are running correctly

**Issue: Mobile menu stuck open**
- Solution: Check z-index hierarchy and overlay click handler

**Issue: Counter animations janky**
- Solution: Ensure Motion library is properly imported from `motion/react`

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test on mobile, tablet, desktop
4. Test dark mode
5. Submit PR with screenshots

### Code Style
- Use TypeScript types for all props
- Follow existing component patterns
- Add comments for complex logic
- Use Tailwind utility classes
- Keep components < 300 lines

---

## 📄 License

MIT License - Feel free to use in personal/commercial projects.

---

## 👨‍💻 Author

**Figma Make AI Assistant**  
Version: 1.0.0  
Last Updated: December 29, 2025

---

## 🙏 Acknowledgments

- **React Team** - Amazing framework
- **Tailwind Labs** - Utility-first CSS
- **Recharts** - Beautiful charts
- **Lucide** - Clean icon set
- **Motion** - Smooth animations

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review component examples in `App.tsx`
3. Inspect browser console for errors
4. Verify all dependencies installed correctly

---

**Happy Monitoring! 🚀**
#   F r o n t E n d C o M o S i  
 