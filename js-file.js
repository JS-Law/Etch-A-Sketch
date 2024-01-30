// Define your functions outside the event listener
let userDefinedRows = 0;
let modeChoice = false;
let eraserToggle = false;
let eraser = "antiquewhite"
function createGrid(rows, cols) {
    const gridContainer = document.getElementById('grid-container');

    // Clear existing content in gridContainer
    gridContainer.innerHTML = '';

    let isDrawing = false;

    function handleMove(event) {
        if (isDrawing) {
            if (modeChoice) {
                let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                event.target.style.backgroundColor = color;
            } else if (eraserToggle) {
                event.target.style.backgroundColor = eraser;
            } else {
                event.target.style.backgroundColor = 'black';
            }
        }
    }

    function handleStart(event) {
        isDrawing = true;
        handleMove(event);
    }

    function handleEnd() {
        isDrawing = false;
    }

    for (let i = 0; i < rows; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('row');
        gridContainer.appendChild(gridRow);

        for (let j = 0; j < cols; j++) {
            const gridItem = document.createElement('div');
            gridItem.style.width = `${(100 / cols) - 2}%`;
            gridItem.style.height = `${(100 / rows) - 2}%`;
            gridItem.classList.add('grid-item');
            gridRow.appendChild(gridItem);

            // Add event listeners for mouse events
            gridItem.addEventListener('mouseover', handleMove);
            gridItem.addEventListener('mousedown', handleStart);
            gridItem.addEventListener('mouseup', handleEnd);
            // Add event listeners for touch events
            gridItem.addEventListener('touchstart', (touchEvent) => {
                handleStart(touchEvent.touches[0]);
            });
            gridItem.addEventListener('touchmove', (touchEvent) => {
                handleMove(touchEvent.touches[0]);
            });
            gridItem.addEventListener('touchend', handleEnd);
        }
    }
}

function eraserMode() {
    eraserToggle = !eraserToggle; // Toggle the eraser mode
    if (eraserToggle) {
        eraser = "antiquewhite"; // Set the eraser color (you can change this to any desired color)
    }
    return eraser;
}

function initializeGrid(number){
    createGrid(number, number);
}
function resetGridSize() {
    if (userDefinedRows !== 0) {
        initializeGrid(userDefinedRows);
    } else {
        initializeGrid(10);
    }
}

function setColorMode() {
    modeChoice = true;
}

function setBwMode() {
    modeChoice = false;
}

function handleGridSize() {
    const userInputRows = prompt('Enter Grid Size:');

    userDefinedRows = parseInt(userInputRows);

    if (!isNaN(userDefinedRows) && userDefinedRows > 0 && userDefinedRows < 50) {
        initializeGrid(userDefinedRows);
    } else {
        alert('Invalid input. Please enter positive integers for grid size.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const resetGridBtn = document.querySelector('.resetGridBtn');
    const gridSizeBtn = document.querySelector('.gridSizeBtn');
    const bwBtn = document.querySelector('.bwBtn');
    const colorBtn = document.querySelector('.colorBtn');
    const eraserBtn = document.querySelector('.eraserBtn');
    // Attach event listeners
    resetGridBtn.addEventListener('click', resetGridSize);
    gridSizeBtn.addEventListener('click', handleGridSize);
    bwBtn.addEventListener('click', setBwMode); // Add parentheses to call the function
    colorBtn.addEventListener('click', setColorMode); // Add parentheses to call the function
    eraserBtn.addEventListener('click', eraserMode);
    
    // Now, call the initial setup or any other functions if needed
    initializeGrid(16)
});