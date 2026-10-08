/**
 * Custom Hash Table Implementation for Parcel Tracking (DAA Module)
 * Average Lookup Complexity: O(1)
 * Worst Case: O(k) where k is bucket collision chain length
 */

export interface HashEntry<V> {
  key: string;
  value: V;
}

export interface HashLookupMetric<V> {
  found: boolean;
  value?: V;
  bucketIndex: number;
  comparisons: number;
  timeMicroseconds: number;
  chainLength: number;
}

export class ParcelHashTable<V> {
  private capacity: number;
  private buckets: HashEntry<V>[][];
  private sizeCount: number = 0;

  constructor(capacity: number = 37) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  /**
   * Polynomial rolling hash function
   * hash = (hash * 31 + charCode) % capacity
   */
  public hash(key: string): number {
    let hashVal = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashVal = (hashVal * prime + key.charCodeAt(i)) % this.capacity;
    }
    return Math.abs(hashVal);
  }

  public set(key: string, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.sizeCount++;
  }

  public get(key: string): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    return undefined;
  }

  public getWithMetrics(key: string): HashLookupMetric<V> {
    const start = performance.now();
    const index = this.hash(key);
    const bucket = this.buckets[index];
    let comparisons = 0;
    let foundEntry: HashEntry<V> | undefined;

    for (let i = 0; i < bucket.length; i++) {
      comparisons++;
      if (bucket[i].key === key) {
        foundEntry = bucket[i];
        break;
      }
    }

    const duration = Math.max(0.001, (performance.now() - start) * 1000); // in microseconds

    return {
      found: !!foundEntry,
      value: foundEntry ? foundEntry.value : undefined,
      bucketIndex: index,
      comparisons: Math.max(1, comparisons),
      timeMicroseconds: Math.round(duration * 100) / 100,
      chainLength: bucket.length
    };
  }

  public has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  public delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.sizeCount--;
        return true;
      }
    }
    return false;
  }

  public size(): number {
    return this.sizeCount;
  }

  public values(): V[] {
    const result: V[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push(entry.value);
      }
    }
    return result;
  }

  public getBucketsDebugInfo(): {
    index: number;
    keys: string[];
    count: number;
  }[] {
    return this.buckets.map((bucket, idx) => ({
      index: idx,
      keys: bucket.map((e) => e.key),
      count: bucket.length
    }));
  }
}
