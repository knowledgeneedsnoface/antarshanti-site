# Inner Atlas Foundation

This directory (`src`) contains the core architecture for the Inner Atlas immersive experience.

## Architecture Guidelines

### Adding New Components
1. Create new components in `app/inner-atlas/(components)` (Next.js convention) or `src/components`.
2. Use the **Context Hooks** to access global state:
   - `useAudio()` for sound.
   - `useShrine()` for adding relics.
   - `usePersonalization()` for reading the seed/theme.

### Using Lottie
Do NOT import JSONs directly if large. Use `LottieManager`:
```ts
import { LottieManager } from '../src/lib/LottieManager';
LottieManager.loadAnimation('portal', ref.current, '/inner-atlas/lottie/portal.json');
```

### Analytics
Track key milestones:
```ts
import { Analytics } from '../src/lib/Analytics';
Analytics.track('chamber_started', { mode: 'ANCHOR' });
```

### Audio
Ensure user interaction first.
```ts
const { play } = useAudio();
// In onClick handler:
play('bell_sound');
```

## Directory Map
- `contexts/`: React State Containers.
- `lib/`: Logic Engines (Audio, Analytics, etc).
- `styles/`: Design Tokens.
