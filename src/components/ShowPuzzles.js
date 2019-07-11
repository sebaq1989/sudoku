import React, { Component } from 'react';
import Board from './Board';
import axios from 'axios';

class ShowPuzzles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            puzzles: []
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
                return puzzlesArray[ind].board === puzzleBoard;
            })
            this.setState({ puzzles: puzzlesArray })
        })
    }

    render() {
        console.log(this.state.puzzles)
        return (
            <div>
                {
                    this.state.puzzles.map(element => {
                        return <Board
                            dispayOnly={true}
                            board={element.board}
                            id={element.id}
                            key={element.id}
                        />
                    })
                }
            </div>
        )
    }
}

export default ShowPuzzles;