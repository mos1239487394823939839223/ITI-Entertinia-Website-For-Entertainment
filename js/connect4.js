/* var mainTag = document.querySelector("main");
var centerContainer = document.createElement("div");
centerContainer.className = "center-container";

var startButton = document.createElement("button");
startButton.className = "start-button";
startButton.textContent = "Start New Game";
startButton.onclick = resetGame; // Event to reset the game and start

centerContainer.appendChild(startButton);
mainTag.insertBefore(centerContainer, mainTag.firstChild);

var sectionConnect = document.querySelector(".game-container");
var connectBoard = document.createElement("div");
connectBoard.className = "connect4Board";
sectionConnect.appendChild(connectBoard);

var firstPlayer, secondPlayer;
var currentPlayer = 'red';
var stateOfTheGame = false, isFirstGame = true;
var board = Array(6).fill(null).map(() => Array(7).fill(null));

function setPlayersName() {
    firstPlayer = prompt("Enter First player name", "Player 1");
    secondPlayer = prompt("Enter Second player name", "Player 2");
    localStorage.setItem("player1NameConnect", firstPlayer);
    localStorage.setItem("player2NameConnect", secondPlayer);
}

function resetGame() {
    if (stateOfTheGame) {
        var checkGame = confirm("Do you want to restart the game?");
        if (!checkGame) {
            return;
        }
    }

    if (isFirstGame) {
        isFirstGame = false;
        setPlayersName();
    } else {
        var playersNames = confirm("Do you want to change the players' names?");
        if (playersNames || !localStorage.getItem("player1NameConnect") || !localStorage.getItem("player2NameConnect")) {
            setPlayersName();
        } else {
            firstPlayer = localStorage.getItem("player1NameConnect");
            secondPlayer = localStorage.getItem("player2NameConnect");
        }
    }

    board = Array(6).fill(null).map(() => Array(7).fill(null));
    currentPlayer = 'red';
    stateOfTheGame = true;
    connectBoard.innerHTML = '';
    drawBoard();
    enableBoard(); // Enable the board when the game starts
}

function drawBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.onclick = () => handleCellClick(col);
            connectBoard.appendChild(cell);
        }
    }
}

function handleCellClick(col) {
    if (!stateOfTheGame) return;

    for (let row = 5; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            drawDisc(row, col, currentPlayer);
            if (checkWin(row, col)) {
                stateOfTheGame = false;
                disableBoard(); // Disable the board when the game ends
                setTimeout(function () {
                    alert(`${currentPlayer === 'red' ? firstPlayer : secondPlayer} wins!`);
                }, 300);
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            break;
        }
    }
}

function drawDisc(row, col, color) {
    var cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.classList.add(color);
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1);   // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        var r = row + i * rowDir;
        var c = col + i * colDir;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function disableBoard() {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.pointerEvents = "none"; // Disable cell interaction
        cell.classList.add("disabled");
    });
}

function enableBoard() {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.pointerEvents = "auto"; // Enable cell interaction
        cell.classList.remove("disabled");
    });
}

// Initialize the game board and disable it
drawBoard();
disableBoard(); */


// DOM Elements
var mainTag = document.querySelector("main");
var centerContainer = document.createElement("div");
centerContainer.className = "center-container";

var startButton = document.createElement("button");
startButton.className = "start-button";
startButton.textContent = "Start New Game";
startButton.onclick = resetGame; // The button now resets and starts the game

centerContainer.appendChild(startButton);
mainTag.insertBefore(centerContainer, mainTag.firstChild);

var sectionConnect = document.querySelector(".game-container");
var connectBoard = document.createElement("div");
connectBoard.className = "connect4Board";
sectionConnect.appendChild(connectBoard);

let firstPlayer, secondPlayer;
let currentPlayer = "red";
let stateOfTheGame = false,
    isFirstGame = true;
let board = Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));

// Set Players
function setPlayersName() {
    firstPlayer = prompt("Enter First player name", "Player 1") || "Player 1";
    secondPlayer = prompt("Enter Second player name", "Player 2") || "Player 2";
    localStorage.setItem("player1NameConnect", firstPlayer);
    localStorage.setItem("player2NameConnect", secondPlayer);
}

// Reset Game
function resetGame() {
    if (stateOfTheGame) {
        var checkGame = confirm("Do you want to restart the game?");
        if (!checkGame) return;
    }

    if (isFirstGame) {
        isFirstGame = false;
        setPlayersName();
    } else {
        var playersNames = confirm("Do you want to change the players names?");
        if (playersNames || !localStorage.getItem("player1NameConnect") || !localStorage.getItem("player2NameConnect")) {
            setPlayersName();
        } else {
            firstPlayer = localStorage.getItem("player1NameConnect");
            secondPlayer = localStorage.getItem("player2NameConnect");
        }
    }

    board = Array(6)
        .fill(null)
        .map(() => Array(7).fill(null));
    currentPlayer = "red";
    stateOfTheGame = true;
    connectBoard.innerHTML = "";
    drawBoard();
    enableBoard();
}

// Draw Board
function drawBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.onclick = () => handleCellClick(col);
            connectBoard.appendChild(cell);
        }
    }
}

// Handle Cell Click
function handleCellClick(col) {
    if (!stateOfTheGame) return;

    for (let row = 5; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            drawDisc(row, col, currentPlayer);

            if (checkWin(row, col)) {
                stateOfTheGame = false;
                disableBoard();
                setTimeout(() => {
                    alert(`${currentPlayer === "red" ? secondPlayer : firstPlayer} wins! Game is over.`);
                }, 200);
            }

            currentPlayer = currentPlayer === "red" ? "yellow" : "red";
            break;
        }
    }
}

// Draw Disc
function drawDisc(row, col, color) {
    var cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.classList.add(color);
}

// Check Win
function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1); // Diagonal \
}

// Check Direction
function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    var winningCells = [];

    for (let i = -3; i <= 3; i++) {
        var r = row + i * rowDir;
        var c = col + i * colDir;

        if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
            count++;
            winningCells.push([r, c]);
            if (count === 4) {
                highlightWinningCells(winningCells);
                return true;
            }
        } else {
            count = 0;
            winningCells.length = 0;
        }
    }
    return false;
}

// Highlight Winning Cells
function highlightWinningCells(cells) {
    cells.forEach(([row, col]) => {
        var cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.classList.add("winning");
    });
}

// Disable and Enable Board
function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => (cell.style.pointerEvents = "none"));
}

function enableBoard() {
    document.querySelectorAll(".cell").forEach(cell => (cell.style.pointerEvents = "auto"));
}

// Initialize
drawBoard();
disableBoard();
