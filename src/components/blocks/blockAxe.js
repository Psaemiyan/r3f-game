import { useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import {boxGeometry, floorBoxGeometry} from "../../utils/geometry"
import { floor2Material, obstacleMaterial } from "../../utils/materials"


export default function BlockAxe({position= [0, 0, 0]}) 
{
    
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)
    
    useFrame((state) => 
    {
        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({x:position[0] + x, y:position[1] + 0.75, z:position[2]})
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
            material={obstacleMaterial}
            scale={[1.5, 1.5, 0.3]}
            receiveShadow
            castShadow
            />
        </RigidBody>

    </group>
}