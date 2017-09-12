import React from 'react';
import UserData from './../UserData.js';
import constants from '../store/constants';
import { connect } from 'react-redux';

class SetEditorComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UserData.loadSets(() => {
      // this.props.populateEditForm();
      this.props.populateEditForm(this.props.match.params.setId);
    });
  }

  submitSet = (evt) => {
    evt.preventDefault();
    const cb = () => this.props.history.goBack();
    UserData.createSet(this.nameInput.value, this.descriptionInput.value, cb);
    this.props.updateData();
  }

  editSet = (evt, setId) => {
    evt.preventDefault();
    console.log('editing set with the id of', setId);
    const cb = () => {
      this.props.history.goBack();
    };
    UserData.editSet(setId, this.nameInput.value, this.descriptionInput.value, cb);
    this.props.updateData();
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
        (evt) => { this.editSet(evt, setId) } :
        (evt) => { this.submitSet(evt) }}>

        <input
          placeholder="name"
          ref={(input) => { this.nameInput = input; }}
          onChange={(evt) => this.props.changeInput(evt, 'name', setId)}
          value={this.props.editSet.name} />

        <textarea
          placeholder="description"
          ref={(input) => { this.descriptionInput = input; }}
          onChange={(evt) => this.props.changeInput(evt, 'description', setId)}
          value={this.props.editSet.description}></textarea>

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
    changeInput: (evt, fieldName, setId) => {
      const action = { type: constants.CHANGE_INPUT, fieldName, value: evt.target.value, id: setId };
      dispatch(action);
    },
    populateEditForm: (setId) => {
      console.log('yo from the populate edit form function');
      const action = { type: constants.POPULATE_EDIT_FORM, setId };
      dispatch(action);
    },
    updateData: () => {
      const action = { type: constants.UPDATE_DATA };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetEditorComponent);
