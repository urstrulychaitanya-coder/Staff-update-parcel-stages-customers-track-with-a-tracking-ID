import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useParcels } from '../context/ParcelContext';
import { PARCEL_STAGES, ParcelStage } from '../types/parcel';

export const CustomerTracking: React.FC = () => {
  const {
    getParcelByTrackingId,
    runSearchBenchmark,
    selectedTrackingIdForCustomer,
    setSelectedTrackingIdForCustomer,
    parcels
  } = useParcels();

  const [inputVal, setInputVal] = useState(selectedTrackingIdForCustomer || 'TRK1001');
  const [activeTrackingId, setActiveTrackingId] = useState(selectedTrackingIdForCustomer || 'TRK1001');
  const [hasSearched, setHasSearched] = useState(true);

  const parcel = getParcelByTrackingId(activeTrackingId);
  const benchmark = runSearchBenchmark(activeTrackingId);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputVal.trim().toUpperCase();
    if (!clean) return;
    setActiveTrackingId(clean);
    setSelectedTrackingIdForCustomer(clean);
    setHasSearched(true);
  };

  const handleSelectSample = (id: string) => {
    setInputVal(id);
    setActiveTrackingId(id);
    setSelectedTrackingIdForCustomer(id);
    setHasSearched(true);
  };

  // Stage logic
  const currentStageIndex = parcel ? PARCEL_STAGES.indexOf(parcel.currentStatus) : -1;

  // Format date helper
  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Banner / Tagline */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Track Every Parcel. Optimize Every Step.
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          High-performance parcel tracing powered by $O(1)$ Hash Table indexing and complete stage verification.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Tracking ID (e.g. TRK1001)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm tracking-wide"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 shrink-0"
          >
            <span>Track Parcel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Selector for 3-minute Hackathon Demo */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <span className="text-slate-400 font-medium">Quick Test:</span>
          {['TRK1001', 'TRK1002', 'TRK1003', 'TRK1004', 'TRK1007'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectSample(id)}
              className={`px-2 py-1 rounded font-mono text-xs transition-colors ${
                activeTrackingId === id
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {id}
            </button>
          ))}
          <span className="text-slate-500 text-[11px] ml-auto">
            Total registered parcels in hash map: {parcels.length}
          </span>
        </div>
      </div>

      {/* DAA Algorithmic Search Verification Bar */}
      {hasSearched && benchmark && (
        <div className="bg-slate-900/60 border border-indigo-900/40 rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>DAA Hash Table Lookup:</strong> Found key{' '}
              <code className="text-indigo-300 font-mono">{benchmark.query}</code> at Bucket #
              <span className="font-mono tabular-nums text-white">{benchmark.hashSearch.bucketIndex}</span> in{' '}
              <strong className="text-emerald-400">{benchmark.hashSearch.comparisons} comparison</strong> (
              <span className="font-mono tabular-nums">{benchmark.hashSearch.timeMicroseconds} µs</span>) · Avg Complexity{' '}
              <span className="font-mono text-emerald-400">O(1)</span>
            </span>
          </div>
          <div className="text-slate-400 text-[11px] font-mono">
            vs Linear Search: {benchmark.linearSearch.comparisons} comparisons (
            {benchmark.linearSearch.timeMicroseconds} µs, O(n))
          </div>
        </div>
      )}

      {/* Result Card or Not Found */}
      {!parcel && hasSearched ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">Tracking ID Not Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            No parcel found with identifier <code className="font-mono text-rose-300">{activeTrackingId}</code> in the
            active hash table. Verify the code or create it from the Staff Dashboard.
          </p>
        </div>
      ) : parcel ? (
        <div className="space-y-6">
          {/* Main Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            {/* Top row: Tracking ID + Status & Timestamps */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>Tracking Identifier</span>
                  <span aria-hidden="true">·</span>
                  <span>{parcel.priority} Service</span>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold font-mono text-white tracking-wide">
                    {parcel.trackingId}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      parcel.currentStatus === 'Delivered'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : parcel.currentStatus === 'Out for Delivery'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : parcel.currentStatus === 'In Transit'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                        : parcel.currentStatus === 'At Sorting Center'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        parcel.currentStatus === 'Delivered'
                          ? 'bg-emerald-400'
                          : parcel.currentStatus === 'Out for Delivery'
                          ? 'bg-cyan-400 animate-pulse'
                          : parcel.currentStatus === 'In Transit'
                          ? 'bg-indigo-400 animate-pulse'
                          : 'bg-amber-400'
                      }`}
                    />
                    {parcel.currentStatus}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400">Estimated Delivery</div>
                <div className="text-lg font-bold font-mono text-indigo-300 tabular-nums">
                  {parcel.estimatedDeliveryDate}
                </div>
                <div className="text-xs text-slate-500">
                  Last updated {formatDate(parcel.updatedAt)}
                </div>
              </div>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer</span>
                </div>
                <div className="font-semibold text-white text-sm truncate">{parcel.customerName}</div>
                <div className="text-slate-400 font-mono text-[11px] truncate">{parcel.customerPhone}</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Route</span>
                </div>
                <div className="font-semibold text-white text-sm">
                  {parcel.sourceCity} <span className="text-slate-400">→</span> {parcel.destinationCity}
                </div>
                <div className="text-slate-400 text-[11px]">Weight: {parcel.weightKg} kg</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 col-span-2">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Current Physical Location</span>
                </div>
                <div className="font-semibold text-white text-sm">{parcel.currentLocation}</div>
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified at checkpoint scan</span>
                </div>
              </div>
            </div>

            {/* Visual Delivery Timeline */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Delivery Stage Progression</span>
              </div>

              <div className="relative">
                {/* Horizontal progress bar for desktop */}
                <div className="hidden md:grid md:grid-cols-6 gap-2 relative">
                  {PARCEL_STAGES.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const isPending = index > currentStageIndex;

                    return (
                      <div key={stage} className="flex flex-col items-center text-center relative group">
                        {/* Connecting line */}
                        {index < PARCEL_STAGES.length - 1 && (
                          <div
                            className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${
                              index < currentStageIndex ? 'bg-emerald-500' : 'bg-slate-800'
                            }`}
                          />
                        )}

                        {/* Node Circle */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold z-10 transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                              : isCurrent
                              ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 shadow-lg shadow-indigo-600/50 scale-110'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        {/* Stage Label */}
                        <div className="mt-3 space-y-0.5">
                          <span
                            className={`block text-xs font-semibold ${
                              isCurrent
                                ? 'text-indigo-300 font-bold'
                                : isCompleted
                                ? 'text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {isCompleted ? 'Completed' : isCurrent ? 'Active Now' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="md:hidden space-y-4 relative pl-6 border-l-2 border-slate-800 ml-3">
                  {PARCEL_STAGES.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const isPending = index > currentStageIndex;

                    return (
                      <div key={stage} className="relative">
                        <div
                          className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <div className="text-xs">
                          <span
                            className={`font-semibold ${
                              isCurrent
                                ? 'text-indigo-400'
                                : isCompleted
                                ? 'text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-2">
                            {isCompleted ? 'Completed' : isCurrent ? 'Active Stage' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Complete Parcel History Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Full Journey Activity Log</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {parcel.history.length} Checkpoint Events Recorded
              </span>
            </div>

            <div className="space-y-4">
              {[...parcel.history].reverse().map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  className="flex gap-4 items-start p-3.5 bg-slate-950/50 rounded-lg border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 text-indigo-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        <span>{entry.newStatus}</span>
                        {entry.previousStatus !== 'Initial' && (
                          <span className="text-xs text-slate-400 font-normal">
                            (from {entry.previousStatus})
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {formatDate(entry.timestamp)}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{entry.location}</span>
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800/60 mt-1.5">
                        {entry.notes}
                      </p>
                    )}

                    {entry.operatorName && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Logged by {entry.operatorName}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
