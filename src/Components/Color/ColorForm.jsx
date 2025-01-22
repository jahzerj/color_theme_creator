import "./ColorForm.css";

export default function ColorForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form)
    console.log("A new color has been input:", colorInput);
  }
}

return (
  <form onSubmit={handleSubmit}>
    <label for='Role'>Role</label>
    <input type='text' name='Role_input' id='Role'>

    <label for='Hex'>Hex</label>
    <input type='color' name='Hex_input' id='Hex' value=" #a47864">

    <label for='Contrast'>Contrast Text</label>
    <input type='color' name='Contrast_input' id='Contrast' value="#fff">
    <button>Add Color</button>
  </form>
);
