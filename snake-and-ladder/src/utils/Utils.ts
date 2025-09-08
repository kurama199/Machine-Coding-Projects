import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
export const playerColors = [
  "rgba(0, 153, 0)",
  "rgba(66, 135, 245)",
  "rgba(245, 66, 105)",
  "rgba(245, 218, 66)",
  "rgb(131, 89, 50)",
  "rgb(52, 26, 89)",
];
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

export interface snakeAndLadderObject {
  snakeHeads: Map<number, number>;
  snakeTails: Map<number, number>;
  ladderHeads: Map<number, number>;
  ladderTails: Map<number, number>;
}

export function getSnakeAndLadder(
  snakes = 10,
  ladders = 10
): snakeAndLadderObject {
  const snakeAndLadderUsedMap = new Set();
  const snakeHeads = new Map();
  const snakeTails = new Map();

  const ladderHeads = new Map();
  const ladderTails = new Map();

  // one snakeHead between 91-99 and one snakeTail between 5-15
  // one LadderHead between 81-90 and one LadderTail between 10-20
  const setOne = Math.floor(Math.random() * 10) + 3;
  const setTwo = Math.floor(Math.random() * 10) + 90;
  snakeAndLadderUsedMap.add(setOne);
  snakeAndLadderUsedMap.add(setOne + 10);
  snakeAndLadderUsedMap.add(setTwo);
  snakeAndLadderUsedMap.add(setTwo - 10);
  snakeHeads.set(setTwo, setOne);
  snakeTails.set(setOne, setTwo);
  ladderHeads.set(setTwo - 10, setOne + 10);
  ladderTails.set(setOne + 10, setTwo - 10);

  for (let i = 0; i < snakes - 1 || i < ladders - 1; i++) {
    if (i < snakes - 1) {
      let oneSnake = Math.floor(Math.random() * 98) + 2;
      while (snakeAndLadderUsedMap.has(oneSnake)) {
        oneSnake = Math.floor(Math.random() * 98) + 2;
      }
      snakeAndLadderUsedMap.add(oneSnake);
      let twoSnake = Math.floor(Math.random() * 98) + 2;
      while (snakeAndLadderUsedMap.has(twoSnake)) {
        twoSnake = Math.floor(Math.random() * 98) + 2;
      }
      snakeAndLadderUsedMap.add(twoSnake);
      if (oneSnake < twoSnake) {
        snakeHeads.set(twoSnake, oneSnake);
        snakeTails.set(oneSnake, twoSnake);
      } else {
        snakeHeads.set(oneSnake, twoSnake);
        snakeTails.set(twoSnake, oneSnake);
      }
    }
    if (i < ladders - 1) {
      let oneLadder = Math.floor(Math.random() * 98) + 2;
      while (snakeAndLadderUsedMap.has(oneLadder)) {
        oneLadder = Math.floor(Math.random() * 98) + 2;
      }
      snakeAndLadderUsedMap.add(oneLadder);
      let twoLadder = Math.floor(Math.random() * 98) + 2;
      while (snakeAndLadderUsedMap.has(twoLadder)) {
        twoLadder = Math.floor(Math.random() * 98) + 2;
      }
      snakeAndLadderUsedMap.add(twoLadder);
      if (oneLadder < twoLadder) {
        ladderHeads.set(twoLadder, oneLadder);
        ladderTails.set(oneLadder, twoLadder);
      } else {
        ladderHeads.set(oneLadder, twoLadder);
        ladderTails.set(twoLadder, oneLadder);
      }
    }
  }
  return {
    snakeHeads,
    snakeTails,
    ladderHeads,
    ladderTails,
  };
}
