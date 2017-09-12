import constants from './constants.js';

const initialState = {
  list: [],
  sortSetsBy: 'name',
  setEditName: '',
  setEditDescription: '',
  editSet: { id: '', description: '', name: '', cards: [] },
  editCard: { id: '', front: '', back: '' },
  sortedByName: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_SETS:
      return Object.assign({}, state, { list: action.sets });
    case constants.CHANGE_SORT:
      let copy = state.list.slice();
      if (action.sort === 'name') {
        copy.sort((a, b) => { return a.name.toUpperCase() > b.name.toUpperCase(); });
        return Object.assign({}, state, { list: copy, sortSetsBy: action.sort, sortedByName: true })
      }
      else {
        copy.sort((a, b) => { return a.cards.length < b.cards.length; });
        return Object.assign({}, state, { list: copy, sortSetsBy: action.sort, sortedByName: false });
      }
    case constants.ADD_EDIT_SET:
      return Object.assign({}, state, { editSet: action.set });
    case constants.CHANGE_INPUT:
      const fieldName = action.fieldName;
      const updateObject = { id: action.id };
      updateObject[fieldName] = action.value;
      return Object.assign({}, state, { editSet: Object.assign({}, state.editSet, updateObject) });
    case constants.UPDATE_DATA:
      const editSet = { id: '', description: '', name: '' }
      return Object.assign({}, state, { editSet });
    case constants.ADD_EDIT_CARD:
      let editCard = { id: action.card.id, front: action.card.front, back: action.card.back };
      return Object.assign({}, state, { editCard });
    case constants.CHANGE_CARD_INPUT:
      const inputValue = action.value;
      const inputType = action.input;
      editCard = {};
      editCard[inputType] = inputValue;
      return Object.assign({}, state, { editCard: Object.assign({}, state.editCard, editCard) });
    case constants.DELETE_CARD:
      console.log('HELLO FROM THE DELETE CARD REDUCER FUNCTION');
      let set = state.list.find((set) => {
        return set.id === action.setId;
      });
      const indexOfSet = state.list.indexOf(set);
      const card = set.cards.find((card) => {
        return card.id === action.cardId;
      });
      let indexOfCard = set.cards.indexOf(card);
      console.log('CARD INDEX IS ', indexOfCard, 'SET INDEX IS', indexOfSet);
      set.cards.splice(indexOfCard, 1);
      const newList = state.list.slice();
      newList.splice(indexOfSet, 1, set);
      return Object.assign({}, state, {list: newList});
    case constants.POPULATE_EDIT_FORM:
      let currentSet = state.list.find((set) => {
        return set.id === action.setId;
      });
      console.log('THIS IS THE SET', currentSet);
      return Object.assign({}, state, { editSet: currentSet });
    default:
      return state;
  }
}

export default reducer
