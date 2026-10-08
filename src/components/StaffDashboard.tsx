import React, { useState, useMemo } from 'react';
import {
  Package,
  Truck,
  Building2,
  Bike,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  RefreshCw,
  ExternalLink,
  Zap,
  ArrowRightLeft,
  ChevronRight,
  Layers,
  MapPin
} from 'lucide-react';
import { useParcels } from '../context/ParcelContext';
import { Parcel, ParcelStage, PARCEL_STAGES } from '../types/parcel';
import { SortField, SortDirection } from '../algorithms/mergeSort';
import { NewParcelModal } from './NewParcelModal';
import { UpdateStatusModal } from './UpdateStatusModal';

export const StaffDashboard: React.FC = () => {
  const {
    parcels,
    sortParcelsWithMergeSort,
    lastSortBenchmark,
    runSearchBenchmark,
    lastSearchBenchmark,
    setActiveView,
    setSelectedTrackingIdForCustomer,
    enqueueParcelToHub,
    sortingQueue
  } = useParcels();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('trackingId');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateModalParcel, setUpdateModalParcel] = useState<Parcel | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Trigger Merge Sort whenever sort parameters change or parcels change
  const sortedParcels = useMemo(() => {
    const { sorted } = sortParcelsWithMergeSort(sortField, sortDirection);
    return sorted;
  }, [parcels, sortField, sortDirection, sortParcelsWithMergeSort]);

  // Apply search and status filter
  const displayedParcels = useMemo(() => {
    let list = sortedParcels;

    if (selectedFilter !== 'ALL') {
      list = list.filter((p) => p.currentStatus === selectedFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toUpperCase();
      list = list.filter(
        (p) =>
          p.trackingId.toUpperCase().includes(q) ||
          p.customerName.toUpperCase().includes(q) ||
          p.destinationCity.toUpperCase().includes(q)
      );
    }

    return list;
  }, [sortedParcels, selectedFilter, searchQuery]);

  // KPI counts
  const totalCount = parcels.length;
  const inTransitCount = parcels.filter((p) => p.currentStatus === 'In Transit').length;
  const sortingCenterCount = parcels.filter((p) => p.currentStatus === 'At Sorting Center').length;
  const outForDeliveryCount = parcels.filter((p) => p.currentStatus === 'Out for Delivery').length;
  const deliveredCount = parcels.filter((p) => p.currentStatus === 'Delivered').length;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearchInput = (val: string) => {
    setSearchQuery(val);
    if (val.trim()) {
      runSearchBenchmark(val.trim());
    }
  };

  const handleQuickCustomerView = (trackingId: string) => {
    setSelectedTrackingIdForCustomer(trackingId);
    setActiveView('customer');
  };

  const handleEnqueue = (trackingId: string) => {
    const ok = enqueueParcelToHub(trackingId);
    if (ok) {
      showNotification(`Enqueued ${trackingId} to Sorting Center Hub FIFO queue!`);
    }
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hr ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Sub-Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Staff Logistics Console</h1>
          <p className="text-xs text-slate-400">
            Stage management, hash-based lookups, and O(n log n) Merge Sort parcel indexing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Parcel</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* 5 KPI Stat Cards matching Hackathon brief */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Parcels */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Parcels</span>
            <Package className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{totalCount}</div>
          <div className="text-[11px] text-slate-400">Indexed in hash table</div>
        </div>

        {/* In Transit */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>In Transit</span>
            <Truck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">
            {inTransitCount}
          </div>
          <div className="text-[11px] text-slate-400">Intercity corridor</div>
        </div>

        {/* At Sorting Center */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>At Sorting Center</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
            {sortingCenterCount}
          </div>
          <div className="text-[11px] text-slate-400">Hub queues active</div>
        </div>

        {/* Out for Delivery */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Out for Delivery</span>
            <Bike className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
            {outForDeliveryCount}
          </div>
          <div className="text-[11px] text-slate-400">Last-mile couriers</div>
        </div>

        {/* Delivered */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            {deliveredCount}
          </div>
          <div className="text-[11px] text-slate-400">Verified handoffs</div>
        </div>
      </div>

      {/* DAA Merge Sort Algorithmic Performance Banner */}
      {lastSortBenchmark && (
        <div className="bg-slate-900/80 border border-indigo-900/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                <span>DAA Merge Sort Algorithm Active</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  {lastSortBenchmark.complexity}
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Sorted by <strong className="text-slate-200">{lastSortBenchmark.key}</strong> ({sortDirection.toUpperCase()}) across{' '}
                <span className="font-mono text-white tabular-nums">{lastSortBenchmark.itemCount}</span> records.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">Comparisons</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {lastSortBenchmark.comparisons}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Merge Ops</span>
              <span className="text-indigo-400 font-bold tabular-nums">
                {lastSortBenchmark.mergeOperations}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Exec Duration</span>
              <span className="text-white font-bold tabular-nums">
                {lastSortBenchmark.timeMicroseconds} µs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter & Sort Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box with live comparisons */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search by Tracking ID (e.g. TRK1001), customer, or city..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && lastSearchBenchmark && (
              <div className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono">
                Hash: {lastSearchBenchmark.hashSearch.comparisons} comp | Linear:{' '}
                {lastSearchBenchmark.linearSearch.comparisons} comp
              </div>
            )}
          </div>

          {/* Merge Sort Field Selectors */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto text-xs">
            <span className="text-slate-400 text-[11px] px-2 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span>Sort:</span>
            </span>
            <button
              onClick={() => handleSortChange('trackingId')}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                sortField === 'trackingId'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tracking ID {sortField === 'trackingId' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('currentStatus')}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                sortField === 'currentStatus'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Stage {sortField === 'currentStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('estimatedDeliveryDate')}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                sortField === 'estimatedDeliveryDate'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Delivery Date {sortField === 'estimatedDeliveryDate' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('customerName')}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                sortField === 'customerName'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer {sortField === 'customerName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedFilter === 'ALL'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Parcels ({totalCount})
          </button>
          {PARCEL_STAGES.map((stage) => {
            const count = parcels.filter((p) => p.currentStatus === stage).length;
            return (
              <button
                key={stage}
                onClick={() => setSelectedFilter(stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedFilter === stage
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {stage} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* High-Density Parcel Table matching prompt spec */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Origin → Destination</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Location Checkpoint</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {displayedParcels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                    No parcels match the current filter or search criteria.
                  </td>
                </tr>
              ) : (
                displayedParcels.map((parcel) => {
                  const inQueue = sortingQueue.some((q) => q.parcel.trackingId === parcel.trackingId);

                  return (
                    <tr
                      key={parcel.trackingId}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Tracking ID */}
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400 tabular-nums">
                        <button
                          onClick={() => handleQuickCustomerView(parcel.trackingId)}
                          className="hover:underline flex items-center gap-1"
                          title="Open Customer View"
                        >
                          <span>{parcel.trackingId}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <span className="block text-[10px] font-sans font-normal text-slate-400">
                          {parcel.priority} · {parcel.weightKg}kg
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{parcel.customerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{parcel.customerPhone}</div>
                      </td>

                      {/* Route */}
                      <td className="py-3 px-4 text-slate-300">
                        <span>{parcel.sourceCity}</span>
                        <span className="text-slate-400 mx-1.5">→</span>
                        <span className="font-medium text-white">{parcel.destinationCity}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            parcel.currentStatus === 'Delivered'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : parcel.currentStatus === 'Out for Delivery'
                              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                              : parcel.currentStatus === 'In Transit'
                              ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/30'
                              : parcel.currentStatus === 'At Sorting Center'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              parcel.currentStatus === 'Delivered'
                                ? 'bg-emerald-400'
                                : parcel.currentStatus === 'Out for Delivery'
                                ? 'bg-cyan-400'
                                : parcel.currentStatus === 'In Transit'
                                ? 'bg-indigo-400'
                                : 'bg-amber-400'
                            }`}
                          />
                          {parcel.currentStatus}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-slate-300 max-w-[200px] truncate" title={parcel.currentLocation}>
                        <div className="truncate">{parcel.currentLocation}</div>
                      </td>

                      {/* Updated */}
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px] tabular-nums whitespace-nowrap">
                        {formatRelativeTime(parcel.updatedAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Update Status button */}
                          <button
                            onClick={() => setUpdateModalParcel(parcel)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 hover:border-slate-600 rounded text-xs font-medium transition-colors"
                            title="Advance delivery stage"
                          >
                            Update
                          </button>

                          {/* Enqueue to Sorting Center button */}
                          {parcel.currentStatus === 'At Sorting Center' && !inQueue && (
                            <button
                              onClick={() => handleEnqueue(parcel.trackingId)}
                              className="px-2 py-1 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 rounded text-xs transition-colors"
                              title="Enqueue to Hub Queue"
                            >
                              Enqueue
                            </button>
                          )}

                          {/* Track button */}
                          <button
                            onClick={() => handleQuickCustomerView(parcel.trackingId)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                            title="Open in customer tracking"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-950/60 px-4 py-2.5 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>
            Showing <strong className="text-white">{displayedParcels.length}</strong> of{' '}
            <strong className="text-white">{parcels.length}</strong> total parcels
          </span>
          <span className="font-mono text-[11px]">
            Data structures: Hash Table O(1) · Merge Sort O(n log n) · Queue FIFO O(1)
          </span>
        </div>
      </div>

      {/* Modals */}
      <NewParcelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={(id) => {
          showNotification(`Created parcel ${id} successfully!`);
          handleQuickCustomerView(id);
        }}
      />

      <UpdateStatusModal
        parcel={updateModalParcel}
        isOpen={!!updateModalParcel}
        onClose={() => setUpdateModalParcel(null)}
        onSuccess={(id, newStage) => {
          showNotification(`Updated ${id} stage to ${newStage}!`);
        }}
      />
    </div>
  );
};
