import React from 'react';

export default class QuizOptions extends React.Component {


  render() {
    console.log('props', this.props);
    return (
      <div className={this.props.showForm ? 'outer' : 'hidden'}>
        <div className='inner'>
          <div className='close' onClick={this.props.toggleForm}>&times;</div>
          <h1>Start new quiz</h1>
          <div className='button option'>random</div>
          <div className='button option'>new cards</div>
          <div className='button option'>cards I don't know</div>
        </div>
      </div>
    )
  }
}
