"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Game from "./game/page";
import Settings from "./settings/page";
import { cellCoords, settingsProps } from "./lib/types";
import { createBackCells, createFrontCells } from "./lib/utils";

export default function Home() {
  const [window, setWindow] = useState("menu");
  const [settings, setSettings] = useState<settingsProps>({
    level: "easy",
    width: 8,
    height: 8,
    cellsAmount: 64,
    bombsAmount: 10,
  });
  const [frontCells, setFrontCells] = useState<Set<cellCoords>>(new Set())
  const [backCells, setBackCells] = useState(() => createBackCells(settings))
  const [gameState, setGameState] = useState<string>('play')
  useEffect(() => {
    setBackCells(() => createBackCells(settings))
    setGameState('play')
  }, [settings])

  useEffect(() => {
    setFrontCells(() => createFrontCells(settings, backCells))
  }, [ backCells ])
  return (
    <>
      {window === "menu" && (
        <div className=" w-[400px] mx-auto p-5 bg-blue-200 border-4 border-solid border-white rounded-lg">
        <ul>
          <li className=" text-white text-3xl m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
            <button className="w-full p-4" onClick={() => setWindow("game")}>
              Играть
            </button>
          </li>
          <li className=" text-white text-3xl m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
            <button
              className="w-full p-4"
              onClick={() => setWindow("settings")}
            >
              Настройки
            </button>
          </li>
          <li className=" text-white text-3xl m-6 rounded-lg bg-blue-500 hover:bg-blue-700">
            <Link
              className="block w-full p-4 text-center"
              href={'/statistic'}
            >
              Таблица лидеров
            </Link>
          </li>
        </ul>
      </div>
      )}
      {window === "game" && <Game {...{
  setWindow,
  frontCells,
  setFrontCells,
  backCells,
  setBackCells,
  settings,
  gameState,
  setGameState,
  createBackCells,
  createFrontCells,
}}/>}
      {window === "settings" && (
        <Settings {...{ settings, setSettings, setWindow }} />
      )}
    </>
  );
}
