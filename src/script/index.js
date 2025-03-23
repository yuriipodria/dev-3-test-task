'use strict'

import { SelectionBox } from './modules/SelectionBox.js';
import { CharacterSelection } from './modules/CharacterSelection.js';
import { FormHandler } from './modules/FormHandler.js';

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const paragraph = document.querySelector(".paragraph");
const selectionBox = document.querySelector(".selection_box");

const selectionBoxHandler = new SelectionBox(selectionBox);
const characterSelectionHandler = new CharacterSelection(paragraph, selectionBoxHandler);
const formHandler = new FormHandler(form, input, paragraph);

form.addEventListener("submit", (e) => formHandler.handleSubmit(e));

document.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.classList.contains("selected")) {
    return;
  }

  e.preventDefault();

  if (!e.ctrlKey) {
    document.querySelectorAll(".character").forEach((char) => {
      char.classList.remove("selected");
    });
  }

  selectionBoxHandler.startSelection(e);
});

document.addEventListener("mousemove", (e) => {
  selectionBoxHandler.updateSelection(e);
  characterSelectionHandler.updateSelection(e);
});

document.addEventListener("mouseup", () => {
  selectionBoxHandler.endSelection();
});
