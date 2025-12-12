/**
 * Inner Atlas Analytics System
 * Handles event dispatching and queueing.
 */

export type AnalyticsEventName =
    | 'visit_started'
    | 'seed_entered'
    | 'path_chosen'
    | 'chamber_started'
    | 'relic_collected'
    | 'shrine_saved'
    | 'snapshot_shared'
    | 'habit_opt_in';

export interface AnalyticsEvent {
    name: AnalyticsEventName;
    properties?: Record<string, any>;
    timestamp: number;
}

class AnalyticsManager {
    private queue: AnalyticsEvent[] = [];
    private isInitialized: boolean = false;

    init() {
        this.isInitialized = true;
        this.flush();
        console.log('[Atlas Analytics] Initialized');
    }

    track(name: AnalyticsEventName, properties: Record<string, any> = {}) {
        const event: AnalyticsEvent = {
            name,
            properties,
            timestamp: Date.now()
        };

        this.queue.push(event);

        if (this.isInitialized) {
            this.flush();
        }
    }

    private flush() {
        if (this.queue.length === 0) return;

        const batch = [...this.queue];
        this.queue = [];

        batch.forEach(event => {
            // Stub: Here we would send to Segment/GA/Custom Backend
            console.log(`[Atlas Analytics] Event: ${event.name}`, event.properties);
        });
    }
}

export const Analytics = new AnalyticsManager();
