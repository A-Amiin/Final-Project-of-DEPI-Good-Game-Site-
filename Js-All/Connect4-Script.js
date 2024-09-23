const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const currentPlayerDisplay = document.getElementById('current-player');
const columns = 7;
const rows = 6;
let currentPlayer = 'red';
let grid = Array.from({ length: rows }, () => Array(columns).fill(null));

// Create the game board
function createBoard() {
    board.innerHTML = ''; // Clear the board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
    updatePlayerDisplay();
}

// Handle the cell click event
function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col, 10);
    const row = findAvailableRow(col);
    if (row !== -1) { // Valid move
        grid[row][col] = currentPlayer;
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(currentPlayer);
        if (checkWinner(row, col)) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else {
            switchPlayer();
        }
    }
}

// Switch to the next player
function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    updatePlayerDisplay();
}

// Update the player display
function updatePlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
}

// Find the first available row in the selected column
function findAvailableRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (!grid[row][col]) {
            return row;
        }
    }
    return -1; // No available row
}

// Check if the current player has won
function checkWinner(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1);  // Diagonal \
}

// Check a specific direction for a win
function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countMatches(row, col, rowDir, colDir);
    count += countMatches(row, col, -rowDir, -colDir);
    return count >= 4;
}

// Count matching cells in a specific direction
function countMatches(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = 1; i < 4; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < columns && grid[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

// Reset the game
function resetGame() {
    currentPlayer = 'red';
    grid = Array.from({ length: rows }, () => Array(columns).fill(null));
    createBoard();
}

// Initialize the game
createBoard();
resetButton.addEventListener('click', resetGame);