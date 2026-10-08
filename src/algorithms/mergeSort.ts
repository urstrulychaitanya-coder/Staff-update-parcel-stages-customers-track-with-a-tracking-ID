import { Parcel, ParcelStage, PARCEL_STAGES, SortBenchmarkResult } from '../types/parcel';

export type SortField = 'estimatedDeliveryDate' | 'currentStatus' | 'customerName' | 'trackingId';
export type SortDirection = 'asc' | 'desc';

const STAGE_ORDER_MAP: Record<ParcelStage, number> = {
  'Order Placed': 0,
  'Picked Up': 1,
  'At Sorting Center': 2,
  'In Transit': 3,
  'Out for Delivery': 4,
  'Delivered': 5
};

export interface MergeSortExecutionResult {
  sortedParcels: Parcel[];
  benchmark: SortBenchmarkResult;
}

/**
 * Merge Sort implementation: O(n log n)
 * Classic Divide and Conquer sorting algorithm with step instrumentation.
 */
export function executeMergeSort(
  parcels: Parcel[],
  field: SortField,
  direction: SortDirection = 'asc'
): MergeSortExecutionResult {
  let comparisons = 0;
  let mergeOperations = 0;

  const compareParcels = (a: Parcel, b: Parcel): number => {
    comparisons++;
    let valA: string | number = '';
    let valB: string | number = '';

    if (field === 'currentStatus') {
      valA = STAGE_ORDER_MAP[a.currentStatus] ?? 0;
      valB = STAGE_ORDER_MAP[b.currentStatus] ?? 0;
    } else if (field === 'estimatedDeliveryDate') {
      valA = new Date(a.estimatedDeliveryDate).getTime();
      valB = new Date(b.estimatedDeliveryDate).getTime();
    } else if (field === 'customerName') {
      valA = a.customerName.toLowerCase();
      valB = b.customerName.toLowerCase();
    } else if (field === 'trackingId') {
      valA = a.trackingId;
      valB = b.trackingId;
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  };

  function merge(left: Parcel[], right: Parcel[]): Parcel[] {
    const result: Parcel[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      mergeOperations++;
      if (compareParcels(left[i], right[j]) <= 0) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  function sort(items: Parcel[]): Parcel[] {
    if (items.length <= 1) return items;
    const mid = Math.floor(items.length / 2);
    const left = sort(items.slice(0, mid));
    const right = sort(items.slice(mid));
    return merge(left, right);
  }

  const start = performance.now();
  const sorted = sort([...parcels]);
  const duration = Math.max(0.001, (performance.now() - start) * 1000); // microseconds

  return {
    sortedParcels: sorted,
    benchmark: {
      key: field,
      algorithm: 'Merge Sort',
      itemCount: parcels.length,
      comparisons,
      mergeOperations,
      timeMicroseconds: Math.round(duration * 100) / 100,
      complexity: 'O(n log n)'
    }
  };
}
