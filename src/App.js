import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import SetListComponent from './components/SetListComponent.js';
import SetEditorComponent from './components/SetEditorComponent.js';
import SetDetailComponent from './components/SetDetailComponent.js';
import CardEditorComponent from './components/CardEditorComponent.js';
import QuizzerComponent from './components/QuizzerComponent.js';

import './scss/start.css';

export default class App extends Component {

  render() {
    return (

      <Provider store={store}>
        <Router>
          <div className="app">
            <header>
              <h1><Link to="/">A Flash Card App</Link></h1>
            </header>
            <div className="main-content">
              <div>
                <Route path="/" exact component={SetListComponent} />
                <Route path="/create-set" component={SetEditorComponent} />
                <Route path="/set/:setId" exact component={SetDetailComponent} />
                <Route path="/set/:setId/newcard" component={CardEditorComponent} />
                <Route path="/set/:setId/quizzer" component={QuizzerComponent} />
                <Route path="/set/:setId/edit" component={SetEditorComponent} />
                <Route path="/set/:setId/cardedit/:cardId" component={CardEditorComponent} />
              </div>
            </div>
            <footer>
              This is a sample app for the Dallas Iron Yard React Course
            </footer>
          </div>
        </Router>
      </Provider>



    );
  }
}
