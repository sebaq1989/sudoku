import React, { Component } from 'react';
import axios from 'axios';
import Board from './Board';

class SolvePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: {
                board: []
            },
            solution: [[], [], [], [], [], [], [], [], []],
            currentId: 1
        }
    }

    componentDidMount() {
        console.log('mounted')
        axios.get(`/api/puzzles/${this.state.currentId}`).then(response => {
            let puzzleBoard = [[], [], [], [], [], [], [], [], []];
            response.data.board.map((e, i) => {
                return e.map((element, index) => {
                    if (element === 0) {
                        return puzzleBoard[i][index] = { value: 0, isEditable: true }
                    } else {
                        return puzzleBoard[i][index] = { value: element, isEditable: false }
                    }
                })
            })
            this.setState({
                puzzle: {
                    board: puzzleBoard
                }
            });
        }).catch(error => {
            console.log('There was an error retrieving the puzzles.');
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevState, this.state)
    }

    handleChangeSolution = (e, i) => {
        console.log(this.state.puzzle.board)
        let puzzleCopy = [...this.state.puzzle.board];
        puzzleCopy[+e.target.name][i].value = (e.target.value * 1);
        // this.setState({ solution: puzzleCopy }, () => {
        //     console.log('finished')
        // })
        // this.setState({ puzzle: { board: puzzleCopy } })
    }

    handleSubmit = () => {
        let testSolution = this.state.puzzle.board.map((e, i) => {
            return e.map((element, index) => {
                return element = element.value
            })
        })
        // console.log(testSolution)
        console.log(this.validSolution(testSolution))
    }

    handlePrev = () => {
        let prev;
        if (this.state.currentId === 1) {
            prev = this.state.puzzles.length;
            this.setState({ currentId: prev })
        } else {
            this.setState({ currentId: this.state.currentId - 1 })
        }
    }

    sudokuSolver = (board) => {
        console.log('run')
        //keep track of the position of all '0' (empty) squares
        let ruledOutOptions;
        //keep track of all numbers that cant be the answer for any given empty square
        let emptySquares = 1;
        //keep looping through the rest of the logic until we dont see any empty squares
        while (emptySquares > 0) {
            emptySquares = 0;
            for (var row = 0; row < board.length; row++) {
                for (var column = 0; column < board.length; column++) {
                    let filledSquares = {};
                    if (board[row][column] === 0) {
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
                                    console.log(missingNumber);
                                    board[row][column] = missingNumber;
                                }
                            }
                        } else {
                            emptySquares++
                        }
                    }
                }
            }
        }
        return board;
    }

    validSolution = (board) => {
        let tester = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let threeByThree = [];
        for (let i = 0; i < tester.length; i++) {
            for (let j = 0; j < tester.length; j++) {
                if (board[i].indexOf(tester[j]) < 0) {
                    console.log('row fail')
                    return false;
                }
                if (board[j].indexOf(tester[i]) < 0) {
                    console.log('column fail')
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
        console.log("PUZZLE BOARD", this.state.puzzle.board)
        console.log("sOLUTION", this.state.solution)
        let { puzzle, solution } = this.state;
        return (

            <div>
                <div className="solvePuzzle">
                    <button onClick={this.handlePrev}>&lt;Prev</button>
                    <Board
                        displayOnly={false}
                        board={puzzle.board}
                        solution={solution}
                        handleChangeSolution={this.handleChangeSolution}
                        id={puzzle.id}
                        key={puzzle.id}
                    />
                    <button onClick={this.handleNext}>Next&gt;</button>

                </div>
                <button onClick={this.handleSubmit}>Check Solution!</button>
            </div>
        )
    }
}

export default SolvePuzzle