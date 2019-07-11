import React, { Component } from 'react';

function Board(props) {

    // handleChange = (e, i) => {
    //     let puzzleCopy = [...props.solution];
    //     puzzleCopy[e.target.name][i] = (e.target.value * 1);
    //     props.handleChangeSolution(puzzleCopy);
    // }

    // handleClick = () => {
    //     this.props.handleSubmit(this.state.checkSolution);
    // }

    return (
        <div className="puzzleBoard">

            {props.board.map((e, i) => {
                return <div className="row{i} row" key={i}> {e.map((elem, index) => {
                    if (elem === 0) {
                        return <input
                            onChange={e => props.handleChangeSolution(e, index)}
                            value=''
                            className="emptySquare"
                            name={`${i}`}
                            key={`${i}${index}`}
                            type="text"
                        />
                    }
                    return <input
                        value={elem}
                        name={`checkSolution[${i}][${index}]`}
                        key={`${i}${index}`}
                        type="text"
                        readOnly />
                })} </div>
            })}
        </div>
    )
}

export default Board;