import { Float, Text } from '@react-three/drei'
import boxGeometry from '../../utils/geometry'
import { floor1Material } from '../../utils/materials'


export default function BlockStart({position= [0, 0, 0]}) 
{
    //floor
    return <group position={position}>
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
        font="./bebas-neue-v9-latin-regular.woff"
        scale={ 0.5 }
        maxWidth={ 0.25 }
        lineHeight={ 0.75 }
        textAlign="right"
        position={ [ 0.75, 0.65, 0 ] }
        rotation-y={ - 0.25 }
        >
            Ready?
            <meshBasicMaterial toneMapped={false}/>
        </Text>
        </Float>
        <mesh 
        geometry={boxGeometry} 
        material={floor1Material}
        position={[0, -0.1, 0]} 
        scale={[4, 0.2, 4]}
        receiveShadow />
    </group>
}