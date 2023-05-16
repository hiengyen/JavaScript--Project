'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//1-Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2.displaying the roll
    diceEl.classList.remove('hidden');
    diceEl.textContent = dice;
    diceEl.src = `dice-${dice}.png`;
    // 3.check for rolled 1 : if true, false switch to next player  updating the scores
    if (dice !== 1) {
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the player
      switchPlayer();
    }
  }
});
//2- Hold the score funtionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // add the current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player's score  is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
// 3-Reset the game funstionality
btnNew.addEventListener('click', function () {
  // reset the game
  //1. reset interface

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores[activePlayer] = 0;
  currentScore = 0;

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  //2. continuing roll dice
  playing = true;

  // con cach 2 xem o final folder
});
