import './Color.css';
import { useState } from 'react';
// import ColorForm from '../ColorForm/ColorForm';

export default function Color({ color, onDeleteColor, colorForm }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  // const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  //popup handling
  function handleShowPopup() {
    setIsPopupVisible(true); //shows popup
  }

  function handleCancelPopup() {
    setIsPopupVisible(false); //hide popup on cancel
  }
  function handelClickDelete() {
    onDeleteColor(color.id); //deletes color
    setIsPopupVisible(false); //hides popup after delete
  }

  // handle form

  function handleEditClick() {
    setIsEditVisible(true); //show edit form
  }
  function handleCancelEditClick() {
    setIsEditVisible(false); // hide edit form
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {/* Delete Button or Popup*/}
      {/* If popup not visible (default false) -> make it visible*/}
      {isPopupVisible ? (
        <div className="popup">
          <p className="color-card-highlight">
            Are you sure you want to delete {color.hex}?
          </p>
          {/* cancel delete -> hides popup  */}
          <button onClick={handleCancelPopup}>CANCEL</button>
          {/* actual delete button -> deletes the color  */}
          <button onClick={handelClickDelete}>DELETE</button>
        </div>
      ) : (
        //delete button (doesnt really -> delete only makes popup)
        <button onClick={handleShowPopup}>DELETE</button>
      )}
      {/* Is edit visible? (default false) -> make it visible*/}
      {isEditVisible ? (
        <>
          {/* Color form comes up, and cancel button, which hides edit*/}
          {colorForm} <button onClick={handleCancelEditClick}>CANCEL</button>{' '}
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>EDIT</button>
        </>
      )}
    </div>
  );
}
