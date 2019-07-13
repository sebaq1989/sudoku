import React, { Component } from 'react';
import Board from './Board';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            dashView: 'bookmarked'
        }
    }

    componentDidMount = () => {
        axios.get('/api/user').then(response => {
            let puzzlesArray = [...response.data];
            console.log(puzzlesArray)
            puzzlesArray.map((el, ind) => {
                let puzzleBoard = [[], [], [], [], [], [], [], [], []];
                el.board.map((e, i) => {
                    return e.map((element, index) => {
                        if (element === 0) {
                            return puzzleBoard[i][index] = { value: 0, isEditable: true }
                        } else {
                            return puzzleBoard[i][index] = { value: element, isEditable: false }
                        }
                    })
                })
                return puzzlesArray[ind].board = puzzleBoard;
            })
            this.setState({ user: puzzlesArray })
        }).catch(error => console.log(error));
    }

    changeDashView = (view) => {
        this.setState({ dashView: view })
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <section className="dashTabs">
                    <button
                        className={this.state.dashView === 'bookmarked' ? "tab" : "tab unfocusedTab"}
                        onClick={() => this.changeDashView('bookmarked')}>
                        Bookmarked Puzzles
                    </button>
                    <button
                        className={this.state.dashView === 'solved' ? "tab" : "tab unfocusedTab"}
                        onClick={() => this.changeDashView('solved')}>
                        Solved Puzzles
                    </button>
                </section>
                <section id="dashboard">
                    {this.state.user.map((element, index) => {
                        return element[this.state.dashView] &&
                            (
                                <div key={Math.floor(Math.random() * 777)} className="solved-bookmarked">
                                    <Board
                                        displayOnly={true}
                                        board={element.board}
                                        id={element.id}
                                        key={element.id}
                                    />
                                    <div key={Math.floor(Math.random() * 7777)} className="dashboardContent">
                                        <h2>Bookmarked Puzzle #{index + 1}</h2>
                                        <h4>{'Added on ' + element.date + ' at ' + element.time}</h4>
                                        <div className="dashButtons">
                                            <button>Solve it now</button>
                                            <button>Remove bookmark</button>
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
                </section>
            </div>
        )
    }
}

export default Dashboard;