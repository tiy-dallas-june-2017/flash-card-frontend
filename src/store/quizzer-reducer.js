import _ from 'lodash';
import constants from './constants.js';

const initialState = {
  currentCard: 0,
  correctCount: 0,
  incorrectCount: 0,
  skippedCount: 0,
  cards: [],
  set: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.START_QUIZ:
      let shuffledCards = _.shuffle(action.set.cards.slice(0));
      var sliceEnd = 10;
      if (shuffledCards.length < 10) {
        sliceEnd = shuffledCards.length;
      }
      shuffledCards = shuffledCards.slice(0, sliceEnd);
      return Object.assign({}, state, {
        cards: shuffledCards,
        set: action.set,
        currentCard: 0,
        correctCount: 0,
        incorrectCount: 0,
        skippedCount: 0
      });
    case constants.QUIZ_CARD_CORRECT:
      return Object.assign({}, state, {
        currentCard: state.currentCard + 1,
        correctCount: state.correctCount + 1
      });
    case constants.QUIZ_CARD_INCORRECT:
      let cardsCopy = state.cards;
      // console.log('copy', cardsCopy);
      let cardsLeft = cardsCopy.length - state.currentCard;
      // console.log('cards left', cardsLeft);
      if (cardsLeft <= 3) {
        return Object.assign({}, state, {
          currentCard: state.currentCard + 1,
          wrong: state.wrong + 1,
          cardsCopy: cardsCopy.push(state.cards[state.currentCard])
        });
      } else {
        return Object.assign({}, state, {
          currentCard: state.currentCard + 1,
          wrong: state.wrong + 1,
          cardsCopy: cardsCopy.splice(state.currentCard + 3, 0, state.cards[state.currentCard])
        });
      }
    case constants.SKIP_CARD:
      return Object.assign({}, state, {currentCard: state.currentCard + 1, skippedCount: state.skippedCount + 1});
    default:
      return state;
  }
}

export default reducer;
