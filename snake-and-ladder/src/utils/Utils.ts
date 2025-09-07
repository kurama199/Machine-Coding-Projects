import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
export const borderColors = [
  "rgba(0, 153, 0, .6)",
  "rgba(66, 135, 245, .6)",
  "rgba(245, 66, 105, .6)",
  "rgba(245, 218, 66, .6)",
];
export const playerColors = [
  "rgba(0, 153, 0)",
  "rgba(66, 135, 245)",
  "rgba(245, 66, 105)",
  "rgba(245, 218, 66)",
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

  for (let i = 0; i < snakes; i++) {
    let one = Math.floor(Math.random() * 98) + 2;
    while (snakeAndLadderUsedMap.has(one)) {
      one = Math.floor(Math.random() * 98) + 2;
    }
    snakeAndLadderUsedMap.add(one);
    let two = Math.floor(Math.random() * 98) + 2;
    while (snakeAndLadderUsedMap.has(two)) {
      two = Math.floor(Math.random() * 98) + 2;
    }
    snakeAndLadderUsedMap.add(two);
    if (one < two) {
      snakeHeads.set(two, one);
      snakeTails.set(one, two);
    } else {
      snakeHeads.set(one, two);
      snakeTails.set(two, one);
    }
  }

  for (let i = 0; i < ladders; i++) {
    let one = Math.floor(Math.random() * 98) + 2;
    while (snakeAndLadderUsedMap.has(one)) {
      one = Math.floor(Math.random() * 98) + 2;
    }
    snakeAndLadderUsedMap.add(one);
    let two = Math.floor(Math.random() * 98) + 2;
    while (snakeAndLadderUsedMap.has(two)) {
      two = Math.floor(Math.random() * 98) + 2;
    }
    snakeAndLadderUsedMap.add(two);
    if (one < two) {
      ladderHeads.set(two, one);
      ladderTails.set(one, two);
    } else {
      ladderHeads.set(one, two);
      ladderTails.set(two, one);
    }
  }
  return {
    snakeHeads,
    snakeTails,
    ladderHeads,
    ladderTails,
  };
}
