import React from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData';
import constants from '../store/constants';

class QuizOptions extends React.Component {

  cardsIDontKnow = (setId, navigateToQuiz) => {
    let set;
    let troublesomeCards;
    const cb = (set) => {
      set = set;
      troublesomeCards = set.cards.filter((card) => {
        return (card.correctCount / (card.correctCount + card.incorrectCount) < .7);
      });
    }
    UserData.getSet(setId, (cb));
    this.props.startAnotherQuiz(set, troublesomeCards, navigateToQuiz, setId);
  }

  newCards = (setId, navigateToQuiz) => {
    let set;
    let unseenCards;
    const cb = (set) => {
      set = set;
      unseenCards = set.cards.filter((card) => {
        return (card.correctCount + card.incorrectCount < 10);
      });
    }
    UserData.getSet(setId, (cb));
    this.props.startAnotherQuiz(set, unseenCards, navigateToQuiz, setId);
  }

  render() {
    console.log('props', this.props);
    return (
      <div className={this.props.showForm ? 'outer' : 'hidden'}>
        <div className='inner'>
          <div className='close' onClick={this.props.toggleForm}>&times;</div>
          <h1>Start new quiz</h1>
          <div className='button option' onClick={this.props.navigateToQuiz}>random</div>
          <div className='button option' onClick={() => this.newCards(this.props.setId, this.props.navigateToNewCards)}>new cards</div>
          <div className='button option' onClick={() => this.cardsIDontKnow(this.props.setId, this.props.navigateToTrouble)}>cards I don't know</div>
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
    startAnotherQuiz: (set, cards, navigateToQuiz, setId) => {
      const action = { type: constants.START_QUIZ, cards };
      dispatch(action);
      console.log('set', set);
      navigateToQuiz(setId);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizOptions);
