import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "./types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";

export default function PokemonList() {
  const { isPending, error, data } = useQuery<Pokemon[]>({
    queryKey: ["pokemon"],
    queryFn: () => fetch("/api/pokemon").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data";

  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((pokemon) => (
        <Card key={pokemon.id}>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
            <CardDescription>{pokemon.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{pokemon.description}</p>
            <p>Abilities: {pokemon.abilities}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button asChild>
              <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`}>
                Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
