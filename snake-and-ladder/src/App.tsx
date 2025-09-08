import { useState } from "react";
import { AddInput } from "./utils/AddInput";
import { SnakeAndLadderGame } from "./Components/SnakeAndLadderGame";
import type { SnakeAndLadderGameProps } from "./utils/Interfaces";

const inputNames = {
  snake: "snake",
  ladder: "ladder",
  player: "player",
};

function App() {
  // user inputs are num of snakes, num ladders, num player
  // max players-6, max snaked/ladders-10
  const [numPlayers, setNumPlayers] = useState(2);
  const [gameData, setGameData] = useState<SnakeAndLadderGameProps | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const snakes = Number(formData.get(inputNames.snake) as string);
    const ladders = Number(formData.get(inputNames.ladder) as string);
    const playerNames = [];
    for (let i = 1; i <= numPlayers; i++) {
      const playerInputName = `${inputNames.player}-${i}`;
      const playerName = formData.get(playerInputName) as string;
      playerNames.push(playerName);
    }
    setGameData({
      snakes,
      ladders,
      playerNames,
    });
  };
  const restartGame = () => {
    setGameData(null);
    setNumPlayers(2);
  };
  const FillSampleDataHelper = () => {
    setGameData({
      snakes: 10,
      ladders: 10,
      playerNames: Array.from(
        { length: numPlayers },
        (_, index) => `player-${index + 1}`
      ),
    });
  };

  return (
    <div className="relative bg-emerald-50 w-screen h-screen items-center justify-center flex">
      {!gameData ? (
        <div className="relative  w-3/4 h-3/4 rounded-4xl border-solid border-2">
          <form onSubmit={handleSubmit}>
            <AddInput
              title="Select number of Snakes(max-10):"
              type="number"
              placeholder="10"
              min={0}
              max={15}
              name={inputNames.snake}
            />
            <AddInput
              title="Select number of Ladder(max-10):"
              type="number"
              placeholder="10"
              min={0}
              max={15}
              name={inputNames.ladder}
            />
            {Array.from({ length: numPlayers }).map((_, index) => (
              <AddInput
                title={`Enter Player${index + 1} Name: `}
                type="text"
                key={index}
                placeholder={`Player-${index + 1}`}
                name={`${inputNames.player}-${index + 1}`}
              />
            ))}
            <div className="flex gap-6 items-center justify-center mt-15">
              {numPlayers < 6 ? (
                <button
                  type="button"
                  className="rounded-full border-4 border-gray-500 hover:border-gray-700 hover:scale-[1.02] hover:shadow-lg hover:bg-blue-200 px-3 py-2 transition-all duration-100"
                  onClick={() => setNumPlayers((i) => i + 1)}
                >
                  Add Player
                </button>
              ) : null}
              {numPlayers > 2 ? (
                <button
                  type="button"
                  className="rounded-full border-4 border-gray-500 hover:border-gray-700 hover:scale-[1.02] hover:shadow-lg hover:bg-blue-200 px-3 py-2 transition-all duration-100"
                  onClick={() => setNumPlayers((i) => i - 1)}
                >
                  Remove Player
                </button>
              ) : null}
            </div>
            <div className="flex gap-10">
              <button className="rounded-full border-5 border-black/60 hover:border-black hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100 px-3 py-2 transition-all duration-100 absolute bottom-5 left-1/3 translate-x-[-50%]">
                Start Game
              </button>
              <button
                className="rounded-full border-5 border-black/60 hover:border-black hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100 px-3 py-2 transition-all duration-100 absolute bottom-5 left-2/3 translate-x-[-50%]"
                type="button"
                onClick={FillSampleDataHelper}
              >
                Start Game With AutoFill
              </button>
            </div>
          </form>
        </div>
      ) : (
        <SnakeAndLadderGame {...gameData} restartGame={restartGame} />
      )}
    </div>
  );
}

export default App;
