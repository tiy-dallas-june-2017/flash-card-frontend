import { createStore, combineReducers } from 'redux';
import quizzerReducer from './quizzer-reducer.js';
import setsReducer from './sets-reducer.js';
import constants from './constants';

const reducer = combineReducers({
  sets: setsReducer,
  quizzer: quizzerReducer
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export {
  store,
  constants
};
