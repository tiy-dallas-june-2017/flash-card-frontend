import { store, constants } from './store/store.js';

const URL = 'http://localhost:5003';
var userData;
const noop = () => {};

let UserData = {

  // Sets

  loadSets(cb) {

    if (cb === undefined) {
      cb = noop;
    }

    fetch(`${URL}/api/sets`)
      .then((response) => response.json())
      .then((data) => {
        const action = { type: constants.LOAD_SETS, sets: data.sets };
        store.dispatch(action);

        userData = data;
        cb(data)
      });
  },

  getSet: (setId, cb) => {

    let callback = cb || noop;

    var setExists = () => {
      var set = userData.sets.find((x) => { return x.id === setId});
      callback(set);
    };

    if (userData === undefined) {
      UserData.loadSets(setExists);
    }
    else {
      setExists();
    }
  },

  createSet(name, description, cb) {
    fetch(`${URL}/api/sets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description
      })
    })
    .then(() => cb());
  },

  editSet(setId, name, description, cb) {

    const url = `${URL}/api/sets/${setId}`;
    const newObject = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description
      })
    };

    fetch(url, newObject).then(cb());
  },

  deleteSet: (setId, cb) => {

    fetch(`${URL}/api/sets/${setId}`, {
      method: 'DELETE'
    })
    .then(() => cb());

  },



  // Cards

  addCardToSet: (setId, front, back, cb) => {

    fetch(`${URL}/api/sets/${setId}/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        setId: setId,
        front: front,
        back: back
      })
    })
    .then(() => UserData.loadSets(cb));
  },

  deleteSingleCard: (setId, cardId, cb) => {

    fetch(`${URL}/api/sets/${setId}/card/${cardId}`, {
      method: 'PUT'
    })
    .then(() => cb());

  },


  incrementIncorrectCountOnCard: (setId, cardId) => {
    var set = userData.sets.find((x) => { return x.id === setId });
    // We have to find the position to update the server correctly.
    // We need the card to update the correct count in memory.
    var position;
    var card;
    set.cards.forEach((x, index) => {
      if (x.id === cardId) {
        card = x;
        position = index;
      }
    });

    card.incorrectCount += 1;

    return fetch(`${URL}/api/sets/${setId}/card/${position}/incorrect`, {
      method: 'POST'
    });

  },

  incrementCorrectCountOnCard: (setId, cardId) => {

    var set = userData.sets.find((x) => { return x.id === setId });

    // We have to find the position to update the server correctly.
    // We need the card to update the correct count in memory.
    var position;
    var card;
    set.cards.forEach((x, index) => {
      if (x.id === cardId) {
        card = x;
        position = index;
      }
    });

    card.correctCount += 1;

    return fetch(`${URL}/api/sets/${setId}/card/${position}/correct`, {
      method: 'POST'
    });


  }

};

export default UserData;
