import { Parcel, SearchBenchmarkResult } from '../types/parcel';
import { ParcelHashTable } from './hashTable';

/**
 * Linear Search: O(n)
 * Scans an array element-by-element until tracking ID matches.
 */
export function linearSearchParcels(
  parcels: Parcel[],
  trackingId: string
): {
  found: boolean;
  parcel?: Parcel;
  comparisons: number;
  timeMicroseconds: number;
} {
  const start = performance.now();
  let comparisons = 0;
  let foundParcel: Parcel | undefined;

  const normalized = trackingId.trim().toUpperCase();

  for (let i = 0; i < parcels.length; i++) {
    comparisons++;
    if (parcels[i].trackingId.toUpperCase() === normalized) {
      foundParcel = parcels[i];
      break;
    }
  }

  const duration = Math.max(0.001, (performance.now() - start) * 1000); // microseconds

  return {
    found: !!foundParcel,
    parcel: foundParcel,
    comparisons,
    timeMicroseconds: Math.round(duration * 100) / 100
  };
}

/**
 * Run dual search benchmark: Linear Search vs Hash Table Search
 */
export function compareSearchAlgorithms(
  parcels: Parcel[],
  hashTable: ParcelHashTable<Parcel>,
  trackingId: string
): SearchBenchmarkResult {
  const normalized = trackingId.trim().toUpperCase();

  // Run linear search
  const linearResult = linearSearchParcels(parcels, normalized);

  // Run hash table search
  const hashResult = hashTable.getWithMetrics(normalized);

  return {
    query: trackingId,
    found: hashResult.found || linearResult.found,
    parcel: hashResult.value || linearResult.parcel,
    linearSearch: {
      comparisons: linearResult.comparisons,
      timeMicroseconds: linearResult.timeMicroseconds,
      complexity: 'O(n)'
    },
    hashSearch: {
      comparisons: hashResult.comparisons,
      bucketIndex: hashResult.bucketIndex,
      timeMicroseconds: hashResult.timeMicroseconds,
      complexity: 'O(1) average'
    }
  };
}
