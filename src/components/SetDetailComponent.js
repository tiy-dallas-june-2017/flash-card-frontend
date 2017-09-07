import React from 'react'
import UserData from './../UserData.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SetDetailVisual extends React.Component {

  componentDidMount() {
    this.props.getSet();
  }

  deleteSingleCard(card, setId) {
    const cb = this.props.history.goBack();
    const cardId = card.id;
    UserData.deleteSingleCard(setId, cardId, cb)
  }

  render() {
    let currentSet = this.props.sets.list.find((x) => x.id === this.props.match.params.setId);
    const setId = this.props.match.params.setId;

    if (currentSet === undefined) {
      return <div>No set</div>
    }

    var cardList;
    if (currentSet.cards.length === 0) {
      cardList = <div>You have no cards.</div>
    }
    else {
      cardList = <ul className="card-list">
        {currentSet.cards.map((card) => {
          return <li key={card.id} className="card">
            <div className="front">{card.front}</div>
            <div className="back">{card.back}</div>
            <div className="stats">Correct: {card.correctCount} Incorrect: {card.incorrectCount}</div>
            <button onClick={() => this.deleteSingleCard(card, setId)}>DESTROY</button>
          </li>
        })}
      </ul>;
    }

    let quizzerLink = null;
    if (currentSet.cards.length > 0) {
      quizzerLink = <li><Link to={'/set/' + this.props.match.params.setId + '/quizzer'}>Quizzer</Link></li>
    }

    return (
      <div className="set-detail-component">
        <h2>Set: {currentSet.name}</h2>
        <h3>{currentSet.description}</h3>

        <div className="controls">
          <ul>
            <li><Link to={'/set/' + this.props.match.params.setId + '/newcard'}>Add a New Card</Link></li>
            {quizzerLink}
          </ul>


        </div>

        {cardList}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    sets: state.sets
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSet: () => {
      UserData.getSet(ownProps.match.params.setId);
    },
    deleteSingleCard: () => {
        console.log('at dispatchtoprops delete card');
        UserData.deleteSingleCard(ownProps.match.params.cardId);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetDetailVisual);
