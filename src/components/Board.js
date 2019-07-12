import React from 'react';

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
        < div className="puzzleBoard" id={props.isEditable ? "solvePuzzle" : null} >

            {
                props.board.map((e, i) => {
                    return <div className="row{i} row" key={i}> {e.map((elem, index) => {
                        let squareValue = '';
                        let classes = '';

                        let rowGrid = Math.floor(i / 3) * 3
                        let colGrid = Math.floor(index / 3) * 3
                        if (rowGrid === 0 && colGrid === 3) classes += 'shaded'
                        if (rowGrid === 3 && colGrid === 0) classes += 'shaded'
                        if (rowGrid === 3 && colGrid === 6) classes += 'shaded'
                        if (rowGrid === 6 && colGrid === 3) classes += 'shaded'

                        if (i === 2 || i === 5) classes += ' bottomBorder'
                        if (index === 3 || index === 6) classes += ' leftBorder'

                        if (elem.isEditable) {
                            if (elem.value === 0) {
                                classes += ' emptySquare'
                            } else {
                                squareValue = elem.value;
                            }
                        } else {
                            squareValue = elem.value;
                        }

                        return <input
                            onChange={e => props.handleChangeSolution(e, index)}
                            className={classes}
                            {...props.displayOnly ? { 'value': squareValue } : { 'defaultValue': squareValue }}
                            name={`${i}`}
                            key={`${i}${index}`}
                            type="text"
                            readOnly={!elem.isEditable || props.displayOnly}
                        />
                    }
                    )} </div>
                })
            }

        </div >
    )
}

export default Board;