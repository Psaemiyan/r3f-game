import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {boxGeometry, floorBoxGeometry} from '../../utils/geometry'
import { floor2Material, obstacleMaterial3 } from '../../utils/materials'



export default function BlockSpinner({position= [0, 0, 0]}) 
{
    
    const obstacle = useRef()
    const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? - 1 : 1))
    
    useFrame((state) => 
    {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <group position={position}>
        <mesh 
        geometry={floorBoxGeometry} 
        material={floor2Material}
        position={[0, -0.1, 0]} 
        scale={[4, 0.2, 4]}
        receiveShadow />

        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh 
            geometry={boxGeometry}
            material={obstacleMaterial3}
            scale={[3.5, 0.3, 0.3]}
            receiveShadow
            castShadow
            />
        </RigidBody>

    </group>
}