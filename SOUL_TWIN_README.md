# 🌟 Digital Soul Twin Feature - Complete Implementation

## Overview
This feature creates a gamified spiritual companion that grows with the user's ritual practice.

## Quick Start

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Start the Local Server
```bash
cd server
npm start
# Server runs on http://localhost:4000
```

### 3. Start Next.js Dev Server
```bash
# In project root
npm run dev
# Client runs on http://localhost:3000
```

### 4. Test the Feature
- Visit http://localhost:3000
- Complete the Twin onboarding
- Visit http://localhost:3000/twin/demo to test

## File Structure

```
antarshanti-site/
├── lib/twin/
│   ├── rules.ts          ✅ Created
│   └── twinClient.ts     ✅ Created
├── components/twin/
│   ├── TwinMini.tsx      → Create next
│   ├── TwinFull.tsx      → Create next
│   ├── TwinOnboarding.tsx → Create next
│   └── LevelUpModal.tsx  → Create next
├── app/
│   ├── layout.tsx        → Update
│   └── twin/demo/page.tsx → Create
└── server/
    ├── package.json      → Create
    ├── index.js          → Create
    └── data/twins.json   → Auto-created
```

## Testing Checklist

### Test 1: Create Twin
1. Visit site, should see onboarding
2. Enter name, choose path, pick avatar
3. Verify twin created in server/data/twins.json
4. Verify twin shows in TwinMini component

### Test 2: Simulate Rituals
1. Go to /twin/demo page
2. Click "Simulate Daily Puja"
3. Should see: XP +50, attributes increase
4. Verify animation on XP ring and attribute bars

### Test 3: Level Up
1. Click "Simulate Daily Puja" 4 times (4 × 50 = 200 XP)
2. Should trigger level up modal
3. Verify level changes from 1 to 2
4. Verify XP carryover (0 XP shown at level 2)

### Test 4: Offline Queue
1. Stop server (Ctrl+C in server terminal)
2. Click "Simulate Daily Puja" twice
3. Should see "Offline (queued: 2)" indicator
4. Restart server
5. Click "Force Resync" button
6. Verify events applied and queue cleared

## Expected Numeric Outputs

### Starting State
- Level: 1
- XP: 0 / 200
- All attributes: 10

### After 1 Daily Puja (Path: Peace)
- XP: 50 / 200
- Calmness: 10 + (2 × 1.5) = 13
- Discipline: 10 + (1 × 1.0) = 11
- Emotional Strength: 10 + (1 × 1.2) = 11
- Energy: 10 + (1 × 0.8) = 10 (fraction: 0.8)

### After 4 Daily Pujas
- Level: 2 (leveled up after 200 XP)
- XP: 0 / 300
- Calmness: 22
- Discipline: 14
- Emotional Strength: 14
- Energy: 13

## Architecture Notes

### Client-Server Flow
1. User triggers action (completes ritual)
2. Client calls twinClient.postEvent()
3. Request goes to http://localhost:4000/api/twin/:userId/event
4. Server validates, applies rules.ts logic
5. Server persists to data/twins.json
6. Server returns updated twin
7. Client updates UI with animations

### Offline Behavior
1. Server unavailable → catch error
2. Event queued in localStorage
3. Applied locally for immediate feedback
4. On reconnect → syncQueuedEvents() sends queue
5. Server reconciles and returns canonical state

### Path Multipliers
Each spiritual path amplifies different attributes:
- **Peace**: Calmness (1.5×), Emotional Strength (1.2×)
- **Strength**: Discipline (1.5×), Emotional Strength (1.5×)
- **Devotion**: Discipline (1.5×), Energy (1.3×)
- **Light**: Calmness (1.3×), Energy (1.5×)

## Next Steps

I've created the core foundation files (rules.ts and twinClient.ts). 

Due to message length constraints, I need to create the React components in separate messages. 

Would you like me to:
1. Create all the React components now?
2. Create the server code?
3. Both?

Let me know and I'll continue with the complete implementation!
