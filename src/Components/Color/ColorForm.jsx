import "./ColorForm.css";
import ColorInput from "../ColorInput";

export default function ColorForm({
  onSubmitColor,
  initialData = {
    role: "name your color",
    hex: "#a47864",
    contrastText: "#FFFFFF",
  },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    onSubmitColor(data);

    event.target.reset();
    event.target.role.focus();
  }
  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          name="role"
          id="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      <button>Add Color</button>
    </form>
  );
}
