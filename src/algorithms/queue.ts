import { Parcel } from '../types/parcel';

export interface QueueItem {
  parcel: Parcel;
  enqueuedAt: string;
  priorityWeight: number;
}

export interface ProcessedQueueRecord {
  parcel: Parcel;
  enqueuedAt: string;
  processedAt: string;
  sortingBay: string;
  operator: string;
  nextDestination: string;
}

/**
 * FIFO Queue implementation for Sorting Center Hub
 * Enqueue: O(1)
 * Dequeue: O(1)
 * Peek: O(1)
 */
export class SortingCenterQueue {
  private items: QueueItem[] = [];
  private processedHistory: ProcessedQueueRecord[] = [];

  constructor(initialParcels: Parcel[] = []) {
    initialParcels.forEach((p) => this.enqueue(p));
  }

  public enqueue(parcel: Parcel): void {
    // Prevent duplicate enqueue of same parcel
    if (this.contains(parcel.trackingId)) {
      return;
    }
    this.items.push({
      parcel,
      enqueuedAt: new Date().toISOString(),
      priorityWeight: parcel.priority === 'Priority Overnight' ? 3 : parcel.priority === 'Express' ? 2 : 1
    });
  }

  public dequeue(operatorName: string = 'Staff Hub Operator'): ProcessedQueueRecord | null {
    if (this.isEmpty()) return null;
    const item = this.items.shift()!;
    const bays = ['Bay A-01 (Air Cargo)', 'Bay B-04 (Intercity Highway)', 'Bay C-02 (Local Express Dispatch)', 'Bay D-07 (Regional Sorting)'];
    const randomBay = bays[Math.floor(Math.random() * bays.length)];

    const record: ProcessedQueueRecord = {
      parcel: item.parcel,
      enqueuedAt: item.enqueuedAt,
      processedAt: new Date().toISOString(),
      sortingBay: randomBay,
      operator: operatorName,
      nextDestination: item.parcel.destinationCity
    };

    this.processedHistory.unshift(record);
    if (this.processedHistory.length > 30) {
      this.processedHistory.pop();
    }

    return record;
  }

  public peek(): QueueItem | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  public size(): number {
    return this.items.length;
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public getAll(): QueueItem[] {
    return [...this.items];
  }

  public getHistory(): ProcessedQueueRecord[] {
    return [...this.processedHistory];
  }

  public contains(trackingId: string): boolean {
    return this.items.some((item) => item.parcel.trackingId === trackingId);
  }

  public remove(trackingId: string): boolean {
    const idx = this.items.findIndex((item) => item.parcel.trackingId === trackingId);
    if (idx !== -1) {
      this.items.splice(idx, 1);
      return true;
    }
    return false;
  }

  public clear(): void {
    this.items = [];
  }
}
