import React from "react";
import Hexflower from "./components/Hexflower";
import {GridGenerator} from 'react-hexgrid';
import Hexedit from "./components/Hexedit";
import Runflower from "./components/Runflower";

const moveDirection = {
    2: {
        q: -1,
        r: 0,
        s: 1,
    },
    3: {
        q: -1,
        r: 1,
        s: 0,
    },
    4: {
        q: -1,
        r: 1,
        s: 0,
    },
    5: {
        q: 0,
        r: 1,
        s: -1,
    },
    6: {
        q: 0,
        r: 1,
        s: -1,
    },
    7: {
        q: 1,
        r: 0,
        s: -1,
    },
    8: {
        q: 1,
        r: -1,
        s: 0,
    },
    9: {
        q: 0,
        r: 0,
        s: 0,
    },
    10: {
        q: 0,
        r: 0,
        s: 0,
    },
    11: {
        q: 0,
        r: -1,
        s: 1,
    },
    12: {
        q: -1,
        r: 0,
        s: 1,
    },
};

const generatorConfiguration = {
    "map": "spiral",
    "mapProps": [ {"q":0,"r":0,"s":0}, 3 ]
};

function App() {
    const generator = GridGenerator.getGenerator(generatorConfiguration.map);
    const [hexagons,setHexagons] = React.useState([]);
    const [selectedHexagon, setSelectedHexagon] = React.useState(0);
    const [selectedStarterHex, setSelectedStarterHex] = React.useState(0);
    const [log,setLog] = React.useState([]);
    React.useEffect(() => {
        let newHexagons = generator.apply(this, generatorConfiguration.mapProps);
        newHexagons = newHexagons.map((hex, i) => {
            let newHex = {...hex};
            
            newHex.text = i+1;
            newHex.color = "green";
            newHex.i = i;
            if (Math.abs(hex.q) === 3 ||
                Math.abs(hex.r) === 3 ||
                Math.abs(hex.s) === 3) {
                newHex.text = "";
                newHex.color = "empty";
            }

            return newHex;
        });

        setHexagons(newHexagons);
    }, []);

    const handleHexEditSet = (newHex) => {
        let newHexagons = [...hexagons];
        newHexagons[selectedHexagon] = newHex;
        setHexagons(newHexagons);
    }

    const roll2d6 = () => {
        return (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
    }

    const onRunFlower = () => {
        const roll = roll2d6();
        const move = moveDirection[roll];
        let newQ = hexagons[selectedStarterHex].q + move.q;
        let newR = hexagons[selectedStarterHex].r + move.r;
        let newS = hexagons[selectedStarterHex].s + move.s;

        if (Math.abs(newQ) === 3 ||
            Math.abs(newR) === 3 ||
            Math.abs(newS) === 3) {
            newQ -= move.q;
            newR -= move.r;
            newS -= move.s;

            newQ *= -1;
            newR *= -1;
            newS *= -1;
        }
        const newHex = hexagons.findIndex(hex => (hex.q === newQ && hex.r === newR && hex.s === newS));
        
        let newLog = [...log];
        newLog.unshift(hexagons[newHex].text);
        setLog(newLog);
        setSelectedStarterHex(newHex);
    }

    return (
        <div className="mx-10 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                hexagons[selectedHexagon] ? (
                    <div>
                        <Hexedit
                            hexagon={hexagons[selectedHexagon]}
                            setHexagon={handleHexEditSet}
                        />
                        <hr className="mr-28 my-5"/>
                        <Runflower
                            hexagons={hexagons}
                            onRunFlower={onRunFlower}
                            selectedStarterHex={selectedStarterHex}
                            setSelectedStarterHex={setSelectedStarterHex}
                        />
                        <hr className="mr-28 my-5"/>
                        <ul>
                            {
                                log.map(event => (
                                    <li>{event}</li>
                                ))
                            }
                        </ul>
                    </div>
                ) : (
                    <div>Hello World</div>
                ) 
            }
            <Hexflower 
                hexagons={hexagons} 
                selectedHexagon={selectedHexagon} 
                setSelectedHexagon={setSelectedHexagon}
            />
        </div>
    );
}

export default App;
