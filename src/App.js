import React from 'react';
import logo from './flip-flip-blk.svg';
import './App.css';

//COMPONENTS
import NewTask from './components/createnewtask';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1 className="title">Action Items</h1>
      <br/>

      <NewTask />

      <p className="tasks">Tasks</p>

    </div>
  );
}

export default App;