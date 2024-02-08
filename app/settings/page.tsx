'use client'

import { FaBomb } from "react-icons/fa";
import { SettingsComponentProps } from "../lib/types";

const Settings:React.FC<SettingsComponentProps> = ({settings, setSettings, setWindow}) => {
  return (
    <div className=" w-[300px] relative mx-auto p-5 bg-blue-200 border-4 border-solid border-blue-500 rounded-lg">
      <h2 className="font-bold text-4xl text-center">
        Выберите уровень сложности:
      </h2>
      <ul>
        <li
          className="relative text-white m-8 text-3xl rounded-lg bg-green-500 hover:bg-green-700"
          onClick={() => setSettings({
            level: "easy",
            width: 8,
            height: 8,
            cellsAmount: 64,
            bombsAmount: 10,
          })}
        >
          <button className="w-full p-5">Лёгкий</button>
          {settings.level === "easy" && (
            <FaBomb className="absolute top-5 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => setSettings({
            level: "medium",
            width: 16,
            height: 16,
            cellsAmount: 256,
            bombsAmount: 40,
          })}
          className="relative text-white m-8 text-3xl rounded-lg bg-yellow-500 hover:bg-yellow-700"
        >
          <button className="w-full p-5">Средний</button>
          {settings.level === "medium" && (
            <FaBomb className="absolute top-5 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => setSettings({
            level: "hard",
            width: 32,
            height: 16,
            cellsAmount: 512,
            bombsAmount: 100,
          })}
          className="relative text-white m-8 text-3xl rounded-lg bg-red-500 hover:bg-red-700"
        >
          <button className="w-full p-5">Трудный</button>
          {settings.level === "hard" && (
            <FaBomb className="absolute top-5 -left-10 text-black" />
          )}
        </li>
      </ul>
      <div
        className="absolute top-2 right-2 text-xl cursor-pointer p-2"
        onClick={() => setWindow("menu")}
      >
        &#10006;
      </div>
    </div>
  )
};

export default Settings
