import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';

function Hexflower({hexagons}) {
    const onHexagonClick = (q,r,s) => {
        alert(`${q}   ${r}   ${s}`)
    }

    return(
        <div>
            <HexGrid width={800} height={800}>
                <Layout size={{ x: 7, y: 7 }}>
                {
                    hexagons.map((hex,i)=> (
                        <Hexagon
                            key={i} 
                            q={hex.q} 
                            r={hex.r} 
                            s={hex.s}
                            onClick={() => {onHexagonClick(hex.q,hex.r,hex.s)}}
                            className={`transition-all ${hex.color}Hex`}
                        >
                            <Text>
                                {i} {hex.text}
                            </Text>
                        </Hexagon>
                    ))
                }
                </Layout>
            </HexGrid>
        </div>
    )
}

export default Hexflower;
