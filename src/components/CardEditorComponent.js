import React from 'react';
import UserData from './../UserData.js';

export default class CardEditorComponent extends React.Component {

  submitCard(evt) {
    evt.preventDefault();

    var cb = () => {
      this.props.history.goBack();
    };

    UserData.addCardToSet(this.props.match.params.setId, this.frontInput.value, this.backInput.value, cb);
  }

  submitAndAddAnotherCard(evt) {
    evt.preventDefault();

    var cb = () => {
      console.log("props?", this.props.match.params.setId)
      console.log("props set id", this.props.setId)
      this.props.history.push(`/set/${this.props.match.params.setId}/newcard`);
    };
    UserData.addCardToSet(this.props.match.params.setId, this.frontInput.value, this.backInput.value, cb);
  }

  render() {
    return <div className="card-editor">
      <h2>The Card Editor</h2>

      <form>
        <input placeholder="front" ref={(input) => {this.frontInput = input; }} />
        <input placeholder="back" ref={(input) => {this.backInput = input; }} />
      </form>

      <button onClick={(evt) => this.submitCard(evt)}>Save</button>
      <button onClick={(evt) => this.submitAndAddAnotherCard(evt)}>Save This One and Add Another</button>

    </div>;
  }

}
