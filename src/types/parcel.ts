export type ParcelStage =
  | 'Order Placed'
  | 'Picked Up'
  | 'At Sorting Center'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export const PARCEL_STAGES: ParcelStage[] = [
  'Order Placed',
  'Picked Up',
  'At Sorting Center',
  'In Transit',
  'Out for Delivery',
  'Delivered'
];

export interface StatusHistoryEntry {
  id: string;
  timestamp: string; // ISO string
  location: string;
  previousStatus: ParcelStage | 'Initial';
  newStatus: ParcelStage;
  notes?: string;
  operatorName?: string;
}

export interface Parcel {
  trackingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  sourceCity: string;
  destinationCity: string;
  currentLocation: string;
  currentStatus: ParcelStage;
  estimatedDeliveryDate: string; // YYYY-MM-DD
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  weightKg: number;
  priority: 'Standard' | 'Express' | 'Priority Overnight';
  history: StatusHistoryEntry[];
}

export interface SearchBenchmarkResult {
  query: string;
  found: boolean;
  parcel?: Parcel;
  linearSearch: {
    comparisons: number;
    timeMicroseconds: number;
    complexity: string;
  };
  hashSearch: {
    comparisons: number;
    bucketIndex: number;
    timeMicroseconds: number;
    complexity: string;
  };
}

export interface SortBenchmarkResult {
  key: 'estimatedDeliveryDate' | 'currentStatus' | 'customerName' | 'trackingId';
  algorithm: 'Merge Sort';
  itemCount: number;
  comparisons: number;
  mergeOperations: number;
  timeMicroseconds: number;
  complexity: string;
}

export interface RouteNode {
  id: string;
  name: string;
  code: string;
  x: number; // For visual graph SVG layout
  y: number;
  hubType: 'Mega Hub' | 'Regional Hub' | 'Air Gateway';
}

export interface RouteEdge {
  from: string;
  to: string;
  distanceKm: number;
  transitHours: number;
}
