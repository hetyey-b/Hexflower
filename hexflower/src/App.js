import React from "react";
import Hexflower from "./components/Hexflower";
import {GridGenerator} from 'react-hexgrid';

const generatorConfiguration = {
    "map": "spiral",
    "mapProps": [ {"q":0,"r":0,"s":0}, 3 ]
};

function App() {
    const generator = GridGenerator.getGenerator(generatorConfiguration.map);
    const [hexagons,setHexagons] = React.useState([]);
    React.useEffect(() => {
        let newHexagons = generator.apply(this, generatorConfiguration.mapProps);
        newHexagons = newHexagons.map((hex, i) => {
            let newHex = {...hex};
            
            newHex.text = i+1;
            newHex.color = "green";
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

    return (
        <div className="mx-10 mt-10">
            <Hexflower hexagons={hexagons} setHexagons={setHexagons} />
        </div>
    );
}

export default App;
