import React, { useState, useMemo } from 'react';
import { transactions } from './data.js';

import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatCard from './components/StatCard.jsx';
import RevenueTrend from './components/RevenueTrend.jsx';
import ChannelBreakdown from './components/ChannelBreakdown.jsx';
import TransactionTable from './components/TransactionTable.jsx';

import './styles/Analytics.css';

/**
 * Growth Wellness Store — Sales Dashboard
 * Single-page responsive operations dashboard visualizing sales statistics,
 * weekly revenue trends, sales channel breakdown, and transaction logs.
 */
export default function App() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derive KPI calculations according to data contract:
  // - Revenue: sum amountINR for Completed transactions only
  // - Completed orders: count Completed transactions only
  // - Units sold: sum quantity for Completed transactions only
  // - Pending orders: count Pending transactions only
  const kpiData = useMemo(() => {
    const completedTxns = transactions.filter((t) => t.status === 'Completed');
    const pendingTxns = transactions.filter((t) => t.status === 'Pending');

    const grossRevenue = completedTxns.reduce((sum, t) => sum + (t.amountINR || 0), 0);
    const completedOrders = completedTxns.length;
    const unitsSold = completedTxns.reduce((sum, t) => sum + (t.quantity || 0), 0);
    const pendingOrders = pendingTxns.length;

    return {
      grossRevenue: `₹ ${grossRevenue.toLocaleString('en-IN')}`,
      completedOrders,
      unitsSold,
      pendingOrders,
    };
  }, []);

  return (
    <div className="appShell">
      {/* Primary Sidebar Navigation */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="mainContentArea">
        <Header
          title="Sales overview"
          description="Monitor orders and customer demand across your wellness store"
          dateRange="01 Aug — 12 Nov"
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="dashboardMain" id="main-content">
          {/* Top 4 Key Performance Indicators */}
          <section className="kpiGrid" aria-label="Key performance indicators">
            <StatCard
              label="Gross revenue"
              value={kpiData.grossRevenue}
              subtitle="Completed sales"
            />
            <StatCard
              label="Completed orders"
              value={kpiData.completedOrders}
              subtitle="Paid transactions"
            />
            <StatCard
              label="Units sold"
              value={kpiData.unitsSold}
              subtitle="Completed orders"
            />
            <StatCard
              label="Pending orders"
              value={kpiData.pendingOrders}
              subtitle="Requires review"
            />
          </section>

          {/* Revenue Trend and Channel Breakdown Charts */}
          <section className="analyticsGrid" aria-label="Revenue analytics and channel distribution">
            <RevenueTrend transactions={transactions} />
            <ChannelBreakdown transactions={transactions} />
          </section>

          {/* Transactions Log Table */}
          <TransactionTable rows={transactions} />
        </main>
      </div>
    </div>
  );
}
