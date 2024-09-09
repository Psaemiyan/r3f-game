import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyParticles() {
  const particlesCount = 2000;
  
  // Generate particle positions in a spherical shell around the game set
  const particlesData = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 50
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2)); // Random polar angle
      const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2); // Random azimuthal angle

      // Convert spherical coordinates to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [particlesCount]);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlesData, 3)
    );
    return geometry;
  }, [particlesData]);

  //Rotate particles
  useFrame((state, delta) => {
    particlesGeometry.rotateY(delta * 0.05)
  });


  return (
    <points geometry={particlesGeometry}>
      <pointsMaterial
        size={0.5} 
        sizeAttenuation={true}
        color="#fe019e"
      />
    </points>
  );
}









// import { useRef } from 'react';
// import { useFrame, extend } from '@react-three/fiber';
// import * as THREE from 'three';
// import { shaderMaterial } from '@react-three/drei';
// import { vertexShader } from '../shaders/galaxy/vertex.glsl.js'
// import { fragmentShader } from '../shaders/galaxy/fragment.glsl.js';

// // Create a custom ShaderMaterial
// const ParticleMaterial = shaderMaterial(
//   // Uniforms
//   {},
//   // Vertex shader
//   vertexShader,
//   // Fragment shader
//   fragmentShader
// );

// // Extend the material so that you can use it in JSX
// extend({ ParticleMaterial });

// const GalaxyParticles = () => {
//   const pointsRef = useRef();
//   const particleCount = 5000;

//   // Generate random positions for the particles
//   const positions = new Float32Array(particleCount * 3);
//   for (let i = 0; i < particleCount * 3; i += 3) {
//     const radius = THREE.MathUtils.randFloat(5, 30); // Distance from the center
//     const theta = THREE.MathUtils.randFloatSpread(360); // Random angle
//     const phi = THREE.MathUtils.randFloatSpread(360);

//     positions[i] = radius * Math.sin(theta) * Math.cos(phi); // X
//     positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi); // Y
//     positions[i + 2] = radius * Math.cos(theta); // Z
//   }

//   // Animate rotation
//   useFrame((state, delta) => {
//     pointsRef.current.rotation.y += delta * 0.05;
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attachObject={['attributes', 'position']}
//           count={particleCount}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <particleMaterial />
//     </points>
//   );
// };

// export default GalaxyParticles;
