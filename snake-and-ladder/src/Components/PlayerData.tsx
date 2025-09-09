import { cn, playerColors } from "@/utils/Utils";
import type { playerDataProps } from "@/utils/Interfaces";
import { Dices } from "lucide-react";

export const PlayerData = ({
  gameTurnData,
  playerNames,
  playersWon = [],
  playerPosition = [],
}: playerDataProps) => {
  return (
    <div className="w-4/10 bg-gradient-to-r from-emerald-500 via-emerald-200 to-emerald-50 py-10 pl-15 relative font-sans">
      <h1 className="game-title">Players Data</h1>
      <ul className="font-semibold text-2xl text-left list-disc">
        Players Playing
        {playerNames.map((player, index) => {
          if (playersWon.includes(player)) {
            return null;
          }
          return (
            <li
              key={index}
              className="font-medium text-xl text-left mt-5 pl-5 items-center"
            >
              <span
                className="border-4 rounded-full w-[25px] h-[25px] inline-block align-sub mr-5"
                style={{
                  backgroundColor: playerColors[index],
                }}
              ></span>
              {player}
              <span
                className={cn(
                  "pl-4 text-green-500",
                  gameTurnData?.currIndex === index ? "text-green-800" : ""
                )}
              >
                - AT {playerPosition[index]}
              </span>
              {gameTurnData?.currIndex === index ? (
                <Dices className="inline ml-5" />
              ) : null}
            </li>
          );
        })}
      </ul>
      <ol className="font-semibold text-2xl text-left list-decimal mt-20">
        Winners List
        {playersWon.map((player, index) => {
          const colorIndex = playerNames?.indexOf(player);
          return (
            <li
              key={index}
              className="font-medium text-xl text-left mt-5 pl-5 items-center"
            >
              <span
                className="border-4 rounded-full w-[25px] h-[25px] inline-block align-sub mr-5"
                style={{
                  backgroundColor: playerColors[colorIndex],
                }}
              ></span>
              {player}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
