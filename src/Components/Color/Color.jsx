import "./Color.css";

export default function Color({ color, onDeleteColor }) {
  function handelClickDelete() {
    onDeleteColor(color.id);
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
      <button onClick={handelClickDelete}>DELETE</button>
    </div>
  );
}
