import {
  ArrowDownCircle,
  ArrowUpCircle,
  LineSquiggle,
  WavesLadder,
} from "lucide-react";
import { cn } from "./Utils";
export interface snakeOrLadderBlockInterface {
  inputNumber?: number;
  className?: string;
  isLadder?: boolean;
  isHead?: boolean;
}
export const SnakeOrLadderBlock = ({
  inputNumber = 0,
  className = "",
  isLadder = false,
  isHead = false,
}: snakeOrLadderBlockInterface) => {
  const mainTitle = isLadder ? "LH" : "ST";
  const subTitle = isLadder && !isHead ? "LH" : !isLadder && isHead ? "ST" : "";
  return (
    <div className={cn("w-full h-full flex relative text-gray-900", className)}>
      <div className="flex items-center justify-center font-sans font-bold text-lg flex-1">
        {isLadder && !isHead ? (
          <WavesLadder />
        ) : isHead && !isLadder ? (
          <LineSquiggle />
        ) : (
          mainTitle
        )}
        <span className="absolute right-1 bottom-0 font-normal text-xs flex items-center">
          {isLadder && !isHead ? (
            <ArrowUpCircle size={10} />
          ) : !isLadder && isHead ? (
            <ArrowDownCircle size={10} />
          ) : null}
          {subTitle ? `${subTitle}-${inputNumber}` : ""}
        </span>
      </div>
    </div>
  );
};
