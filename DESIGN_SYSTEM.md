# Photosensor Monitoring Dashboard - Design System

Complete design system untuk Photosensor Monitoring Dashboard dengan React dan Tailwind CSS.

## 🎨 Color Palette

### Light Mode
- **Primary**: `#1e88e5` - Blue untuk headers dan buttons utama
- **Accent**: `#ffc107` - Warm Yellow untuk highlights dan alerts
- **Success**: `#4caf50` - Green untuk status success
- **Error**: `#f44336` - Red untuk error states
- **Warning**: `#ff9800` - Orange untuk warnings
- **Info**: `#2196f3` - Light blue untuk informasi
- **Background**: Linear gradient `#FFF8DC` to `#FFE4B5` (Warm cream)
- **Surface**: `#ffffff` - White cards
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Border**: `#e0e0e0`

### Dark Mode
- Automatic dark mode variants dengan adjusted colors
- Toggle menggunakan `PSThemeToggle` component

## 📝 Typography

- **Heading Font**: Poppins (modern, clean)
- **Body Font**: Inter (professional, readable)
- **Heading 1**: 32px, Bold
- **Heading 2**: 24px, Semibold
- **Heading 3**: 18px, Semibold
- **Body**: 14px, Regular
- **Small**: 12px, Regular

## 📦 Components

### 1. PSHeader
Header bar dengan logo, title, dan subtitle.

```tsx
import { PSHeader } from './components/photosensor';

<PSHeader 
  title="Photosensor Monitoring System"
  subtitle="Real-time monitoring and analytics"
  showLogo={true}
/>
```

**Props:**
- `title?: string` - Main title
- `subtitle?: string` - Subtitle text
- `showLogo?: boolean` - Show/hide logo icon

---

### 2. PSCard
White card dengan border kiri berwarna, shadow, dan hover effect.

```tsx
import { PSCard } from './components/photosensor';

<PSCard borderColor="primary" hover={true}>
  {/* Your content */}
</PSCard>
```

**Props:**
- `borderColor?: 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info'`
- `hover?: boolean` - Enable hover effect
- `onClick?: () => void` - Click handler
- `className?: string` - Additional CSS classes

---

### 3. PSStatCard
Card untuk menampilkan statistik dengan angka besar, icon, dan trend.

```tsx
import { PSStatCard } from './components/photosensor';
import { TrendingUp } from 'lucide-react';

<PSStatCard
  label="Total Inputs"
  value="1,234"
  icon={TrendingUp}
  borderColor="primary"
  trend={{ value: 12.5, isPositive: true }}
  loading={false}
/>
```

**Props:**
- `label: string` - Label text
- `value: string | number` - Main value to display
- `icon?: LucideIcon` - Icon component
- `borderColor?: 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info'`
- `trend?: { value: number, isPositive: boolean }` - Trend indicator
- `loading?: boolean` - Show loading skeleton

---

### 4. PSStatusBadge
Badge untuk menampilkan status dengan warna dan pulse animation.

```tsx
import { PSStatusBadge } from './components/photosensor';

<PSStatusBadge status="on" pulse={true} size="md" />
```

**Props:**
- `status: 'on' | 'off' | 'warning' | 'error' | 'info'`
- `label?: string` - Custom label text
- `pulse?: boolean` - Enable pulse animation
- `size?: 'sm' | 'md' | 'lg'`

**Status Colors:**
- `on` - Green (active/success)
- `off` - Red (inactive/error)
- `warning` - Yellow/Amber
- `error` - Red
- `info` - Blue

---

### 5. PSNavigationFooter
Bottom navigation dengan 3 tabs: Dashboard, Monitor, Logs.

```tsx
import { PSNavigationFooter } from './components/photosensor';

<PSNavigationFooter 
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

**Props:**
- `activeTab: string` - Current active tab ID
- `onTabChange: (tabId: string) => void` - Tab change handler

**Tab IDs:**
- `'dashboard'`
- `'monitor'`
- `'logs'`

---

### 6. PSChart
Line/Area chart untuk historical data menggunakan Recharts.

```tsx
import { PSChart } from './components/photosensor';

const data = [
  { name: '00:00', value: 245 },
  { name: '04:00', value: 312 },
  // ...
];

<PSChart
  data={data}
  title="Light Intensity (24h)"
  type="area"
  dataKey="value"
  color="var(--ps-primary)"
  height={300}
  loading={false}
/>
```

**Props:**
- `data: ChartDataPoint[]` - Chart data
- `title?: string` - Chart title
- `type?: 'line' | 'area'` - Chart type
- `dataKey?: string` - Key for Y-axis data
- `color?: string` - Line/Area color
- `height?: number` - Chart height in pixels
- `showGrid?: boolean` - Show/hide grid
- `showLegend?: boolean` - Show/hide legend
- `loading?: boolean` - Show loading skeleton

---

### 7. PSTable
Table dengan alternating row colors dan responsive design.

```tsx
import { PSTable } from './components/photosensor';

const columns = [
  { key: 'id', label: 'ID', align: 'left' },
  { key: 'name', label: 'Name', align: 'left' },
  { 
    key: 'status', 
    label: 'Status', 
    align: 'center',
    render: (value) => <PSStatusBadge status={value} />
  },
];

<PSTable
  columns={columns}
  data={data}
  title="System Logs"
  loading={false}
/>
```

**Props:**
- `columns: Column[]` - Column definitions
- `data: any[]` - Table data
- `title?: string` - Table title
- `loading?: boolean` - Show loading skeleton
- `emptyMessage?: string` - Message when no data

**Column Interface:**
```tsx
interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}
```

---

### 8. PSButton
Button dengan berbagai variants dan states.

```tsx
import { PSButton } from './components/photosensor';
import { Download } from 'lucide-react';

<PSButton
  variant="primary"
  size="md"
  icon={Download}
  iconPosition="left"
  onClick={() => {}}
  disabled={false}
  loading={false}
  fullWidth={false}
>
  Download
</PSButton>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning'`
- `size?: 'sm' | 'md' | 'lg'`
- `icon?: LucideIcon` - Icon component
- `iconPosition?: 'left' | 'right'`
- `disabled?: boolean`
- `loading?: boolean` - Show loading spinner
- `fullWidth?: boolean` - Full width button
- `onClick?: () => void`
- `type?: 'button' | 'submit' | 'reset'`

---

### 9. PSInput
Input field dengan label, error state, dan icon.

```tsx
import { PSInput } from './components/photosensor';
import { Search } from 'lucide-react';

<PSInput
  label="Search"
  type="text"
  placeholder="Enter search query"
  value={value}
  onChange={setValue}
  error={error}
  icon={Search}
  disabled={false}
  required={false}
  fullWidth={true}
/>
```

**Props:**
- `label?: string`
- `type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'`
- `placeholder?: string`
- `value?: string`
- `onChange?: (value: string) => void`
- `error?: string` - Error message
- `disabled?: boolean`
- `required?: boolean`
- `icon?: LucideIcon`
- `fullWidth?: boolean`

---

### 10. PSSelect
Select dropdown dengan label dan error state.

```tsx
import { PSSelect } from './components/photosensor';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<PSSelect
  label="Choose Option"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select..."
  error={error}
  disabled={false}
  required={false}
  fullWidth={true}
/>
```

**Props:**
- `label?: string`
- `options: SelectOption[]` - Array of options
- `value?: string`
- `onChange?: (value: string) => void`
- `placeholder?: string`
- `error?: string`
- `disabled?: boolean`
- `required?: boolean`
- `fullWidth?: boolean`

---

### 11. PSLoadingSpinner
Loading spinner dengan berbagai ukuran dan warna.

```tsx
import { PSLoadingSpinner } from './components/photosensor';

<PSLoadingSpinner
  size="md"
  color="primary"
  fullScreen={false}
  message="Loading..."
/>
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'`
- `color?: 'primary' | 'accent' | 'success' | 'white'`
- `fullScreen?: boolean` - Full screen overlay
- `message?: string` - Loading message

---

### 12. PSAlert
Alert box untuk info, warning, error, dan success messages.

```tsx
import { PSAlert } from './components/photosensor';

<PSAlert
  type="success"
  title="Success"
  message="Operation completed successfully."
  dismissible={true}
  onDismiss={() => {}}
/>
```

**Props:**
- `type: 'info' | 'warning' | 'success' | 'error'`
- `title?: string`
- `message: string`
- `dismissible?: boolean`
- `onDismiss?: () => void`

---

### 13. PSModal
Modal dialog untuk settings atau detail view.

```tsx
import { PSModal, PSButton } from './components/photosensor';

<PSModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  size="md"
  footer={
    <>
      <PSButton variant="secondary" onClick={onClose}>Cancel</PSButton>
      <PSButton variant="primary" onClick={onSave}>Save</PSButton>
    </>
  }
>
  {/* Modal content */}
</PSModal>
```

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `title: string`
- `children: React.ReactNode`
- `footer?: React.ReactNode`
- `size?: 'sm' | 'md' | 'lg' | 'xl'`

---

### 14. PSThemeToggle
Toggle button untuk light/dark mode.

```tsx
import { PSThemeToggle } from './components/photosensor';

<PSThemeToggle />
```

**Props:** None

**Features:**
- Auto-detects initial theme
- Persists theme to localStorage
- Smooth transition between modes

---

## 🎯 Layout & Spacing

### Container
- Max-width: `1200px` (using `max-w-7xl`)
- Responsive padding: `px-4 sm:px-6 lg:px-8`

### Spacing System
- `--ps-spacing-xs`: 8px
- `--ps-spacing-sm`: 12px
- `--ps-spacing-md`: 16px
- `--ps-spacing-lg`: 24px
- `--ps-spacing-xl`: 32px
- `--ps-spacing-2xl`: 48px

### Border Radius
- `--ps-radius-sm`: 4px
- `--ps-radius-md`: 8px (cards)
- `--ps-radius-lg`: 12px (buttons)
- `--ps-radius-xl`: 16px

### Shadows
- `--ps-shadow`: 0 2px 8px rgba(0,0,0,0.1)
- `--ps-shadow-lg`: 0 4px 16px rgba(0,0,0,0.15)

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

All components are fully responsive with mobile-first approach.

---

## 🌗 Dark Mode

Dark mode tersedia untuk semua components dengan:
- Automatic color adjustments
- Smooth transitions
- Persisted preference
- Toggle menggunakan `PSThemeToggle`

Untuk mengaktifkan dark mode secara manual:
```js
document.documentElement.classList.add('dark');
```

---

## 🚀 Usage

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
} from './components/photosensor';
```

### Basic Dashboard Example

```tsx
function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen ps-gradient-bg pb-20">
      <PSHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PSStatCard
            label="Active Sensors"
            value="24"
            icon={Activity}
            borderColor="primary"
          />
          {/* More content */}
        </div>
      </main>

      <PSNavigationFooter 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
```

---

## 🎨 Custom CSS Classes

### Utility Classes

```css
.ps-gradient-bg       /* Background gradient */
.ps-card-shadow       /* Card shadow */
.ps-card-shadow-lg    /* Large card shadow */
.ps-pulse             /* Pulse animation */
.ps-fade-in           /* Fade in animation */
```

### CSS Variables

Gunakan CSS variables untuk consistency:

```css
var(--ps-primary)
var(--ps-accent)
var(--ps-success)
var(--ps-error)
var(--ps-surface)
var(--ps-text-primary)
var(--ps-text-secondary)
var(--ps-border)
```

---

## 📦 Dependencies

- React 18.3.1
- Tailwind CSS 4.1.12
- Recharts 2.15.2
- Lucide React 0.487.0

---

## ✨ Features

✅ Fully responsive design (mobile, tablet, desktop)  
✅ Dark mode support dengan smooth transitions  
✅ Loading states untuk semua data components  
✅ Error states dan validations  
✅ Hover, active, dan disabled states  
✅ Pulse animations untuk status indicators  
✅ Accessible keyboard navigation  
✅ TypeScript ready dengan proper types  
✅ Production-ready components  
✅ Clean and modern design  

---

## 📄 License

Design system ini dibuat untuk Photosensor Monitoring Dashboard.

---

## 🤝 Contributing

Untuk menambahkan komponen baru atau modifikasi:
1. Buat komponen di `/src/app/components/photosensor/`
2. Export di `/src/app/components/photosensor/index.tsx`
3. Update dokumentasi
4. Test di semua breakpoints dan dark mode

---

**Happy Coding! 🚀**
