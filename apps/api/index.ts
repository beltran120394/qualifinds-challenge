import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import zod from "zod";

const prisma = new PrismaClient();
const app: Express = express();
const port = 3000;

const pokemonSchema = zod.object({
  name: zod.string(),
  type: zod.string(),
  abilities: zod.string(),
  description: zod.string(),
});

app.use(bodyParser.json());

// GET /api/pokemon - Retrieve all Pokémon
app.get("/api/pokemon", async (req: Request, res: Response) => {
  const pokemons = await prisma.pokemon.findMany();
  res.json(pokemons);
});

// GET /api/pokemon/:id - Retrieve a specific Pokémon by ID
app.get("/api/pokemon/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await prisma.pokemon.findUnique({
    where: { id },
  });

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokémon not found");
  }
});

// POST /api/pokemon - Create a new Pokémon
app.post("/api/pokemon", async (req: Request, res: Response) => {
  const newPokemon = pokemonSchema.parse(req.body);
  const createdPokemon = await prisma.pokemon.create({
    data: newPokemon,
  });

  res.json(createdPokemon);
});

// PUT /api/pokemon/:id - Update a Pokémon by ID
app.put("/api/pokemon/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedPokemon = pokemonSchema.parse(req.body);
  const pokemon = prisma.pokemon.update({
    where: { id },
    data: updatedPokemon,
  });

  res.json(pokemon);
});

// DELETE /api/pokemon/:id - Delete a Pokémon by ID
app.delete("/api/pokemon/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  prisma.pokemon.delete({
    where: { id },
  });

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
