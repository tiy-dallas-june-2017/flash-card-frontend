import constants from './constants.js';

const initialState = {
  list: [],
  sortSetsBy: 'name',
  setEditName: '',
  setEditDescription: ''
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_SETS:
      return Object.assign({}, state, { list: action.sets });
    case constants.CHANGE_SORT:

      let copy = state.list.slice();
      if (action.sort === 'name') {
        copy.sort((a, b) => { return a.name > b.name; });
      }
      else {
        copy.sort((a, b) => { return a.cards.length < b.cards.length; });
      }
      return Object.assign({}, state, { list: copy, sortSetsBy: action.sort });
    default:
      return state;
    case constants.DELETE_SINGLE_CARD:
    fetch
      return Object.assign({}, state, { list: action.card })
  }
}

export default reducer
