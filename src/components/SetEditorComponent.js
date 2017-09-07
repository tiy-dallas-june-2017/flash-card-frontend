import React from 'react';
import UserData from './../UserData.js';
import constants from '../store/constants';
import { connect } from 'react-redux';

class SetEditorComponent extends React.Component {

  constructor(props) {
    super(props);
  }

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
    console.log('SET EDITOR PROPS', this.props);
    let isEditing;
    let setId = this.props.match.params.setId;
    setId !== undefined ? isEditing = true : isEditing = false;
    console.log('IS EDITING', isEditing);
    return <div className="set-editor">
      <h2>Set Editor</h2>

      <form onSubmit={isEditing ?
        (evt) => { this.props.editSetFunction(evt, setId) } :
        (evt) => { this.submitSet(evt) }}>

        <input
          placeholder="name"
          ref={(input) => { this.nameInput = input; }}
          onChange={(evt) => this.props.changeInput(evt, 'name')}
          value={this.props.editSet.name} />

        <input
          placeholder="description"
          ref={(input) => { this.descriptionInput = input; }}
          onChange={(evt) => this.props.changeInput(evt, 'description')}
          value={this.props.editSet.description} />

        <button>{isEditing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  }

}

const mapStateToProps = (state) => {
  return {
    editSet: state.sets.editSet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (evt, fieldName) => {
      const action = { type: constants.CHANGE_INPUT, fieldName, value: evt.target.value };
      console.log(action);
      dispatch(action);
    },
    editSetFunction: (evt, setId) => {
      evt.preventDefault();
      console.log('clicked');
      console.log('editing set with the id of', setId);
      const cb = () => console.log('hello from the callback');
      UserData.editSet(setId, 'title', 'description', cb);
      const action = { type: constants.ADD_EDIT_SET,  }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetEditorComponent);
