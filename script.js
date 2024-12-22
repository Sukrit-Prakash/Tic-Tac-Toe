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
    // Prevent clicks if the game is over or the cell is already filled
    if (!gameactive || arr[index] !== '') return;

    // Update the board state
    arr[index] = currentmove;
    cell.textContent = currentmove;

    // Check for win or draw
    if (checkwin()) {
      showMessage(`${currentmove} wins!`);
      gameactive = false;
      return;
    }

    if (checkdraw()) {
      showMessage("It's a draw!");
      gameactive = false;
      return;
    }

    // Switch the player
    // currentmove = currentmove === 'X' ? 'O' : 'X';
    currentmove='O';
    botmove();
  });
});

// Add event listener to the reset button
resetBtn.addEventListener('click', () => {
  arr = ['', '', '', '', '', '', '', '', '']; // Reset the board state
  cells.forEach(cell => {
    cell.textContent = ''; // Clear the UI
  });
  currentmove = 'X'; // Reset to 'X'
  gameactive = true; // Reactivate the game
});

function botmove(){
    if(!gameactive)
         return;
    const bestmove = winmove('O')|| winmove('X')||(arr[4]===''?4:null)||findcorner()||randommove();
    arr[bestmove]=currentmove;
    cells[bestmove].textContent = currentmove;

    if (checkwin()) {
        showMessage(` BOT wins!`);
        gameactive = false;
        return;
      }
  
      if (checkdraw()) {
        showMessage("It's a draw!");
        gameactive = false;
        return;
      }
      currentmove='X';
}
function winmove(move){
     for(let i=0;i<8;i++)
     {
        const[a,b,c]=win[i];
        let count=0;
        if(arr[a]===move)
           count++;
        if(arr[b]===move)
            count++;
        if(arr[c]==move)
            count++;
        if(count===2)
        {
            if(arr[a]==='')
                return a;
            else if(arr[b]==='')
                return b;
            else if(arr[c]==='')
                return c;
        }
     }
     return null;
}
function findcorner(){
    // 0,2,6,8
    const  corner =[0,2,6,8]
    return corner.find(index =>arr[index]==='')||null;
}
function randommove(){
   const emptycellnull = arr.map((value,index)=>(value===''?index:null)) 
   const valid = emptycellnull.filter(v=>v!==null)
   if(valid.length==0)
        return null
    return valid[Math.floor(Math.random()*valid.length)];
}

function checkwin() {
  for (let i=0;i<8;i++) {
    const[a,b,c] = win[i]
    if (arr[a] === currentmove && arr[b] === currentmove && arr[c] === currentmove) {
      return true;
    }
  }
  return false;
}

// Function to check for a draw
function checkdraw() {
//   return arr.every(cell => cell !== '');
//  // If no empty cells, it's a draw
    for(let i=0;i<9;i++)
    {
        if(arr[i]==='')
            return false;
    }
    return true;
}

// Function to show a message (you can replace this with a custom UI)
function showMessage(message) {
  alert(message);
}
