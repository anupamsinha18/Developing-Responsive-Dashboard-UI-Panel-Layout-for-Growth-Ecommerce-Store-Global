# Developing-Responsive-Dashboard-UI-Panel-Layout-for-Growth-Ecommerce-Store-Global

A responsive, high-performance React dashboard UI panel developed with Vite for internal ecommerce operations. Built for **Growth Wellness Store** adhering to an organic wellness aesthetic with earthy botanical tones, clean typography, modular component hierarchy, and dynamic dataset calculations.

---

## 🌿 Overview & Key Deliverables

- **Responsive Layout Shell**: Sticky, non-scrolling dark forest sidebar (`Sidebar.jsx`), contextual operations header (`Header.jsx`), and responsive main content grid.
- **Dynamic KPI StatCards**: Reusable `StatCard.jsx` computing live sales statistics from `INPUT_FILES/react_starter/src/data/transactions.json`:
  - **Gross revenue**: `₹ 66,065` (sum of `amountINR` for `Completed` transactions only)
  - **Completed orders**: `53` (count of `Completed` orders)
  - **Units sold**: `85` (sum of `quantity` for `Completed` orders)
  - **Pending orders**: `19` (count of `Pending` orders requiring review)
- **Visual Analytics**:
  - `RevenueTrend.jsx`: Clean SVG trendline illustrating weekly completed order volume.
  - `ChannelBreakdown.jsx`: Multi-channel order distribution (Website: 17, Mobile App: 16, Marketplace: 20) with semantic progress bars.
- **Data-Driven Transaction Table**:
  - `TransactionTable.jsx`: 96 records loaded from JSON with multi-criteria filtering (Status & Channel), text search (ID, product, customer), sortable columns, and 10 rows/page pagination.
- **Organic Wellness Aesthetic**:
  - Cohesive palette: Forest `#173F35`, Leaf `#4D8A64`, Sage `#6A9A7B`, Canvas `#F4F7F2`, White `#FFFFFF`, Divider `#DFE8DF`, Highlight `#D7AE62`.
  - **Zero inline styles**: 100% organized modular CSS stylesheets.

---

## 📁 Component Architecture

```
INPUT_FILES/react_starter/
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite build config
├── index.html                    # HTML entry point with Inter font
├── src/
│   ├── App.jsx                   # Main application shell & state orchestration
│   ├── main.jsx                  # React 18 DOM mount
│   ├── data.js                   # External transaction dataset export
│   ├── data/
│   │   └── transactions.json     # 96 synthetic transaction records
│   ├── components/
│   │   ├── Sidebar.jsx           # Fixed/Sticky navigation bar & mobile drawer
│   │   ├── Header.jsx            # Page title, subtitle, date badge, mobile toggle
│   │   ├── StatCard.jsx          # Reusable metric card component
│   │   ├── RevenueTrend.jsx      # SVG weekly trendline chart
│   │   ├── ChannelBreakdown.jsx  # Channel progress bars
│   │   └── TransactionTable.jsx  # Filterable, sortable, paginated data table
│   └── styles/
│       ├── global.css            # CSS variables, typography, reset, grid layouts
│       ├── Sidebar.css           # Sidebar navigation & sticky styles
│       ├── Header.css            # Page header & date pill badge styles
│       ├── StatCard.css          # Metric card styles & hover states
│       ├── Analytics.css         # Trend chart & channel progress bar styles
│       └── TransactionTable.css  # Table, filters, badges, and pagination styles
```

---

## 📊 Data Contracts & Formulas

| Metric | Rule | Value (from `transactions.json`) |
| :--- | :--- | :--- |
| **Gross revenue** | `sum(amountINR)` where `status === "Completed"` | **₹ 66,065** |
| **Completed orders** | `count(status === "Completed")` | **53** |
| **Units sold** | `sum(quantity)` where `status === "Completed"` | **85** |
| **Pending orders** | `count(status === "Pending")` | **19** |
| **Refunded orders** | `count(status === "Refunded")` | **13** |
| **Cancelled orders** | `count(status === "Cancelled")` | **11** |
| **Total records** | All imported records | **96** |

---

## 🛠️ Local Development & Build

```bash
# Navigate to the project directory
cd INPUT_FILES/react_starter

# Install dependencies
npm install

# Start local development server with HMR
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Responsive Breakpoints & Viewport Testing

| Viewport | Target Device | Layout Behavior | Verification Status |
| :--- | :--- | :--- | :--- |
| **1440px+** | Desktop Large | Fixed/Sticky 240px sidebar, 4 KPI cards row, 2-column analytics grid, full transaction table | ✅ Aligned & verified |
| **1024px** | Desktop / Tablet Landscape | Fixed sidebar or compact nav, 2x2 KPI grid, responsive table | ✅ Aligned & verified |
| **768px** | Tablet Portrait | Mobile top bar with hamburger drawer, 2x2 KPI grid, contained scrollable table | ✅ Aligned & verified |
| **390px / 320px** | Mobile | Stacked 1-col cards, drawer navigation, horizontally scrollable table container, **zero page overflow** | ✅ Zero overflow verified |
