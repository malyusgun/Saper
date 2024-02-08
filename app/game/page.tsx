'use client'

import { useEffect, useRef, useState } from "react"
import buildField from "../lib/buildField"
import { FaBomb } from "react-icons/fa"
import { PiSmileyXEyes } from "react-icons/pi"
import { CgSmileMouthOpen } from "react-icons/cg"
import { CiFaceSmile } from "react-icons/ci"
import clsx from "clsx"
import { GameProps, flagsAmountProps } from "../lib/types"

export const Game:React.FC<GameProps> = ({
  setWindow,
  frontCells,
  setFrontCells,
  settings,
  backCells,
  setBackCells,
  gameState,
  setGameState,
  createBackCells,
  createFrontCells,
}) => {
  const field = useRef<HTMLDivElement>(null)

  useEffect(() => {
    field.current!.style.width = `${32 * settings.width}px`
    field.current!.style.height = `${32 * settings.height}px`
  },[settings])

  const [flagsCount, setFlagsCount] = useState<flagsAmountProps>({
    withBomb: 0,
    all: 0,
  });

  const rebuildField = () => {
    setBackCells(() => createBackCells(settings));
    setFrontCells(createFrontCells(settings, backCells));
    setGameState("play");
    setFlagsCount({
      withBomb: 0,
      all: 0,
    });
  }

  return (
    <div
      ref={field}
      className={clsx(
        "p-8 pt-10 pb-20 box-content bg-gradient-to-br border-4 border-solid border-white rounded-lg",
        {
          "from-green-400 to-green-600": settings.level === "easy",
          "from-yellow-200 to-yellow-400": settings.level === "medium",
          "from-red-400 to-red-600": settings.level === "hard",
        }
      )}
    >
      <div className="relative mx-auto" key={Math.random()}>
        {
          <>
            <div
              className="arrow absolute -top-2 -left-2 cursor-pointer"
              onClick={() => setWindow("menu")}
            ></div>
            <div className="w-12 h-12 mx-auto mb-4 bg-white border-2 border-solid border-slate-500 bg-yellow-200">
              {gameState === "play" ? (
                <CiFaceSmile
                  className="w-10 h-10 m-auto cursor-pointer"
                  onClick={rebuildField}
                />
              ) : gameState === "lose" ? (
                <PiSmileyXEyes
                  className="w-10 h-10 m-auto cursor-pointer"
                  onClick={rebuildField}
                />
              ) : (
                <CgSmileMouthOpen
                  className="w-10 h-10 m-auto cursor-pointer"
                  onClick={rebuildField}
                />
              )}
            </div>
            <div className="absolute top-0 right-9 bg-black text-red-600 p-1 text-3xl font-bold">
              {settings.bombsAmount}
            </div>
            <FaBomb className="absolute top-1 right-0 text-3xl" />
          </>
        }
        {buildField(
          frontCells,
          setFrontCells,
          backCells,
          settings,
          gameState,
          setGameState,
          flagsCount,
          setFlagsCount
        )}
      </div>
    </div>
  );
};

export default Game
