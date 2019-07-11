import React, { Component } from 'react';
import Header from './components/Header';
import ShowPuzzles from './components/ShowPuzzles';
import './reset.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <ShowPuzzles />
      </div>
    );
  }

}

export default App;
