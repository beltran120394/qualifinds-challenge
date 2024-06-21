import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokemonInfo from "./PokemonInfo.tsx";
import NewPokemon from "./NewPokemon.tsx";
import EditPokemon from "./EditPokemon.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemons/:id",
    element: <PokemonInfo />,
  },
  {
    path: "/new",
    element: <NewPokemon />,
  },
  // Edit
  {
    path: "/pokemons/:id/edit",
    element: <EditPokemon />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
