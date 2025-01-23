import { initialColors } from './lib/colors';
import Color from './Components/Color/Color';
import './App.css';
import ColorForm from './Components/ColorForm/ColorForm';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleSubmitColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(idColorToRemove) {
    setColors(colors.filter((color) => color.id !== idColorToRemove));
  }
  function handleEditColor(idColorToEdit, role) {
    setColors(
      colors.map((color) => {
        if (color.id === idColorToEdit) return { ...color, role };
        return color;
      })
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      {/* original color form */}
      <ColorForm onSubmitColor={handleSubmitColor} buttonText={'Add Color'} />

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            // conditional color form that appears on edit button
            colorForm={
              <ColorForm onSubmitColor={handleEditColor} buttonText={'Edit Color'} intialValues={color.hex,color.contrastText,color.role}/>
            }
          />
        );
      })}
      {colors.length === 0 && <p>No colors left! Start by adding your own.</p>}
    </>
  );
}
export default App;
