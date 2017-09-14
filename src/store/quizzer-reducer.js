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
  console.log('quizzer reducer running', action);
  console.log('type of cards', action.cards);
  switch (action.type) {
    case constants.START_QUIZ:
      console.log('THE START QUIZ ACTIONS IS', action);
      let shuffledCards = action.set !== undefined ? _.shuffle(action.set.cards.slice(0))
       :
      _.shuffle(action.cards.slice(0));
      console.log('SHUFFLED CARDS', shuffledCards);
      // let shuffledCards = _.shuffle(action.set.cards.slice(0));
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
      case constants.START_TROUBLESOME_QUIZ:
        console.log('THE START QUIZ ACTIONS IS', action);
        shuffledCards = _.shuffle(action.cards.slice(0));
        console.log('SHUFFLED CARDS', shuffledCards);
        // let shuffledCards = _.shuffle(action.set.cards.slice(0));
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
      let incrementBy = action.card.hasBeenAnsweredIncorrectly ? 1 : 0;
      // console.log('cards left', cardsLeft);
      if (cardsLeft <= 3) {
        console.log('less than three cards and increment by', incrementBy);
        return Object.assign({}, state, {
          currentCard: state.currentCard + 1,
          // wrong: state.wrong + 1,
          cardsCopy: cardsCopy.push(state.cards[state.currentCard]),
          incorrectCount: state.incorrectCount + incrementBy
        });
      } else {
        console.log('more than three cards and increment by ', incrementBy);
        return Object.assign({}, state, {
          currentCard: state.currentCard + 1,
          // wrong: state.wrong + 1,
          cardsCopy: cardsCopy.splice(state.currentCard + 3, 0, state.cards[state.currentCard]),
          incorrectCount: state.incorrectCount + incrementBy
        });
      }
    case constants.SKIP_CARD:
      return Object.assign({}, state, {currentCard: state.currentCard + 1, skippedCount: state.skippedCount + 1});
    default:
      return state;
  }
}

export default reducer;
