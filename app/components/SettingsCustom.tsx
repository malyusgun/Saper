"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { switchLevel } from "../lib/store/reducers/ResultsSlice";
import { changeSettings } from "../lib/store/localstorage";
import { settingsProps } from "../lib/types";
import { useAppDispatch } from "../lib/store/redux";
import { decreaseCells, increaseCells, updateCustomSettings } from "../lib/utils";

export default function SettingsCustom({
  settings,
  setSettings,
  setWindow,
}: {
  settings: settingsProps,
  setSettings: Dispatch<SetStateAction<settingsProps>>;
  setWindow: Dispatch<SetStateAction<string>>;
}) {
  const [bombsCount, setBombsCount] = useState<number>(8);
  const [cellsCount, setCellsCount] = useState<number>(64);
  const [settingsCustom, setSettingsCustom] = useState<settingsProps>({
    level: "custom",
    theme: settings.theme,
    width: 8,
    height: 8,
    bombsAmount: 8,
    cellsAmount: 8,
  });
  const [index, setIndex] = useState<number>(5);
  const allValues = [
    16, 24, 32, 40, 48, 64, 80, 100, 120, 144, 168, 192, 216, 256, 320, 384,
    448, 512,
  ];
  useEffect(() => {
    updateCustomSettings(settingsCustom, setSettingsCustom, cellsCount, bombsCount, setBombsCount)
  }, [cellsCount, bombsCount, settingsCustom]);
  const dispatch = useAppDispatch();
  return (
    <div className="max-sm:w-[200px] w-[250px] mx-auto p-8 pt-4 pb-16 bg-blue-200 border-4 border-solid border-blue-500 rounded-lg relative flex flex-col items-center">
      <span className="inline-block my-2 text-xl font-bold">
        Количество бомб:
      </span>
      <input
        type="range"
        value={bombsCount}
        onChange={(e) => setBombsCount(Math.floor(+e.target.value))}
        className="block w-20 mb-2 text-xl mx-auto font-bold text-center  bg-white"
        min={Math.floor(cellsCount / 8)}
        max={Math.ceil(cellsCount / 3)}
      />
      <p className="w-16 p-2 text-xl bg-white text-black text-center font-bold border-2 border-solid border-black">{bombsCount}</p>
      <span className="inline-block mt-2 mb-4 text-xl font-bold">
        Количество клеток:
      </span>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => decreaseCells(index, setIndex, setCellsCount, allValues)}
          className="text-3xl text-blue-500 bg-white p-3 font-bold border-2 border-solid border-black"
        >
          -
        </button>
        <p className="w-16 p-2 text-xl bg-white text-black text-center font-bold border-2 border-solid border-black border-x-0">{cellsCount}</p>
        <button
          onClick={() => increaseCells(index, setIndex, setCellsCount, allValues)}
          className="text-3xl text-blue-500 bg-white p-3 font-bold border-2 border-solid border-black"
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          setSettings(
            changeSettings("custom", window.screen.width, settingsCustom)
          );
          dispatch(switchLevel("custom"));
          setWindow("menu");
        }}
        className="absolute bottom-4 right-1/2 left-1/2 -translate-x-1/2 w-max p-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white text-xl"
      >
        Применить
      </button>
      <div
        className="absolute top-2 right-2 text-xl cursor-pointer p-2"
        onClick={() => setWindow("menu")}
      >
        &#10006;
      </div>
    </div>
  );
}
