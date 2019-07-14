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
            if (response.data.length > 0) {
                this.puzzleMapper(response.data);
            }
        }).catch(error => console.log(error));
    }

    puzzleMapper = (data) => {
        let puzzlesArray = [...data];
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
    }

    changeDashView = (view) => {
        this.setState({ dashView: view })
    }

    removeBookmark = (id) => {
        // let puzzle = this.state.user[id];
        // console.log(puzzle)
        // puzzle.board.map(e => e = e.value);
        // puzzle.bookmarked = false;
        // console.log(puzzle)
        axios.delete(`/api/user/${id}`).then(response => {
            this.puzzleMapper(response.data);
            this.setState({ user: response.data })
        }).catch(error => console.log(error))
    }

    solveBookmarked = (id) => {
        this.props.changeId(id);
        this.props.changeView('solve');
    }

    render() {
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
                    {/* {this.state.user.length === 0 ?
                        <h2>You don't have any Bookmarked puzzles.</h2> :
                        null

                    } */}
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
                                        <h2>Puzzle #{element.id}</h2>
                                        <h4>
                                            {
                                                this.state.dashView === 'bookmarked' ?
                                                    'Bookmarked on ' + element.date + ' at ' + element.time :
                                                    'Solved on ' + element.date + ' at ' + element.time
                                            }
                                        </h4>
                                        <div id="dashButtons">
                                            <button onClick={() => this.solveBookmarked(element.id)}>Solve it now</button>
                                            <button onClick={() => this.removeBookmark(element.id)}>Remove bookmark</button>
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