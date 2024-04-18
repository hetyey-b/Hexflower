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
        setHexagons(generator.apply(this, generatorConfiguration.mapProps));
    }, []);

    return (
        <div className="mx-80 mt-10">
            <Hexflower hexagons={hexagons} />
        </div>
    );
}

export default App;
