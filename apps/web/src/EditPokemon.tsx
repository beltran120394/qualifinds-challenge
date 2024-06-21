import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Pokemon } from "./types";

export default function EditPokemon() {
  const { id } = useParams<{ id: string }>();

  const { isPending, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => fetch(`/api/pokemon/${id}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data";
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 border border-gray-200 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold">Edit Pokemon</h2>
      <div className="mt-4">
        <label className="block" htmlFor="name">
          Name
        </label>
        <input
          className="w-full p-2 border border-gray-200 rounded-md"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="mt-4">
        <label className="block" htmlFor="type">
          Type
        </label>
        <input
          className="w-full p-2 border border-gray-200 rounded-md"
          type="text"
          name="type"
          id="type"
        />
      </div>
      <div className="mt-4">
        <label className="block" htmlFor="abilities">
          Abilities
        </label>
        <input
          className="w-full p-2 border border-gray-200 rounded-md"
          type="text"
          name="abilities"
          id="abilities"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
    </form>
  );
}
