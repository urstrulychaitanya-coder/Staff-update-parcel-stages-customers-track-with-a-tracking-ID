import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Parcel, ParcelStage, SearchBenchmarkResult, SortBenchmarkResult, StatusHistoryEntry } from '../types/parcel';
import { INITIAL_PARCELS } from '../data/sampleParcels';
import { ParcelHashTable } from '../algorithms/hashTable';
import { compareSearchAlgorithms } from '../algorithms/search';
import { executeMergeSort, SortField, SortDirection } from '../algorithms/mergeSort';
import { SortingCenterQueue, ProcessedQueueRecord, QueueItem } from '../algorithms/queue';

const STORAGE_KEY = 'smart_parcel_tracking_parcels_v1';
const QUEUE_STORAGE_KEY = 'smart_parcel_tracking_queue_history_v1';

interface ParcelContextType {
  parcels: Parcel[];
  hashTable: ParcelHashTable<Parcel>;
  addParcel: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    sourceCity: string;
    destinationCity: string;
    weightKg: number;
    priority: 'Standard' | 'Express' | 'Priority Overnight';
    customId?: string;
  }) => Parcel;
  updateParcelStatus: (
    trackingId: string,
    newStatus: ParcelStage,
    location: string,
    notes?: string,
    operatorName?: string
  ) => boolean;
  getParcelByTrackingId: (trackingId: string) => Parcel | undefined;
  runSearchBenchmark: (trackingId: string) => SearchBenchmarkResult;
  lastSearchBenchmark: SearchBenchmarkResult | null;
  sortParcelsWithMergeSort: (field: SortField, direction: SortDirection) => {
    sorted: Parcel[];
    benchmark: SortBenchmarkResult;
  };
  lastSortBenchmark: SortBenchmarkResult | null;
  // Queue operations
  sortingQueue: QueueItem[];
  queueHistory: ProcessedQueueRecord[];
  enqueueParcelToHub: (trackingId: string) => boolean;
  processNextInHubQueue: (operatorName?: string) => ProcessedQueueRecord | null;
  clearHubQueue: () => void;
  resetToSampleData: () => void;
  activeView: 'customer' | 'staff' | 'queue' | 'lab';
  setActiveView: (view: 'customer' | 'staff' | 'queue' | 'lab') => void;
  selectedTrackingIdForCustomer: string;
  setSelectedTrackingIdForCustomer: (id: string) => void;
}

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

export const ParcelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parcels, setParcels] = useState<Parcel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PARCELS;
  });

  const [activeView, setActiveView] = useState<'customer' | 'staff' | 'queue' | 'lab'>('staff');
  const [selectedTrackingIdForCustomer, setSelectedTrackingIdForCustomer] = useState<string>('TRK1001');
  const [lastSearchBenchmark, setLastSearchBenchmark] = useState<SearchBenchmarkResult | null>(null);
  const [lastSortBenchmark, setLastSortBenchmark] = useState<SortBenchmarkResult | null>(null);

  // Initialize Hash Table
  const hashTable = useMemo(() => {
    const table = new ParcelHashTable<Parcel>(47); // Prime bucket size
    parcels.forEach((p) => table.set(p.trackingId.toUpperCase(), p));
    return table;
  }, [parcels]);

  // Initialize Hub Queue
  const [hubQueueInstance] = useState(() => {
    // Enqueue initial parcels that are 'At Sorting Center'
    const queue = new SortingCenterQueue();
    INITIAL_PARCELS.filter((p) => p.currentStatus === 'At Sorting Center').forEach((p) => queue.enqueue(p));
    return queue;
  });

  const [sortingQueue, setSortingQueue] = useState<QueueItem[]>(() => hubQueueInstance.getAll());
  const [queueHistory, setQueueHistory] = useState<ProcessedQueueRecord[]>(() => {
    try {
      const saved = localStorage.getItem(QUEUE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Persist parcels
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parcels));
    } catch (e) {
      console.error('Failed to persist parcels', e);
    }
  }, [parcels]);

  // Persist queue history
  useEffect(() => {
    try {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queueHistory));
    } catch (e) {
      console.error('Failed to persist queue history', e);
    }
  }, [queueHistory]);

  const getParcelByTrackingId = useCallback(
    (trackingId: string): Parcel | undefined => {
      const normalized = trackingId.trim().toUpperCase();
      return hashTable.get(normalized);
    },
    [hashTable]
  );

  const runSearchBenchmark = useCallback(
    (trackingId: string): SearchBenchmarkResult => {
      const res = compareSearchAlgorithms(parcels, hashTable, trackingId);
      setLastSearchBenchmark(res);
      return res;
    },
    [parcels, hashTable]
  );

  const addParcel = useCallback(
    (data: {
      customerName: string;
      customerPhone: string;
      customerEmail?: string;
      sourceCity: string;
      destinationCity: string;
      weightKg: number;
      priority: 'Standard' | 'Express' | 'Priority Overnight';
      customId?: string;
    }): Parcel => {
      // Generate tracking ID
      let newId = data.customId ? data.customId.trim().toUpperCase() : '';
      if (!newId) {
        // Find highest existing numeric ID
        const existingNumbers = parcels
          .map((p) => {
            const match = p.trackingId.match(/TRK(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
          })
          .filter((n) => !isNaN(n));
        const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 1000;
        newId = `TRK${maxNum + 1}`;
      }

      const now = new Date().toISOString();
      const estDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const initialHistory: StatusHistoryEntry = {
        id: `h-${newId.toLowerCase()}-1`,
        timestamp: now,
        location: `${data.sourceCity} Booking Facility`,
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: `Parcel registered with priority '${data.priority}'. Tracking ID generated via DAA hash key generator.`,
        operatorName: 'Staff Portal Operator'
      };

      const newParcel: Parcel = {
        trackingId: newId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        sourceCity: data.sourceCity,
        destinationCity: data.destinationCity,
        currentLocation: `${data.sourceCity} Booking Facility`,
        currentStatus: 'Order Placed',
        estimatedDeliveryDate: estDate,
        createdAt: now,
        updatedAt: now,
        weightKg: data.weightKg,
        priority: data.priority,
        history: [initialHistory]
      };

      setParcels((prev) => [newParcel, ...prev]);

      return newParcel;
    },
    [parcels]
  );

  const updateParcelStatus = useCallback(
    (
      trackingId: string,
      newStatus: ParcelStage,
      location: string,
      notes: string = '',
      operatorName: string = 'Staff Hub Operator'
    ): boolean => {
      const normalized = trackingId.trim().toUpperCase();
      let updated = false;

      setParcels((prev) => {
        const index = prev.findIndex((p) => p.trackingId.toUpperCase() === normalized);
        if (index === -1) return prev;

        const target = prev[index];
        const prevStatus = target.currentStatus;
        const now = new Date().toISOString();

        const newHistoryEntry: StatusHistoryEntry = {
          id: `h-${normalized.toLowerCase()}-${Date.now()}`,
          timestamp: now,
          location: location || target.currentLocation,
          previousStatus: prevStatus,
          newStatus: newStatus,
          notes: notes || `Status updated from '${prevStatus}' to '${newStatus}' by ${operatorName}.`,
          operatorName: operatorName
        };

        const updatedParcel: Parcel = {
          ...target,
          currentStatus: newStatus,
          currentLocation: location || target.currentLocation,
          updatedAt: now,
          history: [...target.history, newHistoryEntry]
        };

        const next = [...prev];
        next[index] = updatedParcel;
        updated = true;

        // If status became 'At Sorting Center', auto-enqueue to hub queue if not already there
        if (newStatus === 'At Sorting Center') {
          hubQueueInstance.enqueue(updatedParcel);
          setSortingQueue(hubQueueInstance.getAll());
        }

        return next;
      });

      return updated;
    },
    [hubQueueInstance]
  );

  const sortParcelsWithMergeSort = useCallback(
    (field: SortField, direction: SortDirection = 'asc') => {
      const result = executeMergeSort(parcels, field, direction);
      setLastSortBenchmark(result.benchmark);
      return {
        sorted: result.sortedParcels,
        benchmark: result.benchmark
      };
    },
    [parcels]
  );

  const enqueueParcelToHub = useCallback(
    (trackingId: string): boolean => {
      const parcel = getParcelByTrackingId(trackingId);
      if (!parcel) return false;
      hubQueueInstance.enqueue(parcel);
      setSortingQueue(hubQueueInstance.getAll());
      return true;
    },
    [getParcelByTrackingId, hubQueueInstance]
  );

  const processNextInHubQueue = useCallback(
    (operatorName: string = 'Staff Hub Lead'): ProcessedQueueRecord | null => {
      const processed = hubQueueInstance.dequeue(operatorName);
      if (processed) {
        setSortingQueue(hubQueueInstance.getAll());
        setQueueHistory((prev) => [processed, ...prev].slice(0, 30));

        // Automatically update parcel status to 'In Transit' when processed out of sorting center!
        updateParcelStatus(
          processed.parcel.trackingId,
          'In Transit',
          `${processed.parcel.destinationCity} Highway Transit Link (${processed.sortingBay})`,
          `Processed from Hub FIFO Queue at ${processed.sortingBay}. Dispatched for line-haul transport.`,
          operatorName
        );
      }
      return processed;
    },
    [hubQueueInstance, updateParcelStatus]
  );

  const clearHubQueue = useCallback(() => {
    hubQueueInstance.clear();
    setSortingQueue([]);
  }, [hubQueueInstance]);

  const resetToSampleData = useCallback(() => {
    setParcels(INITIAL_PARCELS);
    hubQueueInstance.clear();
    INITIAL_PARCELS.filter((p) => p.currentStatus === 'At Sorting Center').forEach((p) =>
      hubQueueInstance.enqueue(p)
    );
    setSortingQueue(hubQueueInstance.getAll());
    setQueueHistory([]);
    setLastSearchBenchmark(null);
    setLastSortBenchmark(null);
    setSelectedTrackingIdForCustomer('TRK1001');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(QUEUE_STORAGE_KEY);
  }, [hubQueueInstance]);

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        hashTable,
        addParcel,
        updateParcelStatus,
        getParcelByTrackingId,
        runSearchBenchmark,
        lastSearchBenchmark,
        sortParcelsWithMergeSort,
        lastSortBenchmark,
        sortingQueue,
        queueHistory,
        enqueueParcelToHub,
        processNextInHubQueue,
        clearHubQueue,
        resetToSampleData,
        activeView,
        setActiveView,
        selectedTrackingIdForCustomer,
        setSelectedTrackingIdForCustomer
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcels = (): ParcelContextType => {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error('useParcels must be used within a ParcelProvider');
  }
  return context;
};
