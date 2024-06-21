import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function NewPokemon() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPokemon: {
      name: string;
      type: string;
      abilities: string;
      description: string;
    }) => {
      const res = await fetch("/api/pokemon", {
        method: "POST",
        body: JSON.stringify(newPokemon),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const newPokemon = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      type: (form.elements.namedItem("type") as HTMLInputElement).value,
      abilities: (form.elements.namedItem("abilities") as HTMLInputElement)
        .value,
      description: (form.elements.namedItem("description") as HTMLInputElement)
        .value,
    };

    mutation.mutate(newPokemon);
  };

  if (mutation.isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex justify-end w-full max-w-lg">
        <Button asChild>
          <Link to="/">Back</Link>
        </Button>
      </div>
      <form
        onSubmit={onSubmit}
        className="p-4 border border-gray-200 rounded-md shadow-md w-full max-w-lg"
      >
        <h2 className="text-xl font-bold">New Pokemon</h2>
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
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-200 rounded-md"
            name="description"
            id="description"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
