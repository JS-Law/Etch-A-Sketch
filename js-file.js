// Define your functions outside the event listener
let userDefinedCols = 0;
let userDefinedRows = 0;
let modeChoice = false;

function createGrid(rows, cols) {
    const gridContainer = document.getElementById('grid-container');

    // Clear existing content in gridContainer
    gridContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-container');
        gridContainer.appendChild(gridRow);

        for (let j = 0; j < cols; j++) {
            const gridItem = document.createElement('div');
            gridItem.style.width = `${(700 / cols) - 2}px`;
            gridItem.style.height = `${(700 / rows) - 2}px`;
            gridItem.classList.add('grid-item');
            gridRow.appendChild(gridItem);

            // Add event listener to each grid item
            gridItem.addEventListener('mouseover', (event) => {
                if (modeChoice) {
                    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    event.target.style.backgroundColor = color;
                } else {
                    event.target.style.backgroundColor = 'black';
                }
            });
        }
    }
}

function resetGridSize() {
    if (userDefinedCols !== 0 && userDefinedRows !== 0) {
        createGrid(userDefinedRows, userDefinedRows);
    } else {
        createGrid(12, 12);
    }
}

function setColorMode() {
    modeChoice = true;
}

function setBwMode() {
    modeChoice = false;
}

function handleGridSize() {
    const userInputRows = prompt('Enter the number of rows:');
    const userInputCols = prompt('Enter the number of columns:');

    userDefinedRows = parseInt(userInputRows);
    userDefinedCols = parseInt(userInputCols);

    if (!isNaN(userDefinedRows) && !isNaN(userDefinedCols) && userDefinedRows > 0 && userDefinedCols > 0) {
        createGrid(userDefinedRows, userDefinedCols);
    } else {
        alert('Invalid input. Please enter positive integers for rows and columns.');
    }
}

// Attach event listeners outside of the functions
document.addEventListener('DOMContentLoaded', function () {
    const resetGridBtn = document.querySelector('.resetGridBtn');
    const gridSizeBtn = document.querySelector('.gridSizeBtn');
    const bwBtn = document.querySelector('.bwBtn');
    const colorBtn = document.querySelector('.colorBtn');

    // Attach event listeners
    resetGridBtn.addEventListener('click', resetGridSize);
    gridSizeBtn.addEventListener('click', handleGridSize);
    bwBtn.addEventListener('click', setBwMode); // Add parentheses to call the function
    colorBtn.addEventListener('click', setColorMode); // Add parentheses to call the function

    // Now, call the initial setup or any other functions if needed
    createGrid(12, 12);
});