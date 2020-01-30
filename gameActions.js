let cpuC = document.getElementById("cpuCard");
let plyC = document.getElementById("playerCard");
let CC = document.getElementById("cpuC");
let cpuP = document.getElementById("cpuPlay");
let PC = document.getElementById("playC");
let plyP = document.getElementById("playerPlay");
let cpuW = document.getElementById("cpuWinner");
let plyW = document.getElementById("playerWinner");
let Wn = document.getElementById("winNotes");

let dealBTN = document.getElementById("deal");
let drawBTN = document.getElementById("draw");
let restBTN = document.getElementById("restart");

let player = [];
let playerC = 0;
let playerWins = 0;
let NPC = [];
let NPCC = 0;
let NPCWins = 0;


function start(){
  deck.load();
  shuffle();

  dealBTN.style.display = "none";
  drawBTN.style.display = "block";
  
  deal();
}

function shuffle(){
  let i;
  let random;
  for(i = 0; i < 26; i++){
    random = Math.floor(Math.random()*52);
    while(deck.cardArray[random].used === true){
      random = Math.floor(Math.random()*52);
    }
    player[i] = deck.cardArray[random];
    deck.cardArray[random].used = true;
  
    random = Math.floor(Math.random()*52);
    while(deck.cardArray[random].used === true){
      random = Math.floor(Math.random()*52);
    }
    NPC[i] = deck.cardArray[random];
    deck.cardArray[random].used = true;
  }
  cpuC.style.display = "block";
  plyC.style.display = "block";

}

function deal (){
  cpuC.style.display = "block";
  plyC.style.display = "block";
  cpuW.innerHTML = NPCWins;
  plyW.innerHTML = playerWins;

}

function war(){
  playerC = player[0];
  NPCC = NPC[0];

  console.log(player);
  console.log(NPC);

  CC.src = "image/tile"+((NPCC.cardRank*4) + NPCC.cardSuit)+".png";
  PC.src = "image/tile"+((playerC.cardRank*4) + playerC.cardSuit)+".png";

  if(playerC.cardRank > NPCC.cardRank){
    playerWins++;
    Wn.innerHTML = "Player won!";
  } 
  if (NPCC.cardRank > playerC.cardRank){
    NPCWins++;
    Wn.innerHTML = "Computer won!";
  }
  if ((playerC.cardRank === NPCC.cardRank) && (playerC.cardSuit > NPCC.cardSuit)){
    playerWins++;
    Wn.innerHTML = "Player won!";
  } 
  if ((playerC.cardRank === NPCC.cardRank) && (playerC.cardSuit < NPCC.cardSuit)){
    NPCWins++;
    Wn.innerHTML = "Computer won!";
  }

  NPCC.cardSuit = changeSuit(NPCC.cardSuit);
  playerC.cardSuit = changeSuit(playerC.cardSuit);

  NPCC.cardRank = changeRank(NPCC.cardRank);
  playerC.cardRank = changeRank(playerC.cardRank);

  let color1 = changeColor(NPCC.cardSuit);
  let color2 = changeColor(playerC.cardSuit);


  cpuP.innerHTML = NPCC.cardRank + " of " + NPCC.cardSuit;
  cpuP.style.color = color1;
  plyP.innerHTML = playerC.cardRank + " of " + playerC.cardSuit;
  plyP.style.color = color2;

  player.splice(0, 1);
  NPC.splice(0, 1);

  cpuW.innerHTML = NPCWins;
  plyW.innerHTML = playerWins;

  if(player.length === 0){
    cpuC.style.display = "none";
    plyC.style.display = "none";
    drawBTN.style.display = "none";
    restBTN.style.display = "block";

    if(NPCWins > playerWins){
      Wn.innerHTML = "Computer Won, maybe next time";
    }
    if(playerWins > NPCWins){
      Wn.innerHTML = "Player Won! Congrats";
    }
    if(playerWins == NPCWins){
      Wn.innerHTML = "You two tied!";
    }
  }

}

function changeSuit(a){
  switch (a){
    case 0:
      return "Spades";
    case 1:
      return "Clubs";
    case 2:
      return "Diamonds";
    case 3:
      return "Hearts";
  }
}

function changeRank(a){
  switch(a){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:  
      return a+2;
    case 9:
      return "Jack";
    case 10:
      return "Queen";
    case 11:
      return "King";
    case 12:
      return "Ace";
  }
}

function changeColor (a){
  switch(a){
    case "Spades":
    case "Clubs":
      return "black";
    case "Diamonds":
    case "Hearts":
      return "red";
  }
}

function restart(){
  location.reload();
}

dealBTN.addEventListener("click",start);
drawBTN.addEventListener("click",war);
restBTN.addEventListener("click",restart);


