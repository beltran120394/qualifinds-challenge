import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

interface Pokemon {
  id: number;
  name: string;
  type: string[];
}

let fakePokemonData: Pokemon[] = [
  { id: 1, name: "Bulbasaur", type: ["Grass", "Poison"] },
  { id: 2, name: "Charmander", type: ["Fire"] },
  { id: 3, name: "Squirtle", type: ["Water"] },
];

// GET /api/pokemon - Retrieve all Pokémon
app.get("/api/pokemon", (req: Request, res: Response) => {
  res.json(fakePokemonData);
});

// GET /api/pokemon/:id - Retrieve a specific Pokémon by ID
app.get("/api/pokemon/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = fakePokemonData.find((p) => p.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokémon not found");
  }
});

// POST /api/pokemon - Create a new Pokémon
app.post("/api/pokemon", (req: Request, res: Response) => {
  const newPokemon: Pokemon = req.body;
  newPokemon.id = fakePokemonData.length + 1; // Simple ID generation
  fakePokemonData.push(newPokemon);
  res.status(201).json(newPokemon);
});

// PUT /api/pokemon/:id - Update a Pokémon by ID
app.put("/api/pokemon/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedPokemon: Pokemon = req.body;
  const index = fakePokemonData.findIndex((p) => p.id === id);
  if (index !== -1) {
    fakePokemonData[index] = { ...updatedPokemon, id };
    res.json(fakePokemonData[index]);
  } else {
    res.status(404).send("Pokémon not found");
  }
});

// DELETE /api/pokemon/:id - Delete a Pokémon by ID
app.delete("/api/pokemon/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = fakePokemonData.findIndex((p) => p.id === id);
  if (index !== -1) {
    fakePokemonData.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Pokémon not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
