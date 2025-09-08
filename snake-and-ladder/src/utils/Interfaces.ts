export interface SnakeAndLadderGameProps {
  snakes: number;
  ladders: number;
  playerNames: string[];
}
export const enum ongoingTurnTypes {
  shouldStart = "ShouldStart",
  ended = "ended",
  onGoing = "onGoing",
}
export interface ExtendedSnakeAndLadderGameProps
  extends SnakeAndLadderGameProps {
  restartGame: () => void;
}
export interface GameTurnDataProps {
  currPlayer: string;
  currIndex: number;
  isOngoingTurn: ongoingTurnTypes;
  startNextTurn: boolean;
}
export interface playerDataProps {
  gameTurnData: GameTurnDataProps;
  playerNames: string[];
  playersWon: string[];
  playerPosition: number[];
}
