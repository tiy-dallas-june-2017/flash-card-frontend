import React from 'react';
import UserData from './../UserData.js';

export default class SetEditorComponent extends React.Component {

  submitSet = (evt) => {
    evt.preventDefault();
    const cb = () => this.props.history.goBack();
    UserData.createSet(this.nameInput.value, this.descriptionInput.value, cb);
  }

  editSet = (evt, setId) => {
    evt.preventDefault();
    console.log('editing set with the id of', setId);
    const cb = () => this.props.history.goBack();
    UserData.editSet(setId, this.nameInput.value, this.descriptionInput.value, cb);
  }

  render() {
    let isEditing;
    let setId = this.props.match.params.setId;
    setId !== undefined ? isEditing = true : isEditing = false;
    console.log('IS EDITING', isEditing);
    return <div className="set-editor">
      <h2>Set Editor</h2>

      <form onSubmit={isEditing ?
        (evt) => { this.editSet(evt, setId) } :
        (evt) => { this.submitSet(evt) }}>

        <input placeholder="name" ref={(input) => { this.nameInput = input; }} />

        <input placeholder="description" ref={(input) => { this.descriptionInput = input; }} />

        <button>{isEditing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  }

}
