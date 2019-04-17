/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying; // Declaring the variables

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Generate a random number
  var dice = Math.floor(Math.random() * 6) + 1; // This will give us a random number between 1 & 6. Math.floor() Math.random().

  // 2. Dispay the result
  var diceDOM = document.querySelector('.dice')
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png'

  // 3. Update the round score IF the rolled number was NOT a 1
  if (dice !== 1) {
    // Add score
    roundScore += dice; // updates the round score
    document.querySelector('#current-' + activePlayer).textContent = roundScore;  // displays the roundscore
  } else {
    // Next player
    nextPlayer();
  }
  
  }

})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
     // Add current score to global score
  scores[activePlayer] += roundScore  // scores[activePlayer] indicates each players score. scores[0]player 1 scores[1]player 2


  // Update UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; // activePlayer(player 1 or player 2)


  // Check if player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // .classList gives me access to the classes
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    // Next player
    nextPlayer();
  }
  }

})

function nextPlayer() {  //DRY: Don't repeat yourself! nextPlayer was made into a function so I can just call it when I need it
   // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');  // toggle adds/remove a class if its not there
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); // Passing the init(): When button is clicked, call the init().

function init() {
  scores = [0,0]; // Array of scores for player 1 and player 2
  roundScore = 0; // Rolls get added to the round score
  activePlayer = 0; // Current players turn
  gamePlaying = true; 

  document.querySelector('.dice').style.display = 'none';

 //getElementById lets you select Id's only
 document.getElementById('score-0').textContent = '0';
 document.getElementById('score-1').textContent = '0';
 document.getElementById('current-0').textContent = '0';
 document.getElementById('current-1').textContent = '0';
 document.getElementById('name-0').textContent = 'Player 1';
 document.getElementById('name-1').textContent = 'Player 2';
 document.querySelector('.player-0-panel').classList.remove('winner');
 document.querySelector('.player-1-panel').classList.remove('winner');
 document.querySelector('.player-0-panel').classList.remove('active');
 document.querySelector('.player-1-panel').classList.remove('active');
 document.querySelector('.player-0-panel').classList.add('active');
}








// document.querySelector('#current-' + activePayer).innerHTML = '<em>' + dice + '</em>';  // inner.HTML changes the HTML
// document.querySelector('#current-' + activePayer).textContent = dice; //Select elements(id) like css but only the first one it finds. .textContent changes the tesxt
// document.querySeector is used to manipulate the DOM (changing values and elemets of the web page and the css)
