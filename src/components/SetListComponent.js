import React from 'react';
import UserData from './../UserData.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { constants } from './../store/store.js';


class SetListVisual extends React.Component {

  componentDidMount() {
    this.props.loadSets();
  }

  render() {
    var noSetsMessaging;
    if (this.props.sets.length === 0) {
      noSetsMessaging = <p>You do not have any sets! Create one.</p>
    }

    return (
      <div className="set-list">
        <h2>Set List</h2>

        {noSetsMessaging}

        <Link to="/create-set" className="create-set">Create new set</Link>

        <div className="sorting">
          <div className="by-name" onClick={() => this.props.sortByName() }>by name</div>
          <div className="by-card-count" onClick={() => this.props.sortByCardCount() }>by # of cards</div>
        </div>

        <ul>
        {this.props.sets.map((set, index) => {
          if (set.cards.length !== 0) {
            return (
              <li key={set.id} className="set">
                <div className="set-name">{set.name}</div>
                <div className="number-of-cards"># of cards: {set.cards.length}</div>
                <p>{set.description}</p>
                <Link className="button edit-set" to={`/set/${set.id}/edit`}>edit</Link>
                <div className="button delete-set" onClick={() => {this.props.deleteSet(set.id)}}>delete</div>
                <div className="button view-set" onClick={() => {this.props.viewSet(set.id)}}>view set</div>
                <div className="button quiz" onClick={() => {this.props.navigateToQuiz(set.id)}}>quiz</div>
              </li>
            )
          } else {
            return (
              <li key={set.id} className="set">
                <div className="set-name">{set.name}</div>
                <div className="number-of-cards"># of cards: {set.cards.length}</div>
                <p>{set.description}</p>
                <Link className="button edit-set" to={`/set/${set.id}/edit`}>edit</Link>
                <div className="button delete-set" onClick={() => {this.props.deleteSet(set.id)}}>delete</div>
                <div className="button view-set" onClick={() => {this.props.viewSet(set.id)}}>view set</div>
              </li>
            )
          }
        })}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    sets: state.sets.list,
    sortBy: state.sets.sortSetsBy,
    editSet: state.sets.editSet,
    forceRerender: state.forceRerender,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sortByName: () => dispatch({ type: constants.CHANGE_SORT, sort: 'name' }),
    sortByCardCount: () => dispatch({ type: constants.CHANGE_SORT, sort: 'cardCount' }),
    loadSets: () => {
      console.log('LOAD SETS');
      UserData.loadSets((data) => dispatch({ type: constants.LOAD_SETS, sets: data.sets }))
    },
    addEditSet: (set) => {
      const action = { type: 'ADD_EDIT_SET', set };
      console.log('action=====================', action);
      dispatch(action);
    },
    editSet: (setId) => {
      UserData.editSet((data) => dispatch({ type: constants.EDIT_SET, sets: data.sets }))
    },
    deleteSet: (setId) => UserData.deleteSet(setId, () => {
      UserData.loadSets((data) => dispatch({ type: constants.LOAD_SETS, sets: data.sets }))
    }),
    viewSet: (setId) => ownProps.history.push('/set/' + setId),
    navigateToQuiz: (setId) => ownProps.history.push('/set/' + setId + '/quizzer')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetListVisual);
