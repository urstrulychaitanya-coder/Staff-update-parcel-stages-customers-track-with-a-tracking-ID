import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Layers,
  ArrowRightLeft,
  MapPin,
  TrendingUp,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  Compass,
  Database
} from 'lucide-react';
import { useParcels } from '../context/ParcelContext';
import { LOGISTICS_HUBS, HUB_ROUTES, findShortestRoute, DijkstraResult } from '../algorithms/graphRoute';
import { executeMergeSort, SortField } from '../algorithms/mergeSort';

export const AlgorithmAnalysisLab: React.FC = () => {
  const { parcels, hashTable, runSearchBenchmark, lastSearchBenchmark } = useParcels();

  // Search comparison interactive tester
  const [searchKey, setSearchKey] = useState('TRK1001');
  const [testResult, setTestResult] = useState(() => runSearchBenchmark('TRK1001'));

  // Merge Sort lab state
  const [sortField, setSortField] = useState<SortField>('estimatedDeliveryDate');
  const [sortMetrics, setSortMetrics] = useState(() => executeMergeSort(parcels, 'estimatedDeliveryDate').benchmark);

  // Dijkstra Route Optimization state
  const [sourceHub, setSourceHub] = useState('BOM'); // Mumbai
  const [targetHub, setTargetHub] = useState('HYD'); // Hyderabad
  const [routeMetric, setRouteMetric] = useState<'distance' | 'time'>('distance');
  const [dijkstraResult, setDijkstraResult] = useState<DijkstraResult>(() =>
    findShortestRoute('BOM', 'HYD', 'distance')
  );

  const handleRunSearchTest = (id: string) => {
    setSearchKey(id);
    const res = runSearchBenchmark(id);
    setTestResult(res);
  };

  const handleRunSortLab = (field: SortField) => {
    setSortField(field);
    const res = executeMergeSort(parcels, field);
    setSortMetrics(res.benchmark);
  };

  const handleComputeRoute = (src: string, tgt: string, metric: 'distance' | 'time') => {
    setSourceHub(src);
    setTargetHub(tgt);
    setRouteMetric(metric);
    const res = findShortestRoute(src, tgt, metric);
    setDijkstraResult(res);
  };

  // Hash table bucket inspection
  const bucketInfo = hashTable.getBucketsDebugInfo();
  const populatedBuckets = bucketInfo.filter((b) => b.count > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>DAA Hackathon Evaluation Panel</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Algorithm Analysis &amp; Data Structures Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
          Empirical verification of theoretical time complexities: O(1) hashing, O(n) linear search,
          O(n log n) merge sort, O(1) queue buffer, and O((V+E) log V) Dijkstra route planning.
        </p>
      </div>

      {/* Summary Complexity Matrix Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>Theoretical Complexity vs. System Application</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Card 1: Hashing */}
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">1. Hash Table</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                O(1) Avg
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Purpose:</strong> Instant Tracking ID lookup. Direct bucket mapping using polynomial
              hash with collision chaining.
            </p>
            <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              Worst case: O(k) · Space: O(n)
            </div>
          </div>

          {/* Card 2: Linear Search */}
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">2. Linear Search</span>
              <span className="font-mono text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                O(n)
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Purpose:</strong> Baseline comparative analysis. Sequentially traverses array up to
              N elements.
            </p>
            <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              Comparisons: 1 to n
            </div>
          </div>

          {/* Card 3: Merge Sort */}
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">3. Merge Sort</span>
              <span className="font-mono text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30">
                O(n log n)
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Purpose:</strong> Multi-attribute parcel sorting (date, stage, name). Divide-and-conquer
              guarantee.
            </p>
            <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              Stable Sort · Space: O(n)
            </div>
          </div>

          {/* Card 4: FIFO Queue */}
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">4. FIFO Queue</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                O(1)
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Purpose:</strong> Sorting center intake and chute dispatch buffer. Fairness &amp; zero
              head-of-line blocking.
            </p>
            <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              Enqueue: O(1) · Dequeue: O(1)
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Searching Comparison (Hash Table vs Linear Search) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Live Empirical Benchmark: Hash Table vs. Linear Search</span>
            </h2>
            <p className="text-xs text-slate-400">
              Comparing search operations across {parcels.length} indexed parcel records.
            </p>
          </div>

          {/* Quick test buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 text-[11px]">Test ID:</span>
            {['TRK1001', 'TRK1005', 'TRK1015', 'TRK1025'].map((id) => (
              <button
                key={id}
                onClick={() => handleRunSearchTest(id)}
                className={`px-2 py-1 font-mono text-xs rounded transition-colors ${
                  searchKey === id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hash Table Side */}
          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h3 className="font-bold text-white text-sm">Hash Table Key Lookup</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                O(1) Average
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Comparisons</span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">
                  {testResult.hashSearch.comparisons}
                </span>
                <span className="text-[10px] text-slate-400 font-sans block">Direct index hit</span>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Lookup Duration</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {testResult.hashSearch.timeMicroseconds} µs
                </span>
                <span className="text-[10px] text-slate-400 font-sans block">Sub-millisecond</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1 font-sans bg-slate-900/50 p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Key:</span>
                <span className="font-mono text-white">{testResult.query}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hash Bucket:</span>
                <span className="font-mono text-indigo-300">#{testResult.hashSearch.bucketIndex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Found Status:</span>
                <span className="font-semibold text-emerald-400">
                  {testResult.found ? 'Found in O(1)' : 'Not Found'}
                </span>
              </div>
            </div>
          </div>

          {/* Linear Search Side */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h3 className="font-bold text-white text-sm">Linear Array Scan</h3>
              </div>
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                O(n) Worst
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Comparisons</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">
                  {testResult.linearSearch.comparisons}
                </span>
                <span className="text-[10px] text-slate-400 font-sans block">Scanned sequentially</span>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Scan Duration</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {testResult.linearSearch.timeMicroseconds} µs
                </span>
                <span className="text-[10px] text-slate-400 font-sans block">Increases with N</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1 font-sans bg-slate-900/50 p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-slate-400">Efficiency Gap:</span>
                <span className="font-semibold text-emerald-400">
                  {Math.max(1, testResult.linearSearch.comparisons - testResult.hashSearch.comparisons)} fewer comparisons
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Algorithmic Speedup:</span>
                <span className="font-mono text-indigo-300 font-bold">
                  {(testResult.linearSearch.comparisons / Math.max(1, testResult.hashSearch.comparisons)).toFixed(1)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asymptotic Growth:</span>
                <span className="text-slate-400 text-[11px]">Linear Search grows proportionally with N</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Hash Bucket Distribution */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Internal Hash Table Bucket Inspection (Capacity: 47 Buckets)</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {populatedBuckets.length} Active Buckets / {parcels.length} Entries
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1.5 text-center font-mono text-[10px]">
            {bucketInfo.slice(0, 24).map((b) => (
              <div
                key={b.index}
                className={`p-1.5 rounded border transition-colors ${
                  b.count > 0
                    ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400'
                }`}
                title={`Bucket #${b.index}: ${b.keys.join(', ') || 'empty'}`}
              >
                <div>#{b.index}</div>
                <div className="font-bold text-white">{b.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Merge Sort Lab */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Divide &amp; Conquer: Merge Sort Execution Engine</span>
            </h2>
            <p className="text-xs text-slate-400">
              Guaranteed O(n log n) stable sorting across delivery stages, dates, and names.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(
              [
                ['estimatedDeliveryDate', 'Delivery Date'],
                ['currentStatus', 'Stage Order'],
                ['customerName', 'Customer'],
                ['trackingId', 'Tracking ID']
              ] as const
            ).map(([f, label]) => (
              <button
                key={f}
                onClick={() => handleRunSortLab(f as SortField)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  sortField === f
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Merge Sort Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Records Sorted (n)</span>
            <span className="text-xl font-bold text-white tabular-nums">{sortMetrics.itemCount}</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Comparisons Executed</span>
            <span className="text-xl font-bold text-emerald-400 tabular-nums">
              {sortMetrics.comparisons}
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Merge Stitch Ops</span>
            <span className="text-xl font-bold text-indigo-400 tabular-nums">
              {sortMetrics.mergeOperations}
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Execution Duration</span>
            <span className="text-xl font-bold text-white tabular-nums">
              {sortMetrics.timeMicroseconds} µs
            </span>
          </div>
        </div>

        {/* Tree visualizer explanation */}
        <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-white">Merge Sort Invariant:</div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Recursively divides the array into halves until subarrays contain 1 item ($T(n) = 2T(n/2) + \Theta(n)$).
            By the Master Theorem (Case 2), the total time is strictly $\Theta(n \log n)$, preventing the worst-case
            $O(n^2)$ degradations of QuickSort on pre-sorted parcels.
          </p>
        </div>
      </div>

      {/* SECTION 3: Graph Route Optimization (Dijkstra's Shortest Path) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Logistics Graph Network: Dijkstra's Transit Optimization</span>
            </h2>
            <p className="text-xs text-slate-400">
              Computes shortest distance (km) or fastest line-haul transit (hours) across major Indian hub nodes.
            </p>
          </div>

          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
            O((V + E) log V)
          </span>
        </div>

        {/* Route selector controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Origin Transit Hub</label>
            <select
              value={sourceHub}
              onChange={(e) => handleComputeRoute(e.target.value, targetHub, routeMetric)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              {LOGISTICS_HUBS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Destination Hub</label>
            <select
              value={targetHub}
              onChange={(e) => handleComputeRoute(sourceHub, e.target.value, routeMetric)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              {LOGISTICS_HUBS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Optimization Weight</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleComputeRoute(sourceHub, targetHub, 'distance')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  routeMetric === 'distance'
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Min Distance (km)
              </button>
              <button
                type="button"
                onClick={() => handleComputeRoute(sourceHub, targetHub, 'time')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  routeMetric === 'time'
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Min Hours (hrs)
              </button>
            </div>
          </div>
        </div>

        {/* Shortest Path Result Display */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-cyan-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Optimal Route Found:</span>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {dijkstraResult.path.map((node, i) => (
                  <React.Fragment key={node.id}>
                    <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded font-mono">
                      {node.name} ({node.code})
                    </span>
                    {i < dijkstraResult.path.length - 1 && (
                      <span className="text-cyan-400 font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Total Distance</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {dijkstraResult.totalDistanceKm} km
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Transit Duration</span>
                <span className="text-lg font-bold text-cyan-400 tabular-nums">
                  {dijkstraResult.totalTransitHours} hrs
                </span>
              </div>
            </div>
          </div>

          {/* Execution Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Visited Nodes</span>
              <span className="text-white font-bold">{dijkstraResult.visitedNodesCount} of {LOGISTICS_HUBS.length}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Edge Relaxations</span>
              <span className="text-emerald-400 font-bold">{dijkstraResult.edgeEvaluations} edges</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Solve Time</span>
              <span className="text-white font-bold">{dijkstraResult.timeMicroseconds} µs</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Algorithm</span>
              <span className="text-cyan-400 font-bold">Dijkstra Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
