// Inner Atlas Insight Generation
// Analyzes Mind + Heart + Shadow combinations to generate personalized insights

import { MindStateKey } from "@/components/InnerAtlas/MindRealm";
import { HeartStateKey } from "@/components/InnerAtlas/HeartRealm";
import { ShadowStateKey } from "@/components/InnerAtlas/ShadowRealm";

export interface InnerAtlasProfile {
    archetype: string;
    title: string;
    insight: string;
    guidance: string;
    nextStep: string;
    color: string;
}

// ============================================================================
// Core Insight Generator
// ============================================================================

export function generateInsight(
    mind: MindStateKey,
    heart: HeartStateKey,
    shadow: ShadowStateKey
): InnerAtlasProfile {
    // Check for exact combination matches first
    const combinationKey = `${mind}_${heart}_${shadow}`;
    const exactMatch = COMBINATION_INSIGHTS[combinationKey];

    if (exactMatch) {
        return exactMatch;
    }

    // Fallback: Generate based on pattern analysis
    return generateDynamicInsight(mind, heart, shadow);
}

// ============================================================================
// Predefined Combination Insights (Common Patterns)
// ============================================================================

const COMBINATION_INSIGHTS: Record<string, InnerAtlasProfile> = {
    // ========== HARMONIOUS STATES ==========
    "quiet_lake_peaceful_grateful": {
        archetype: "The Tranquil Sage",
        title: "You Are in Complete Alignment",
        insight: "Tumhara dimag shaant hai, dil mein sukoon hai, aur gratitude naturally flow ho rahi hai. Yeh ek rare aur beautiful state hai. Tum abhi bahut grounded aur present ho.",
        guidance: "Is clarity ko use karo kuch meaningful create karne ke liye. Yeh state temporary hogi, so make the most of it. Journal karo, decisions lo, ya kisi ko help karo.",
        nextStep: "Create something meaningful today",
        color: "#4a9eff"
    },

    "stormy_sky_heavy_held_pain": {
        archetype: "The Storm Bearer",
        title: "You're Carrying Heavy Weather",
        insight: "Tumhara dimag racing mode mein hai, dil bojh se bhara hai, aur andar bahut kuch daba hua hai jo nikal nahi pa raha. Yeh intense moment hai, but it will pass.",
        guidance: "Sabse pehle breathe. Phir kisi ko baat batao—friend, therapist, ya journal. Yeh sab andar rakhne se aur toxic hota jayega. Release karo gently.",
        nextStep: "Talk to someone you trust today",
        color: "#6b7280"
    },

    "crowded_bazaar_overthinking_self_doubt": {
        archetype: "The Overwhelmed Seeker",
        title: "Too Much Noise, Inside and Out",
        insight: "Tumhare dimag mein bahut zyada chalta rehta hai, aur upar se tum apne decisions par bhi shak kar rahe ho. Mental overload ki situation hai.",
        guidance: "Simplify karo. Ek kaam band karo jo zaruri nahi hai. Social media time reduce karo. Aur ek cheez pe focus karo instead of everything.",
        nextStep: "Choose one thing to focus on this week",
        color: "#d97706"
    },

    // ========== GROWTH PATTERNS ==========
    "old_forest_longing_overprotection": {
        archetype: "The Guarded Philosopher",
        title: "Deep Thinker with Walls Up",
        insight: "Tum deeply sochte ho, feel karte ho ki kuch adhura hai, aur saath hi apne aap ko protect bhi karte ho. Thoughtful soul, but isolated.",
        guidance: "Thoda risk lo vulnerability mein. Walls down karo deliberately kisi trusted person ke saath. Connection tumhe fulfill karega more than thinking alone.",
        nextStep: "Share something personal with someone close",
        color: "#7c5295"
    },

    "desert_wind_loving_fear_of_loss": {
        archetype: "The Tender Wanderer",
        title: "Empty, Yet Full of Love and Fear",
        insight: "Tum thoda drained feel kar rahe ho, lekin dil mein love hai. Aur saath mein yeh darr bhi hai ki koi important person chala jayega. Contradiction hai andar.",
        guidance: "Rest karo pehle. Phir realize karo ki fear of loss actually shows how much you care. But attachment se zyada, presence pe focus karo. Be here now.",
        nextStep: "Rest deeply, then reconnect mindfully",
        color: "#f59e0b"
    },

    // ========== CHAOTIC PATTERNS ==========
    "stormy_sky_loving_overthinking": {
        archetype: "The Passionate Overthinker",
        title: "Heart is Full, Mind is Racing",
        insight: "Dil mein bahut pyaar aur warmth hai, but dimag itna sochta hai ki peaceful nahi lag raha. Yeh combo exhausting hai—heart wants flow, mind wants control.",
        guidance: "Trust your heart more. Uski sunoge toh dimag bhi eventually calm ho jayega. Overthinking actually love ki flow ko block kar rahi hai.",
        nextStep: "Do something spontaneous out of love",
        color: "#ec4899"
    },

    "crowded_bazaar_heavy_held_pain": {
        archetype: "The Burdened Multitasker",
        title: "Too Much Going On, Feeling Heavy",
        insight: "External aur internal—dono jagah chaos hai. Dimag bahut busy hai aur dil mein dard bhi daba hua hai. Yeh sustainable nahi hai.",
        guidance: "Kuch off karo. Cancel plans. Say no. Aur us pain ko acknowledge karo jo tum avoid kar rahe ho busyness ke through. Slow down forcefully.",
        nextStep: "Cancel something non-essential this week",
        color: "#ef4444"
    },

    // ========== DEFENSIVE PATTERNS ==========
    "quiet_lake_peaceful_overprotection": {
        archetype: "The Calm Fortress",
        title: "Peaceful, But Walls Are Up",
        insight: "Tum shaant ho, but emotionally guarded. Safe feel karte ho apni boundaries mein, lekin yeh ek controlled peace hai, natural nahi.",
        guidance: "Thoda risk lo vulnerability mein. Peace tab aur deep hota hai jab protective walls thode kam ho. Test karo safe spaces mein pehle.",
        nextStep: "Lower your guard with someone safe",
        color: "#10b981"
    },

    // ========== DEFAULT/COMMON STATES ==========
    "quiet_lake_loving_peaceful": {
        archetype: "The Open Heart",
        title: "Clear Mind, Loving Heart, No Shadows",
        insight: "Tumhari state abhi bahut positive hai. Mind clear, heart open, aur koi heavy shadow bhi nahi. Cherish this.",
        guidance: "Spread this energy. Help someone. Create. Love openly. Yeh states short-lived hoti hain usually, so make it count.",
        nextStep: "Share your light with others",
        color: "#06b6d4"
    }
};

// ============================================================================
// Dynamic Insight Generation (Fallback)
// ============================================================================

function generateDynamicInsight(
    mind: MindStateKey,
    heart: HeartStateKey,
    shadow: ShadowStateKey
): InnerAtlasProfile {
    // Base archetype from mind state
    const mindBase = MIND_ARCHETYPES[mind];
    // Emotional tone from heart state
    const heartTone = HEART_TONES[heart];
    // Shadow depth from shadow state
    const shadowLayer = SHADOW_LAYERS[shadow];

    // Synthesize archetype name
    const archetype = `${shadowLayer.prefix} ${mindBase.name}`;

    // Build insight
    const insight = `${mindBase.insight} ${heartTone.modifier} ${shadowLayer.observation}`;

    // Generate guidance
    const guidance = `${mindBase.guidance} ${heartTone.guidance} ${shadowLayer.guidance}`;

    return {
        archetype,
        title: `${mindBase.title} ${heartTone.title}`,
        insight,
        guidance,
        nextStep: shadowLayer.nextStep,
        color: blendColors(mindBase.color, heartTone.color, shadowLayer.color)
    };
}

// ============================================================================
// Component Archetypes for Dynamic Generation
// ============================================================================

const MIND_ARCHETYPES: Record<MindStateKey, any> = {
    stormy_sky: {
        name: "The Restless Thinker",
        title: "Mind in Motion",
        insight: "Tumhara dimag abhi bahut active hai, thoughts race kar rahe hain.",
        guidance: "Ground yourself. Breathe. Write down thoughts.",
        color: "#6b7280"
    },
    quiet_lake: {
        name: "The Clear Observer",
        title: "Mental Clarity",
        insight: "Tumhara mind abhi peaceful aur clear hai.",
        guidance: "Use this clarity wisely. Make important decisions now.",
        color: "#4a9eff"
    },
    crowded_bazaar: {
        name: "The Overwhelmed One",
        title: "Mental Overload",
        insight: "Bahut zyada chal raha hai dimag mein—too much noise.",
        guidance: "Simplify. One thing at a time. Remove distractions.",
        color: "#d97706"
    },
    desert_wind: {
        name: "The Hollow Wanderer",
        title: "Mental Depletion",
        insight: "Tumhara mind thoda empty aur drained feel kar raha hai.",
        guidance: "Rest is not optional. Recharge first, then engage.",
        color: "#a78bfa"
    },
    old_forest: {
        name: "The Deep Philosopher",
        title: "Profound Thinking",
        insight: "Tum abhi deeply soch rahe ho, introspective mode mein ho.",
        guidance: "Good. But don't get lost in thinking. Act also.",
        color: "#059669"
    }
};

const HEART_TONES: Record<HeartStateKey, any> = {
    peaceful: {
        modifier: "Aur dil bhi halka aur peaceful hai.",
        title: "with Inner Peace",
        guidance: "Maintain this by protecting your energy.",
        color: "#e6d9c7"
    },
    loving: {
        modifier: "Lekin dil mein bahut pyaar aur warmth hai.",
        title: "with Loving Heart",
        guidance: "Express that love. Don't hold back.",
        color: "#ff69b4"
    },
    heavy: {
        modifier: "Aur dil pe bojh bhi hai, emotional weight feel ho raha hai.",
        title: "with Heavy Heart",
        guidance: "Acknowledge the weight. Don't ignore it.",
        color: "#4a90e2"
    },
    grateful: {
        modifier: "Lekin gratitude naturally flow ho rahi hai.",
        title: "with Gratitude",
        guidance: "Deepen it by expressing thanks to people.",
        color: "#d4a94a"
    },
    longing: {
        modifier: "Aur kuch adhura sa feel ho raha hai, longing hai.",
        title: "with Longing",
        guidance: "Identify what's missing. Then pursue or release.",
        color: "#9b59b6"
    }
};

const SHADOW_LAYERS: Record<ShadowStateKey, any> = {
    held_pain: {
        prefix: "The",
        observation: "Andar kuch daba hua hai jo express nahi ho pa raha.",
        guidance: "Find safe ways to release—talk, write, cry.",
        nextStep: "Express something you've been holding",
        color: "#bfa76a"
    },
    self_doubt: {
        prefix: "The Doubting",
        observation: "Aur apni value pe shak bhi chal raha hai.",
        guidance: "List your wins. Evidence over feelings.",
        nextStep: "Write down 5 things you're good at",
        color: "#5a7a9e"
    },
    overprotection: {
        prefix: "The Guarded",
        observation: "Emotional walls bhi tight hain, protect karne ki tendency hai.",
        guidance: "Safe spaces mein thoda vulnerable bano.",
        nextStep: "Share something real with someone close",
        color: "#bfa76a"
    },
    fear_of_loss: {
        prefix: "The Fearful",
        observation: "Aur kisi ko kho dene ka darr bhi hai.",
        guidance: "Focus on presence, not possession.",
        nextStep: "Be fully present with someone today",
        color: "#6b7280"
    },
    overthinking: {
        prefix: "The Analytical",
        observation: "Mental stories aur illusions bhi create ho rahe hain.",
        guidance: "Reality check. What's real vs imagined?",
        nextStep: "Test one assumption you're making",
        color: "#7c5295"
    }
};

// ============================================================================
// Utility: Color Blending
// ============================================================================

function blendColors(color1: string, color2: string, color3: string): string {
    // Simple approach: return the middle color
    return color2;
}
