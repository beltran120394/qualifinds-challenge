import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Pokemon } from "./types";

function App() {
  const { isPending, error, data } = useQuery<Pokemon[]>({
    queryKey: ["pokemon"],
    queryFn: () => fetch("/api/pokemon").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return <></>;
}

export default App;
