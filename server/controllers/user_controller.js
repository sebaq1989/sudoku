const user = [
    {
        "id": 1,
        "board": [
            [5, 3, 1, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        "solved": true,
        "bookmarked": true
    },
    {
        "id": 2,
        "board": [
            [5, 3, 2, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        "solved": false,
        "bookmarked": true
    },
    {
        "id": 3,
        "board": [
            [5, 3, 3, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        "solved": true,
        "bookmarked": false
    }
];

const getPuzzles = (req, res) => {
    res.send(user)
}

const getPuzzlesByCategory = (req, res) => {
    let category = req.params.category;
    console.log(req.params.category)
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
    let { board, id, solved, bookmarked } = req.body;
    user.push({
        id,
        board,
        solved,
        bookmarked,
        deletePuzzle
    })
    res.send(user)
}

const editPuzzle = (req, res) => {
    let { board, id, solved, bookmarked } = req.body;
    let editId = req.params.id
    let foundIndex = user.findIndex(e => e.id === +editId);
    let edittedObject = {
        board, id, solved, bookmarked
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