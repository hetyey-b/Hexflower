import React from "react";

function Runflower({hexagons, onRunFlower, selectedStarterHex, setSelectedStarterHex}) {

    const newHexagons = hexagons.filter(hex => {
        if (Math.abs(hex.q) === 3 ||
            Math.abs(hex.r) === 3 ||
            Math.abs(hex.s) === 3) {
            return false;
        }
        return true;
    });

    const onSelectedStarterHexChange = (event) => {
        setSelectedStarterHex(event.target.value);
    }

    return (
        <div>
            <select 
                id="color" 
                className="border text-sm rounded-lg w-[33%]
                        block w-full p-2.5 bg-gray-700 mb-3
                        border-gray-600 placeholder-gray-400 
                        text-white focus:ring-blue-500 
                        focus:border-blue-500"
                value={selectedStarterHex}
                onChange={onSelectedStarterHexChange}
            >
                {
                    newHexagons.map((hex,i) => (
                        <option value={i} key={hex.text}>
                            {hex.text}
                        </option>
                    ))
                }
            </select>
            <button 
                className="bg-gray-700 hover:bg-gray-500 block text-white font-bold py-2 px-4 rounded"
                onClick={onRunFlower}
            >
                Run Flower
            </button>
        </div>
    );
}

export default Runflower;
