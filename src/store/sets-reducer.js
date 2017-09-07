import constants from './constants.js';

const initialState = {
  list: [],
  sortSetsBy: 'name',
  setEditName: '',
  setEditDescription: '',
  editSet: { id: '', description: '', name: '', cards: [] },
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
    case constants.ADD_EDIT_SET:
      return Object.assign({}, state, { editSet: action.set });
    case constants.CHANGE_INPUT:
      const fieldName = action.fieldName;
      const updateObject = { editSet: { id: action.id } };
      updateObject[fieldName] = action.value;
      return Object.assign({}, state, { editSet: updateObject });
    case 'UPDATE_DATA':
      console.log('HELLO FROM UPDATE DATA');
      const emptyEditObj = { description: '', name: '', cards: [] }
      return Object.assign({}, state, { editSet: emptyEditObj });
    default:
      return state;
  }
}

export default reducer
