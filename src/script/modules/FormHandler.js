export class FormHandler {
  constructor(formElement, inputElement, paragraphElement) {
    this.form = formElement;
    this.input = inputElement;
    this.paragraph = paragraphElement;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.paragraph.innerHTML = "";

    const text = this.input.value;
    [...text].forEach((char) => {
      this.addCharacter(char);
    });
  }

  addCharacter(char) {
    const span = document.createElement("span");
    span.innerHTML = char;
    span.classList.add("character");

    this.paragraph.appendChild(span);
  }
}
