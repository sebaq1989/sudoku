const express = require('express');
const app = express();
const pc = require('./controllers/puzzle_controller');

app.use(express.json());

app.get('/api/puzzles', pc.getPuzzles);
app.get('/api/puzzles/:id', pc.getPuzzle);
app.put('/api/puzzles/:id', pc.editPuzzle);
app.delete('/api/puzzles/:id', pc.deletePuzzle);
app.post('/api/puzzles', pc.addPuzzle);

const PORT = 7070;
app.listen(PORT, () => console.log('Listening on port ' + PORT));