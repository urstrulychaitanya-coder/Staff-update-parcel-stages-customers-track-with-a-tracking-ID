import React, { useState } from 'react';
import { X, PackagePlus, Sparkles, Check } from 'lucide-react';
import { useParcels } from '../context/ParcelContext';

interface NewParcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (trackingId: string) => void;
}

const POPULAR_CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur'
];

export const NewParcelModal: React.FC<NewParcelModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addParcel, parcels } = useParcels();

  // Next suggested ID
  const nextNum = parcels.reduce((max, p) => {
    const match = p.trackingId.match(/TRK(\d+)/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 1000) + 1;
  const suggestedId = `TRK${nextNum}`;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+91 98');
  const [customerEmail, setCustomerEmail] = useState('');
  const [sourceCity, setSourceCity] = useState('Mumbai');
  const [destinationCity, setDestinationCity] = useState('Hyderabad');
  const [weightKg, setWeightKg] = useState('2.5');
  const [priority, setPriority] = useState<'Standard' | 'Express' | 'Priority Overnight'>('Express');
  const [customId, setCustomId] = useState(suggestedId);
  const [useCustomId, setUseCustomId] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError('Please enter a customer name.');
      return;
    }
    if (sourceCity === destinationCity) {
      setError('Source and destination cities must be different.');
      return;
    }

    try {
      const created = addParcel({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        sourceCity,
        destinationCity,
        weightKg: parseFloat(weightKg) || 1.5,
        priority,
        customId: useCustomId ? customId : undefined
      });

      onSuccess(created.trackingId);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to register parcel';
      setError(msg);
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
            <PackagePlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create New Parcel</h2>
            <p className="text-xs text-slate-400">
              Allocates key in hash index &amp; initializes delivery history
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-950/50 border border-rose-500/40 text-rose-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Tracking ID preview */}
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Assigned Unique Tracking ID</span>
              <span className="font-mono text-sm font-bold text-indigo-400">
                {useCustomId ? customId : suggestedId}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUseCustomId(!useCustomId)}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              {useCustomId ? 'Use Auto ID' : 'Custom ID'}
            </button>
          </div>

          {useCustomId && (
            <div>
              <label className="block text-slate-300 font-medium mb-1">Custom Tracking ID</label>
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value.toUpperCase())}
                placeholder="e.g. TRK9999"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          )}

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Customer Email (Optional)</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500"
            />
          </div>

          {/* Route details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Source City (Origin)</label>
              <select
                value={sourceCity}
                onChange={(e) => setSourceCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Destination City</label>
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weight & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Priority Class</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                <option value="Standard">Standard Delivery</option>
                <option value="Express">Express Air (24-48 hrs)</option>
                <option value="Priority Overnight">Priority Overnight (Next Day)</option>
              </select>
            </div>
          </div>

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
              <Check className="w-3.5 h-3.5" />
              <span>Create &amp; Index Parcel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
