import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { useParcels } from '../context/ParcelContext';
import { Parcel, ParcelStage, PARCEL_STAGES } from '../types/parcel';

interface UpdateStatusModalProps {
  parcel: Parcel | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (trackingId: string, newStage: ParcelStage) => void;
}

const HUB_LOCATIONS = [
  'Mumbai Central Booking Office',
  'BOM Mega Sorting Center - Conveyor 02',
  'DEL Mega Hub Terminal 3',
  'BLR Gateway Sorting Center (Peenya)',
  'HYD Regional Hub Begumpet',
  'Chennai Guindy Delivery Hub',
  'Kolkata Salt Lake Sector V',
  'Pune Transit Terminal (MH)',
  'Ahmedabad SG Highway Station',
  'Nagpur Central Freight Junction'
];

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  parcel,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { updateParcelStatus } = useParcels();

  const [newStatus, setNewStatus] = useState<ParcelStage>('In Transit');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [operatorName, setOperatorName] = useState('Staff Operator Amit K.');
  const [error, setError] = useState('');

  useEffect(() => {
    if (parcel) {
      const currIdx = PARCEL_STAGES.indexOf(parcel.currentStatus);
      const nextIdx = Math.min(currIdx + 1, PARCEL_STAGES.length - 1);
      setNewStatus(PARCEL_STAGES[nextIdx]);
      setLocation(parcel.currentLocation);
      setNotes(`Transitioning package from ${parcel.currentStatus} to ${PARCEL_STAGES[nextIdx]}.`);
    }
  }, [parcel]);

  if (!isOpen || !parcel) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please provide the physical location for this checkpoint update.');
      return;
    }

    const ok = updateParcelStatus(
      parcel.trackingId,
      newStatus,
      location.trim(),
      notes.trim(),
      operatorName.trim()
    );

    if (ok) {
      onSuccess(parcel.trackingId, newStatus);
      onClose();
    } else {
      setError('Failed to update parcel status');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Update Delivery Stage</h2>
            <p className="text-xs text-slate-400">
              Appends historical checkpoint event with timestamp &amp; coordinates
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-950/50 border border-rose-500/40 text-rose-300 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Current Parcel Info Snapshot */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-indigo-400 text-sm">
              {parcel.trackingId}
            </span>
            <span className="text-slate-400">
              {parcel.customerName} ({parcel.destinationCity})
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>Current Status:</span>
            <span className="text-white font-semibold bg-slate-800 px-2 py-0.5 rounded">
              {parcel.currentStatus}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Stage Selection */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">New Delivery Stage *</label>
            <div className="grid grid-cols-2 gap-2">
              {PARCEL_STAGES.map((stage) => {
                const isSelected = newStatus === stage;
                const isCurrent = parcel.currentStatus === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setNewStatus(stage)}
                    className={`p-2 rounded-lg text-left border transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-sm'
                        : isCurrent
                        ? 'bg-slate-800/40 border-slate-700 text-slate-400'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{stage}</span>
                    {isCurrent && <span className="text-[10px] text-amber-400 font-normal">Active</span>}
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location input with presets */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-medium">Current Physical Location *</label>
              <span className="text-[11px] text-slate-500">Facility / Hub checkpoint</span>
            </div>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. BOM Mega Sorting Center"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-medium"
            />
            {/* Quick Hub Presets */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {HUB_LOCATIONS.slice(0, 4).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setLocation(h)}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded truncate max-w-[170px]"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Remarks / Operator Notes */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Status Event Remarks / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Package inspected, enqueued in sorting chute or handed to delivery agent."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500"
            />
          </div>

          {/* Operator Name */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Logging Staff / Operator</label>
            <input
              type="text"
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
              placeholder="Staff Member Name"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            />
          </div>

          {/* Submission action */}
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Record &amp; Broadcast Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
