import { useState } from "react";
import "./ColorForm.css";

export default function ColorForm() {
  const [roleInput, setRoleInput] = useState("");
  const [hexInput, setHexInput] = useState("");
  const [contrastInput, setContrastInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    setRoleInput(roleInput);
    setHexInput(hexInput);
    setContrastInput(contrastInput);

    event.target.reset();
    event.target.role.focus();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Role">
        Role
        <br />
        <input type="text" name="role" id="Role" />
      </label>
      <br />
      <label htmlFor="Hex">
        Hex
        <br />
        <input type="color" name="hex" id="Hex" value="#a47864" />
      </label>
      <br />
      <label htmlFor="Contrast">
        Contrast Text
        <br />
        <input type="color" name="contrast" id="Contrast" value="#ffffff" />
      </label>
      <br />
      <button>Add Color</button>
    </form>
  );
}
