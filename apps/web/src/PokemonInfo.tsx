import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "./types";

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
    <div className="h-screen overflow-y-auto p-4">
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
      <div className="p-4 border border-gray-200 rounded-md shadow-md">
        <h2 className="text-xl font-bold">
          {data.name} (#{data.id})
        </h2>
        <p className="text-gray-500">Type: {data.type}</p>
        <p className="text-gray-500">Abilities: {data.abilities}</p>
      </div>
      <Link to={`/pokemons/${id}/edit`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </Link>
    </div>
  );
}
