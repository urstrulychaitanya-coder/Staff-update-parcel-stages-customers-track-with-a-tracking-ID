import React, { useState } from 'react';
import {
  ArrowRightLeft,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Zap,
  Building2,
  Package
} from 'lucide-react';
import { useParcels } from '../context/ParcelContext';

export const SortingQueueView: React.FC = () => {
  const {
    sortingQueue,
    queueHistory,
    processNextInHubQueue,
    enqueueParcelToHub,
    clearHubQueue,
    parcels,
    setSelectedTrackingIdForCustomer,
    setActiveView
  } = useParcels();

  const [selectedToEnqueue, setSelectedToEnqueue] = useState('');
  const [operator, setOperator] = useState('Hub Supervisor Alok N.');
  const [lastProcessed, setLastProcessed] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Available parcels not currently in queue
  const unenqueuedParcels = parcels.filter(
    (p) => !sortingQueue.some((q) => q.parcel.trackingId === p.trackingId)
  );

  const handleProcessNext = () => {
    setIsProcessing(true);
    const rec = processNextInHubQueue(operator);
    if (rec) {
      setLastProcessed(`Processed & Dispatched ${rec.parcel.trackingId} via ${rec.sortingBay}!`);
      setTimeout(() => {
        setIsProcessing(false);
      }, 350);
    } else {
      setIsProcessing(false);
    }
  };

  const handleProcessMultiple = async (count: number = 3) => {
    setIsProcessing(true);
    for (let i = 0; i < count; i++) {
      if (sortingQueue.length === 0) break;
      processNextInHubQueue(operator);
      await new Promise((res) => setTimeout(res, 250));
    }
    setIsProcessing(false);
  };

  const handleEnqueueSelected = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedToEnqueue) return;
    enqueueParcelToHub(selectedToEnqueue);
    setSelectedToEnqueue('');
  };

  const handleEnqueueAllEligible = () => {
    const atSorting = parcels.filter((p) => p.currentStatus === 'At Sorting Center');
    atSorting.forEach((p) => enqueueParcelToHub(p.trackingId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sorting Center Queue</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              FIFO Structure
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time First-In, First-Out (FIFO) buffer managing parcels awaiting automated sortation and line-haul dispatch.
          </p>
        </div>

        {/* Algorithm Complexity Badges */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">Enqueue:</span>
            <span className="text-emerald-400 font-bold">O(1)</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">Dequeue:</span>
            <span className="text-emerald-400 font-bold">O(1)</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Queue Conveyor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>Active Conveyor Chute</span>
                <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40">
                  {sortingQueue.length} Parcels Waiting
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Front parcel (Head) will be dequeued first to ensure fair delivery turnaround.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleProcessNext}
              disabled={sortingQueue.length === 0 || isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Process Next (Dequeue O(1))</span>
            </button>

            <button
              onClick={() => handleProcessMultiple(3)}
              disabled={sortingQueue.length === 0 || isProcessing}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
              title="Process next 3 parcels in batch"
            >
              Process 3x
            </button>

            <button
              onClick={clearHubQueue}
              disabled={sortingQueue.length === 0}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg border border-transparent transition-colors"
              title="Clear active queue"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {lastProcessed && (
          <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 rounded-lg text-xs flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{lastProcessed}</span>
          </div>
        )}

        {/* Visual Conveyor Belt representation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <span>HEAD / FRONT</span>
              <span className="text-[10px] text-slate-400 font-mono">(Next to Dequeue)</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="text-[10px] text-slate-400 font-mono">(Last Enqueued)</span>
              <span>TAIL / REAR</span>
            </span>
          </div>

          <div className="relative min-h-[140px] bg-slate-950/80 border-2 border-dashed border-slate-800 rounded-xl p-4 flex items-center gap-3 overflow-x-auto">
            {sortingQueue.length === 0 ? (
              <div className="w-full text-center py-6 space-y-2 text-slate-500">
                <Package className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">No parcels currently waiting in the sorting conveyor queue.</p>
                <button
                  onClick={handleEnqueueAllEligible}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Enqueue all "At Sorting Center" parcels
                </button>
              </div>
            ) : (
              sortingQueue.map((item, index) => {
                const isHead = index === 0;
                return (
                  <div
                    key={item.parcel.trackingId}
                    className={`flex-shrink-0 w-52 p-3 rounded-lg border transition-all ${
                      isHead
                        ? 'bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-900/30 ring-2 ring-emerald-500/20'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-white">
                        {item.parcel.trackingId}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isHead
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{index + 1}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {item.parcel.customerName}
                    </div>

                    <div className="text-[11px] text-slate-400 truncate">
                      {item.parcel.sourceCity} → {item.parcel.destinationCity}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{item.parcel.priority}</span>
                      <span className="font-mono">{item.parcel.weightKg}kg</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Enqueue form controls */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <form onSubmit={handleEnqueueSelected} className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedToEnqueue}
              onChange={(e) => setSelectedToEnqueue(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-xs flex-1 sm:w-64"
            >
              <option value="">-- Choose parcel to Enqueue --</option>
              {unenqueuedParcels.map((p) => (
                <option key={p.trackingId} value={p.trackingId}>
                  {p.trackingId} - {p.customerName} ({p.currentStatus})
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!selectedToEnqueue}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Enqueue (O(1))
            </button>
          </form>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Operator:</span>
            <input
              type="text"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white w-44"
            />
          </div>
        </div>
      </div>

      {/* Processed Activity Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Processed &amp; Dispatched Queue History</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {queueHistory.length} Dispatched Records
          </span>
        </div>

        {queueHistory.length === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs">
            No parcels processed in this session yet. Click "Process Next (Dequeue)" above to simulate.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60 font-mono text-xs">
            {queueHistory.slice(0, 10).map((record, i) => (
              <div
                key={i}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/20 px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">{record.parcel.trackingId}</span>
                  <span className="text-white font-sans font-medium">
                    {record.parcel.customerName}
                  </span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    → {record.nextDestination}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300">
                    {record.sortingBay}
                  </span>
                  <span>{record.operator}</span>
                  <button
                    onClick={() => {
                      setSelectedTrackingIdForCustomer(record.parcel.trackingId);
                      setActiveView('customer');
                    }}
                    className="text-indigo-400 hover:underline"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
