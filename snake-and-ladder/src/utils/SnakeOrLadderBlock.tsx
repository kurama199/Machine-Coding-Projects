import { MoveDown, Rocket } from "lucide-react";
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
  const mainTitle = isLadder ? (isHead ? "LH" : "LT") : isHead ? "SH" : "ST";
  const subTitle = isLadder && !isHead ? "LH" : !isLadder && isHead ? "ST" : "";
  return (
    <div className={cn("w-full h-full flex relative text-gray-900", className)}>
      <div className="flex items-center justify-center font-sans font-bold text-lg flex-1">
        {mainTitle}
        <span className="absolute right-1 bottom-0 font-normal text-xs flex items-center">
          {isLadder && !isHead ? (
            <Rocket size={10} />
          ) : !isLadder && isHead ? (
            <MoveDown size={10} />
          ) : null}
          {subTitle ? `${subTitle}-${inputNumber}` : ""}
        </span>
      </div>
    </div>
  );
};
