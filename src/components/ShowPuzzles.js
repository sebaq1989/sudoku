import React, { Component } from 'react';
import Board from './Board';
import axios from 'axios';

class ShowPuzzles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            puzzles: [{ board: [] }, { board: [] }, { board: [] }, { board: [] }, { board: [] }, { board: [] }, { board: [] }, { board: [] }, { board: [] }]
        }
    }

    componentDidMount() {
        axios.get('/api/puzzles').then(response => {
            let puzzlesArray = [...response.data];
            console.log(response.data)
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
            this.setState({ puzzles: puzzlesArray })
        })
    }

    handleNext = () => {
        if (this.props.currentId === this.state.puzzles.length) {
            this.props.changeId(1)
        } else {
            this.props.changeId(this.props.currentId + 1)
        }
    }

    handlePrevious = () => {
        if (this.props.currentId === 1) {
            this.props.changeId(this.state.puzzles.length)
        } else {
            this.props.changeId(this.props.currentId - 1)
        }
    }

    handlePlay = () => {
        this.props.changeView("solve")
    }

    render() {
        console.log(this.state.puzzles)
        let { puzzles } = this.state
        let puzzle = puzzles[this.props.currentId - 1]
        let board = puzzle.board
        console.log(board)
        return (
            <section className="showPuzzles">

                <button className="buttonPrev" onClick={this.handlePrevious}>PREV</button>
                <div className="puzzles">
                    <Board
                        displayOnly={true}
                        board={board}
                        id={puzzle.currentId}
                        key={puzzle.currentId}
                    />
                    <button onClick={this.handlePlay} id="playButton">Play Now</button>
                </div>
                <button className="buttonNext" onClick={this.handleNext}>NEXT</button>

            </section>
        )
    }
}

export default ShowPuzzles;