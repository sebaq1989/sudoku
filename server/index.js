const express = require("express");
const app = express();
const pc = require("./controllers/puzzle_controller");
const uc = require("./controllers/user_controller");

app.use(express.json());

app.use(express.static(`${__dirname}/../build`));

app.get("/api/puzzles", pc.getPuzzles);
app.get("/api/puzzles/:id", pc.getPuzzle);
app.put("/api/puzzles/:id", pc.editPuzzle);
app.post("/api/puzzles", pc.addPuzzle);
app.delete("/api/puzzles/:id", pc.deletePuzzle);

app.get("/api/user", uc.getPuzzles);
app.get("/api/user/:category", uc.getPuzzlesByCategory);
app.put("/api/user/:id", uc.editPuzzle);
app.post("/api/user", uc.addPuzzle);
app.delete("/api/user/:id", uc.deletePuzzle);

const PORT = 7070;
app.listen(PORT, () => console.log("Listening on port " + PORT));
