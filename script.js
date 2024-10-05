const gameContainer = document.getElementById('game-container');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues]; // Duplicate values for pairs
let flippedCards = [];
let matchedCards = [];
let isGameActive = true;

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card elements
function createCards() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// Flip card function
function flipCard() {
    if (!isGameActive || flippedCards.includes(this) || matchedCards.includes(this)) {
        return;
    }
    this.classList.add('flipped');
    this.innerText = this.getAttribute('data-value');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        checkForWin();
    } else {
        isGameActive = false;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
            isGameActive = true;
        }, 1000);
    }
}

// Check for win condition
function checkForWin() {
    if (matchedCards.length === cards.length) {
        resultMessage.innerText = 'Congratulations! You matched all the cards!';
        isGameActive = false;

         // Play clapping sound from 2s to 5s
         const clapSound = document.getElementById('clap-sound');
         clapSound.currentTime = 2; // Start at 2 seconds
         clapSound.play();
 
         // Stop the audio after 3 seconds (from 2s to 5s)
         setTimeout(() => {
             clapSound.pause();
             clapSound.currentTime = 0; // Reset to the start
         }, 3000); // Stop after 3 seconds
 
        // Launch confetti
        confetti({
            particleCount: 200,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: 0.5, y: 0.5 }
        });
    }
}

// Restart the game
function restartGame() {
    gameContainer.innerHTML = '';
    resultMessage.innerText = '';
    flippedCards = [];
    matchedCards = [];
    isGameActive = true;
    createCards();
}

restartButton.addEventListener('click', restartGame);
createCards();
