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
    case 'UPDATE_DATA':
      console.log('HELLO FROM UPDATE DATA');
      const editSet = { id: '', description: '', name: '', cards: [] }
      return Object.assign({}, state, { editSet });
    case constants.ADD_EDIT_CARD:
      console.log('HELLO FROM ADD EDIT CARD', action.card);
      let editCard = { id: action.card.id, front: action.card.front, back: action.card.back };
      return Object.assign({}, state, { editCard });
    case constants.CHANGE_CARD_INPUT:
      const inputValue = action.value;
      const inputType = action.input;
      editCard = {};
      editCard[inputType] = inputValue;
      return Object.assign({}, state, { editCard: Object.assign({}, state.editCard, editCard) });
    default:
      return state;
  }
}

export default reducer
