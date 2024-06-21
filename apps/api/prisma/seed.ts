import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const pokemonData: Prisma.PokemonCreateInput[] = [
  {
    name: "Bulbasaur",
    type: "Grass",
    abilities: "Overgrow",
  },
  {
    name: "Charmander",
    type: "Fire",
    abilities: "Blaze",
  },
  {
    name: "Squirtle",
    type: "Water",
    abilities: "Torrent",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of pokemonData) {
    const pokemon = await prisma.pokemon.create({
      data: p,
    });
    console.log(`Created Pokemon with id: ${pokemon.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
