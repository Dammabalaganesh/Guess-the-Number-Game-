let randomNum;
let attempts = 0;
let minRange = 1;
let maxRange = 100;

const input = document.getElementById('guessInput');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('startGame');
const rangeSetup = document.getElementById('rangeSetup');
const gameArea = document.getElementById('gameArea');
const minInput = document.getElementById('minRange');
const maxInput = document.getElementById('maxRange');
const minDisplay = document.getElementById('minNum');
const maxDisplay = document.getElementById('maxNum');

function initGame() {
  const min = Number(minInput.value);
  const max = Number(maxInput.value);
  
  if (!min || !max || min >= max) {
    message.textContent = 'Please enter valid numbers (min must be less than max)';
    message.style.color = 'orange';
    return;
  }

  minRange = min;
  maxRange = max;
  randomNum = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  
  minDisplay.textContent = minRange;
  maxDisplay.textContent = maxRange;
  
  rangeSetup.style.display = 'none';
  gameArea.style.display = 'block';
  message.textContent = '';
  attempts = 0;
  input.value = '';
  input.min = minRange;
  input.max = maxRange;
  input.focus();
}

startBtn.addEventListener('click', initGame);

function checkGuess() {
  const guess = Number(input.value);
  if (!guess || guess < minRange || guess > maxRange) {
    message.textContent = `Please enter a number between ${minRange} and ${maxRange}`;
    message.style.color = 'orange';
    return;
  }

  attempts++;

  if (guess < randomNum) {
    message.textContent = 'Too low! Try again.';
    message.style.color = '#ffb84d';
  } else if (guess > randomNum) {
    message.textContent = 'Too high! Try again.';
    message.style.color = '#ff4d4d';
  } else {
    message.textContent = `✅ Correct! The number was ${randomNum}. Attempts: ${attempts}`;
    message.style.color = '#00ff80';
    submitBtn.disabled = true;
    resetBtn.style.display = 'inline-block';
  }
  input.value = '';
  input.focus();
}

submitBtn.addEventListener('click', checkGuess);

// Allow pressing Enter in the input to submit the guess
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

resetBtn.addEventListener('click', () => {
  rangeSetup.style.display = 'block';
  gameArea.style.display = 'none';
  message.textContent = '';
  input.value = '';
  submitBtn.disabled = false;
  resetBtn.style.display = 'none';
  minInput.value = '1';
  maxInput.value = '100';
});
