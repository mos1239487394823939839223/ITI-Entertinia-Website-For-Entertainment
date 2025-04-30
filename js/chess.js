var mainTag = document.querySelector("main");
var centerContainer = document.createElement("div");
centerContainer.className = "center-container";

var startButton = document.createElement("button");
startButton.className = "start-button";
startButton.textContent = "Start New Game";

centerContainer.appendChild(startButton);

var firstContent = mainTag.firstChild;

mainTag.insertBefore(centerContainer, firstContent);

var sectionChess = document.querySelector(".game-container");
var chessboard = document.createElement("div");
chessboard.className = "chessboard";

var whitePawn = new Image(),
    blackPawn = new Image(),
    whiteRook = new Image(),
    blackRook = new Image(),
    whiteKnight = new Image(),
    blackKnight = new Image(),
    whiteBishop = new Image(),
    blackBishop = new Image(),
    whiteKing = new Image(),
    blackKing = new Image(),
    whiteQueen = new Image(),
    blackQueen = new Image();

whitePawn.src = "images/pieces/whitePawn.svg";
//whitePawn.src = "https://img.icons8.com/ios/50/pawn.png";
blackPawn.src = "images/pieces/blackPawn.svg";
//blackPawn.src = "https://img.icons8.com/ios-filled/50/pawn.png";
whiteRook.src = "images/pieces/whiteRook.svg";
//whiteRook.src = "https://img.icons8.com/ios/50/rook.png";
blackRook.src = "images/pieces/blackRook.svg";
//blackRook.src = "https://img.icons8.com/ios-filled/50/rook.png";
whiteKnight.src = "images/pieces/whiteKnight.svg";
//whiteKnight.src = "https://img.icons8.com/ios/50/knight.png";
blackKnight.src = "images/pieces/blackKnight.svg";
//blackKnight.src = "https://img.icons8.com/ios-filled/50/knight.png";
whiteBishop.src = "images/pieces/whiteBishop.svg";
//whiteBishop.src = "https://img.icons8.com/ios/50/bishop.png";
blackBishop.src = "images/pieces/blackBishop.svg";
//blackBishop.src = "https://img.icons8.com/ios-filled/50/bishop.png";
whiteKing.src = "images/pieces/whiteKing.svg";
//whiteKing.src = "https://img.icons8.com/ios/50/king.png";
blackKing.src = "images/pieces/blackKing.svg";
//blackKing.src = "https://img.icons8.com/ios-filled/50/king.png";
whiteQueen.src = "images/pieces/whiteQueen.svg";
//whiteQueen.src = "https://img.icons8.com/ios/50/queen.png";
blackQueen.src = "images/pieces/blackQueen.svg";
//blackQueen.src = "https://img.icons8.com/ios-filled/50/queen.png";

// Initial board setup
var initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

var board = JSON.parse(JSON.stringify(initialBoard));
var selectedPiece = null;
var selectedCell = null;
var turn = "white"; // Track the current turn
var whiteKingPos = { row: 7, col: 4 };
var blackKingPos = { row: 0, col: 4 };

var whitePlayer, blackPlayer;
var stateOfTheGame = 0, isFirstGame = true;

function setPlayersName() {
    whitePlayer = prompt("Enter First player name to play with white pieces", "Player 1") || "Player 1";
    blackPlayer = prompt("Enter Second player name to play with black pieces", "Player 2") || "Player 2";
    localStorage.setItem("player1NameChess", whitePlayer);
    localStorage.setItem("player2NameChess", blackPlayer);
}

function resetGame() {
    // Reset the board to its initial state
    if (stateOfTheGame == 1) {
        var checkGame = confirm("Do you want to restart the game?");
        if (!checkGame) {
            return;
        }
    }

    if (isFirstGame) {
        isFirstGame = false;
        setPlayersName();
    } else {
        var playersNames = confirm("Do you want to change the players names?");
        if (playersNames || !localStorage.getItem("player1NameChess") || !localStorage.getItem("player2NameChess")) {
            setPlayersName();
        } else {
            whitePlayer = localStorage.getItem("player1NameChess");
            blackPlayer = localStorage.getItem("player2NameChess");
        }
    }


    board = JSON.parse(JSON.stringify(initialBoard));
    selectedPiece = null;
    selectedCell = null;
    turn = "white"; // Reset to white's turn
    whiteKingPos = { row: 7, col: 4 };
    blackKingPos = { row: 0, col: 4 };

    // Reset any transformations or highlights
    chessboard.style.transform = "rotate(0deg)";
    var pieces = document.querySelectorAll(".piece");
    pieces.forEach(function (piece) {
        piece.style.transform = "rotate(0deg)";
    });

    stateOfTheGame = 1; // Enable the game
    enableBoard(); // Enable interaction with the board
    drawBoard();
}

// Handle cell clicks
function handleCellClick(cell) {
    if (stateOfTheGame === 0) {
        return; // Ignore clicks when the board is disabled
    }

    var row = parseInt(cell.dataset.row);
    var col = parseInt(cell.dataset.col);
    var piece = board[row][col];
    var pieceColor = piece === piece.toUpperCase() ? "white" : "black";

    //console.log(`Clicked cell: row=${row}, col=${col}, piece=${piece}`);

    clearHighlights(); // Clear previous highlights

    if (selectedPiece) {
        // Attempt to move the selected piece
        if (canMove(selectedPiece.row, selectedPiece.col, row, col)) {
            //console.log(`Moving piece: ${board[selectedPiece.row][selectedPiece.col]} to row=${row}, col=${col}`);
            movePiece(selectedPiece.row, selectedPiece.col, row, col);
            selectedPiece = null;
            selectedCell.classList.remove("selected");
            selectedCell = null;
            switchTurn(); // Switch turn and rotate board
        } else {
            alert("Invalid move!");
            // Deselect the current piece if the move is invalid
            selectedPiece = null;
            if (selectedCell) selectedCell.classList.remove("selected");
            selectedCell = null;
        }
    } else if (piece && pieceColor === turn) {
        // Select a piece if it's the current turn's color
        if (selectedCell) selectedCell.classList.remove("selected"); // Deselect any previously selected piece
        selectedPiece = { row, col, piece };
        selectedCell = cell;
        cell.classList.add("selected");
        highlightValidMoves(row, col); // Highlight possible moves
        //console.log(`Selected piece: ${piece} at row=${row}, col=${col}`);
    } else {
        alert("Invalid selection or No piece selected.");
        // Clear any existing selection
        if (selectedCell) selectedCell.classList.remove("selected");
        selectedPiece = null;
        selectedCell = null;
    }
}


// Attach the reset function to the "Start New Game" button
startButton.addEventListener("click", resetGame);

// Create the chessboard
function drawBoard() {
    chessboard.innerHTML = "";
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Alternate light and dark cell colors
            if ((row + col) % 2 === 0) {
                cell.classList.add("light");
            } else {
                cell.classList.add("dark");
            }

            var piece = board[row][col];
            if (piece) {
                var pieceImage = getPieceImageElement(piece); // Get the image element for the piece
                pieceImage.className = `piece ${piece === piece.toUpperCase() ? "white" : "black"}`;
                cell.appendChild(pieceImage.cloneNode(true)); // Append a cloned image element to the cell
            }

            cell.addEventListener("click", function () {
                handleCellClick(this); // Pass the clicked cell
            });
            chessboard.appendChild(cell);
        }
    }
}

function getPieceImageElement(piece) {
    switch (piece) {
        case "P": return whitePawn;
        case "p": return blackPawn;
        case "R": return whiteRook;
        case "r": return blackRook;
        case "N": return whiteKnight;
        case "n": return blackKnight;
        case "B": return whiteBishop;
        case "b": return blackBishop;
        case "Q": return whiteQueen;
        case "q": return blackQueen;
        case "K": return whiteKing;
        case "k": return blackKing;
        default: return null; // No piece
    }
}


function disableBoard() {
    chessboard.classList.add("disabled");
}

// Function to enable the chessboard
function enableBoard() {
    chessboard.classList.remove("disabled");
}


// Switch turn and rotate the board
function switchTurn() {
    turn = turn === "white" ? "black" : "white";
    chessboard.style.transform = turn === "white" ? "rotate(0deg)" : "rotate(180deg)";

    // Rotate the pieces
    var pieces = document.querySelectorAll(".piece");
    pieces.forEach(function (piece) {
        piece.style.transform = turn === "white" ? "rotate(0deg)" : "rotate(180deg)";
    });

    // Check if the game ends due to checkmate
    if (isCheckmate(turn)) {
        var winner = turn === "white" ? blackPlayer : whitePlayer;
        var winnerColor = turn === "white" ? "Black" : "White";
        alert(`${winner} wins by checkmate, he plays with ${winnerColor} pieces The game is over.`);
        stateOfTheGame = 0;
        disableBoard();
    }
}


function validatePawnMove(fromRow, fromCol, toRow, toCol, color) {
    var direction = color === "white" ? -1 : 1; // White moves up, black moves down
    var startRow = color === "white" ? 6 : 1;

    if (toCol === fromCol) {
        // Moving forward
        if (board[toRow][toCol] === "" && toRow === fromRow + direction) {
            return true;
        }
        // Double step from starting position
        if (fromRow === startRow && toRow === fromRow + 2 * direction &&
            board[toRow][toCol] === "" && board[fromRow + direction][toCol] === "") {
            return true;
        }
    } else if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
        // Capturing diagonally
        if (board[toRow][toCol] !== "" && (color === "white" ? board[toRow][toCol] === board[toRow][toCol].toLowerCase() : board[toRow][toCol] === board[toRow][toCol].toUpperCase())) {
            return true;
        }
    }
    return false;
}


function validateRookMove(fromRow, fromCol, toRow, toCol) {
    if (fromRow !== toRow && fromCol !== toCol) return false; // Must move in a straight line
    return isPathClear(fromRow, fromCol, toRow, toCol);
}


function validateKnightMove(fromRow, fromCol, toRow, toCol) {
    var rowDiff = Math.abs(fromRow - toRow);
    var colDiff = Math.abs(fromCol - toCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}


function validateBishopMove(fromRow, fromCol, toRow, toCol) {
    if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false; // Must move diagonally
    return isPathClear(fromRow, fromCol, toRow, toCol);
}


function validateQueenMove(fromRow, fromCol, toRow, toCol) {
    return (
        validateRookMove(fromRow, fromCol, toRow, toCol) || validateBishopMove(fromRow, fromCol, toRow, toCol)
    );
}


function validateKingMove(fromRow, fromCol, toRow, toCol) {
    var rowDiff = Math.abs(fromRow - toRow);
    var colDiff = Math.abs(fromCol - toCol);
    return rowDiff <= 1 && colDiff <= 1; // Can move one square in any direction
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
    var rowStep = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
    var colStep = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);

    var currentRow = fromRow + rowStep;
    var currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol] !== "") {
            return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
    }
    return true;
}

function canMove(fromRow, fromCol, toRow, toCol) {
    var piece = board[fromRow][fromCol];
    var target = board[toRow][toCol];
    var pieceColor = piece === piece.toUpperCase() ? "white" : "black";
    var targetColor = target ? (target === target.toUpperCase() ? "white" : "black") : null;

    // Ensure the target square is not occupied by the same color
    if (targetColor === pieceColor) {
        return false;
    }

    // Implement basic movement rules for each piece
    switch (piece.toLowerCase()) {
        case "p":
            if (validatePawnMove(fromRow, fromCol, toRow, toCol, pieceColor)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        case "r":
            if (validateRookMove(fromRow, fromCol, toRow, toCol)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        case "n":
            if (validateKnightMove(fromRow, fromCol, toRow, toCol)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        case "b":
            if (validateBishopMove(fromRow, fromCol, toRow, toCol)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        case "q":
            if (validateQueenMove(fromRow, fromCol, toRow, toCol)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        case "k":
            if (validateKingMove(fromRow, fromCol, toRow, toCol)) return isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, pieceColor);
            return false;
        default:
            return false;
    }
}

function isKingSafeAfterMove(fromRow, fromCol, toRow, toCol, color) {
    // Temporarily make the move
    var originalPiece = board[toRow][toCol];
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = "";

    var kingPos = color === "white" ? whiteKingPos : blackKingPos;

    // Update king position if the moved piece is the king
    if (board[toRow][toCol].toLowerCase() === "k") {
        kingPos = { row: toRow, col: toCol };
    }

    // Check if the king is in check
    var isKingSafe = !isKingInCheck(color, kingPos.row, kingPos.col);

    // Revert the move
    board[fromRow][fromCol] = board[toRow][toCol];
    board[toRow][toCol] = originalPiece;

    return isKingSafe;
}

function isKingInCheck(color, kingRow, kingCol) {
    var opponentColor = color === "white" ? "black" : "white";
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            var piece = board[row][col];
            if (piece && (piece === piece.toUpperCase() ? "white" : "black") === opponentColor) {
                if (canMove(row, col, kingRow, kingCol)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isCheckmate(color) {
    var kingPos = color === "white" ? whiteKingPos : blackKingPos;

    // If the king is not in check, it's not checkmate
    if (!isKingInCheck(color, kingPos.row, kingPos.col)) {
        return false;
    }

    // Check if the king has any valid moves to escape the check
    for (var row = -1; row <= 1; row++) {
        for (var col = -1; col <= 1; col++) {
            var newRow = kingPos.row + row;
            var newCol = kingPos.col + col;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 &&
                canMove(kingPos.row, kingPos.col, newRow, newCol) && !isKingInCheck(color, newRow, newCol)) {
                // If the king can move to a valid square that does not leave it in check, it's not checkmate
                return false;
            }
        }
    }

    // If the king can't move and no other piece can protect, it's checkmate
    return true;
}


function movePiece(fromRow, fromCol, toRow, toCol) {
    var capturedPiece = board[toRow][toCol];

    // Check if a king is captured
    if (capturedPiece.toLowerCase() === "k") {
        var winner = turn === "white" ? "White" : "Black";
        alert(`${winner} wins! The game is over.`);
        return;
    }

    // Update king position if moved
    if (board[fromRow][fromCol].toLowerCase() === "k") {
        if (turn === "white") {
            whiteKingPos = { row: toRow, col: toCol };
        } else {
            blackKingPos = { row: toRow, col: toCol };
        }
    }

    // Move the piece
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = "";

    // Handle pawn promotion
    var piece = board[toRow][toCol];
    if (piece.toLowerCase() === "p" && (toRow === 0 || toRow === 7)) {
        promotePawn(toRow, toCol, turn);
    }

    drawBoard();
}


function promotePawn(row, col, color) {
    var validPromotions = ["q", "r", "b", "n"]; // Valid promotion pieces
    var promotionPiece = prompt(
        `${color.charAt(0).toUpperCase() + color.slice(1)} pawn promotion! Choose a piece (q, r, b, n):`,
        "q"
    );

    while (!validPromotions.includes(promotionPiece.toLowerCase())) {
        promotionPiece = prompt("Invalid choice! Choose again (q, r, b, n):", "q");
    }

    // Promote to the selected piece
    board[row][col] = color === "white" ? promotionPiece.toUpperCase() : promotionPiece.toLowerCase();
    drawBoard();
}



function highlightValidMoves(row, col) {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        var toRow = parseInt(cell.dataset.row);
        var toCol = parseInt(cell.dataset.col);
        if (canMove(row, col, toRow, toCol)) {
            cell.classList.add("highlight");
        }
    });
}

function clearHighlights() {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("highlight"));
}



// Initialize the board
disableBoard();
drawBoard();
sectionChess.appendChild(chessboard);
