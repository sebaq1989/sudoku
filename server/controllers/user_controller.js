const user = [];

const getPuzzles = (req, res) => {
    res.send(user)
}

const getPuzzlesByCategory = (req, res) => {
    let category = req.params.category;
    let filtered;
    if (category === "bookmarked" || category === "solved") {
        filtered = user.filter(e => e[String(category)] === true)
    }
    res.send(filtered);
}

const deletePuzzle = (req, res) => {
    let { id } = req.params;
    let foundIndex = user.findIndex(e => e.id === +id);
    user.splice(foundIndex, 1);
    res.send(user);
}

const addPuzzle = (req, res) => {
    let { board, id, solved, bookmarked, time, date, solveTime, helpCount } = req.body;
    let userDup = user.findIndex(e => e.id === id);
    if (userDup !== -1) {
        user.splice(userDup, 1)
    }
    user.push({
        id,
        board,
        solved,
        bookmarked,
        deletePuzzle,
        time,
        date,
        solveTime,
        helpCount
    })
    res.send(user)
}

const editPuzzle = (req, res) => {
    let { board, id, solved, bookmarked, time, date, } = req.body;
    let editId = req.params.id
    let foundIndex = user.findIndex(e => e.id === +editId);
    let edittedObject = {
        board, id, solved, bookmarked, time, date
    }
    user.splice(foundIndex, 1, edittedObject);
    res.send(user);
}

module.exports = {
    addPuzzle,
    getPuzzles,
    getPuzzlesByCategory,
    deletePuzzle,
    editPuzzle
}