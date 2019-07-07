let min = 1,
    max = 10,
    winningNum = getRandom(min, max),
    guessesLeft = 3;

let game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

minNum.textContent = String(min);
maxNum.textContent = String(max);

function playAgain() {
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

game.addEventListener('mousedown', e => {
   if (e.target.className === 'play-again') {
        window.location.reload();
   }
});

function setMessage(msg, color = 'green') {
    message.style.color = color;
    message.textContent = msg;
}

function disableGuessing() {
    guessInput.value = '';
    guessInput.disabled = true;
}

function gameOver() {
    disableGuessing();
    guessInput.style.borderColor = 'red';
    setMessage(`Game Over!, the correct number was ${winningNum}.`, 'red')
}

function gameWon() {
    disableGuessing();
    guessInput.style.borderColor = 'green';
    setMessage(`Congratulations ${winningNum} is correct!`, 'green')
}

function getRandom(min, max) {
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(result);
    return result
}

guessBtn.addEventListener('click', e => {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a number between ${min} and ${max}`, 'red')
    }

    if (guess === winningNum) {
        gameWon();
        playAgain();
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver();
            playAgain();
        } else {
            setMessage(`Try Again, ${guessesLeft} guesses left.`, 'red');
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
        }
    }
});

