document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#canvas"); // Get the canvas element by its ID
  const context = canvas.getContext("2d"); // Get the 2D context of the canvas
  canvas.width = window.innerWidth; // Set the canvas width to match the window width
  canvas.height = window.innerHeight; // Set the canvas height to match the window height
  let painting = false; // Indicates whether painting is happening or not

  function draw(event) {
    if (!painting) return; // If not currently painting, exit the function

    context.lineWidth = 5; // Set the line width based on the user-specified value
    context.strokeStyle = "000"; // Set the line color based on the user-specified value
    context.lineCap = "round"; // Set the line style to round at the ends
    context.lineTo(event.clientX, event.clientY); // Draw a line from the current position to the mouse event coordinates
    context.stroke(); // Draw the line on the canvas
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
});
