# AntarShanti Ultra-Premium Experience - Asset Plan

## 🎨 Complete Asset Requirements

### High-Resolution Textures (4K Recommended)

#### 1. **Brass & Metal Textures**
```
public/textures/brass/
├── brass_diffuse.jpg (4K, PBR)
├── brass_normal.jpg
├── brass_roughness.jpg
├── brass_metallic.jpg
└── brass_ao.jpg
```

#### 2. **Natural Materials**
```
public/textures/natural/
├── wood_teak_diffuse.jpg (4K)
├── wood_teak_normal.jpg
├── paper_handmade_diffuse.jpg
├── fabric_silk_diffuse.jpg
├── stone_temple_diffuse.jpg
└── incense_stick_diffuse.jpg
```

#### 3. **Mandala & Sacred Geometry**
```
public/textures/mandala/
├── mandala_gold_4k.png (4096x4096, transparent)
├── mandala_bronze_4k.png
├── sacred_geometry_01.png
├── sacred_geometry_02.png
├── yantra_kalacakra.png
└── yantra_sri.png
```

### HDRI Environment Maps

#### 1. **Temple Interior HDRI**
```
public/hdri/
├── temple_interior_4k.hdr (8K recommended)
├── temple_exterior_4k.hdr
└── meditation_space.hdr
```

#### 2. **Lighting Maps**
```
public/lighting/
├── temple_warm.exr
└── golden_hour.exr
```

### Particle Textures

#### 1. **Incense Smoke**
```
public/particles/
├── smoke_puff_01.png (512x512, soft edges)
├── smoke_puff_02.png
├── smoke_puff_03.png
└── smoke_trail.png
```

#### 2. **Golden Dust**
```
public/particles/
├── gold_sparkle_01.png (256x256)
├── gold_sparkle_02.png
├── gold_particle.png
└── light_ray.png
```

### 3D Models (Optimized GLTF)

#### 1. **Ritual Objects**
```
public/models/
├── brass_diya.glb (10K triangles max)
├── rudraksha_mala.glb
├── ghee_container.glb
├── sacred_thread.glb
├── wooden_box.glb
└── brass_bell.glb
```

#### 2. **Decorative Elements**
```
public/models/
├── temple_pillar.glb
├── incense_holder.glb
├── yantra_plate.glb
└── meditation_cushion.glb
```

### Audio Assets (High Quality)

#### 1. **Ambient Sounds**
```
public/audio/
├── tanpura_drone_loop.wav (24-bit, 96kHz, seamless loop)
├── temple_bell_single.wav
├── temple_bell_double.wav
├── incense_crackle.wav
└── distant_chanting.wav
```

#### 2. **UI Sound Effects**
```
public/audio/ui/
├── node_hover.wav
├── node_select.wav
├── modal_open.wav
├── chime_soft.wav
└── completion_bell.wav
```

### Icon & Symbol Assets

#### 1. **Spiritual Symbols**
```
public/icons/
├── om_symbol.svg
├── swastika.svg
├── trishula.svg
├── kalasha.svg
├── dharma_wheel.svg
└── lotus.svg
```

#### 2. **Custom Icon Set**
```
public/icons/custom/
├── puja_icon.svg
├── meditation_icon.svg
├── wellness_icon.svg
├── tradition_icon.svg
└── transformation_icon.svg
```

## 🎭 Visual Style Guide

### Color Palette (Premium Spiritual)
```css
/* Primary Colors */
--gold-primary: #D4AF37
--gold-secondary: #F4E4BC
--copper: #CD853F
--bronze: #8B4513
--saffron: #FF9933

/* Background Gradients */
--temple-bg: linear-gradient(135deg, #2C1810 0%, #8B4513 50%, #D4AF37 100%)
--warm-light: linear-gradient(45deg, #F4E4BC 0%, #FFE4B5 100%)

/* Accent Colors */
--emerald-spirit: #4CAF50
--ruby-warmth: #DC143C
--sapphire-calm: #4169E1
```

### Typography Hierarchy
```css
/* Headings */
--font-display: 'Crimson Text', serif (premium spiritual)
--font-body: 'Inter', sans-serif (modern readability)

/* Sizes */
--text-hero: clamp(3rem, 8vw, 6rem)
--text-title: clamp(2rem, 5vw, 4rem)
--text-subtitle: clamp(1.25rem, 3vw, 2rem)
--text-body: clamp(1rem, 2.5vw, 1.25rem)
```

## 📱 Mobile Optimizations

### Texture Compression
- Use WebP for textures (2-3x smaller than JPEG)
- Implement progressive loading
- Mobile: 2K textures, Desktop: 4K

### Performance Budget
- **Mobile**: < 50MB total assets
- **Desktop**: < 150MB total assets
- **Initial Load**: < 10MB (critical path)

### Adaptive Quality
```javascript
// Dynamic quality based on device
const quality = {
  mobile: { textureSize: 1024, particleCount: 100 },
  tablet: { textureSize: 2048, particleCount: 300 },
  desktop: { textureSize: 4096, particleCount: 500 }
};
```

## 🔧 Technical Specifications

### Texture Requirements
- **Format**: WebP for web, PNG for transparency
- **Color Space**: sRGB for albedo, Linear for others
- **Mipmaps**: Generated automatically
- **Compression**: Lossy for performance

### Audio Specifications
- **Format**: MP3 for compatibility, WAV for quality
- **Sample Rate**: 44.1kHz minimum, 96kHz for premium
- **Bit Depth**: 16-bit minimum, 24-bit for quality
- **Normalization**: -12dB RMS for consistent volume

### 3D Model Optimization
- **Triangles**: 5K-15K per model
- **Textures**: 2K-4K resolution
- **LODs**: 3 levels for distance culling
- **Compression**: Draco compression for GLTF

## 📋 Implementation Priority

### Phase 1: Core Experience (Week 1-2)
1. ✅ Camera system
2. ✅ Basic node interaction
3. ✅ Modal overlays
4. ✅ Lighting rig
5. ✅ Particle systems

### Phase 2: Polish & Assets (Week 3-4)
1. 🔄 High-res textures
2. 🔄 HDRI environments
3. 🔄 Audio system
4. 🔄 Mobile optimization
5. 🔄 Performance tuning

### Phase 3: Premium Details (Week 5-6)
1. 🔄 Advanced shaders
2. 🔄 Custom materials
3. 🔄 Particle variations
4. 🔄 Audio mixing
5. 🔄 Final QA

## 🎯 Asset Creation Guidelines

### Photography Requirements
- **Lighting**: Soft, warm, directional
- **Composition**: Clean, spiritual focus
- **Resolution**: Minimum 6000x4000px
- **Format**: RAW for editing, JPEG for web

### 3D Modeling Standards
- **Scale**: Real-world measurements
- **Topology**: Clean quad-based mesh
- **UV Mapping**: Non-overlapping, efficient
- **Materials**: PBR workflow (albedo, normal, roughness, metallic)

### Audio Recording
- **Microphones**: High-quality condenser
- **Environment**: Temple/church acoustics
- **Processing**: Minimal compression, natural reverb
- **Mastering**: -12dB RMS, brickwall limiting

---

## 🚀 Quick Start Asset Checklist

### Immediate Needs (This Week)
- [ ] 3 product photos (packet.jpg, benefit1-3.jpg)
- [ ] Basic mandala SVG
- [ ] Simple audio files (placeholder)
- [ ] Color palette implementation

### High Priority (Next Week)
- [ ] HDRI environment
- [ ] Brass texture set
- [ ] Incense particle textures
- [ ] Tanpura drone audio

### Premium Polish (Final Week)
- [ ] 4K textures
- [ ] Custom 3D models
- [ ] Professional audio recording
- [ ] Advanced particle effects

---

**Total Estimated Asset Size**: ~200MB (uncompressed)
**Optimized Web Bundle**: ~50MB
**Performance Target**: <3s initial load on 4G
