import React from "react";
import Hexflower from "./components/Hexflower";
import {GridGenerator} from 'react-hexgrid';
import Hexedit from "./components/Hexedit";

const generatorConfiguration = {
    "map": "spiral",
    "mapProps": [ {"q":0,"r":0,"s":0}, 3 ]
};

function App() {
    const generator = GridGenerator.getGenerator(generatorConfiguration.map);
    const [hexagons,setHexagons] = React.useState([]);
    const [selectedHexagon, setSelectedHexagon] = React.useState(0);
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

    return (
        <div className="mx-10 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                hexagons[selectedHexagon] ? (
                    <Hexedit
                        hexagon={hexagons[selectedHexagon]}
                        setHexagon={handleHexEditSet}
                    />
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
