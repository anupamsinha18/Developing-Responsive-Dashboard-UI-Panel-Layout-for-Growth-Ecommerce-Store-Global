import React from 'react';
import '../styles/StatCard.css';

/**
 * StatCard Component
 * Reusable metric card displaying a numeric KPI, descriptive label,
 * and supportive context helper text with organic wellness styling.
 *
 * @param {string} label - Title of the KPI metric
 * @param {string|number} value - Formatted numeric value
 * @param {string} subtitle - Contextual helper text (e.g. "Completed sales")
 * @param {string} [badge] - Optional status/trend badge
 * @param {React.ReactNode} [icon] - Optional decorative SVG icon
 */
export default function StatCard({ label, value, subtitle, badge, icon }) {
  return (
    <article className="statCard" aria-label={`${label}: ${value}`}>
      <div className="statCardHeader">
        <span className="statCardLabel">{label}</span>
        {icon && (
          <span className="statCardIcon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="statCardBody">
        <span className="statCardValue">{value}</span>
        {badge && <span className="statCardBadge">{badge}</span>}
      </div>

      {subtitle && <p className="statCardSubtitle">{subtitle}</p>}
    </article>
  );
}
