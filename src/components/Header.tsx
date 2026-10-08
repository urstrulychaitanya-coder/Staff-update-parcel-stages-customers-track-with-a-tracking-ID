import React from 'react';
import { Package, Shield, Search, ArrowRightLeft, Cpu, RotateCcw, PlayCircle } from 'lucide-react';
import { useParcels } from '../context/ParcelContext';

interface HeaderProps {
  onOpenDemoGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemoGuide }) => {
  const { activeView, setActiveView, resetToSampleData, parcels, sortingQueue } = useParcels();

  const handleReset = () => {
    if (window.confirm('Reset all parcels, queues, and benchmarks to hackathon default data?')) {
      resetToSampleData();
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Wordmark Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                LogiPulse <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">DAA Core</span>
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveView('customer')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === 'customer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Customer Tracking</span>
            </button>

            <button
              onClick={() => setActiveView('staff')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === 'staff'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Staff Dashboard</span>
              <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {parcels.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView('queue')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === 'queue'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Sorting Queue</span>
              {sortingQueue.length > 0 && (
                <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {sortingQueue.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('lab')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === 'lab'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Algorithm Analysis</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDemoGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/50 hover:border-emerald-400/50 transition-all shadow-sm"
              title="Open 3-minute hackathon presentation walkthrough"
            >
              <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Hackathon Demo</span>
              <span className="sm:hidden">Demo</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition-colors"
              title="Reset Sample Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between pb-3 pt-1 gap-1 overflow-x-auto text-xs border-t border-slate-800/60 mt-1">
          <button
            onClick={() => setActiveView('customer')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeView === 'customer' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Customer Tracking
          </button>
          <button
            onClick={() => setActiveView('staff')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeView === 'staff' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Staff Dashboard ({parcels.length})
          </button>
          <button
            onClick={() => setActiveView('queue')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeView === 'queue' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Hub Queue ({sortingQueue.length})
          </button>
          <button
            onClick={() => setActiveView('lab')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeView === 'lab' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            DAA Analysis
          </button>
        </div>
      </div>
    </header>
  );
};
