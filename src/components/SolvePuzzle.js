import React, { Component } from 'react';
import axios from 'axios';
import Board from './Board';
import Modal from './Modal';
import Timer from './Timer';

class SolvePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: {
                id: 0,
                board: [],
                bookmarked: null
            },
            solveTime: '',
            timerOn: true,
            helpCount: 0,
            solverModalOpen: false,
            title: "Dope.",
            message: "You nailed it! Try another puzzle...do it."
        }
    }

    componentDidMount() {
        axios.get(`/api/puzzles/${this.props.currentId}`).then(response => {
            this.puzzleMapper(response.data)
            this.setState({ solveTime: '00:00' })
        }).catch(error => {
            console.log('There was an error retrieving the puzzles.');
        })

    }

    puzzleMapper = (data) => {
        let puzzleBoard = [[], [], [], [], [], [], [], [], []];
        data.board.map((e, i) => {
            return e.map((element, index) => {
                if (element === 0) {
                    return puzzleBoard[i][index] = { value: 0, isEditable: true }
                } else {
                    return puzzleBoard[i][index] = { value: element, isEditable: false }
                }
            })
        })
        let bookmarked;
        data.bookmarked ? bookmarked = true : bookmarked = false;
        this.setState({
            puzzle: {
                id: this.props.currentId,
                board: puzzleBoard,
                bookmarked
            }
        });
    }

    handleChangeSolution = (e, i) => {
        let puzzleCopy = [...this.state.puzzle.board];
        puzzleCopy[+e.target.name][i].value = (e.target.value * 1);
        if (!String(puzzleCopy[+e.target.name][i].value).length) {
            puzzleCopy[+e.target.name][i].value = 0;
        }
        puzzleCopy[+e.target.name][i].edited = true;
        console.log("TTTTTTTTTTT", this.state.puzzle.board)
    }

    handleSubmit = () => {
        console.log("alsdkjf;laksjf", this.state.puzzle.id)
        let d = new Date();
        let time = d.toLocaleTimeString();
        let date = d.toLocaleDateString();
        let testSolution = this.state.puzzle.board.map((e, i) => {
            return e.map((element, index) => {
                return element = element.value
            })
        })
        console.log(this.state.seconds)

        if (this.validSolution(testSolution)) {
            const solvedPuzzle = {
                id: this.props.currentId,
                board: testSolution,
                solved: true,
                bookmarked: false,
                time,
                date,
                solveTime: this.state.solveTime,
                helpCount: this.state.helpCount
            }

            axios.post('/api/user', solvedPuzzle).then(response => {
                this.setState({
                    solverModalOpen: true,
                    title: "Dope.",
                    message: "You nailed it! Try another puzzle...do it.",
                    timerOn: false
                })
            })
        } else {
            this.setState({ title: "Nah, bruh.", message: "Not even close...", solverModalOpen: true })
        }
    }

    closeModal = (completed) => {
        this.setState({ solverModalOpen: false });
    }

    handleBookmark = () => {
        let d = new Date();
        let time = d.toLocaleTimeString();
        let date = d.toLocaleDateString();
        let puzzle = this.state.puzzle;
        puzzle.time = time;
        puzzle.bookmarked = true;
        puzzle.date = date;
        puzzle.board = puzzle.board.map(e => e.map(el => el = el.value));
        console.log(puzzle);
        axios.post('/api/user', puzzle).then(response => {
            this.setState({
                user: response.data, solverModalOpen: true, title: "Bookmark added!",
                message: "You can now access this puzzle from your Dashboard."
            })
        }).catch(error => console.log(error));

        axios.put(`/api/puzzles/${this.props.currentId}`, { bookmarked: true, solved: false })
    }

    timerCount = (time) => {
        this.setState({
            solveTime: time
        })
    }

    sudokuSolver = (puzzle) => {
        this.setState({ helpCount: this.state.helpCount + 1 });
        let board = puzzle.map(e => e.map(a => a = a.value));
        //keep track of the position of all '0' (empty) squares
        let ruledOutOptions;
        //keep track of all numbers that cant be the answer for any given empty square
        let emptySquares = 1;
        emptySquares = 0;
        for (var row = 0; row < board.length; row++) {
            for (var column = 0; column < board.length; column++) {
                let filledSquares = {};
                if (board[row][column] === 0) {
                    emptySquares = 1;
                    for (var i = 0; i < 9; i++) {
                        //check row for filled boxes
                        if (board[row][i] > 0) {
                            filledSquares[board[row][i]] = true;
                        }
                        //check column for filled boxes
                        if (board[i][column] > 0) {
                            filledSquares[board[i][column]] = true;
                        }
                    }
                    //check quadrant for filled boxes
                    for (var quadrantRow = Math.floor(row / 3) * 3; quadrantRow < Math.floor(row / 3) * 3 + 3; quadrantRow++) {
                        for (var quadrantCol = Math.floor(column / 3) * 3; quadrantCol < Math.floor(column / 3) * 3 + 3; quadrantCol++) {
                            if (board[quadrantRow][quadrantCol] > 0) {
                                filledSquares[board[quadrantRow][quadrantCol]] = true;
                            }
                        }
                    }
                    //push the ruled out numbers into the array to keep track of numbers that cant be the answer for any given square
                    ruledOutOptions = Object.keys(filledSquares).map(a => a * 1);
                    if (ruledOutOptions.length === 8) {
                        for (var missingNumber = 1; missingNumber < 10; missingNumber++) {
                            if (ruledOutOptions.indexOf(missingNumber) < 0) {
                                board[row][column] = missingNumber;
                                let puzzleBoard = [[], [], [], [], [], [], [], [], []];
                                board.map((e, i) => {
                                    return e.map((element, index) => {
                                        if (element === 0) {
                                            return puzzleBoard[i][index] = { value: 0, isEditable: true }
                                        } else if (puzzle[i][index].isEditable) {
                                            return puzzleBoard[i][index] = { value: element, isEditable: true, edited: true }
                                        } else {
                                            return puzzleBoard[i][index] = { value: element, isEditable: false }
                                        }
                                    })
                                })
                                this.setState({
                                    puzzle: {
                                        board: puzzleBoard,
                                        helpCount: this.state.helpCount + 1
                                    }
                                })
                                return;
                            }
                        }
                    }
                }
            }
        }
        if (emptySquares > 0) {
            this.setState({
                solverModalOpen: true,
                title: "Bummer, dog.",
                message: "Looks like you messed up somewhere. It's not my job to fix your mistakes."
            })
        }
    }

    validSolution = (board) => {
        let tester = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let threeByThree = [];
        for (let i = 0; i < tester.length; i++) {
            for (let j = 0; j < tester.length; j++) {
                if (board[i].indexOf(tester[j]) < 0) {
                    return false;
                }
                if (board[j].indexOf(tester[i]) < 0) {
                    return false;
                }
            }
        }
        for (let i = 0; i <= 6; i += 3) {
            for (let j = 0; j <= 6; j += 3) {
                for (let x = 0; x < 3; x++) {
                    for (let z = 0; z < 3; z++) {
                        threeByThree.push(board[i + x][j + z])
                    }
                }
                for (let t = 0; t < tester.length; t++) {
                    if (threeByThree.indexOf(tester[t]) < 0) {
                        return false;
                    }
                }
                threeByThree.splice(0, 9);
            }
        }
        return true;
    }

    render() {
        let { puzzle } = this.state;
        return (

            <section className="solver">
                {this.state.solverModalOpen &&
                    <Modal
                        className="modal"
                        closeModal={this.closeModal}
                        title={this.state.title}
                        message={this.state.message}
                        changeView={this.props.changeView}
                    />
                }
                <div className="help-bookmark">
                    <button onClick={() => this.sudokuSolver(this.state.puzzle.board)} id="helpMe">Help Me</button>
                    <button id="solverBookmark" onClick={this.handleBookmark}>Bookmark this</button>
                </div>
                <div className="solvePuzzle">
                    <Board
                        displayOnly={false}
                        board={puzzle.board}
                        handleChangeSolution={this.handleChangeSolution}
                        id={puzzle.id}
                        key={puzzle.id}
                    />
                </div>
                <div>
                    <div id="solveTime">
                        <span id="puzzleTimer">Solve Time</span>
                        <span id="timer">
                            <Timer timerCount={this.timerCount} timerOn={this.state.timerOn} startCount={0} />
                        </span>
                    </div>
                    <button id="checkSolution" onClick={this.handleSubmit}>Check <br />My Solution</button>
                </div>
            </section>
        )
    }
}

export default SolvePuzzle