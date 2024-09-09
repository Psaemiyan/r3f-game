import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { boxGeometry } from '../utils/geometry'
import { wallMaterial } from '../utils/materials'
import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three'
import { vertexShader } from '../shaders/walls/vertex.glsl.js';
import { fragmentShader } from '../shaders/walls/fragment.glsl.js';


export default function Bounds ({length=3}) 
{
    const wallRef = useRef();
    const texture = useLoader(THREE.TextureLoader, '/galaxy.jpg');
  
    // Custom shader material for the right wall
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
      },
      vertexShader,
      fragmentShader,
    });

    return <>

        <RigidBody type='fixed' restitution={0.2} friction={0}>
            {/* <mesh 
            ref={wallRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            position={[2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material={shaderMaterial}
            scale={[0.3, 1.5, 4 * length]}
            castShadow
            /> */}

            <mesh 
            position={[2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[0.3, 1.5, 4 * length]}
            castShadow
            />

            <mesh 
            position={[-2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[0.3, 1.5, 4 * length]}
            receiveShadow
            />

            <mesh 
            position={[0, 0.75, -(length * 4) + 2]}
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[4, 1.5, 0.3]}
            receiveShadow
            />

            <CuboidCollider 
                args={[2, 0.1, 2 * length]}
                position={[0, -0.1, (-length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}