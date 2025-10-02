# 🌐 Babylon PoC - 3D Billboard Experience

<div align="center">

![Babylon.js](https://img.shields.io/badge/Babylon.js-8.29.2-blue?style=for-the-badge&logo=babylon.js)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

**An immersive 3D experience showcasing dynamic billboards with video textures, interactive elements, and real-time animations.**

[🚀 Live Demo](https://babylon-js-po-c.vercel.app/)

</div>

---

## ✨ Features

### 🎬 **Dynamic Video Billboards**

- **Real-time video textures** on 3D billboard models
- **Multiple video formats** support (MP4, WebM)
- **Seamless video playback** with autoplay and looping
- **Cross-browser compatibility** for video rendering

### 🎨 **Interactive 3D Scene**

- **Four distinct billboard types** with unique characteristics
- **Static image billboards** with high-quality textures
- **Glowing border effects** with dynamic blue highlights
- **Rotating video billboards** with continuous horizontal rotation
- **Click-to-inspect** mesh interaction system

### 🎯 **Advanced 3D Rendering**

- **Professional lighting** with hemispheric light setup
- **Optimized camera controls** with ArcRotateCamera
- **Responsive design** that adapts to all screen sizes
- **Smooth 60fps animations** with efficient render loops

### 🛠️ **Developer Experience**

- **Modular GLB loader** utility for easy 3D model management
- **TypeScript support** with full type safety
- **Clean architecture** with separated concerns
- **Hot reload** development environment

---

## 🏗️ Architecture

### **Core Components**

```
src/
├── components/
│   └── BabylonScene.tsx      # Main 3D scene component
├── utils/
│   └── glbLoader.ts          # GLB model loading utility
└── app/
    ├── layout.tsx            # App layout wrapper
    └── page.tsx              # Main page component
```

### **3D Assets Structure**

```
public/
├── 3D assets/
│   ├── billboard.glb         # Static image billboard
│   ├── billboardGlow.glb     # Glowing border billboard
│   ├── billboardForVideos.glb # Video billboard
│   └── billboardRotate.glb   # Rotating video billboard
├── images/
│   ├── bad_meow_01.jpg       # Static textures
│   └── bad_meow_02.jpg
└── videos/
    ├── crypto_life.mp4       # Video textures
    ├── crazy_run.mp4
    ├── hehe_emoji_video.mp4
    └── oops_emoji_video.mp4
```

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ or Bun
- Modern web browser with WebGL support

### **Installation**

```bash
# Clone the repository
git clone https://github.com/gayanukabulegoda/BabylonJS-PoC.git
cd BabylonJS-PoC

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### **Production Build**

```bash
# Build for production
npm run build
# or
bun run build

# Start production server
npm start
# or
bun start
```

---

## 🎮 Usage

### **Scene Navigation**

- **Mouse drag** - Rotate camera around the scene
- **Mouse wheel** - Zoom in/out
- **Click on meshes** - Inspect mesh details in console

### **Billboard Types**

| Billboard    | Type              | Features                       |
| ------------ | ----------------- | ------------------------------ |
| **Static**   | Image textures    | High-quality static images     |
| **Glow**     | Image + Effects   | Blue glowing borders           |
| **Video**    | Video textures    | Real-time video playback       |
| **Rotating** | Video + Animation | Continuous horizontal rotation |

---

## 🛠️ Development

### **Adding New Billboards**

1. **Add GLB model** to `public/3D assets/`
2. **Configure in `BabylonScene.tsx`**:

```typescript
{
  glbFile: "your-model.glb",
  textures: [
    {
      meshName: "MeshName_primitive1",
      texturePath: "/path/to/texture.jpg",
      materialName: "uniqueMaterialName",
      isVideo: false, // or true for videos
    }
  ]
}
```

### **Custom Materials**

```typescript
// In glbLoader.ts
if (materialName.includes("glow")) {
  material.diffuseColor = new Color3(0.0, 0.5, 1.0);
  material.emissiveColor = new Color3(0.0, 0.3, 0.8);
  // Add custom glow effects
}
```

---

## 🎨 Customization

### **Camera Settings**

```typescript
const camera = new ArcRotateCamera(
  "camera",
  -Math.PI / 1.8, // Horizontal rotation
  Math.PI / 3, // Vertical angle
  15, // Distance
  new Vector3(12, 0, 0), // Target position
  scene
);
```

### **Lighting Configuration**

```typescript
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 1.5; // Adjust brightness
```

### **Scene Background**

```typescript
scene.clearColor = new Color4(0.75, 0.75, 0.75, 1.0); // Light gray
```

---

## 🚀 Deployment

### **Vercel**

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

---

## 📊 Performance

### **Optimizations**

- **Efficient render loops** with 60fps target
- **Texture compression** for faster loading
- **LOD (Level of Detail)** for complex models
- **Frustum culling** for off-screen objects

### **Browser Support**

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Developed by Gayanuka Bulegoda**

[⭐ Star this repo](https://github.com/gayanukabulegoda/BabylonJS-PoC.git) • [🐛 Report Bug](https://github.com/gayanukabulegoda/BabylonJS-PoC/issues) • [💡 Request Feature](https://github.com/gayanukabulegoda/BabylonJS-PoC/issues)

</div>
