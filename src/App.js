import React, { Component } from 'react';
import Header from './components/Header';
import SolvePuzzle from './components/SolvePuzzle';
import ShowPuzzles from './components/ShowPuzzles';
import Dashboard from './components/Dashboard';
import './reset.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: "show",
      currentId: 1
    }
  }

  changeView = (view) => {
    this.setState({ view })
  }

  changeId = (id) => {
    this.setState({ currentId: id })
  }

  render() {
    return (
      <div className="App">
        <Header changeView={this.changeView} />
        <main>
          {this.state.view === "show" &&
            <ShowPuzzles
              changeView={this.changeView}
              changeId={this.changeId}
              currentId={this.state.currentId}
            />
          }
          {this.state.view === "solve" &&
            <SolvePuzzle
              changeView={this.changeView}
              changeId={this.changeId}
              currentId={this.state.currentId}
            />
          }
          {this.state.view === 'dashboard' &&
            <Dashboard
              changeId={this.changeId}
              id={this.state.currentId}
              changeView={this.changeView}
            />
          }
        </main>
      </div>
    );
  }

}

export default App;
