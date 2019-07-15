import React, { Component } from 'react';
import Board from './Board';
import Modal from './Modal';
import axios from 'axios';

class ShowPuzzles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            puzzles: [
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] },
                { board: [] }],
            modalOpen: false,
            title: "Bookmark added!",
            message: "You can now access this puzzle from your Dashboard."
        }
    }

    componentDidMount() {
        axios.get('/api/puzzles').then(response => {
            let puzzlesArray = [...response.data];
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

    handleBookmark = () => {
        let d = new Date();
        let time = d.toLocaleTimeString();
        let date = d.toLocaleDateString();
        let board = this.state.puzzles[this.props.currentId - 1].board.map(e => e.map(el => el = el.value))
        let object = {
            id: this.props.currentId,
            board: board,
            bookmarked: true,
            solved: false,
            time,
            date
        }
        axios.post('/api/user', object).then(response => {
            this.setState({ user: response.data, modalOpen: true })
        }).catch(error => console.log(error));

        axios.put(`/api/puzzles/${this.props.currentId}`, { bookmarked: true, solved: false })
    }

    closeModal = (completed) => {
        this.setState({ modalOpen: false });
    }

    render() {
        let { puzzles } = this.state
        let puzzle = puzzles[this.props.currentId - 1]
        let board = puzzle.board
        return (
            <section className="showPuzzles">
                {this.state.modalOpen &&
                    <Modal
                        className="modal"
                        closeModal={this.closeModal}
                        title={this.state.title}
                        message={this.state.message}
                        changeView={this.props.changeView}
                    />
                }
                <div className="showLeftButtons showButtons">
                    <button id="buttonPuzzle">Puzzle <span>{"#" + puzzle.id}</span></button>
                    <button className="buttonPrev" onClick={this.handlePrevious}>PREV</button>

                </div>
                <div className="puzzles">
                    <Board
                        displayOnly={true}
                        board={board}
                        id={puzzle.currentId}
                        key={puzzle.currentId}
                    />
                    <button onClick={this.handlePlay} id="playButton">Play Now</button>
                </div>
                <div className="showRightButtons showButtons">
                    <button id="bookmark" onClick={this.handleBookmark}>Bookmark this</button>
                    <button className="buttonNext" onClick={this.handleNext}>NEXT</button>
                </div>

            </section>
        )
    }
}

export default ShowPuzzles;