// Grab references to elements in the DOM
const container = document.getElementById('container');
const newGridBtn = document.getElementById('newGridBtn');

// Default starting grid size
let gridSize = 16;

// Initialize the grid when the page loads
createGrid(gridSize);

// Listen for clicks on the "New Grid" button
newGridBtn.addEventListener('click', () => {
  // Prompt the user for a new grid size
  let userInput = parseInt(prompt('Enter new grid size (max 100):', '16'));

  // Validate input
  if (isNaN(userInput) || userInput < 1) {
    alert('Please enter a valid number greater than 0.');
    return;
  }
  if (userInput > 100) {
    alert('Maximum allowed size is 100.');
    userInput = 100;
  }

  // Clear existing grid
  clearGrid();

  // Create new grid
  createGrid(userInput);
});

/**
 * Creates a grid with the given number of squares per side.
 * @param {number} size - number of squares per side
 */
function createGrid(size) {
  gridSize = size;

  // Calculate the size of each square in px (assuming container is 960px wide)
  const squareSize = 960 / size;

  // Create 'size x size' squares
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');

    // Dynamically set width and height
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Set up mouseover (or mouseenter) event listener
    square.addEventListener('mouseover', changeColor);
    // If you want the effect to remain after mouse leaves, 'mouseover' is enough. 
    // 'mouseout' or 'mouseleave' can be used for toggling or other effects.

    container.appendChild(square);
  }
}

/**
 * Clears all squares from the container.
 */
function clearGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Changes the color of the square when hovered over.
 * 
 * For the Extra Credit:
 * 1) You can implement random colors here.
 * 2) Or implement progressive darkening.
 */
function changeColor(e) {
  // Simple approach: set a fixed color
  // e.target.style.backgroundColor = 'black';

  // EXTRA CREDIT:
  // 1. Randomize the squares’ RGB values each time
  // Uncomment the below lines for random color effect
  /*
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  */

  // 2. Progressive darkening by 10% each time
  // You can store the current "darkening level" in a custom data attribute
  // If there's no data attribute yet, start it at 0
  let currentOpacity = e.target.getAttribute('data-dark') || 0;
  currentOpacity = Number(currentOpacity);

  if (currentOpacity < 1) {
    currentOpacity += 0.1; // increase by 10%
    e.target.setAttribute('data-dark', currentOpacity);

    // Example: black background with increasing opacity
    e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
  }
}
