import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";
import { useState } from "react";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  }); //array of themes

  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  }); //array of colors

  const [currentThemeId, setCurrentThemeId] = useState("t1"); //selected theme ID

  const currentTheme = themes.find((theme) => theme.id === currentThemeId); //find the current theme
  const currentColors = currentTheme.colors.map((colorId) =>
    colors.find((color) => color.id === colorId)
  ); // Map color IDs to full objects

  function handleAddColor(newColor) {
    const newColorObject = {
      id: nanoid(), //generates id for the new color
      ...newColor,
    };

    //Add the color to the global colors array
    setColors([...colors, newColorObject]);

    //Add the color's ID to the current theme's color list
    setThemes(
      themes.map((theme) =>
        theme.id === currentThemeId
          ? { ...theme, colors: [...theme.colors, newColorObject.id] }
          : theme
      )
    );
  }
  function handleEditColor(colorID, updatedColor) {
    setColors(
      colors.map((color) =>
        color.id === colorId ? { ...color, ...updatedColor } : color
      )
    );
  }

  function handleDeleteColor(colorId) {
    //remove the color id from the current theme
    setThemes(
      themes.map((theme) =>
        theme.id === currentThemeId
          ? { ...theme, colors: theme.colors.filter((id) => id !== colorId) }
          : theme
      )
    );
  }

  function handleSubmitColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(idColorToRemove) {
    setColors(colors.filter((color) => color.id !== idColorToRemove));
  }

  function handleEditColor(idColorToEdit, updatedColor) {
    setColors(
      colors.map((color) =>
        color.id === idColorToEdit ? { ...color, ...updatedColor } : color
      )
    ); //updates color by merging updated fields
  }

  return (
    <>
      <h1>Theme Creator</h1>
      {/* original color form for adding color*/}
      <ColorForm onSubmitColor={handleSubmitColor} buttonText="Add Color" />

      {/*  renders each color*/}
      {colors.map((color) => (
        <Color
          key={color.id}
          color={color}
          onDeleteColor={handleDeleteColor}
          onUpdateColor={handleEditColor}
          // conditional color form that appears on edit button
        />
      ))}
      {/*  when all cards are removed display a message*/}
      {colors.length === 0 && <p>No colors left! Start by adding your own.</p>}
    </>
  );
}
export default App;
