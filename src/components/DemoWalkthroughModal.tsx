import React, { useState } from 'react';
import {
  X,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Search,
  Layers,
  Zap,
  ArrowRightLeft,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useParcels } from '../context/ParcelContext';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Step {
  stepNumber: number;
  title: string;
  description: string;
  targetView: 'staff' | 'customer' | 'queue' | 'lab';
  actionLabel?: string;
  action?: () => void;
  daaConcept: string;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({ isOpen, onClose }) => {
  const {
    setActiveView,
    addParcel,
    updateParcelStatus,
    setSelectedTrackingIdForCustomer,
    sortParcelsWithMergeSort,
    runSearchBenchmark,
    enqueueParcelToHub,
    processNextInHubQueue
  } = useParcels();

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const steps: Step[] = [
    {
      stepNumber: 1,
      title: 'Step 1: Staff Creates a Parcel',
      description: 'Staff creates a new consignment for Rahul Sharma in the Staff Console.',
      targetView: 'staff',
      actionLabel: 'Create Demo Parcel',
      action: () => {
        addParcel({
          customerName: 'Rahul Sharma',
          customerPhone: '+91 98765 43210',
          sourceCity: 'Mumbai',
          destinationCity: 'Hyderabad',
          weightKg: 2.4,
          priority: 'Express',
          customId: 'TRK1001'
        });
        setSelectedTrackingIdForCustomer('TRK1001');
        setActiveView('staff');
      },
      daaConcept: 'Hash Table insertion & Key Allocation: O(1)'
    },
    {
      stepNumber: 2,
      title: 'Step 2: Tracking ID Generation',
      description: 'System automatically allocates unique Tracking ID TRK1001 and indexes it in the Hash Table.',
      targetView: 'staff',
      actionLabel: 'View in Staff Dashboard',
      action: () => {
        setActiveView('staff');
      },
      daaConcept: 'Polynomial Rolling Hash Function H(k) mod Capacity'
    },
    {
      stepNumber: 3,
      title: 'Step 3: Update: Order Placed → Picked Up',
      description: 'Staff courier picks up package in Mumbai. Stage advances with timestamp and coordinates.',
      targetView: 'staff',
      actionLabel: 'Advance to Picked Up',
      action: () => {
        updateParcelStatus(
          'TRK1001',
          'Picked Up',
          'Mumbai Andheri West Hub',
          'Rider Sunil collected package from sender.',
          'Rider Sunil M.'
        );
        setActiveView('staff');
      },
      daaConcept: 'Linked Activity History Append: O(1)'
    },
    {
      stepNumber: 4,
      title: 'Step 4: Update: Picked Up → At Sorting Center',
      description: 'Package arrives at BOM Mega Sorting Center and is placed into the Hub FIFO Processing Queue.',
      targetView: 'queue',
      actionLabel: 'Advance to At Sorting Center & Enqueue',
      action: () => {
        updateParcelStatus(
          'TRK1001',
          'At Sorting Center',
          'BOM Mega Sorting Center - Conveyor 02',
          'Automated dimensions scan verified. Enqueued in Hub Chute.',
          'Supervisor Amit P.'
        );
        enqueueParcelToHub('TRK1001');
        setActiveView('queue');
      },
      daaConcept: 'Queue Buffer: Enqueue O(1), FIFO fairness'
    },
    {
      stepNumber: 5,
      title: 'Step 5: Process from Queue → In Transit',
      description: 'Sorting hub processes TRK1001 off the conveyor and dispatches it toward Hyderabad.',
      targetView: 'queue',
      actionLabel: 'Process from Queue (Dequeue)',
      action: () => {
        processNextInHubQueue('Hub Lead Alok');
        updateParcelStatus(
          'TRK1001',
          'In Transit',
          'Pune-Hyderabad Highway Corridor',
          'Dispatched via Express Container Truck MH-12 towards Hyderabad.',
          'Dispatcher R. Nair'
        );
        setActiveView('queue');
      },
      daaConcept: 'Queue Dequeue: O(1) + Stage Transition'
    },
    {
      stepNumber: 6,
      title: 'Step 6: Customer Enters TRK1001',
      description: 'Customer opens the tracking portal, inputs TRK1001, and queries the system.',
      targetView: 'customer',
      actionLabel: 'Switch to Customer Tracking',
      action: () => {
        setSelectedTrackingIdForCustomer('TRK1001');
        runSearchBenchmark('TRK1001');
        setActiveView('customer');
      },
      daaConcept: 'Average O(1) Hash Table key lookup'
    },
    {
      stepNumber: 7,
      title: 'Step 7: Customer Sees Visual Timeline & Journey',
      description: 'Timeline highlights In Transit with completed stages checked and exact physical log trail.',
      targetView: 'customer',
      actionLabel: 'Inspect Timeline Card',
      action: () => {
        setSelectedTrackingIdForCustomer('TRK1001');
        setActiveView('customer');
      },
      daaConcept: 'Finite State Machine: 6 Delivery Stages'
    },
    {
      stepNumber: 8,
      title: 'Step 8: Demonstrate Hash Table vs Linear Search',
      description: 'Side-by-side benchmark proves Hash Table takes 1 comparison vs scanning the entire parcel array.',
      targetView: 'lab',
      actionLabel: 'Open Search Benchmark Lab',
      action: () => {
        runSearchBenchmark('TRK1001');
        setActiveView('lab');
      },
      daaConcept: 'Complexity Proof: O(1) vs O(n) Comparisons'
    },
    {
      stepNumber: 9,
      title: 'Step 9: Sort Parcel List using Merge Sort',
      description: 'Staff triggers Merge Sort to reorder all 25 parcels by Delivery Date and Stage.',
      targetView: 'staff',
      actionLabel: 'Run Merge Sort in Staff View',
      action: () => {
        sortParcelsWithMergeSort('currentStatus', 'asc');
        setActiveView('staff');
      },
      daaConcept: 'Merge Sort: O(n log n) Divide & Conquer'
    },
    {
      stepNumber: 10,
      title: 'Step 10: Present Algorithm Complexity Matrix',
      description: 'Review the comprehensive DAA evaluation panel covering Hashing, Queues, Sorting, and Dijkstra.',
      targetView: 'lab',
      actionLabel: 'Open DAA Evaluation Panel',
      action: () => {
        setActiveView('lab');
      },
      daaConcept: 'Comprehensive DAA Evaluation & Route Optimization'
    }
  ];

  const currentStep = steps[currentStepIdx];

  const handleExecuteAction = () => {
    if (currentStep.action) {
      currentStep.action();
    }
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>3-Minute Hackathon Demo Script</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                Step {currentStep.stepNumber} of 10
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Guided sequence fulfilling all 10 scenario requirements for hackathon evaluation.
            </p>
          </div>
        </div>

        {/* Current Step Highlight Box */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{currentStep.title}</h3>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30">
              {currentStep.targetView.toUpperCase()} VIEW
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{currentStep.description}</p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">DAA Principal:</span>
            <span className="font-mono text-emerald-400 font-semibold text-[11px]">
              {currentStep.daaConcept}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep.action && (
              <button
                onClick={handleExecuteAction}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
              >
                <span>{currentStep.actionLabel || 'Execute Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStepIdx < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStepIdx((prev) => prev + 1)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
              >
                Skip Next
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-slate-800">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStepIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentStepIdx
                  ? 'bg-emerald-400 scale-125'
                  : idx < currentStepIdx
                  ? 'bg-emerald-800'
                  : 'bg-slate-700'
              }`}
              title={`Jump to Step ${s.stepNumber}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
