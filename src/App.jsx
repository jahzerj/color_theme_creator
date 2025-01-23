import { initialColors } from './lib/colors';
import Color from './Components/Color/Color';
import './App.css';
import ColorForm from './Components/ColorForm/ColorForm';
// import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorageState from 'use-local-storage-state';

function App() {
  // const [colors, setColors] = useState(initialColors);
  const [colors, setColors] = useLocalStorageState('colors', {
    defaultValue: initialColors,
  });

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
