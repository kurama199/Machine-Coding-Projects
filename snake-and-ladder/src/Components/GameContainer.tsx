import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  ongoingTurnTypes,
  type GameTurnDataProps,
  type playerDataProps,
} from "@/utils/Interfaces";
import { RandomIcon } from "@/utils/RandomIcon";
import { SnakeOrLadderBlock } from "@/utils/SnakeOrLadderBlock";
import {
  cn,
  getSnakeAndLadder,
  playerColors,
  type snakeAndLadderObject,
} from "@/utils/Utils";

export interface GameContainerProps extends playerDataProps {
  restartGame: () => void;
  snakes: number;
  ladders: number;
  setPlayerPosition: Dispatch<SetStateAction<number[]>>;
  setGameTurnData: Dispatch<SetStateAction<GameTurnDataProps>>;
  setWinners: Dispatch<SetStateAction<string[]>>;
  winners: string[];
}
export const GameContainer = ({
  gameTurnData,
  playerNames,
  playerPosition,
  restartGame,
  snakes,
  ladders,
  setPlayerPosition,
  setGameTurnData,
  setWinners,
  winners,
}: GameContainerProps) => {
  const [numberChosen, setNumberChosen] = useState<number>(0);
  const [snakeAndLadderHeadsAndTails, setSnakeAndLadderHeadsAndTails] =
    useState<snakeAndLadderObject>({
      snakeHeads: new Map(),
      snakeTails: new Map(),
      ladderHeads: new Map(),
      ladderTails: new Map(),
    });

  useLayoutEffect(() => {
    setSnakeAndLadderHeadsAndTails(getSnakeAndLadder(snakes, ladders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      gameTurnData.isOngoingTurn === ongoingTurnTypes.shouldStart &&
      numberChosen > 0
    ) {
      setGameTurnData((prev) => {
        return {
          ...prev,
          isOngoingTurn: ongoingTurnTypes.onGoing,
        };
      });
      const currPlayerIndex = gameTurnData.currIndex;
      let currPosition = playerPosition[currPlayerIndex];
      let chosenNumberCopy = numberChosen;
      const snakeHeads = snakeAndLadderHeadsAndTails.snakeHeads;
      const ladderTails = snakeAndLadderHeadsAndTails.ladderTails;
      (async () => {
        await new Promise((res) => {
          const intervalId = setInterval(() => {
            if (currPosition === 100 || chosenNumberCopy === 0) {
              if (currPosition === 100) {
                setWinners((prev) => {
                  prev.push(playerNames[currPlayerIndex]);
                  if (prev.length === playerNames.length - 1) {
                    prev.push(
                      playerNames.find(
                        (player) => !prev.includes(player)
                      ) as string
                    );
                  }
                  return [...prev];
                });
              }
              clearInterval(intervalId);
              res("done with movement");
              setPlayerPosition((prev) => {
                const newPos = [...prev];
                newPos[currPlayerIndex] = currPosition;
                return newPos;
              });
              return;
            }
            currPosition += 1;
            setPlayerPosition((prev) => {
              const newPos = [...prev];
              newPos[currPlayerIndex] = currPosition;
              return newPos;
            });
            chosenNumberCopy -= 1;
            if (snakeHeads.has(currPosition) && chosenNumberCopy === 0) {
              const posToGo = snakeHeads.get(currPosition) as number;
              (async () => {
                await new Promise((res) => {
                  setTimeout(() => {
                    setPlayerPosition((prev) => {
                      const newPos = [...prev];
                      newPos[currPlayerIndex] = currPosition + 1;
                      return newPos;
                    });
                    res("done with snake bite");
                  }, 300);
                }).then(() => {
                  currPosition = posToGo;
                  setPlayerPosition((prev) => {
                    const newPos = [...prev];
                    newPos[currPlayerIndex] = posToGo;
                    return newPos;
                  });
                });
              })();
            } else if (
              ladderTails.has(currPosition) &&
              chosenNumberCopy === 0
            ) {
              const posToGo = ladderTails.get(currPosition) as number;
              (async () => {
                await new Promise((res) => {
                  setTimeout(() => {
                    setPlayerPosition((prev) => {
                      const newPos = [...prev];
                      newPos[currPlayerIndex] = currPosition + 1;
                      return newPos;
                    });
                    res("done with ladder climb");
                  }, 300);
                }).then(() => {
                  currPosition = posToGo;
                  setPlayerPosition((prev) => {
                    const newPos = [...prev];
                    newPos[currPlayerIndex] = posToGo;
                    return newPos;
                  });
                });
              })();
            }
          }, 300);
        }).then(() => {
          setWinners((winnerPrev) => {
            if (winnerPrev.length === playerNames.length) {
              setGameTurnData((GameDataPrev) => {
                return {
                  ...GameDataPrev,
                  isOngoingTurn: ongoingTurnTypes.ended,
                };
              });
            } else {
              let nextPlayerIndex = (currPlayerIndex + 1) % playerNames.length;
              while (winnerPrev.includes(playerNames[nextPlayerIndex])) {
                nextPlayerIndex = (nextPlayerIndex + 1) % playerNames.length;
              }
              setGameTurnData((GameDataPrev) => {
                return {
                  ...GameDataPrev,
                  currIndex: nextPlayerIndex,
                  currPlayer: playerNames[nextPlayerIndex],
                  isOngoingTurn: ongoingTurnTypes.ended,
                };
              });
            }
            return winnerPrev;
          });
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTurnData, playerPosition, numberChosen, snakeAndLadderHeadsAndTails]);

  const onNextPlayerTurnHandler = useCallback(() => {
    if (winners.length === playerNames.length) {
      restartGame();
    } else {
      setGameTurnData((prev) => {
        return {
          ...prev,
          startNextTurn: true,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winners]);
  const resetStartNextTurn = () => {
    setGameTurnData((prev) => {
      return {
        ...prev,
        startNextTurn: false,
      };
    });
  };
  const setOngoingTurn = (index: number) => {
    setNumberChosen(index);
    setGameTurnData((prev) => {
      return {
        ...prev,
        isOngoingTurn: ongoingTurnTypes.shouldStart,
      };
    });
  };
  return (
    <div className="items-center justify-center flex flex-col w-full">
      <h1 className="font-bold font-serif text-5xl p-10 text-emerald-800">
        Snake and Ladder Game
      </h1>
      <div className="grid grid-rows-10 grid-cols-10 gap-1">
        {Array.from({ length: 100 }).map((_, index) => {
          const row = Math.floor(index / 10);
          const col = index - row * 10;
          const isRowOdd = row % 2 !== 0;
          const labelNumber = 100 - row * 10 - (isRowOdd ? 9 - col : col);
          let playerIndex = -1;
          const playersOnBlock = playerPosition.filter(
            (playerPosition, index) => {
              if (playerPosition === labelNumber) {
                playerIndex = index;
              }
              return playerPosition === labelNumber;
            }
          );
          const numberOfPlayersOnBlock = playersOnBlock.length;
          let linearGradientStyle = "";
          if (numberOfPlayersOnBlock > 1) {
            linearGradientStyle = "linear-gradient(to right, ";

            playerPosition.forEach((playerPosition, index) => {
              if (playerPosition === labelNumber) {
                linearGradientStyle += `${playerColors[index]},`;
              }
            });
            linearGradientStyle = linearGradientStyle.slice(
              0,
              linearGradientStyle.length - 1
            );
            linearGradientStyle += ")";
          }
          return (
            <div
              key={index}
              className={cn(
                "border-2 border-emerald-400 w-[80px] h-[50px] text-center items-center justify-center flex transition-all duration-300 relative"
              )}
              style={{
                backgroundImage: linearGradientStyle,
                backgroundColor:
                  numberOfPlayersOnBlock === 1 ? playerColors[playerIndex] : "",
              }}
            >
              {snakeAndLadderHeadsAndTails.snakeHeads?.has(labelNumber) ? (
                <SnakeOrLadderBlock
                  inputNumber={
                    snakeAndLadderHeadsAndTails.snakeHeads?.get(labelNumber) ??
                    0
                  }
                  className={numberOfPlayersOnBlock > 0 ? "" : "bg-red-700"}
                  isLadder={false}
                  isHead={true}
                />
              ) : null}
              {snakeAndLadderHeadsAndTails.snakeTails?.has(labelNumber) ? (
                <SnakeOrLadderBlock
                  inputNumber={
                    snakeAndLadderHeadsAndTails.snakeTails?.get(labelNumber) ??
                    0
                  }
                  className={numberOfPlayersOnBlock > 0 ? "" : "bg-red-500"}
                />
              ) : null}
              {snakeAndLadderHeadsAndTails.ladderHeads?.has(labelNumber) ? (
                <SnakeOrLadderBlock
                  inputNumber={
                    snakeAndLadderHeadsAndTails.ladderHeads?.get(labelNumber) ??
                    0
                  }
                  className={numberOfPlayersOnBlock > 0 ? "" : "bg-amber-700"}
                  isLadder={true}
                  isHead={true}
                />
              ) : null}
              {snakeAndLadderHeadsAndTails.ladderTails?.has(labelNumber) ? (
                <SnakeOrLadderBlock
                  inputNumber={
                    snakeAndLadderHeadsAndTails.ladderTails?.get(labelNumber) ??
                    0
                  }
                  className={numberOfPlayersOnBlock > 0 ? "" : "bg-amber-500"}
                  isLadder={true}
                />
              ) : null}
              <div className="absolute left-1 top-0 font-normal text-xs">
                {labelNumber}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          "mt-10 font-semibold font-serif",
          winners.length === playerNames.length ? "font-bold text-3xl " : ""
        )}
      >
        {winners.length === playerNames.length
          ? "Game Over"
          : `Player To Play: ${gameTurnData.currPlayer}`}
      </div>
      <div className="flex items-center justify-center gap-5 mt-10">
        <button
          className={cn(
            "rounded-full border-4 border-gray-500 px-6 py-2 transition-all duration-100",
            gameTurnData.isOngoingTurn !== ongoingTurnTypes.ended ||
              gameTurnData?.startNextTurn
              ? "opacity-70"
              : "hover:scale-[1.02] hover:bg-blue-200 hover:border-gray-700 hover:shadow-lg"
          )}
          onClick={onNextPlayerTurnHandler}
          disabled={gameTurnData.isOngoingTurn !== ongoingTurnTypes.ended}
        >
          {winners.length === playerNames.length
            ? "Restart the Game"
            : gameTurnData.isOngoingTurn !== ongoingTurnTypes.ended ||
              gameTurnData?.startNextTurn
            ? "turn in Progress"
            : "Roll the Dice"}
        </button>

        <RandomIcon
          onNumberChosen={setOngoingTurn}
          play={gameTurnData?.startNextTurn}
          resetPlay={resetStartNextTurn}
        />
      </div>
    </div>
  );
};
