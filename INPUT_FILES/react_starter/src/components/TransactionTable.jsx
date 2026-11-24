import React, { useState, useMemo } from 'react';
import '../styles/TransactionTable.css';

/**
 * Format raw number into Indian Rupee currency string (INR)
 * e.g. 549 -> "₹549", 2697 -> "₹2,697"
 */
function formatINR(amount) {
  if (typeof amount !== 'number') return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * TransactionTable Component
 * Data-driven table displaying recent ecommerce transactions with client-side
 * Status and Channel filtering, search, sorting, and pagination.
 *
 * @param {Array} rows - Array of transaction objects conforming to data_contract.json
 */
export default function TransactionTable({ rows = [] }) {
  // Client-side filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state (default: newest date first)
  const [sortField, setSortField] = useState('date');
  const [sortAscending, setSortAscending] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter options with dynamic counts
  const statusOptions = useMemo(() => {
    return [
      { id: 'All', label: 'All statuses', count: rows.length },
      { id: 'Completed', label: 'Completed', count: rows.filter((r) => r.status === 'Completed').length },
      { id: 'Pending', label: 'Pending', count: rows.filter((r) => r.status === 'Pending').length },
      { id: 'Refunded', label: 'Refunded', count: rows.filter((r) => r.status === 'Refunded').length },
      { id: 'Cancelled', label: 'Cancelled', count: rows.filter((r) => r.status === 'Cancelled').length },
    ];
  }, [rows]);

  const channelOptions = useMemo(() => {
    return [
      { id: 'All', label: 'All channels' },
      { id: 'Website', label: 'Website' },
      { id: 'Mobile App', label: 'Mobile App' },
      { id: 'Marketplace', label: 'Marketplace' },
    ];
  }, []);

  // Filter and sort transactions
  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => {
        // Status filter
        if (statusFilter !== 'All' && row.status !== statusFilter) {
          return false;
        }
        // Channel filter
        if (channelFilter !== 'All' && row.channel !== channelFilter) {
          return false;
        }
        // Search query filter (matches ID, product, or customer)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const matchesId = row.transactionId?.toLowerCase().includes(query);
          const matchesProduct = row.productName?.toLowerCase().includes(query);
          const matchesCustomer = row.customerId?.toLowerCase().includes(query);
          if (!matchesId && !matchesProduct && !matchesCustomer) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'amountINR') {
          return sortAscending ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string') {
          return sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
  }, [rows, statusFilter, channelFilter, searchQuery, sortField, sortAscending]);

  // Reset to first page when filters change
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const startIndex = (activePage - 1) * rowsPerPage;
    return filteredRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRows, activePage, rowsPerPage]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleChannelChange = (e) => {
    setChannelFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setChannelFilter('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const isFiltered = statusFilter !== 'All' || channelFilter !== 'All' || searchQuery.trim() !== '';

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false); // default descending
    }
  };

  return (
    <section id="recent-transactions" className="transactionSection" aria-label="Recent transactions table">
      <div className="sectionHeader">
        <div className="headerLeftGroup">
          <h2 className="sectionTitle">Recent transactions</h2>
          <span className="recordBadge">
            {filteredRows.length} {filteredRows.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        {/* Filter Controls Bar */}
        <div className="filterControlsBar">
          {/* Search Input */}
          <div className="searchBox">
            <svg
              className="searchIcon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search ID or product..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="searchInput"
              aria-label="Search transactions"
            />
            {searchQuery && (
              <button
                type="button"
                className="clearSearchBtn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                &times;
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="selectWrapper">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="filterSelect"
              aria-label="Filter by transaction status"
            >
              {statusOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.id === 'All' ? 'Filter by status' : `${opt.label} (${opt.count})`}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Filter Dropdown */}
          <div className="selectWrapper">
            <select
              value={channelFilter}
              onChange={handleChannelChange}
              className="filterSelect"
              aria-label="Filter by sales channel"
            >
              {channelOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.id === 'All' ? 'All channels' : opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              type="button"
              className="resetFilterBtn"
              onClick={resetFilters}
              title="Clear all active filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Responsive Horizontal Table Container */}
      <div className="tableScrollContainer">
        <table className="transactionTable">
          <thead>
            <tr>
              <th scope="col" className="colTransaction">
                <button
                  type="button"
                  className="sortBtn"
                  onClick={() => handleSort('transactionId')}
                >
                  Transaction
                  {sortField === 'transactionId' && (
                    <span className="sortIndicator">{sortAscending ? ' ▲' : ' ▼'}</span>
                  )}
                </button>
              </th>
              <th scope="col" className="colDate">
                <button
                  type="button"
                  className="sortBtn"
                  onClick={() => handleSort('date')}
                >
                  Date
                  {sortField === 'date' && (
                    <span className="sortIndicator">{sortAscending ? ' ▲' : ' ▼'}</span>
                  )}
                </button>
              </th>
              <th scope="col" className="colProduct">
                Product
              </th>
              <th scope="col" className="colAmount">
                <button
                  type="button"
                  className="sortBtn"
                  onClick={() => handleSort('amountINR')}
                >
                  Amount
                  {sortField === 'amountINR' && (
                    <span className="sortIndicator">{sortAscending ? ' ▲' : ' ▼'}</span>
                  )}
                </button>
              </th>
              <th scope="col" className="colChannel">
                Channel
              </th>
              <th scope="col" className="colStatus">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan="6" className="emptyStateCell">
                  <div className="emptyStateContent">
                    <p className="emptyMessage">No transactions found matching the selected filters.</p>
                    <button
                      type="button"
                      className="resetEmptyBtn"
                      onClick={resetFilters}
                    >
                      Clear active filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row) => (
                <tr key={row.transactionId} className="tableRow">
                  <td className="colTransaction">
                    <span className="transactionIdText">{row.transactionId}</span>
                  </td>
                  <td className="colDate">
                    <span className="dateText">{row.date}</span>
                  </td>
                  <td className="colProduct">
                    <div className="productCell">
                      <span className="productNameText">{row.productName}</span>
                      {row.quantity > 1 && (
                        <span className="productQtyBadge">Qty: {row.quantity}</span>
                      )}
                    </div>
                  </td>
                  <td className="colAmount">
                    <span className="amountText">{formatINR(row.amountINR)}</span>
                  </td>
                  <td className="colChannel">
                    <span className="channelBadge">{row.channel}</span>
                  </td>
                  <td className="colStatus">
                    <span className={`statusPill statusPill--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredRows.length > 0 && (
        <div className="tablePaginationFooter">
          <div className="paginationInfo">
            Showing{' '}
            <span className="paginationHighlight">
              {(activePage - 1) * rowsPerPage + 1}–
              {Math.min(activePage * rowsPerPage, filteredRows.length)}
            </span>{' '}
            of <span className="paginationHighlight">{filteredRows.length}</span> transactions
          </div>

          <div className="paginationControls">
            <button
              type="button"
              className="pageBtn pageBtnNav"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`pageBtn pageBtnNumber ${activePage === pageNum ? 'pageBtnActive' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
                aria-current={activePage === pageNum ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              className="pageBtn pageBtnNav"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
