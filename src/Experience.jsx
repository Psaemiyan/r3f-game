import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import { Perf } from 'r3f-perf'
import { Level } from './components/level.js'
import Player from './components/player/player.js'
import useGame from './stores/useGame.js'

// import { OrbitControls } from '@react-three/drei'


export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)


    return <>
        <color args={['#000000']} attach='background' />
        <Perf position='top-left'/>
        {/* <OrbitControls makeDefault /> */}
        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount}/>
            <Player />
        </Physics>

    </>
}