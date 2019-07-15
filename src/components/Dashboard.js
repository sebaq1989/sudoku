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
            <section>
                <div className="dashTabs">
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
                </div>
                <div id="dashboard">
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
                                        <h2>Puzzle <span id="puzzleNumber">#{element.id}</span></h2>
                                        <h4>
                                            {
                                                this.state.dashView === 'bookmarked' ?
                                                    'Bookmarked on ' + element.date + ' at ' + element.time :
                                                    'Solved on ' + element.date + ' at ' + element.time
                                            }
                                        </h4>
                                        <div id="dashButtons">
                                            {
                                                this.state.dashView === 'bookmarked' ?
                                                    <>
                                                        <button onClick={() => this.solveBookmarked(element.id)}>Solve it now</button>
                                                        <button onClick={() => this.removeBookmark(element.id)}>Remove bookmark</button> </> :
                                                    <>
                                                        {
                                                            element.helpCount > 0 ?
                                                                element.helpCount === 1 ?
                                                                    <h4>You cheated <strong>1</strong> time (help button)</h4> :
                                                                    <h4>You cheated <strong>{element.helpCount}</strong> times (help button)</h4> :
                                                                <h4>You didnt need any help! Noice!</h4>
                                                        }
                                                        <div id="solvedTime">
                                                            <h3>Solve Time:</h3>
                                                            <br />
                                                            <h1>{element.solveTime}</h1>

                                                        </div>

                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
                </div>
            </section>
        )
    }
}

export default Dashboard;