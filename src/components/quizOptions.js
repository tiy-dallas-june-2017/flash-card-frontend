import React from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData';

class QuizOptions extends React.Component {

  cardsIDontKnow = (setId) => {
    const cb = (set) => {
      let troublesomeCards = set.cards.filter((card) => {
        return (card.correctCount / (card.correctCount + card.incorrectCount) < .7);
      })
      console.log('Troublesome Cards Array', troublesomeCards);
    }
    UserData.getSet(setId, (cb));
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
          <div className='button option' onClick={() => this.cardsIDontKnow(this.props.setId)}>cards I don't know</div>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizOptions);
