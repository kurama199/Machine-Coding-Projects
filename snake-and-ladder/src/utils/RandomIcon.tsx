import { useEffect, useState } from "react";
import { DiceIcons } from "./Utils";

export const RandomIcon = ({
  onNumberChosen,
  play,
  resetPlay,
}: {
  onNumberChosen: (index: number) => void;
  play: boolean;
  resetPlay: () => void;
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const startChooseAnimation = () => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 6);
      setCurrIndex(randomIndex);
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
      setCurrIndex((prev) => {
        onNumberChosen(prev + 1);
        return prev;
      });
      setTimeout(() => {
        resetPlay();
      }, 0);
    }, 1500);
  };
  useEffect(() => {
    if (!play) {
      return;
    }
    startChooseAnimation();
  }, [play]);

  const FinalDice = DiceIcons[currIndex];
  return (
    <FinalDice
      size={50}
      style={{
        color: "#ff0000",
      }}
    />
  );
};
