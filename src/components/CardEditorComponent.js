import React from 'react';
import UserData from './../UserData.js';

import { connect } from 'react-redux';
import constants from '../store/constants';

class CardEditorComponent extends React.Component {

  submitCard(evt) {
    evt.preventDefault();

    var cb = () => {
      this.props.history.goBack();
      this.props.updateData();
    };

    UserData.addCardToSet(this.props.match.params.setId, this.frontInput.value, this.backInput.value, cb);
  }

  editCard = (evt) => {
    evt.preventDefault();

    var cb = () => {
      this.props.updateData();
      this.props.history.goBack();
    };

    UserData.editCardOfSet(this.props.match.params.setId, this.props.match.params.cardId, this.frontInput.value, this.backInput.value, cb);
    this.props.updateData();
  }

  submitAndAddAnotherCard(evt) {
    evt.preventDefault();

    var cb = () => {
      this.frontInput.value = '';
      this.backInput.value = '';
    };
    UserData.addCardToSet(this.props.match.params.setId, this.frontInput.value, this.backInput.value, cb);

  }

  render() {
    const cardEditing = this.props.match.params.cardId ? true : false;
    console.log('Editing Card?', cardEditing);
    console.log('THESE PROPS YO!', this.props);
    return <div className="card-editor">
      <h2>The Card Editor</h2>

      <form onSubmit={ cardEditing ? (evt) => this.editCard(evt) : (evt) => this.submitCard(evt) }>

        <input
          placeholder="front"
          ref={(input) => {this.frontInput = input; }}
          onChange={(evt) => this.props.handleInputChange(evt, 'front')}
          value={this.props.editCard.front} />

        <input
          placeholder="back"
          ref={(input) => {this.backInput = input; }}
          onChange={(evt) => this.props.handleInputChange(evt, 'back')}
          value={this.props.editCard.back} />

        <button>Save</button>

      </form>

      <button onClick={(evt) => this.submitCard(evt)}>Save</button>
      <button onClick={(evt) => this.submitAndAddAnotherCard(evt)}>Save This One and Add Another</button>

    </div>;
  }

}

const mapStateToProps = (state) => {
  return {
    editCard: state.sets.editCard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (evt, input) => {
      const action = { type: constants.CHANGE_CARD_INPUT, value: evt.target.value ,input }
      dispatch(action);
    },
    updateData: () => {
      console.log('UPDATE DATA');
      const action = { type: constants.UPDATE_DATA };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEditorComponent);
