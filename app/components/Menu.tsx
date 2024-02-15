"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Game from "../components/Game";
import Settings from "../components/Settings";
import { createGameCells } from "../lib/utils";
import { getSettings } from "../lib/store/localstorage";
import { useAppDispatch } from "../lib/store/redux";
import { initActualResults } from "../lib/store/reducers/ResultsSlice";
import SettingsCustom from "./SettingsCustom";
import clsx from "clsx";
import { settingsProps } from "../lib/types";

const Menu = () => {
  const [window, setWindow] = useState("menu");
  const [settings, setSettings] = useState<settingsProps>({
    level: 'easy',
    theme: 'green-blue',
    width: 8,
    height: 8,
    cellsAmount: 64,
    bombsAmount: 10,
  })
  useEffect(() => {
    setSettings(getSettings())
  }, [])
  const [gameCells, setGameCells] = useState(() => createGameCells(settings));
  const [gameState, setGameState] = useState<string>("none");
  const [isDisabledResults, setIsDisabledResults] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setGameCells(() => createGameCells(settings));
    setGameState("none");
    dispatch(initActualResults())
    settings.level === 'custom' ? setIsDisabledResults(true) : setIsDisabledResults(false)
  }, [settings, dispatch]);

  
  return (
      <main className={clsx("w-full h-full flex items-center justify-center max-sm:p-4 p-8 bg-gradient-to-br to-blue-400", {
        "from-green-300": settings.theme === 'green-blue' || !settings.theme,
        "from-yellow-300": settings.theme === 'yellow-blue',
        "from-red-300": settings.theme === 'red-blue'
      })}>
        <div onContextMenu={(e) => e.preventDefault()} className="select-none">
          {window === "menu" && (
            <div className="max-sm:w-[260px] w-[400px] mx-auto max-sm:p-3 p-5 bg-blue-200 border-4 border-solid border-white rounded-lg">
              <ul>
                <li className=" text-white max-sm:text-2xl text-3xl max-sm:m-4 m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
                  <button
                    className="w-full max-sm:p-2 p-4"
                    onClick={() => {
                      setWindow("game");
                      setGameState("play");
                      setGameCells(() => createGameCells(settings));
                    }}
                  >
                    Играть
                  </button>
                </li>
                <li className=" text-white max-sm:text-2xl text-3xl max-sm:m-4 m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
                  <button
                    className="w-full max-sm:p-2 p-4"
                    onClick={() => setWindow("settings")}
                  >
                    Настройки
                  </button>
                </li>
                <li className=" text-white max-sm:text-2xl text-3xl max-sm:m-4 m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
                  <Link
                    className={clsx("block w-full max-sm:p-2 p-4 text-center",{
                      "bg-blue-800 text-slate-400 cursor-not-allowed pointer-events-none": isDisabledResults,
                    })}
                    href="/statistic" replace
                  >
                    Таблица лидеров
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {window === "game" && (
            <Game
              {...{
                setWindow,
                settings,
                setSettings,
                gameCells,
                setGameCells,
                gameState,
                setGameState,
                createGameCells,
                isDisabledResults,
                setIsDisabledResults
              }}
            />
          )}
          {window === "settings" && (
            <Settings {...{setSettings, setWindow }} />
          )}
          {window === "settingsCustom" && (
            <SettingsCustom {...{settings, setSettings, setWindow }} />
          )}
        </div>
      </main>
  );
}
export default Menu