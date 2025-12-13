# Inner Atlas - Module 2: The Mind Realm (Manas Bhoomi)

This module allows users to select a visual metaphor for their current mind state.

## Files

- **Component**: `components/InnerAtlas/MindRealm.tsx`
- **Assets**: 
  - `public/assets/mind-storm.svg`
  - `public/assets/mind-lake.svg`
  - `public/assets/mind-bazaar.svg`
  - `public/assets/mind-desert.svg`
  - `public/assets/mind-forest.svg`

## Usage

Import and use the component:

```tsx
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";

export default function InnerAtlasPage() {
  const handleMindSelection = (state: MindStateKey) => {
    console.log("Selected mind state:", state);
    // Proceed to next step or store state
  };

  return (
    <MindRealm onMindSelection={handleMindSelection} />
  );
}
```

## Customization

### Assets
Replace the SVG placeholders in `public/assets/` with high-quality PNG/JPG images (recommended size: 600x450px or similar aspect ratio).
- Update the file extensions in `MIND_STATES` array in `MindRealm.tsx` if you switch to PNG/JPG.

### Mind States
You can modify the `MIND_STATES` array to add or remove options.

## Dependencies
- `framer-motion`: For animations.
- `lucide-react`: For icons.
- `tailwindcss`: For styling.
