import React from 'react';
import '../styles/Sidebar.css';

/**
 * Sidebar Component
 * Primary navigation for internal operations dashboard.
 * Supports active route styling and responsive mobile drawer state.
 */
export default function Sidebar({
  activeNav = 'Overview',
  onSelectNav,
  isOpen = false,
  onClose,
}) {
  const navItems = [
    {
      id: 'Overview',
      label: 'Overview',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      id: 'Transactions',
      label: 'Transactions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: 'Customers',
      label: 'Customers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'Products',
      label: 'Products',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="sidebarBackdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebarOpen' : ''}`}
        aria-label="Primary navigation"
      >
        {/* Brand Logo Header */}
        <div className="sidebarBrand">
          <div className="brandLogoWrapper">
            <svg
              className="brandLogoMark"
              viewBox="0 0 54 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Botanical Leaf Silhouette matching brand asset */}
              <path
                d="M20 40 C-2 28 6 10 20 7 C20 19 24 28 20 40Z"
                fill="#6A9A7B"
              />
              <path
                d="M20 40 C15 19 25 3 41 5 C37 23 32 32 20 40Z"
                fill="#4D8A64"
              />
              <path
                d="M20 40 C26 22 35 15 47 18 C43 28 35 36 20 40Z"
                fill="#D7AE62"
              />
            </svg>
            <div className="brandText">
              <span className="brandName">growth.</span>
              <span className="brandSub">WELLNESS STORE</span>
            </div>
          </div>
          {/* Close button on mobile drawer */}
          <button
            className="sidebarCloseBtn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            &times;
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebarNav">
          <ul className="navList">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="navItem">
                  <button
                    type="button"
                    className={`navLink ${isActive ? 'navLinkActive' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      if (onSelectNav) onSelectNav(item.id);
                      if (onClose) onClose();
                    }}
                  >
                    <span className="navIcon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="navLabel">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Internal Operations Footer Badge */}
        <div className="sidebarFooter">
          <span className="footerBadge">INTERNAL OPERATIONS</span>
        </div>
      </aside>
    </>
  );
}
