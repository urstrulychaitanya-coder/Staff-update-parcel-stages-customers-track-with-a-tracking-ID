import { RouteNode, RouteEdge } from '../types/parcel';

export const LOGISTICS_HUBS: RouteNode[] = [
  { id: 'DEL', name: 'Delhi NCR', code: 'DEL', x: 260, y: 70, hubType: 'Mega Hub' },
  { id: 'BOM', name: 'Mumbai', code: 'BOM', x: 120, y: 220, hubType: 'Mega Hub' },
  { id: 'BLR', name: 'Bengaluru', code: 'BLR', x: 210, y: 360, hubType: 'Mega Hub' },
  { id: 'HYD', name: 'Hyderabad', code: 'HYD', x: 250, y: 260, hubType: 'Regional Hub' },
  { id: 'MAA', name: 'Chennai', code: 'MAA', x: 290, y: 350, hubType: 'Regional Hub' },
  { id: 'CCU', name: 'Kolkata', code: 'CCU', x: 420, y: 170, hubType: 'Regional Hub' },
  { id: 'PNQ', name: 'Pune', code: 'PNQ', x: 160, y: 250, hubType: 'Regional Hub' },
  { id: 'AMD', name: 'Ahmedabad', code: 'AMD', x: 120, y: 140, hubType: 'Air Gateway' }
];

export const HUB_ROUTES: RouteEdge[] = [
  // Delhi connections
  { from: 'DEL', to: 'AMD', distanceKm: 940, transitHours: 14 },
  { from: 'DEL', to: 'BOM', distanceKm: 1410, transitHours: 20 },
  { from: 'DEL', to: 'CCU', distanceKm: 1530, transitHours: 22 },
  { from: 'DEL', to: 'HYD', distanceKm: 1560, transitHours: 23 },

  // Ahmedabad connections
  { from: 'AMD', to: 'BOM', distanceKm: 530, transitHours: 8 },
  { from: 'AMD', to: 'PNQ', distanceKm: 660, transitHours: 11 },

  // Mumbai connections
  { from: 'BOM', to: 'PNQ', distanceKm: 150, transitHours: 3 },
  { from: 'BOM', to: 'HYD', distanceKm: 710, transitHours: 12 },
  { from: 'BOM', to: 'BLR', distanceKm: 980, transitHours: 16 },

  // Pune connections
  { from: 'PNQ', to: 'HYD', distanceKm: 560, transitHours: 9 },
  { from: 'PNQ', to: 'BLR', distanceKm: 840, transitHours: 14 },

  // Hyderabad connections
  { from: 'HYD', to: 'BLR', distanceKm: 570, transitHours: 9 },
  { from: 'HYD', to: 'MAA', distanceKm: 630, transitHours: 10 },
  { from: 'HYD', to: 'CCU', distanceKm: 1480, transitHours: 24 },

  // Bengaluru connections
  { from: 'BLR', to: 'MAA', distanceKm: 350, transitHours: 6 },

  // Kolkata connections
  { from: 'CCU', to: 'MAA', distanceKm: 1660, transitHours: 26 }
];

export interface DijkstraResult {
  path: RouteNode[];
  totalDistanceKm: number;
  totalTransitHours: number;
  visitedNodesCount: number;
  edgeEvaluations: number;
  timeMicroseconds: number;
  complexity: string;
}

/**
 * Dijkstra's Algorithm for Shortest Transit Route
 * Time Complexity: O((V + E) log V) with priority queue, O(V^2) matrix implementation
 */
export function findShortestRoute(
  sourceId: string,
  targetId: string,
  metric: 'distance' | 'time' = 'distance'
): DijkstraResult {
  const start = performance.now();
  let edgeEvaluations = 0;

  // Build bidirectional adjacency list
  const adj = new Map<string, { node: string; weight: number; hours: number; km: number }[]>();
  LOGISTICS_HUBS.forEach((hub) => adj.set(hub.id, []));

  HUB_ROUTES.forEach((edge) => {
    const weight = metric === 'distance' ? edge.distanceKm : edge.transitHours;
    adj.get(edge.from)?.push({ node: edge.to, weight, hours: edge.transitHours, km: edge.distanceKm });
    adj.get(edge.to)?.push({ node: edge.from, weight, hours: edge.transitHours, km: edge.distanceKm });
  });

  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  LOGISTICS_HUBS.forEach((hub) => {
    distances.set(hub.id, Infinity);
    previous.set(hub.id, null);
  });

  distances.set(sourceId, 0);

  while (visited.size < LOGISTICS_HUBS.length) {
    // Find unvisited node with smallest distance
    let current: string | null = null;
    let smallestDist = Infinity;

    for (const [id, dist] of distances.entries()) {
      if (!visited.has(id) && dist < smallestDist) {
        smallestDist = dist;
        current = id;
      }
    }

    if (current === null || smallestDist === Infinity || current === targetId) {
      break;
    }

    visited.add(current);

    const neighbors = adj.get(current) || [];
    for (const edge of neighbors) {
      edgeEvaluations++;
      if (!visited.has(edge.node)) {
        const candidateDist = distances.get(current)! + edge.weight;
        if (candidateDist < distances.get(edge.node)!) {
          distances.set(edge.node, candidateDist);
          previous.set(edge.node, current);
        }
      }
    }
  }

  // Reconstruct path
  const pathIds: string[] = [];
  let curr: string | null = targetId;
  while (curr !== null) {
    pathIds.unshift(curr);
    curr = previous.get(curr) || null;
  }

  // If path doesn't start with sourceId, no path was found
  if (pathIds[0] !== sourceId) {
    const duration = Math.max(0.001, (performance.now() - start) * 1000);
    return {
      path: [],
      totalDistanceKm: 0,
      totalTransitHours: 0,
      visitedNodesCount: visited.size,
      edgeEvaluations,
      timeMicroseconds: Math.round(duration * 100) / 100,
      complexity: 'O((V + E) log V)'
    };
  }

  const pathNodes = pathIds
    .map((id) => LOGISTICS_HUBS.find((h) => h.id === id))
    .filter((h): h is RouteNode => h !== undefined);

  // Compute total km and hours
  let totalKm = 0;
  let totalHours = 0;
  for (let i = 0; i < pathIds.length - 1; i++) {
    const u = pathIds[i];
    const v = pathIds[i + 1];
    const edge = HUB_ROUTES.find(
      (e) => (e.from === u && e.to === v) || (e.from === v && e.to === u)
    );
    if (edge) {
      totalKm += edge.distanceKm;
      totalHours += edge.transitHours;
    }
  }

  const duration = Math.max(0.001, (performance.now() - start) * 1000);

  return {
    path: pathNodes,
    totalDistanceKm: totalKm,
    totalTransitHours: totalHours,
    visitedNodesCount: visited.size,
    edgeEvaluations,
    timeMicroseconds: Math.round(duration * 100) / 100,
    complexity: 'O((V + E) log V)'
  };
}
