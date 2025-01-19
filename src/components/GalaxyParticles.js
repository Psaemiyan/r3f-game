import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyParticles() {
  const particlesCount = 1500;
  const pointsRef = useRef();
  const materialRef = useRef();

  // Create a sharper star texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Create main glow
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    // Add cross shape for sparkle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, 16);
    ctx.lineTo(32, 48);
    ctx.moveTo(16, 32);
    ctx.lineTo(48, 32);
    ctx.stroke();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
  
  // Generate particle positions in a spherical shell
  const particlesData = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const randomFactors = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      const radius = THREE.MathUtils.randFloat(35, 55); 
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.35;
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);
      
      // Brighter white stars
      const r = THREE.MathUtils.randFloat(0.9, 1);
      const g = THREE.MathUtils.randFloat(0.9, 1);
      const b = THREE.MathUtils.randFloat(0.95, 1.05);
      colors.set([r, g, b], i * 3);

      // Random factor for twinkling
      randomFactors[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, randomFactors };
  }, [particlesCount]);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlesData.positions, 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particlesData.colors, 3)
    );
    geometry.setAttribute(
      'randomFactor',
      new THREE.BufferAttribute(particlesData.randomFactors, 1)
    );
    return geometry;
  }, [particlesData]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={{
          map: { value: starTexture },
          time: { value: 0 },
        }}
        vertexShader={`
          attribute float randomFactor;
          uniform float time;
          varying vec3 vColor;
          varying float vRandomFactor;
          
          void main() {
            vColor = color;
            vRandomFactor = randomFactor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float twinkle = sin(time * 1.5 + randomFactor) * 0.2 + 0.8;
            gl_PointSize = (1.2 + twinkle * 0.3) * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform sampler2D map;
          varying vec3 vColor;
          varying float vRandomFactor;
          
          void main() {
            vec4 texColor = texture2D(map, gl_PointCoord);
            float twinkle = sin(vRandomFactor) * 0.15 + 0.85;
            gl_FragColor = vec4(vColor * twinkle, texColor.a);
          }
        `}
      />
    </points>
  );
}
