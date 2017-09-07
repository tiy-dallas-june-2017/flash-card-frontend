import React from 'react';
import UserData from './../UserData.js';
import QuizSummaryComponent from './QuizSummaryComponent.js';
import { constants } from './../store/store.js';
import { connect } from 'react-redux';



const CardNavigation = (props) => {
  console.log('yo', props)
  return (
    <div className="card-navigation">
      <div className="correct" onClick={() => { props.markCorrect(props.currentCard);} }>Correct</div>
      <div className="incorrect" onClick={() => { props.markIncorrect(props.currentCard);} }>Incorrect</div>
      <div className="skip" onClick={props.skip}>Skip</div>
      <div className='quit-quiz' onClick={props.quitQuiz}>Quit Quiz</div>
    </div>
  );
}


class QuizzerVisual extends React.Component {

  constructor() {
    super();

    this.state = {
      showFront: true
    }
  }

  componentDidMount() {
    this.props.getSet();
  }

  backToSetList() {
    this.props.history.push('/');
  }

  cardClicked() {
    this.setState({
      showFront: !this.state.showFront
    });
  }

  render() {
    var cardShower;
    var cardNavigation;
    var summary;
    var summaryNavigation;

    if (this.props.quizzer.cards !== undefined && this.props.quizzer.currentCard !== this.props.quizzer.cards.length) {
      var textToShow = this.state.showFront ? this.props.currentCard.front: this.props.currentCard.back;

      cardShower = <div>
        <div>Card count: {this.props.quizzer.cards.length}</div>
        <div
          className="card"
          onClick={(evt) => { this.cardClicked(evt); }}>
          {textToShow}</div>
      </div>

      cardNavigation = <CardNavigation
        currentCard={this.props.currentCard}
        markCorrect={this.props.markCorrect}
        markIncorrect={this.props.markIncorrect}
        skip={this.props.skip}
        quitQuiz={this.props.quitQuiz}
        backToSetList={this.props.backToSetLists}
        />
    }
    else {
      summary = <QuizSummaryComponent
        correct={this.props.quizzer.correctCount}
        incorrect={this.props.quizzer.incorrectCount}
        skipped={this.props.quizzer.skippedCount} />

      summaryNavigation = <div className="summary-choices">
          <div>Quiz again</div>
          <div onClick={() => this.backToSetList()}>Back to set list</div>
        </div>;
    }

    return (
      <div className="quizzer">
        <h2>The Quizzer</h2>

        {summary}
        {summaryNavigation}
        {cardShower}
        {cardNavigation}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentCard: state.quizzer.cards[state.quizzer.currentCard],
    quizzer: state.quizzer
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    markCorrect: (card) => {
      UserData.incrementCorrectCountOnCard(ownProps.match.params.setId, card.id);
      dispatch({ type: constants.QUIZ_CARD_CORRECT });
    },

    markIncorrect: (card) => {
      UserData.incrementIncorrectCountOnCard(ownProps.match.params.setId, card.id, () => {});
      dispatch({ type: constants.QUIZ_CARD_INCORRECT });
    },

    skip: () => {
      const action = { type: 'SKIP_CARD' };
      dispatch(action);
    },

    quitQuiz: () => {
<<<<<<< HEAD
      const action = { type: 'QUIT'};
      dispatch(action);
    },
    backToSetList() {
      this.props.history.push('/');
=======
      ownProps.history.push('/');
>>>>>>> 4cc8fb748853876a67e72b586445a5572a4c1ce8
    },


    getSet: () => {
      const cb = (set) => {
        const action = { type: constants.START_QUIZ, set: set };
        dispatch(action);
      };

      UserData.getSet(ownProps.match.params.setId, cb);
    },

    skip: () => {
      const action = { type: 'SKIP_QUESTION' };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizzerVisual);
