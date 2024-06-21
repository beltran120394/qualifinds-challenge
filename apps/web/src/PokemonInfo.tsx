import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "./types";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export default function PokemonInfo() {
  const { id } = useParams<{ id: string }>();

  const { isPending, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => fetch(`/api/pokemon/${id}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data";

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        <div className="flex justify-end w-full">
          <Button asChild>
            <Link to={`/pokemons/${id}/edit`}>Edit Pokemon</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>{data.name}</CardTitle>
              <CardDescription>{data.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.description}</p>
              <p>Abilities: {data.abilities}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
