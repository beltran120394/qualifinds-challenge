import { Link } from "react-router-dom";
import PokemonList from "./PokemonList";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        <div className="flex justify-end w-full">
          <Button asChild>
            <Link to="/new">New Pokemon</Link>
          </Button>
        </div>
        <div className="w-full h-96 overflow-y-auto">
          <PokemonList />
        </div>
      </div>
    </div>
  );
}

export default App;
