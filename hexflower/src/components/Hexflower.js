import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';

function Hexflower({hexagons, selectedHexagon, setSelectedHexagon}) {
    const onHexagonClick = (q,r,s,i) => {
        if (Math.abs(q) === 3 ||
            Math.abs(r) === 3 ||
            Math.abs(s) === 3) {

            return;
        }
        setSelectedHexagon(i);
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
                            onClick={() => {onHexagonClick(hex.q,hex.r,hex.s,i)}}
                            className={`${hex.color}Hex 
                                    ${selectedHexagon === i ? "selectedBorder" : ""}
                                `}
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
