let deck = [];
const french_suits = ['C', 'D', 'H', 'S'];
const court_cards = ['A', 'Q', 'J', 'K'];

const createDeck = () => {

  for (let index = 2; index <= 10; index++) {
    for (let french_suit of french_suits) {
      deck.push(index + french_suit);
    }
  }

  for (let french_suit of french_suits) {
    for (let court_card of court_cards) {
      deck.push(court_card + french_suit);
    }
  }

  return deck
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

createDeck();

const requestCard = () => {

  if (deck.length === 0) {
    throw 'There are no cards in the deck.';
  }

  return deck.pop();
};

requestCard();

console.log(deck.length);