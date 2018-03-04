// Game values
let min = 1,
    max = 10,
    // winningNum = 2,
    winningNum = Math.floor(Math.random()*10) + 1,
    guessesLeft = 3;

// UI vars
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// if enter key is pressed, treat it as a click
// document.body.addEventListener('keyup', function(e){
//   e.preventDefault();
//
//   if(e.keyCode === 13){
//     document.querySelector('#guess-btn').click();
//   }
// });

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen to click event on submit button
guessBtn.addEventListener('click', function (e) {
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){

    setMessage(`Please enter a number between ${min} and ${max}`, 'red');

  } else if(guess === winningNum){

    // Game over - won
    gameOver(true, `Correct! the number to guess was indeed ${winningNum}!`)

  } else {

    // update guesses count
    guessesLeft--;

    // calculate number of guesses left
    if(guessesLeft === 0){
      // Game over!
      gameOver(false, `You lost the game, since the number was ${winningNum}! You can start a new one though`)
    } else {
      // Game goes on!

      // clear input
      guessInput.value = '';

      // tell user he is wrong
      setMessage(`Nope, ${guess} is not correct! You have still ${guessesLeft} guesses left, try again!`, 'red');

      // set the focus on the input field
      guessInput.focus();
    }
  }
});

// listen to input changing
guessInput.addEventListener('keyup', function(){
   resetForm();
});

// set error messages
function setMessage(msg, color) {
  guessInput.style.border = `1px solid ${color}`;
  message.style.color = color;
  message.textContent =  msg;
}

// reset some elements on the form
function resetForm() {
  guessInput.style.border = '1px solid darkgray';
  message.textContent = '';
}

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // set message and border of input
  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'play again';
  guessBtn.className += 'play-again';
}
