import React from 'react';
import UserData from './../UserData.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { constants } from './../store/store.js';
import QuizOptions from './quizOptions.js';


class SetListVisual extends React.Component {

  state = {
    showForm: false,
    setId: null
  }

  componentDidMount() {
    this.props.loadSets();
  }

  showQuizOptionsDiv = (setId) => {
    console.log('setId', setId);
    this.setState({
      showForm: !this.state.showForm,
      setId
    });
  }

  render() {
    var noSetsSorting;
    var noSetsMessaging;
    if (this.props.sets.length === 0) {
      noSetsMessaging = <p>You do not have any sets! Create one.</p>
      noSetsSorting = <p></p>
    } else {
      let sortingClass;
      if (this.props.sortedByName === true) {
        sortingClass = 'sorting sorting-by-name';
      } else if (this.props.sortedByName === false) {
        sortingClass = 'sorting sorting-by-card-count';
      } else {
        sortingClass = 'sorting';
      }
      noSetsSorting = <div className={sortingClass}>
        <div className="by-name" onClick={() => this.props.sortByName()}>by name</div>
        <div className="by-card-count" onClick={() => this.props.sortByCardCount()}>by # of cards</div>
      </div>
    }



    return (
      <div className="set-list">
        <h2>Set List</h2>

        <Link to="/create-set" className="create-set">Create new set</Link>

        {noSetsMessaging}
        {noSetsSorting}

        <ul>
        {this.props.sets.map((set, index) => {
          let startQuiz;
          if (set.cards.length > 10) {
            startQuiz = <div className='button quiz' onClick={() => this.showQuizOptionsDiv(set.id)}>quiz</div>
          } else if (set.cards.length > 0) {
            startQuiz = <div className='button quiz' onClick={() => {this.props.navigateToQuiz(set.id)}}>quiz</div>
          } else {
            startQuiz = null;
          }
          return (
            <li key={set.id} className="set">
              <div className="set-name">{set.name}</div>
              <div className="number-of-cards"># of cards: {set.cards.length}</div>
              <p>{set.description}</p>
              <Link
                className="button edit-set"
                to={`/set/${set.id}/edit`}
                onClick={() => this.props.addEditSet(set)}>edit</Link>
              <div className="button delete-set" onClick={() => {this.props.deleteSet(set.id)}}>delete</div>
              <div className="button view-set" onClick={() => {this.props.viewSet(set.id)}}>view set</div>
              {startQuiz}
            </li>
          )
        })}
        </ul>
        <QuizOptions toggleForm={this.showQuizOptionsDiv} showForm={this.state.showForm} setId={this.state.setId}/>
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
    sortedByName: state.sets.sortedByName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sortByName: () => dispatch({ type: constants.CHANGE_SORT, sort: 'name' }),
    sortByCardCount: () => dispatch({ type: constants.CHANGE_SORT, sort: 'cardCount' }),
    loadSets: () => {
      UserData.loadSets((data) => dispatch({ type: constants.LOAD_SETS, sets: data.sets }))
    },
    addEditSet: (set) => {
      const action = { type: constants.ADD_EDIT_SET, set };
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
    navigateToQuiz: (setId) => ownProps.history.push('/set/' + setId + '/quizzer'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetListVisual);
