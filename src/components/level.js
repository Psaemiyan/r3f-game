import { useMemo } from 'react'
import BlockStart from './blocks/blockStart'
import BlockSpinner from './blocks/blockSpinner'
import BlockLimbo from './blocks/blockLimbo'
import BlockAxe from './blocks/blockAxe'
import BlockEnd from './blocks/blockEnd'
import Bounds from './bounds'


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