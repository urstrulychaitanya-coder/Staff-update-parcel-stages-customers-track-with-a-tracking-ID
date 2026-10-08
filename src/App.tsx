import React, { useState } from 'react';
import { ParcelProvider, useParcels } from './context/ParcelContext';
import { Header } from './components/Header';
import { CustomerTracking } from './components/CustomerTracking';
import { StaffDashboard } from './components/StaffDashboard';
import { SortingQueueView } from './components/SortingQueueView';
import { AlgorithmAnalysisLab } from './components/AlgorithmAnalysisLab';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';

const MainContent: React.FC = () => {
  const { activeView } = useParcels();
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header onOpenDemoGuide={() => setIsDemoGuideOpen(true)} />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeView === 'customer' && <CustomerTracking />}
        {activeView === 'staff' && <StaffDashboard />}
        {activeView === 'queue' && <SortingQueueView />}
        {activeView === 'lab' && <AlgorithmAnalysisLab />}
      </main>

      {/* Clean Footer matching constitution */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Smart Parcel Tracking &amp; Delivery Management System</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-400 font-medium">“Track Every Parcel. Optimize Every Step.”</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span>DAA Prototype</span>
            <span aria-hidden="true">·</span>
            <span>Hash Table O(1)</span>
            <span aria-hidden="true">·</span>
            <span>Merge Sort O(n log n)</span>
            <span aria-hidden="true">·</span>
            <span>FIFO Queue</span>
          </div>
        </div>
      </footer>

      {/* 3-Minute Demo Walkthrough Modal */}
      <DemoWalkthroughModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ParcelProvider>
      <MainContent />
    </ParcelProvider>
  );
}
