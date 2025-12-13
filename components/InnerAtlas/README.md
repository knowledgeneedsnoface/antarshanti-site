# Inner Atlas - Module 1: Chariot Arrival

This module implements the entry experience for the Inner Atlas journey.

## Files

- **Component**: `components/InnerAtlas/ChariotArrival.tsx`
- **Assets**: 
  - `public/assets/chariot.svg` (Placeholder)
  - `public/assets/fog-bg.svg` (Placeholder)

## Usage

Import and use the component in your page (e.g., `app/page.tsx` or `app/inner-atlas/page.tsx`):

```tsx
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";

export default function InnerAtlasPage() {
  const handleStart = () => {
    console.log("Transition to next module...");
    // Add your routing logic here
  };

  return (
    <main>
      <ChariotArrival onStartInnerAtlas={handleStart} />
    </main>
  );
}
```

## Customization

### Assets
Replace the placeholder SVGs with high-quality assets for the best experience.
1. **Chariot**: Replace `public/assets/chariot.svg` with a transparent PNG (`chariot.png`).
   - Recommended size: 1000x1000px or larger.
   - Update the path in `ChariotArrival.tsx` if you use a different filename.
2. **Background**: Replace `public/assets/fog-bg.svg` with a high-res background or fog texture (`fog-bg.png`).

### Animations
Adjust animation timings in the `variants` objects at the top of `ChariotArrival.tsx`.
- `chariotVariants.enter.transition.duration`: Controls how long the approach takes (default 5s).

## Dependencies
- `framer-motion`: For animations.
- `lucide-react`: For icons.
- `tailwindcss`: For styling.
