import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleSubmitColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(idColorToRemove) {
    setColors(colors.filter((color) => color.id !== idColorToRemove));
    console.log("clicking delete");
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleSubmitColor} />

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        );
      })}
    </>
  );
}
export default App;
