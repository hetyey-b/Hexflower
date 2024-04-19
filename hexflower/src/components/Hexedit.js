import React from "react";

const colors = [
    "green",
    "blue",
    "purple",
    "yellow",
    "brown",
    "red",
];

function Hexedit({hexagon, setHexagon}) {
    const [selectedColor, setSelectedColor] = React.useState(hexagon.color);
    const [text, setText] = React.useState(hexagon.text);

    React.useEffect(() => {
        if (!hexagon || !hexagon.color || !hexagon.text) {
            return;
        }

        let newHexagon = {...hexagon};
        newHexagon.color = selectedColor;
        newHexagon.text = text;

        setHexagon(newHexagon);
    }, [selectedColor, text]);

    React.useEffect(() => {
        setSelectedColor(hexagon.color);
        setText(hexagon.text);
    }, [hexagon]);

    const onColorChange = (event) => {
        setSelectedColor(event.target.value);
    };
    const onTextChange = (event) => {
        setText(event.target.value);
    };
    return (
        <div>
            <h1 className="text-xl underline">Hex {hexagon.i+1}</h1>
                <form className="w-[50%]">
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-white">Select an option</label>
                    <select 
                        id="color" 
                        className="border text-sm rounded-lg 
                                block w-full p-2.5 bg-gray-700 
                                border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 
                                focus:border-blue-500"
                        value={selectedColor}
                        onChange={onColorChange}
                    >
                        {
                            colors.map(color => (
                                <option value={color} key={color}>
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </option>
                            ))
                        }
                    </select>

                    <label htmlFor="text" className="block mb-2 text-sm font-medium mt-5 text-gray-900 text-white">Value</label>
                    <input 
                        type="text" 
                        id="text" 
                        className="border text-sm rounded-lg block w-full p-2.5
                                bg-gray-700 border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 focus:border-blue-500" 
                        value={text}
                        onChange={onTextChange}
                    />

                </form>
            {JSON.stringify(hexagon)}
        </div>
    );
}

export default Hexedit;
