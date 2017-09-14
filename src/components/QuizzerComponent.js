import React from 'react';
import UserData from './../UserData.js';
import QuizSummaryComponent from './QuizSummaryComponent.js';
import { constants } from './../store/store.js';
import { connect } from 'react-redux';



const CardNavigation = (props) => {
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
    console.log('CDM', this.props.match);
    if(this.props.match.url.indexOf('troublesomecards') === -1 && this.props.match.url.indexOf('newcards') === -1) {
      this.props.getSet();
    }
  }

  retakeQuiz() {
    console.log('props', this.props);
    this.props.getSet(this.props.match.params.setId);
  }

  backToSetList() {
    console.log('props', this.props);
    this.props.history.push('/');
  }

  cardClicked() {
    this.setState({
      showFront: !this.state.showFront
    });
  }

  render() {

    let cardIndex = this.props.quizzer.currentCard;

    // if (this.props.quizzer.cards[cardIndex].hasBeenAnswered === undefined) {
    //   this.props.quizzer.cards[cardIndex].hasBeenAnswered = false;
    // } else if (this.props.quizzer.cards[cardIndex].hasBeenAnswered === false) {
    //   this.props.quizzer.cards[cardIndex].hasBeenAnswered = true;
    // }

    console.log('QUIZZER PROPS', this.props.quizzer);
    console.log('cards length', this.props.quizzer.cards.length);
    var cardShower;
    var cardNavigation;
    var summary;
    var summaryNavigation;


    if (this.props.quizzer.cards !== undefined && this.props.quizzer.currentCard !== this.props.quizzer.cards.length) {
      console.log('running');
      var textToShow = this.state.showFront ? this.props.currentCard.front: this.props.currentCard.back;

      cardShower = <div>
        <div>Card count: {this.props.quizzer.cards.length}</div>
        <div>Current card:
        {this.props.quizzer.currentCard + 1}</div>
        <div>Cards Left:
        {this.props.quizzer.cards.length - this.props.quizzer.currentCard}</div>
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
        />
    }
    else {
      summary = <QuizSummaryComponent
        correct={this.props.quizzer.correctCount}
        incorrect={this.props.quizzer.incorrectCount}
        skipped={this.props.quizzer.skippedCount} />

      summaryNavigation = <div className="summary-choices">
          <div onClick={() => this.retakeQuiz()}>Quiz again</div>
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
      card.hasBeenAnsweredIncorrectly = false;
    },

    markIncorrect: (card) => {
      UserData.incrementIncorrectCountOnCard(ownProps.match.params.setId, card.id, () => {});
      dispatch({ type: constants.QUIZ_CARD_INCORRECT, card });
      if (card.hasBeenAnsweredIncorrectly) {
        card.alreadyMarkedWrong = true;
      } else {
        card.alreadyMarkedWrong = false;
      }
      card.hasBeenAnsweredIncorrectly = true;
    },

    skip: () => {
      const action = { type: constants.SKIP_CARD };
      dispatch(action);
    },

    quitQuiz: () => {
      ownProps.history.push('/');
    },

    getSet: () => {
      const cb = (set) => {
        const action = { type: constants.START_QUIZ, set: set };
        dispatch(action);
      };

      UserData.getSet(ownProps.match.params.setId, cb);
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizzerVisual);
