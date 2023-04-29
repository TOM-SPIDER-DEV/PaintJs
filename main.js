document.addEventListener("DOMContentLoaded", () => {
  const inputColor = document.querySelector("#color"); // Get the color input element by its ID
  const inputSize = document.querySelector("#strong-size"); // Get the size input element by its ID
  const canvas = document.querySelector("#canvas"); // Get the canvas element by its ID
  const context = canvas.getContext("2d"); // Get the 2D context of the canvas
  canvas.width = window.innerWidth; // Set the canvas width to match the window width
  canvas.height = window.innerHeight; // Set the canvas height to match the window height
  let painting = false; // Indicates whether painting is happening or not
  let isErasing = false; // Indicates whether erasing is happening or not

  function draw(event) {
    if (!painting) return; // If not currently painting, exit the function

    if (isErasing) {
      // Clear a rectangular area around the mouse event coordinates
      context.clearRect(event.clientX - 10, event.clientY - 10, 20, 20);

      // Alternative approach: Clear a square area around the mouse event coordinates with user-specified size
      // const radius = inputSize.value / 2;
      // const posX = event.clientX - radius;
      // const posY = event.clientY - radius;
      // context.clearRect(posX, posY, inputSize.value, inputSize.value);
    } else {
      context.lineWidth = inputSize.value; // Set the line width based on the user-specified value
      context.strokeStyle = inputColor.value; // Set the line color based on the user-specified value
      context.lineCap = "round"; // Set the line style to round at the ends
      context.lineTo(event.clientX, event.clientY); // Draw a line from the current position to the mouse event coordinates
      context.stroke(); // Draw the line on the canvas
    }
  }

  function startPosition(event) {
    painting = true; // Indicate that painting has started
    context.beginPath(); // Start a new drawing path
    context.moveTo(event.clientX, event.clientY); // Set the initial drawing position to the mouse event coordinates
  }

  function endPosition() {
    painting = false; // Indicate that painting has stopped
    context.beginPath(); // Start a new drawing path
  }

  canvas.addEventListener("mousedown", startPosition); // Listen for the mouse click event to start drawing
  canvas.addEventListener("mouseup", endPosition); // Listen for the mouse release event to stop drawing
  canvas.addEventListener("mousemove", draw); // Listen for the mouse move event to draw while the mouse is moving

  const pencilButton = document.querySelector("#pencil-button"); // Get the pencil button element by its ID
  pencilButton.addEventListener("click", () => {
    isErasing = false; // Set the erasing mode to false
    canvas.style.cursor = "crosshair"; // Change the cursor style of the canvas to crosshair (indicating drawing)
  });

  const eraserButton = document.querySelector("#eraser-button"); // Get the eraser button element by its ID
  eraserButton.addEventListener("click", () => {
    isErasing = true; // Set the erasing mode to true
    canvas.style.cursor = "cell"; // Change the cursor style of the canvas to cell (indicating erasing)
  });
});
