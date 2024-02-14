"use client";

import { useEffect, useRef, useState } from "react";
import Field from "../ui/Field";
import { PiSmileyXEyes } from "react-icons/pi";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CiFaceSmile } from "react-icons/ci";
import clsx from "clsx";
import { GameComponentProps, flagsAmountProps } from "../lib/types";
import Link from "next/link";
import { getSettings } from "../lib/store/localstorage";

const Game: React.FC<GameComponentProps> = ({
  setWindow,
  settings,
  setSettings,
  gameCells,
  setGameCells,
  gameState,
  setGameState,
  createGameCells,
}) => {
  const settingsInfo = getSettings();
  const field = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<number>(0);
  const [wasClick, setWasClick] = useState<boolean>(false);
  let timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (gameState === "play") {
      const intervalId = setInterval(() => setTimer((timer) => ++timer), 1000);
      timerId.current = intervalId;
      setFlagsCount({
        withBomb: 0,
        all: 0,
      });
    }
    return () => {
      setTimer(0);
      clearInterval(timerId.current!);
    };
  }, [gameState]);

  useEffect(() => {
    let px = 32;
    if (window.screen.width < 1280) px = 28;
    if (window.screen.width < 1024) px = 20;
    if (window.screen.width < 768) px = 14;
    field.current!.style.width = `${px * settings.width}px`;
    field.current!.style.height = `${px * settings.height}px`;
  }, [createGameCells, setGameCells, setSettings, settings]);

  const [flagsCount, setFlagsCount] = useState<flagsAmountProps>({
    withBomb: 0,
    all: 0,
  });

  const rebuildField = () => {
    setTimer(0);
    clearInterval(timerId.current!);
    const intervalId = setInterval(() => setTimer((timer) => ++timer), 1000);
    timerId.current = intervalId;
    setWasClick(false);
    setGameState("play");
    setGameCells(() => createGameCells(settings));
    setFlagsCount({
      withBomb: 0,
      all: 0,
    });
  };

  return (
    <div className="relative z-10">
      <div
        ref={field}
        className={clsx(
          "max-md:p-4 max-md:pt-5 max-md:pb-10 p-8 pt-10 pb-20 box-content bg-gradient-to-br border-4 border-solid border-white rounded-lg",
          {
            "from-green-400 to-green-600": settingsInfo.level === "easy",
            "from-yellow-200 to-yellow-400": settingsInfo.level === "medium",
            "from-red-400 to-red-600": settingsInfo.level === "hard",
          }
        )}
      >
        <div className="relative mx-auto" key={Math.random()}>
          {
            <>
              <div className="absolute max-md:w-12 max-lg:w-16 w-20 top-0 left-0 bg-black text-red-600 max-md:text-xs max-lg:text-sm text-xl font-bold text-center py-1">
                <span className="bg-black max-sm:w-2 mx-[1px] md:mx-[2px] max-lg:w-2 w-3 inline-block">
                  {Math.floor(timer / 600)}
                </span>
                <span className="bg-black max-sm:w-2 mx-[1px] md:mx-[2px] max-lg:w-2 w-3 inline-block">
                  {Math.floor((timer % 600) / 60)}
                </span>
                <span className="bg-black w-1 px-[2px] inline-block text-center">
                  :
                </span>
                <span className="bg-black max-sm:w-2 mx-[1px] md:mx-[2px] max-lg:w-2 w-3 inline-block">
                  {Math.floor((timer % 60) / 10)}
                </span>
                <span className="bg-black max-sm:w-2 mx-[1px] md:mx-[2px] max-lg:w-2 w-3 inline-block">
                  {Math.floor(timer % 10)}
                </span>
              </div>
              <div className="max-md:w-6 max-md:h-6 max-lg:w-10 max-lg:h-10 w-12 h-12 mx-auto max-md:mb-2 max-lg:mb-3 mb-4 max-md:border-[1px] border-2 border-solid border-slate-500 bg-yellow-200 flex justify-center items-center">
                {gameState === "play" ? (
                  <CiFaceSmile
                    className="max-md:w-5 max-md:h-5 max-lg:w-8 max-lg:h-8 w-10 h-10 m-auto cursor-pointer"
                    onMouseDown={rebuildField}
                  />
                ) : gameState === "lose" ? (
                  <PiSmileyXEyes
                    className="max-md:w-5 max-md:h-5 max-lg:w-8 max-lg:h-8 w-10 h-10 m-auto cursor-pointer"
                    onMouseDown={rebuildField}
                  />
                ) : gameState === "win" ? (
                  <CgSmileMouthOpen
                    className="max-md:w-5 max-md:h-5 max-md:w-8 max-md:h-8 w-10 h-10 m-auto cursor-pointer"
                    onMouseDown={rebuildField}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="absolute w-8 md:w-12 lg:w-16 z-10 top-0 right-1 bg-black text-red-600 p-[2px] max-md:text-sm max-lg:text-xl text-3xl font-bold text-center">
                {settings.bombsAmount -
                  gameCells.filter((cell) => cell.status[1].isActive).length}
              </div>
            </>
          }
          <Field
            {...{
              gameCells,
              setGameCells,
              settings,
              gameState,
              setGameState,
              flagsCount,
              setFlagsCount,
              timer,
              wasClick,
              setWasClick,
            }}
          />
        </div>
      </div>
      <Link
        className="absolute inline-block w-40 -z-10 h-16 p-2 pb-4 bg-blue-500 text-white text-base font-bold flex justify-center items-start border-solid border-white border-4 rounded-xl -top-10 left-1/2 -translate-x-1/2 hover:-top-12 transition-all duration-300"
        href={"/statistic"}
      >
        Таблица лидеров
      </Link>
      <button
        className="absolute inline-block w-40 -z-10 h-16 p-2 pt-4 bg-blue-500 text-white text-base font-bold flex justify-center items-end border-solid border-white border-4 rounded-xl -bottom-10 left-1/2 -translate-x-1/2 hover:-bottom-12 transition-all duration-300"
        onClick={() => setWindow("settings")}
      >
        Настройки
      </button>
    </div>
  );
};

export default Game;
