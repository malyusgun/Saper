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
  isDisabledResults
}) => {
  const field = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<number>(0);
  const [wasClick, setWasClick] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<{value:number}>({value:5})
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
  }, [createGameCells, setGameCells, setSettings, settings]); // в DevTools/Toogle Device Toolbar поле ломается, но при смене настроек перестраивается правильно (window.screen.width в зависимостях выдаёт предупреждение)

  const [flagsCount, setFlagsCount] = useState<flagsAmountProps>({
    withBomb: 0,
    all: 0,
  });
  useEffect(() => {
    setGameState("play");
  },[setGameState])
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
            "from-green-400 to-green-600": settings.level === "easy",
            "from-yellow-200 to-yellow-400": settings.level === "medium",
            "from-red-400 to-red-600": settings.level === "hard",
            "from-purple-600 to-purple-900": settings.level === "custom",
          }
        )}
      >
        <div className="relative mx-auto" key={Math.random()}>
          {
            <>
              <div className={clsx("absolute max-md:w-12 max-lg:w-16 w-20 bg-black text-red-600 max-md:text-xs max-lg:text-sm text-xl font-bold text-center py-1",{
                "-top-6 md:-top-8 left-1/2 right-1/2 -translate-x-1/2": settings.width < 8,
                "top-0 left-0": settings.width >= 8
              })}>
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
              <div className={clsx("max-md:w-6 max-md:h-6 max-lg:w-10 max-lg:h-10 w-12 h-12 mx-auto max-md:mb-2 max-lg:mb-3 mb-4 max-md:border-[1px] border-2 border-solid border-slate-500 bg-yellow-200 flex justify-center items-center", {
                "mt-1 mb-1": settings.width < 8
              })}>
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
                    className="max-md:w-5 max-md:h-5 max-lg:w-8 max-lg:h-8 w-10 h-10 m-auto cursor-pointer"
                    onMouseDown={rebuildField}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className={clsx("absolute w-8 md:w-12 lg:w-16 z-10 top-0 right-1 bg-black text-red-600 p-[2px] max-md:text-sm max-lg:text-xl text-3xl font-bold text-center", {
                "hidden": settings.width < 8
              })}>
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
              setWasClick,anchor, setAnchor
            }}
          />
        </div>
      </div>
      <Link
        className={clsx("absolute w-40 -z-10 h-16 p-1 pb-4 bg-blue-500 text-white text-base font-bold flex justify-center items-start border-solid border-white border-4 rounded-xl -top-10 left-1/2 -translate-x-1/2 hover:-top-12 transition-all duration-300",{
          "bg-blue-800 text-slate-400 cursor-not-allowed pointer-events-none": isDisabledResults,
          "hidden": settings.width < 8
        })}
        href={"/statistic"}
      >
        Таблица лидеров
      </Link>
      <button
        className={clsx("absolute -z-10 h-16 p-1 pt-4 bg-blue-500 text-white text-base font-bold flex justify-center items-end border-solid border-white border-4 rounded-xl -bottom-10 left-1/2 -translate-x-1/2 hover:-bottom-12 transition-all duration-300", {
          "w-40": settings.width >= 8,
          "text-sm w-24": settings.width < 8
        })}
        onClick={() => setWindow("settings")}
      >
        Настройки
      </button>
    </div>
  );
};

export default Game;
