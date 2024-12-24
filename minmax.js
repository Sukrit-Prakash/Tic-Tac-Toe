const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');

let arr = ['', '', '', '', '', '', '', '', ''];
let currentmove = 'X';
let gameactive = true;

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// Add event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameactive || arr[index] !== '') return;

    arr[index] = currentmove;
    cell.textContent = currentmove;

    if (checkwin(arr, currentmove)) {
      showMessage(`${currentmove} wins!`);
      gameactive = false;
      return;
    }

    if (checkdraw(arr)) {
      showMessage("It's a draw!");
      gameactive = false;
      return;
    }

    currentmove = 'O'; // Switch to the bot
    botmove();
  });
});

// Reset button logic
resetBtn.addEventListener('click', () => {
  arr = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentmove = 'X';
  gameactive = true;
});

function botmove() {
  if (!gameactive) return;

  const bestmove = getbestmove();
  if (bestmove !== null) {
    arr[bestmove] = currentmove;
    cells[bestmove].textContent = currentmove;
  }

  if (checkwin(arr, currentmove)) {
    showMessage(`${currentmove} wins!`);
    gameactive = false;
    return;
  }

  if (checkdraw(arr)) {
    showMessage("It's a draw!");
    gameactive = false;
    return;
  }

  currentmove = 'X'; // Switch back to the player
}

function getbestmove() {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
      arr[i] = 'O'; // Bot's move
      const score = minmax(arr, 0, false); // Calculate minimax score
      arr[i] = ''; // Undo the move

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

// Minimax algorithm
function minmax(board, depth, isMaximizing) {
  if (checkwin(board, 'X')) return depth - 10; // Player win
  if (checkwin(board, 'O')) return 10 - depth; // Bot win
  if (checkdraw(board)) return 0; // Draw

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O'; // Bot's move
        const score = minmax(board, depth + 1, false);
        board[i] = ''; // Undo the move
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X'; // Player's move
        const score = minmax(board, depth + 1, true);
        board[i] = ''; // Undo the move
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

// Check win
function checkwin(board, player) {
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// Check draw
function checkdraw(board) {
  return board.every(cell => cell !== '');
}

// Show a message (you can replace this with a custom UI)
function showMessage(message) {
  alert(message);
}
