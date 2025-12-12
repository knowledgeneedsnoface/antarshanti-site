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
    | 'habit_opt_in'
    | 'portal_viewed'
    | 'portal_hover'
    | 'map_generated'
    | 'path_node_hover'
    | 'path_node_clicked'
    | 'path_selected'
    | 'path_nodes_rendered'
    | 'path_prophesy_shown'
    | 'scene_enter'
    | 'flame_hold_complete'
    | 'breath_cycle_complete'
    | 'mantra_pass_complete'
    | 'dissolve_complete'
    | 'ignite_complete'
    | 'ritual_complete'
    | 'shrine_viewed'
    | 'shrine_level_up'
    | 'relic_hover'
    | 'relic_clicked'
    | 'relic_shared'
    | 'relic_rarity'
    | 'relic_added_to_shrine'
    | 'shrine_evolved'
    | 'shrine_streak_bonus';

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
