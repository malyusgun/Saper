import { Dispatch, SetStateAction } from "react";

export interface GameComponentProps {
  setWindow: Dispatch<SetStateAction<string>>;
  gameCells: cellProps[];
  setGameCells: Dispatch<SetStateAction<cellProps[]>>;
  settings: settingsProps;
  setSettings: Dispatch<SetStateAction<settingsProps>>;
  gameState: string;
  setGameState: Dispatch<SetStateAction<string>>;
  createGameCells: (settings: settingsProps) => cellProps[];
  isDisabledResults:boolean,
  setIsDisabledResults: Dispatch<SetStateAction<boolean>>
}
export interface FieldProps {
  gameCells: cellProps[];
  setGameCells: Dispatch<SetStateAction<cellProps[]>>;
  settings: settingsProps;
  gameState: string;
  setGameState: Dispatch<SetStateAction<string>>;
  flagsCount: flagsAmountProps;
  setFlagsCount: Dispatch<SetStateAction<flagsAmountProps>>;
  timer: number;
  wasClick: boolean;
  setWasClick: Dispatch<SetStateAction<boolean>>;
  anchor: { value: number };
  setAnchor: Dispatch<SetStateAction<{ value: number }>>;
}
export interface settingsProps {
  level: "easy" | "medium" | "hard" | "custom";
  theme: "green-blue" | "yellow-blue" | "red-blue";
  width: number;
  height: number;
  cellsAmount: number;
  bombsAmount: number;
}
export interface SettingsComponentProps {
  setSettings: Dispatch<SetStateAction<settingsProps>>;
  setWindow: Dispatch<SetStateAction<string>>;
}
export interface cellProps {
  content: number;
  x: number;
  y: number;
  highlight: boolean;
  opened: boolean;
  timer: number;
  bomb: boolean;
  status: {
    status: "none" | "flag" | "unknown";
    isActive: boolean;
  }[];
  nextStatus: () => void;
  setDefaultStatus: () => void;
}
export interface cellCoords {
  x: number;
  y: number;
}
export interface flagsAmountProps {
  withBomb: number;
  all: number;
}
