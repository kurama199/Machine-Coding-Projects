import { useState } from "react";
import { PlayerData } from "./PlayerData";
import {
  ongoingTurnTypes,
  type ExtendedSnakeAndLadderGameProps,
  type GameTurnDataProps,
} from "@/utils/Interfaces";
import { GameContainer } from "./GameContainer";

export const SnakeAndLadderGame = ({
  snakes,
  ladders,
  playerNames,
  restartGame,
}: ExtendedSnakeAndLadderGameProps) => {
  window.onbeforeunload = function () {
    return "";
  };
  const [playerPosition, setPlayerPosition] = useState<number[]>(
    Array.from({ length: playerNames.length }, () => 0)
  );
  const [gameTurnData, setGameTurnData] = useState<GameTurnDataProps>({
    currIndex: 0,
    currPlayer: playerNames[0],
    isOngoingTurn: ongoingTurnTypes.ended,
    startNextTurn: false,
  });
  const [winners, setWinners] = useState<string[]>([]);

  return (
    <div className="w-full h-full flex">
      <PlayerData
        gameTurnData={gameTurnData}
        playerNames={playerNames}
        playersWon={winners}
        playerPosition={playerPosition}
      />
      <GameContainer
        gameTurnData={gameTurnData}
        playerNames={playerNames}
        playersWon={winners}
        playerPosition={playerPosition}
        restartGame={restartGame}
        snakes={snakes}
        ladders={ladders}
        setPlayerPosition={setPlayerPosition}
        setGameTurnData={setGameTurnData}
        setWinners={setWinners}
        winners={winners}
      />
      <div className="absolute left-5 bottom-5 flex gap-4">
        <div className="font-sans">
          <span className="font-bold">ST -</span> Snake Tail
        </div>
        <div className="font-sans">
          <span className="font-bold">LH -</span> Ladder Head
        </div>
      </div>
    </div>
  );
};
