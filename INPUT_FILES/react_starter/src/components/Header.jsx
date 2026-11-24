import React from 'react';
import '../styles/Header.css';

/**
 * Header Component
 * Top page header containing dashboard view title, operations description,
 * date-range window filter badge, and mobile drawer trigger.
 */
export default function Header({
  title = 'Sales overview',
  description = 'Monitor orders and customer demand across your wellness store',
  dateRange = '01 Aug — 12 Nov',
  onToggleSidebar,
}) {
  return (
    <header className="pageHeader">
      <div className="headerLeft">
        {/* Mobile menu trigger */}
        <button
          type="button"
          className="menuToggleBtn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="titleGroup">
          <h1 className="headerTitle">{title}</h1>
          <p className="headerDescription">{description}</p>
        </div>
      </div>

      <div className="headerRight">
        <div className="datePillBadge" title="Reporting time window">
          <svg
            className="calendarIcon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="datePillText">{dateRange}</span>
        </div>
      </div>
    </header>
  );
}
