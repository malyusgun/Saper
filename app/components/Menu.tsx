"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Game from "../components/Game";
import Settings from "../components/Settings";
import { createGameCells } from "../lib/utils";
import { getSettings } from "../lib/store/localstorage";
import { useAppDispatch } from "../lib/store/redux";
import { initActualResults } from "../lib/store/reducers/ResultsSlice";

const Menu = () => {
  const [window, setWindow] = useState("menu");
  const [settings, setSettings] = useState(getSettings())
  const [gameCells, setGameCells] = useState(() => createGameCells(settings));
  const [gameState, setGameState] = useState<string>("none");

  const dispatch = useAppDispatch()
  useEffect(() => {
    setSettings(getSettings())
  }, [])
  useEffect(() => {
    setGameCells(() => createGameCells(settings));
    setGameState("none");
    dispatch(initActualResults())
  }, [settings, dispatch]);

  
  return (
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
                  className="block w-full max-sm:p-2 p-4 text-center"
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
            }}
          />
        )}
        {window === "settings" && (
          <Settings {...{setSettings, setWindow }} />
        )}
      </div>
  );
}
export default Menu