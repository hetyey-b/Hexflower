import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';

function Hexflower({hexagons, setHexagons}) {
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
                            className={`${hex.color}Hex`}
                        >
                            <Text>
                                {hex.text}
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
