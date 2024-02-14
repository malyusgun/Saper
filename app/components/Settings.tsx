'use client'

import { FaBomb } from "react-icons/fa";
import { SettingsComponentProps } from "../lib/types";
import { switchLevel } from "../lib/store/reducers/ResultsSlice";
import { useAppDispatch } from "../lib/store/redux";
import { changeSettings, getSettings } from "../lib/store/localstorage";

const Settings:React.FC<SettingsComponentProps> = ({setSettings, setWindow}) => {
  const dispatch = useAppDispatch()
  const {level} = getSettings()
  return (
    <div className="max-sm:w-[250px] w-[300px] relative mx-auto p-5 bg-blue-200 border-4 border-solid border-blue-500 rounded-lg">
      <h2 className="font-bold max-sm:text-3xl text-4xl text-center">
        Выберите уровень сложности:
      </h2>
      <ul>
        <li
          className="relative text-white max-sm:m-4 m-8 max-sm:text-2xl text-3xl rounded-lg bg-green-500 hover:bg-green-700"
          onClick={() => {
            setSettings(changeSettings('easy'))
            dispatch(switchLevel('easy'))
          }}
        >
          <button className="w-full max-sm:p-3 p-5">Лёгкий</button>
          {level === "easy" && (
            <FaBomb className="absolute top-5 max-sm:-left-8 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => {
            setSettings(changeSettings('medium'))
            dispatch(switchLevel('medium'))
          }}
          className="relative text-white max-sm:m-4 m-8 max-sm:text-2xl text-3xl rounded-lg bg-yellow-500 hover:bg-yellow-700"
        >
          <button className="w-full max-sm:p-3 p-5">Средний</button>
          {level === "medium" && (
            <FaBomb className="absolute top-5 max-sm:-left-8 -left-10 text-black" />
          )}
        </li>
        <li
          onClick={() => {
            setSettings(changeSettings('hard', window.screen.width))
            dispatch(switchLevel('hard'))
          }}
          className="relative text-white max-sm:m-4 m-8 max-sm:text-2xl text-3xl rounded-lg bg-red-500 hover:bg-red-700"
        >
          <button className="w-full max-sm:p-3 p-5">Сложный</button>
          {level === "hard" && (
            <FaBomb className="absolute top-5 max-sm:-left-8 -left-10 text-black" />
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
