import './Color.css';
import { useState } from 'react';

export default function Color({ color, onDeleteColor }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  function handelClickDelete() {
    onDeleteColor(color.id); //deletes color
    setIsPopupVisible(false); //hides popup
  }

  function handleShowPopup() {
    setIsPopupVisible(true); //shows popup
  }

  function handleCancel() {
    setIsPopupVisible(false);
  }
  function handleEditClick() {
    setIsEditVisible(true);
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
      {isPopupVisible ? (
        <div className="popup">
          <p className="color-card-highlight">
            Are you sure you want to delete {color.hex}?
          </p>
          {/* cancel delete -> hides popup  */}
          <button onClick={handleCancel}>CANCEL</button>
          {/* actual delete button -> deletes the color  */}
          <button onClick={handelClickDelete}>DELETE</button>
        </div>
      ) : (
        //delete button (doesnt really -> delete only makes popup)
        <button onClick={handleShowPopup}>DELETE</button>
      )}
      {isEditVisible ? (
        <div>Here is a div!</div>
      ) : (
        <button onClick={handleEditClick}>EDIT</button>
      )}
    </div>
  );
}
