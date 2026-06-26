import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

interface RefApp {
  id: string;
  name: string;
  developer: string;
  screens: string[];
}

const CLAUDE_PROMPT = `# Android App Reference — Design System Prompt

You are helping build an Android app. The attached 3D model contains real app screenshots as reference textures.

## How to use this reference
- Study the layout patterns, color palettes, and typography
- Note navigation patterns (bottom nav, top bar, drawer)
- Observe card layouts, spacing, and visual hierarchy
- Replace ALL reference imagery with your own branded content

## Build instructions for Claude Code
Paste this prompt into Claude Code along with your own content:

---

I'm building an Android app and I have reference screenshots embedded in this 3D model.
Please help me implement a similar layout using:

1. The structural patterns (navigation, cards, lists, hero sections)
2. Replace ALL reference images with my own branded images and content
3. Apply JISL theme tokens for colors, typography, and spacing
4. Do NOT copy any app content, logos, or copyrighted imagery

Focus on:
- Layout structure and spacing rhythms
- Component patterns (bottom nav, cards, stat rows, search bars)
- Visual hierarchy and typography scale
- Color usage patterns (primary actions, secondary content, backgrounds)

Important: Every reference image must be replaced with your own content.
Use the layout as a template, not a copy.

## JISL Theme Engine
This reference was exported from the JISL Theme Engine.
Apply theme tokens from your active theme for all colors, typography, and spacing.
`;

export async function exportAppAsGLB(app: RefApp): Promise<void> {
  const scene = new THREE.Scene();
  scene.userData = {
    appName: app.name,
    developer: app.developer,
    claudePrompt: CLAUDE_PROMPT,
    exportedFrom: 'JISL Theme Engine',
    screenCount: app.screens.length,
  };

  const loader = new THREE.TextureLoader();

  const loadTex = (url: string): Promise<THREE.Texture | null> =>
    new Promise((resolve) => {
      loader.load(
        url,
        (t) => { t.colorSpace = THREE.SRGBColorSpace; resolve(t); },
        undefined,
        () => resolve(null)
      );
    });

  const textures = await Promise.all(app.screens.slice(0, 6).map(loadTex));
  const valid = textures.filter(Boolean) as THREE.Texture[];

  // Phone body
  const phoneGeo = new THREE.BoxGeometry(1.1, 2.0, 0.09);
  const phoneMat = new THREE.MeshStandardMaterial({ color: '#111318', roughness: 0.15, metalness: 0.8 });
  const phone = new THREE.Mesh(phoneGeo, phoneMat);
  phone.name = 'PhoneBody';
  scene.add(phone);

  // Screen bezel
  const bezelGeo = new THREE.BoxGeometry(0.96, 1.76, 0.001);
  const bezelMat = new THREE.MeshStandardMaterial({ color: '#0a0a0a' });
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.set(0, 0, 0.046);
  bezel.name = 'ScreenBezel';
  scene.add(bezel);

  // Each screen as a separate plane, stacked with slight z offset
  // So the user can see all screens in Blender by toggling visibility
  valid.forEach((tex, i) => {
    const geo = new THREE.PlaneGeometry(0.92, 1.72);
    const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0, 0.048 + i * 0.001);
    mesh.name = `Screen_${String(i + 1).padStart(2, '0')}`;
    mesh.userData = { screenIndex: i, visible: i === 0 };
    if (i > 0) mesh.visible = false;
    scene.add(mesh);
  });

  // Ambient + directional light
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(3, 5, 4);
  scene.add(dir);

  // Export
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    (result) => {
      const blob = new Blob([result as ArrayBuffer], { type: 'model/gltf-binary' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${app.id}-reference.glb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Cleanup
      valid.forEach(t => t.dispose());
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    },
    (err) => { console.error('GLB export error', err); },
    { binary: true, embedImages: true }
  );
}
