import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { boxGeometry } from '../utils/geometry'
import { wallMaterial } from '../utils/materials'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Bounds ({length=3}) 
{
    // const walls = useGLTF('./wall_08.glb')
    // const rotationZ = THREE.MathUtils.degToRad(180)
    // const rotationY = THREE.MathUtils.degToRad(-90)

    // const col1 = new THREE.MeshStandardMaterial({ color: 'white'})
    // const col2 = new THREE.MeshStandardMaterial({ color: 'blue'})
    // const col3 = new THREE.MeshStandardMaterial({ color: 'yellow'})


    return <>
            {/* <RigidBody type='fixed' 
            position={[-1, 1, -(length * 2) +3]}
            restitution={0.2} 
            friction={0}
            rotation={[0, rotationY, rotationZ]}
            >
                <primitive object={walls.scene} scale={0.8}/>
            </RigidBody> */}



        <RigidBody type='fixed' restitution={0.2} friction={0}>
            <mesh 
            position={[2.15, 0.75, -(length * 2) + 2]}
            geometry={boxGeometry}
            material= {wallMaterial}
            scale={[0.3, 1.5, 4 * length]}
            castShadow
            />

                {/* <primitive 
                object={walls.scene} 
                scale={0.5} 
                position={[- 1.15, 0.75, -20]}
                rotation={[0, -1.5, 0]}
                /> */}

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