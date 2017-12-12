let nbGames = 0;
let playerWins = 0;
let computerWins =0;
let playerRound = true;
let playerMoves=[];
let computerMoves=[];
let playerIcon ="x";
let computerIcon = "o";
let playerColor ="red";
let computerColor = "green";
let roundCount = 0;
let nextComputerMove;
let diffComputer=[];
let diffPlayer=[];
let index;

let winningComb = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];

let togPlayer = document.getElementById("cmn-toggle-4");
let totalGames = document.getElementById("totalGames");
let playerScore= document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");
togPlayer.addEventListener("change", togglePlayer);

let msg = document.getElementById("msg");

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
    playerColor="green";
    computerColor="red";
    playerIcon = "o";
    computerIcon = "x";
  }
  else {
    playerColor="red";
    computerColor="green";
    playerIcon = "x";
    computerIcon = "o";
  }
  document.getElementById("pScore").style.color = playerColor;
  document.getElementById("cScore").style.color = computerColor;
}

function resetScores() {
  nbGames =0;
  totalGames.innerHTML=nbGames;
  computerWins=0;
  computerScore.innerHTML=computerWins;
  playerWins=0;
  playerScore.innerHTML=playerWins;
  playerRound = true;
  togPlayer.disabled =false;
  resetGame();
  console.log("reset score");
}

function resetGame(){
  roundCount=0;
  playerMoves=[];
  computerMoves=[];
  winningComb = [[1,2,3],[4,5,6], [7,8,9],[1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
  for (let i=1; i<10; i++) {
    document.getElementById(i).innerHTML ="";
  }
}

function playerMove(e) {
  if (playerRound === true && e.target.innerHTML==="") { 
    togPlayer.disabled =true;
    e.target.style.color=playerColor;
    e.target.innerHTML = playerIcon;
    playerMoves.push(Number(e.target.id));
    playerRound = false;
    checkMoves();
  }
}

function computerMove() {
  nextComputerMove.style.color=computerColor;
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
  nextComputerMove = nextMove();
 
  if (nextComputerMove==="computer won") {
    msg.setAttribute("style", "display:block")
    msg.innerHTML="COMPUTER WON";
    setTimeout(function() { msg.setAttribute("style", "display:none") }, 3000);
    computerWins+=1;
    computerScore.innerHTML=computerWins;
    nextGame();
  }
  else if (nextComputerMove==="player won") {
    msg.setAttribute("style", "display:block")
    msg.innerHTML='YOU WON';
    setTimeout(function() { msg.setAttribute("style", "display:none") }, 3000);
    playerWins+=1;
    playerScore.innerHTML=playerWins;
    nextGame();
  }
  else if (nextComputerMove === "gameOver") {
    msg.setAttribute("style", "display:block")
    msg.innerHTML='TIGHT GAME';
    setTimeout(function() { msg.setAttribute("style", "display:none") }, 3000);
    nextGame();
  }
  else if (!playerRound && nextComputerMove != "gameOver" && nextComputerMove!="computer won" && nextComputerMove!="player won") {
    setTimeout(function(){ computerMove() }, 1000);
  }
}

function nextGame(){
  nbGames+=1;
  totalGames.innerHTML=nbGames;
  setTimeout(function(){ 
  resetGame();
  if (nbGames % 2) {
    playerRound = false;
    checkMoves();
  } 
  else {
    playerRound = true;
    togPlayer.disabled =false;
  }}, 3000);
}

function victory(el) {
  return el.length <=0;
}

function strategy(el) {
  return el.length ===1 ? (index=Number(el.toString()), true) : false;
}

function nextMove() {
  if (diffComputer.some(victory)) {
    return "computer won";
  } 
  else if (diffPlayer.some(victory)) {
    return "player won";
  }
  else if (roundCount ===9) {
      return "gameOver";
  }
  else if(!playerRound){
    if (diffComputer.some(strategy) && document.getElementById(index).innerHTML ==="") {
      return document.getElementById(index);
    }
    else if (diffPlayer.some(strategy) && document.getElementById(index).innerHTML ==="") {
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
