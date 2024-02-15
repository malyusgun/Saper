"use client";

import Link from "next/link";
import Player from "../ui/Player";
import { getPlayers, getSettings } from "../lib/store/localstorage";
import clsx from "clsx";
import { settingsProps } from "../lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  let level = 'easy'
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
  level = settings?.level
  let players = getPlayers(level)
  let copy = players ? [...players] : [{}];
  return (
    <main className={clsx("w-full h-full flex items-center justify-center max-sm:p-4 p-8 bg-gradient-to-br to-blue-400 ",{
      "from-green-300": settings.theme === 'green-blue' || !settings.theme,
      "from-yellow-300": settings.theme === 'yellow-blue',
      "from-red-300": settings.theme === 'red-blue',
    })}>
      <div className="relative z-10 select-none" onContextMenu={(e) => e.preventDefault()}>
        <div className="max-sm:w-[280px] w-[400px] mx-auto bg-blue-500 border-4 border-white border-solid rounded-lg">
          <h1 className="mt-2 mb-4 text-center text-white font-bold text-3xl">
            Таблица лидеров
          </h1>
          <table className="border-collapse w-full border-2 border-solid border-blue-500">
            <tbody>
              {copy
                .sort((a, b) => +a.time - +b.time)
                .map((player, i) => (
                  <Player key={player.id} index={i} {...player} />
                ))}
            </tbody>
          </table>
          <Link className="absolute -z-10 h-16 p-2 pb-4 bg-blue-500 text-white text-lg font-bold flex justify-center items-start border-solid border-white border-4 rounded-xl -top-10 left-1/2 -translate-x-1/2 hover:-top-12 transition-all duration-300" href='/'>
            Меню
          </Link>
        </div>
      </div>
    </main>
  );
}
