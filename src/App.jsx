import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";

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
