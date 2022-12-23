let deck = [];
const frenchSuits = ['C', 'D', 'H', 'S'];
const courtCards = ['A', 'Q', 'J', 'K'];

let playerPoints = 0;
let cpuPoints = 0;

const btnReqCard = document.querySelector('#btn-request-card');
const btnNewGame = document.querySelector('#btn-new-game');
const btnStopGame = document.querySelector('#btn-stop-game');

const playerCards = document.querySelector('#player-cards');
const cpuCards = document.querySelector('#cpu-cards');

const playerCount = document.querySelector('body > div > div:nth-child(2) > div > h1 > small');
const cpuCount = document.querySelector('body > div > div:nth-child(3) > div > h1 > small');


const createDeck = () => {

  for (let index = 2; index <= 10; index++) {
    for (let frenchSuit of frenchSuits) {
      deck.push(index + frenchSuit);
    }
  }

  for (let frenchSuit of frenchSuits) {
    for (let courtCard of courtCards) {
      deck.push(courtCard + frenchSuit);
    }
  }

  return deck
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

};

createDeck();

const requestCard = () => {

  console.log(deck);

  if (deck.length === 0) {
    throw 'There are no cards in the deck.';
  }

  return deck.pop();
};

const getValueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
};

const cpu = (minPoints) => {

  do {
    const card = requestCard();
    cpuPoints = cpuPoints + getValueCard(card);
    cpuCount.innerHTML = cpuPoints;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('bj-card');
    cpuCards.append(imgCard);

    if (minPoints > 21) {
      break;
    }

  } while ((cpuPoints < minPoints) && (minPoints <= 21));

  setTimeout(() => {
    if (cpuPoints === minPoints) {
      alert('There is no winner.');
    } else if (minPoints > 21) {
      alert('Winner: CPU');
    } else if (cpuPoints > 21) {
      alert('Winner: Player');
    } else {
      alert('Winner: CPU');
    }
  }, 100);
  
};

btnReqCard.addEventListener('click', () => {
  const card = requestCard();
  playerPoints = playerPoints + getValueCard(card);
  playerCount.innerHTML = playerPoints;
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cards/${card}.png`;
  imgCard.classList.add('bj-card');
  playerCards.append(imgCard);

  if (playerPoints > 21) {
    console.warn('You lost!');
    btnReqCard.disabled = true;
    btnStopGame.disabled = true;
    cpu(playerPoints);
  } else if (playerPoints === 21) {
    console.info('That\'s great!');
    btnReqCard.disabled = true;
    btnStopGame.disabled = true;
    cpu(playerPoints);
  }
});

btnStopGame.addEventListener('click', () => {
  btnReqCard.disabled = true;
  btnStopGame.disabled = true;
  cpu(playerPoints);
});

btnNewGame.addEventListener('click', () => {
  console.clear();
  deck = [];
  deck = createDeck();
  playerPoints = 0;
  cpuPoints = 0;
  playerCount.innerHTML = 0;
  cpuCount.innerHTML = 0;
  cpuCards.innerHTML = '';
  playerCards.innerHTML = '';
  btnReqCard.disabled = false;
  btnStopGame.disabled = false;
});