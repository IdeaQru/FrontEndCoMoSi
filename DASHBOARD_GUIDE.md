# Photosensor Monitoring Dashboard - User Guide

## 🎯 Overview

Dashboard real-time untuk monitoring sistem photosensor dengan update otomatis, animasi smooth, dan responsive design yang sempurna untuk semua device.

---

## 📊 Fitur Utama

### 1. **Fixed Header** (70px height)
- **Left**: Logo (hide pada mobile) + System Title
- **Center**: Real-time Clock & Connection Status
- **Right**: Theme Toggle, Settings, User Profile
- **Mobile**: Burger menu dengan slide-in navigation
- **Background**: Gradient #1e88e5 → #1976d2

### 2. **Real-time Sensor Cards**
#### Input Sensor Card
- Border color: Blue (#2196f3)
- Large counter display (56px font)
- Status badge ON/OFF dengan pulse animation
- Auto-increment setiap 2 detik (simulasi)
- Hover effect: Shadow increase + translate up

#### Output Sensor Card
- Border color: Orange (#ff9800)
- Same features sebagai Input Sensor
- Independent counter & status

#### Connection Status Bar
- Green pulse indicator saat connected
- Last update timestamp
- Auto-update real-time

### 3. **System Overview - Quick Stats**
4 Stat Cards dalam grid responsive:
- Total Input Counts
- Total Output Counts
- System Uptime (HH:MM:SS format)
- Last Update timestamp

### 4. **24-Hour Activity Chart**
- Dual-line chart (Input vs Output)
- X-axis: Hours (0-23)
- Y-axis: Count values
- Legend dengan icon
- Tooltip on hover
- Auto-refresh setiap 5 menit
- Responsive container

---

## 🎨 Design Specifications

### Colors
```css
Primary Blue:   #1e88e5
Accent Yellow:  #ffc107
Success Green:  #4caf50
Error Red:      #f44336
Warning Orange: #ff9800
Info Blue:      #2196f3
```

### Background
```css
Light Mode: Linear gradient #FFF8DC → #FFE4B5
Dark Mode:  Linear gradient #1a1a1a → #2d2d2d
```

### Typography
- Heading: Poppins / Inter
- Body: Inter / Segoe UI
- Counter: 56px bold
- Stats: 36-48px bold
- Labels: 12-14px regular

---

## 📱 Responsive Breakpoints

### Desktop (≥1200px)
- 2-column sensor cards
- 4-column stat cards
- Full navigation in header

### Tablet (768px - 1199px)
- 2-column sensor cards
- 2-column stat cards
- Compact header

### Mobile (320px - 767px)
- 1-column all cards
- Burger menu navigation
- Stacked layout
- Mobile time display below header

---

## ⚡ Real-time Features

### Auto-Updates
```javascript
Counter Updates:  Every 2 seconds
Clock Updates:    Every 1 second
Chart Refresh:    Every 5 minutes
Status Toggle:    Random (demo mode)
Connection Check: Every 10 seconds
```

### Animations
```css
Counter Increment:  300ms ease-out scale + color
Status Badge:       200ms color transition
Card Hover:         200ms transform + shadow
Fade In:            300ms ease-in-out
Pulse:              2s infinite
```

---

## 🔧 Technical Stack

### Dependencies
- **React 18.3**: Core framework
- **Motion/React**: Smooth animations (Framer Motion)
- **Recharts 2.15**: Chart library
- **Lucide React**: Icon library
- **Tailwind CSS 4.1**: Styling system

### State Management
```typescript
counterInput:    number    // Input sensor count
counterOutput:   number    // Output sensor count
statusInput:     boolean   // Input sensor status
statusOutput:    boolean   // Output sensor status
currentTime:     Date      // Real-time clock
systemUptime:    number    // Uptime in seconds
chartData:       array     // 24-hour chart data
isConnected:     boolean   // Connection status
lastUpdate:      Date      // Last update timestamp
```

---

## 🎭 Interactive Elements

### Header Actions
- **Theme Toggle**: Switch between light/dark mode
- **Settings**: Opens settings modal (placeholder)
- **User Profile**: Opens user menu (placeholder)
- **Mobile Menu**: Slide-in navigation dari kiri

### Sensor Cards
- **Hover**: Shadow increase + slight lift
- **Counter**: Animates on increment
- **Status Badge**: Pulse when ON, static when OFF

### Chart
- **Tooltip**: Show values on hover
- **Legend**: Toggle line visibility
- **Responsive**: Auto-resize dengan container

---

## 🚀 Future Enhancements

### Suggested Features
1. **WebSocket Integration**
   - Replace mock data dengan real sensor data
   - Bidirectional communication

2. **Historical Data**
   - Date range picker
   - Export to CSV/PDF
   - Detailed analytics

3. **Alerts & Notifications**
   - Threshold-based alerts
   - Email/SMS notifications
   - Alert history log

4. **Multi-sensor Support**
   - Sensor management panel
   - Add/remove sensors dynamically
   - Individual sensor configuration

5. **Advanced Analytics**
   - Predictive analytics
   - Anomaly detection
   - Performance reports

---

## 📖 Usage Example

```tsx
// App.tsx adalah entry point
import App from './app/App';

// Dashboard sudah fully configured dan siap pakai
// Semua updates berjalan otomatis
// Tidak perlu konfigurasi tambahan

// Untuk customize:
// 1. Ubah update interval di useEffect hooks
// 2. Ganti mock data dengan real API calls
// 3. Tambahkan komponen baru dari design system
```

---

## 🐛 Troubleshooting

### Issue: Counter tidak update
**Solution**: Check browser console untuk errors. Pastikan useEffect cleanup berjalan dengan baik.

### Issue: Chart tidak responsive
**Solution**: Pastikan ResponsiveContainer mendapat width dari parent. Check CSS container width.

### Issue: Dark mode tidak apply
**Solution**: Pastikan PSThemeToggle component terhubung dengan theme provider. Check localStorage untuk theme persistence.

### Issue: Animation lag
**Solution**: Reduce update frequency atau disable animations untuk low-end devices. Check motion.dev documentation untuk performance optimization.

---

## 📝 Notes

- Dashboard menggunakan **mock data** untuk demonstrasi
- Real-time updates adalah **simulasi** menggunakan setInterval
- Status changes adalah **random** untuk demo purposes
- Untuk production: Replace mock dengan real API calls
- Semua komponen sudah **TypeScript ready**
- Full **dark mode support** included
- **Accessibility**: Semantic HTML, ARIA labels ready to add

---

## 📚 Related Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Komponen library lengkap
- [QUICK_START.md](./QUICK_START.md) - Setup & installation guide
- [Motion Documentation](https://motion.dev) - Animation library docs
- [Recharts Guide](https://recharts.org) - Chart library docs

---

**Version**: 1.0.0  
**Last Updated**: December 29, 2025  
**Author**: Figma Make AI Assistant  
**License**: MIT
