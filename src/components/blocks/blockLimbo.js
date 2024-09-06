import { useRef, useState } from "react"
import { RigidBody } from "@react-three/rapier"
import { useFrame } from '@react-three/fiber'
import {boxGeometry, floorBoxGeometry} from '../../utils/geometry'
import { floor2Material, obstacleMaterial2 } from "../../utils/materials"


export default function BlockLimbo({position= [0, 0, 0]}) 
{
    
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)
    
    useFrame((state) => 
    {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({x:position[0], y:position[1] + y, z:position[2]})
    })

    // first trap
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
            material={obstacleMaterial2}
            scale={[3.5, 0.3, 0.3]}
            receiveShadow
            castShadow
            />
        </RigidBody>

    </group>
}