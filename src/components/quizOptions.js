import React from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData';
import constants from '../store/constants';
import { Link } from 'react-router-dom';

class QuizOptions extends React.Component {

  cardsIDontKnow = (setId, navigateToQuiz) => {
    let set;
    let troublesomeCards;
    const cb = (set) => {
      set = set;
      troublesomeCards = set.cards.filter((card) => {
        return (card.correctCount / (card.correctCount + card.incorrectCount) < .7);
      })
      console.log('Troublesome Cards Array', troublesomeCards);
    }
    UserData.getSet(setId, (cb));
    this.props.startTroublesomeQuiz(set, troublesomeCards, navigateToQuiz, setId);
  }

  render() {
    console.log('props', this.props);
    return (
      <div className={this.props.showForm ? 'outer' : 'hidden'}>
        <div className='inner'>
          <div className='close' onClick={this.props.toggleForm}>&times;</div>
          <h1>Start new quiz</h1>
          <div className='button option' onClick={this.props.navigate}>random</div>
          <div className='button option'>new cards</div>
          <Link
            className="button option"
            onClick={() => this.cardsIDontKnow(this.props.setId, this.props.navigate)}
            to={`/set/${this.props.setId}/quizzer/troublesomeCards`}>cards I don't know</Link>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    set: state.sets.set
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    printSet: (setId) => console.log(setId),
    startTroublesomeQuiz: (set, cards, navigateToQuiz, setId) => {
      const action = { type: constants.START_TROUBLESOME_QUIZ, set: undefined, cards };
      console.log('THE ACTION BEFORE DISATCH IS', action);
      dispatch(action);
      // console.log('set', set);
      navigateToQuiz(setId);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizOptions);
