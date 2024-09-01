import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import { Perf } from 'r3f-perf'
import {Level} from './level.js'
import Player from './player.js'
import useGame from './stores/useGame.js'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)


    return <>
        <color args={['#bdedfc']} attach='background' />
        <Perf position='top-left'/>
        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount}/>
            <Player />
        </Physics>

    </>
}