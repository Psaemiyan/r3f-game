import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, useGLTF } from '@react-three/drei'


// file imports
import BlockStart from './blocks/blockStart'
import BlockSpinner from './blocks/blockSpinner'
import BlockLimbo from './blocks/blockLimbo'
import BlockAxe from './blocks/blockAxe'
import BlockEnd from './blocks/blockEnd'
import Bounds from './bounds'

// geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'pink' })


// function Bounds ({length=1}) 
// {
//     return <>
//         <RigidBody type='fixed' restitution={0.2} friction={0}>
//             <mesh 
//             position={[2.15, 0.75, -(length * 2) + 2]}
//             geometry={boxGeometry}
//             material={wallMaterial}
//             scale={[0.3, 1.5, 4 * length]}
//             castShadow
//             />

//             <mesh 
//             position={[-2.15, 0.75, -(length * 2) + 2]}
//             geometry={boxGeometry}
//             material={wallMaterial}
//             scale={[0.3, 1.5, 4 * length]}
//             receiveShadow
//             />

//             <mesh 
//             position={[0, 0.75, -(length * 4) + 2]}
//             geometry={boxGeometry}
//             material={wallMaterial}
//             scale={[4, 1.5, 0.3]}
//             receiveShadow
//             />
//             <CuboidCollider 
//                 args={[2, 0.1, 2 * length]}
//                 position={[0, -0.1, (-length * 2) + 2]}
//                 restitution={0.2}
//                 friction={1}
//             />
//         </RigidBody>
//     </>
// }

// main level function
export function Level({count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo], seed = 0})
{
    const blocks = useMemo(() => 
    {
        const blocks = []

        for(let i = 0; i< count; i++)
        {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks
    }, [count, types, seed])


    return <>
        <BlockStart position={[0, 0, 0]}/>

        {blocks.map((Block, index) => <Block key={ index } position={[0, 0, - (index + 1) * 4]} />)}

        <BlockEnd position={[0, 0, -(count + 1) * 4]}/>

        <Bounds length={count + 2}/>
    </>
}