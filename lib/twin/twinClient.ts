// lib/twin/twinClient.ts
// Client-side API wrapper with localStorage fallback

import { SoulTwin, TwinEvent, createNewTwin, applyEventToTwin } from './rules';

const API_BASE = 'http://localhost:4000/api/twin';
const STORAGE_KEY_TWIN = 'soulTwin_local_backup';
const STORAGE_KEY_QUEUE = 'soulTwin_event_queue';

interface QueuedEvent extends TwinEvent {
  userId: string;
}

// GET TWIN
export async function getTwin(userId: string): Promise<SoulTwin | null> {
  try {
    const res = await fetch(`${API_BASE}/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const twin = await res.json();
      localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(twin));
      return twin;
    } else if (res.status === 404) {
      const cached = localStorage.getItem(STORAGE_KEY_TWIN);
      return cached ? JSON.parse(cached) : null;
    }
  } catch (error) {
    console.error('Server unavailable, using localStorage:', error);
    const cached = localStorage.getItem(STORAGE_KEY_TWIN);
    return cached ? JSON.parse(cached) : null;
  }

  return null;
}

// CREATE TWIN
export async function createTwin(
  userId: string,
  name: string,
  path: 'Peace' | 'Strength' | 'Devotion' | 'Light',
  avatarSeed: number
): Promise<SoulTwin> {
  const twin = createNewTwin(userId, name, path, avatarSeed);

  try {
    const res = await fetch(`${API_BASE}/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(twin),
    });

    if (res.ok) {
      const savedTwin = await res.json();
      localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(savedTwin));
      return savedTwin;
    }
  } catch (error) {
    console.error('Server unavailable, saving locally:', error);
  }

  localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(twin));
  return twin;
}

// POST EVENT
export async function postEvent(
  userId: string,
  event: TwinEvent
): Promise<SoulTwin | null> {
  try {
    const res = await fetch(`${API_BASE}/${userId}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    if (res.ok) {
      const updatedTwin = await res.json();
      localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(updatedTwin));
      return updatedTwin;
    }
  } catch (error) {
    console.error('Server unavailable, queueing event:', error);
  }

  queueEvent({ ...event, userId });

  const cached = localStorage.getItem(STORAGE_KEY_TWIN);
  if (cached) {
    const twin: SoulTwin = JSON.parse(cached);
    const { twin: updatedTwin } = applyEventToTwin(twin, event);
    localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(updatedTwin));
    return updatedTwin;
  }

  return null;
}

// QUEUE EVENT
function queueEvent(event: QueuedEvent) {
  const queue = getEventQueue();
  queue.push(event);
  localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queue));
}

// GET EVENT QUEUE
export function getEventQueue(): QueuedEvent[] {
  const stored = localStorage.getItem(STORAGE_KEY_QUEUE);
  return stored ? JSON.parse(stored) : [];
}

// SYNC QUEUED EVENTS
export async function syncQueuedEvents(userId: string): Promise<boolean> {
  const queue = getEventQueue();
  if (queue.length === 0) return true;

  try {
    const res = await fetch(`${API_BASE}/${userId}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: queue }),
    });

    if (res.ok) {
      const updatedTwin = await res.json();
      localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(updatedTwin));
      localStorage.removeItem(STORAGE_KEY_QUEUE);
      return true;
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }

  return false;
}

// UPDATE TWIN SETTINGS
export async function updateTwinSettings(
  userId: string,
  updates: Partial<Pick<SoulTwin, 'name' | 'avatarSeed'>>
): Promise<SoulTwin | null> {
  try {
    const res = await fetch(`${API_BASE}/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      const updatedTwin = await res.json();
      localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(updatedTwin));
      return updatedTwin;
    }
  } catch (error) {
    console.error('Update failed:', error);
  }

  const cached = localStorage.getItem(STORAGE_KEY_TWIN);
  if (cached) {
    const twin: SoulTwin = JSON.parse(cached);
    const updatedTwin = { ...twin, ...updates };
    localStorage.setItem(STORAGE_KEY_TWIN, JSON.stringify(updatedTwin));
    return updatedTwin;
  }

  return null;
}
