import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "./types";
import { Link } from "react-router-dom";

function App() {
  const { isPending, error, data } = useQuery<Pokemon[]>({
    queryKey: ["pokemon"],
    queryFn: () => fetch("/api/pokemon").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data";

  return (
    <div className="h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`}>
            <div className="p-4 border border-gray-200 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{pokemon.name}</h2>
              <p className="text-gray-500">{pokemon.type}</p>
              <p className="text-gray-500">{pokemon.abilities}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <Link to="/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Pokemon
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
