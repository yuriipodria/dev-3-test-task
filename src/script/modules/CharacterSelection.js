export class CharacterSelection {
  constructor(paragraphElement, selectionBoxHandler) {
    this.paragraph = paragraphElement;
    this.selectionBoxHandler = selectionBoxHandler;
    this.dragOffsets = new Map();
    this.isDragging = false;
    this.singleDraggedChar = {};
    this.singleCharacterInitPosX = '';
    this.singleCharacterInitPosY = '';
  }

  updateSelection(e) {
    if (!this.selectionBoxHandler.isSelecting) return;

    document.querySelectorAll(".character").forEach((char) => {
      let rect = char.getBoundingClientRect();
      let selRect =
        this.selectionBoxHandler.selectionBox.getBoundingClientRect();

      if (
        rect.right > selRect.left &&
        rect.left < selRect.right &&
        rect.bottom > selRect.top &&
        rect.top < selRect.bottom
      ) {
        char.classList.add("selected");

        char.addEventListener("mousedown", this.handleCharactersDragMouseDown);
        char.addEventListener("mousemove", this.handleCharactersDrag);
        char.addEventListener("mouseup", this.handleCharactersDragMouseUp);
      } else {
        if (!e.ctrlKey) {
          char.classList.remove("selected");

          char.removeEventListener(
            "mousedown",
            this.handleCharactersDragMouseDown
          );
          char.removeEventListener("mousemove", this.handleCharactersDrag);
          char.removeEventListener("mouseup", this.handleCharactersDragMouseUp);
        }
      }
    });
  }

  handleCharactersDragMouseDown = (e) => {
    e.preventDefault();

    this.isDragging = true;

    const selectedChars = document.querySelectorAll(".selected");

    selectedChars.forEach((char) => {
      const charRect = char.getBoundingClientRect();
      const offsetX = e.clientX - charRect.left;
      const offsetY = e.clientY - charRect.top;

      this.dragOffsets.set(char, { offsetX, offsetY });
    });

    if (selectedChars.length === 1) {
      this.singleDraggedChar = selectedChars[0];
      this.singleCharacterInitPosX = this.singleDraggedChar.style.left;
      this.singleCharacterInitPosY = this.singleDraggedChar.style.top;
    }
  };

  handleCharactersDrag = (e) => {
    if (!this.isDragging) return;

    const selectedChars = document.querySelectorAll(".selected");

    selectedChars.forEach((char) => {
      const { offsetX, offsetY } = this.dragOffsets.get(char);
      const offsetXNew = e.clientX - offsetX;
      const offsetYNew = e.clientY - offsetY;

      char.style.position = "absolute";
      char.style.left = `${offsetXNew}px`;
      char.style.top = `${offsetYNew}px`;
    });
  };

  handleCharactersDragMouseUp = () => {
    this.isDragging = false;

    const selectedChars = document.querySelectorAll(".selected");

    if (selectedChars.length === 1) {
      document.querySelectorAll(".character").forEach((char) => {
        let rect = char.getBoundingClientRect();
        let draggedRect = this.singleDraggedChar.getBoundingClientRect();

        if (
          draggedRect.right > rect.left &&
          draggedRect.left < rect.right &&
          draggedRect.bottom > rect.top &&
          draggedRect.top < rect.bottom
        ) {
          this.swapPositions(char);
        }
      });
    }

    this.singleDraggedChar = {};
    this.singleCharacterInitPosX = '';
    this.singleCharacterInitPosY= '';
  };

  swapPositions(char) {
    const charX = char.style.left;
    const charY = char.style.top;

    char.style.left = this.singleCharacterInitPosX;
    char.style.top = this.singleCharacterInitPosY;

    this.singleDraggedChar.style.left = charX;
    this.singleDraggedChar.style.top = charY;
  }
}
