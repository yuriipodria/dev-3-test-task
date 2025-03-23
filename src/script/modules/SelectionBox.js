export class SelectionBox {
  constructor(selectionBoxElement) {
    this.selectionBox = selectionBoxElement;
    this.rectangleStartX = 0;
    this.rectangleStartY = 0;
    this.isSelecting = false;
  }

  startSelection(e) {
    this.isSelecting = true;
    this.rectangleStartX = e.pageX;
    this.rectangleStartY = e.pageY;

    this.selectionBox.style.left = `${this.rectangleStartX}px`;
    this.selectionBox.style.top = `${this.rectangleStartY}px`;
    this.selectionBox.style.width = `0px`;
    this.selectionBox.style.height = `0px`;
    this.selectionBox.style.display = "block";
  }

  updateSelection(e) {
    if (!this.isSelecting) return;

    let width = e.pageX - this.rectangleStartX;
    let height = e.pageY - this.rectangleStartY;

    this.selectionBox.style.width = `${Math.abs(width)}px`;
    this.selectionBox.style.height = `${Math.abs(height)}px`;
    this.selectionBox.style.left = `${Math.min(this.rectangleStartX, e.pageX)}px`;
    this.selectionBox.style.top = `${Math.min(this.rectangleStartY, e.pageY)}px`;
  }

  endSelection() {
    this.isSelecting = false;
    this.selectionBox.style.display = "none";
  }
}
