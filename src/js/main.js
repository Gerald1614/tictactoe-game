let nbGames = 0;
let playerWins = 0;
let computerWins =0;
let playerRound = true;
let playerMoves=[];
let computerMoves=[];
let playerIcon ="x";
let computerIcon = "o";
let roundCount = 0;
let nextComputerMove;
let diffComputer=[];
let diffPlayer=[];
let index;

let winningComb = [[1,2,3],[4,5,6], [7,8,9],[1,4,7], [2,5,8], [1,5,9], [3,5,7]];

let togPlayer = document.getElementById("cmn-toggle-4");
let totalGames = document.getElementById("totalGames");
let playerScore= document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");
togPlayer.addEventListener("change", togglePlayer);


  let selected1 = document.getElementById(1);
  selected1.addEventListener("click", playerMove);
  let selected2 = document.getElementById(2);
  selected2.addEventListener("click", playerMove);
  let selected3 = document.getElementById(3);
  selected3.addEventListener("click", playerMove);
  let selected4 = document.getElementById(4);
  selected4.addEventListener("click", playerMove);
  let selected5 = document.getElementById(5);
  selected5.addEventListener("click", playerMove);
  let selected6 = document.getElementById(6);
  selected6.addEventListener("click", playerMove);
  let selected7 = document.getElementById(7);
  selected7.addEventListener("click", playerMove);
  let selected8 = document.getElementById(8);
  selected8.addEventListener("click", playerMove);
  let selected9 = document.getElementById(9);
  selected9.addEventListener("click", playerMove);


function togglePlayer() {
  if (togPlayer.checked ===true) {
    document.getElementById("pScore").style.color = "green";
    document.getElementById("cScore").style.color = "red";
    playerIcon = "o";
    computerIcon = "x";

  }
  else {
    document.getElementById("pScore").style.color = "red";
    document.getElementById("cScore").style.color = "green";
    playerIcon = "x";
    computerIcon = "o";
  }
}

function resetGame(){
  nbGames = 0;
  playerRound = true;
  roundCount=0;
  playerWins = 0;
  computerWins =0;
  playerMoves=[];
  computerMoves=[];
  winningComb = [[1,2,3],[4,5,6], [7,8,9],[1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
  for (let i=1; i<10; i++) {
    document.getElementById(i).innerHTML ="";
  }
}

function playerMove(e) {
  if (playerRound === true) { 
   e.target.innerHTML = playerIcon;
   playerMoves.push(Number(e.target.id));
   playerRound = false;
   checkMoves();
  }
}

function computerMove() {
    nextComputerMove.innerHTML=computerIcon;
    computerMoves.push(Number(nextComputerMove.id));
    playerRound = true;
    checkMoves();
}

function checkMoves() {
  roundCount+= 1;
  playerMoves.sort();
  computerMoves.sort();
  diffComputer=[];
  diffPlayer=[];
  winningComb.forEach(function(x) {
    let diffP1 = x.filter(y => playerMoves.indexOf(y) == -1);
    let diffC1 = x.filter(y => computerMoves.indexOf(y) == -1);
    diffPlayer.push(diffP1);
    diffComputer.push(diffC1);
    });
    console.log(diffComputer);
    console.log(diffPlayer);


    nextComputerMove = nextMove();
      console.log(nextComputerMove);
      if (nextComputerMove === "gameOver") {
        setTimeout(function(){ resetGame() }, 3000);
      }
      else if (!playerRound && nextComputerMove != "gameOver") {
        setTimeout(function(){ computerMove() }, 1000);
      }

      }

function victory(el) {
  return el.length <=0;
}

function strategy(el) {
  return el.length ===1 ? (index=Number(el.toString()), true) : false;
}

function nextMove() {
 if (diffComputer.some(victory) || diffPlayer.some(victory)|| roundCount ===9) {
    return "gameOver";
  }
  else if(!playerRound){
    console.log(diffPlayer.some(strategy));
    console.log(index);
    if (diffPlayer.some(strategy) && document.getElementById(index).innerHTML ==="") {
      return document.getElementById(index);
    }
    else if (diffComputer.some(strategy) && document.getElementById(index).innerHTML ==="") {
      return document.getElementById(index);
    }
    else {
      return  choixMove();
    }
  }
}


function choixMove() {
  if (selected5.innerHTML ==="") {
    return selected5;
  }
  else {
  let res =  [1,2,3,4,5,6,7,8,9].sort(function(a, b){return 0.5 - Math.random()});
  for (let j=0; j<9; j++) {
    if (document.getElementById(res[j]).innerHTML ==="") {
      return document.getElementById(res[j]);
    }
  }
  }
}
