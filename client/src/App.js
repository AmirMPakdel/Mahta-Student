import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch, Redirect } from 'react-router-dom';
import NeedAuth from './auth/NeedAuth';
import './App.css';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import SignUpPage from './pages/SignUp';
import My404Page from './pages/My404Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Router>

          <Switch>
            <Route exact path="/" component={NeedAuth(HomePage, null)}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route component={My404Page}/>
          </Switch>
          
        </Router>
        </header>
      </div>
    );
  }
}

export default App;
