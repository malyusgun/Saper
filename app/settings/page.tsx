'use client'

import { FaBomb } from "react-icons/fa";
import { SettingsProps } from "../lib/types";

const Settings:React.FC<SettingsProps> = ({level, setLevel, setWindow}) => {
  return (
    <div className=" w-[300px] relative mx-auto p-5 bg-blue-200 border-4 border-solid border-blue-500 rounded-lg">
      <h2 className="font-bold text-4xl text-center">
        Выберите уровень сложности:
      </h2>
      <ul>
        <li
          className="relative text-white m-8 text-3xl rounded-lg bg-green-500 hover:bg-green-700"
          onClick={() => setLevel("easy")}
        >
          <button className="w-full p-5">Лёгкий</button>
          {level === "easy" && (
            <FaBomb className="absolute top-5 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => setLevel("medium")}
          className="relative text-white m-8 text-3xl rounded-lg bg-yellow-500 hover:bg-yellow-700"
        >
          <button className="w-full p-5">Средний</button>
          {level === "medium" && (
            <FaBomb className="absolute top-5 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => setLevel("hard")}
          className="relative text-white m-8 text-3xl rounded-lg bg-red-500 hover:bg-red-700"
        >
          <button className="w-full p-5">Трудный</button>
          {level === "hard" && (
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
