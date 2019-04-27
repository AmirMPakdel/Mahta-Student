import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch, Redirect } from 'react-router-dom';
import NeedAuth from './auth/NeedAuth';
import './App.css';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import SignUpPage1 from './pages/SignUp1';
import SignUpPage2 from './pages/SignUp2';
import My404Page from './pages/My404Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Router>

          <Switch>
            <Route exact path="/" component={NeedAuth(HomePage)}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup/step1" component={SignUpPage1}/>
            <Route exact path="/signup/step2" component={SignUpPage2}/>
            <Route component={My404Page}/>
          </Switch>
          
        </Router>
        </header>
      </div>
    );
  }
}

export default App;
