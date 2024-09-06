import { useGLTF, Text } from "@react-three/drei"
import { RigidBody } from '@react-three/rapier'
import {floorBoxGeometry} from '../../utils/geometry'
import { floor1Material } from '../../utils/materials'


export default function BlockEnd({position= [0, 0, 0]}) 
{

    const trophy = useGLTF('./trophy_clash_royale.glb')
    trophy.scene.children.forEach((mesh) => mesh.castShadow = true)

    //floor
    return <group position={position}>
        <Text
        font="./bebas-neue-v9-latin-regular.woff"
        scale={ 1 }
        position={[0, 2.25, 2]}
        >
            FINISHED!
            <meshBasicMaterial toneMapped={false} />
        </Text>
        <mesh 
        geometry={floorBoxGeometry} 
        material={floor1Material}
        position={[0, 0, 0]} 
        scale={[4, 0.2, 4]}
        receiveShadow />
        <RigidBody type='fixed' colliders='hull' position={[0, 0.25, 0]} restitution={0.2} friction={0}>
            <primitive object={trophy.scene} scale={0.5}/>
        </RigidBody>
    </group>
}