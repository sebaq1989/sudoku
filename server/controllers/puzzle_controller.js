const puzzles = require('../puzzles');


const getPuzzles = (req, res) => {
    res.send(puzzles);
}

const getPuzzle = (req, res) => {
    let { id } = req.params;
    let foundPuzzle = puzzles.find(e => e.id == id);
    res.send(foundPuzzle);
}

const editPuzzle = (req, res) => {
    let { id } = req.params;
    let { bookmarked, solved } = req.body;
    let foundIndex = puzzles.findIndex(e => e.id == id);
    puzzles[foundIndex].bookmarked = bookmarked;
    puzzles[foundIndex].solved = solved;
    res.send(puzzles);
}

const deletePuzzle = (req, res) => {
    let { id } = req.params;
    let foundIndex = puzzles.findIndex(e => e.id == id);
    puzzles.splice(foundIndex, 1);
    res.send(puzzles);
}

const addPuzzle = (req, res) => {
    if (!req.body.board) {
        return res.status(417).send('Please include a new puzzle board.');
    }
    let { board } = req.body;
    let id = puzzles.length + 1;
    puzzles.push({ id, board });
    res.send(puzzles);
}

module.exports = {
    getPuzzles,
    getPuzzle,
    editPuzzle,
    deletePuzzle,
    addPuzzle
}