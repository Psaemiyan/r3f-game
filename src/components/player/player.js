import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { usePlayerPhysics } from './PlayerPhysics'
import { useCameraManagement } from './cameraManagement'

export default function Player() {
    const { body, getKeys, end, restart, blocksCount } = usePlayerPhysics()
    const { updateCamera } = useCameraManagement()

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }
        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        // // Update Camera
        const bodyPosition = body.current.translation()
        updateCamera(state, bodyPosition, delta)

        // Handle Phases
        if (bodyPosition.z < -(blocksCount * 4 + 2)) end()
        if (bodyPosition.y < -4) restart()
    })

    return (
        <RigidBody
            ref={body}
            canSleep={false}
            colliders="ball"
            position={[0, 1, 0]}
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="#fe019e" />
            </mesh>
        </RigidBody>
    )
}
