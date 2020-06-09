import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Loginpage from './Loginpage';
import Edit from './Edit';
import Landing from './LandingPage';
import Tasks from './ViewTasks';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(){
  return(
    <Router>
      <div >
            
        <Switch>
        <Route path="/" exact component={Loginpage} />
        <Route path="/landing" component={Landing} />
        <Route path="/tasks" component={Tasks} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
