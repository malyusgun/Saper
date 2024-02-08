import { Dispatch, SetStateAction } from "react";

export interface GameProps {
  setWindow: Dispatch<SetStateAction<string>>,
  frontCells: Set<cellCoords>,
  setFrontCells: Dispatch<SetStateAction<Set<cellCoords>>>,
  backCells: cellProps[],
  setBackCells: Dispatch<SetStateAction<cellProps[]>>,
  settings: settingsProps,
  gameState: string,
  setGameState: Dispatch<SetStateAction<string>>,
  createBackCells: (settings: settingsProps) => cellProps[],
  createFrontCells: (settings: settingsProps, backCells: cellProps[]) => Set<cellCoords>
}
export interface settingsProps {
  level: 'easy' | 'medium' | 'hard',
  width: number,
  height: number,
  cellsAmount: number,
  bombsAmount: number,
}
export interface SettingsComponentProps {
  settings: settingsProps,
  setSettings: Dispatch<SetStateAction<settingsProps>>,
  setWindow: Dispatch<SetStateAction<string>>,
}
export interface cellProps {
  content: number,
  x: number,
  y: number,
  opened: boolean,
  bomb: boolean,
  status: {
    status: "none" | "flag" | "unknown",
    isActive: boolean,
  }[],
  nextStatus: () => void
}
export interface cellCoords {
  x: number,
  y: number
}
export interface flagsAmountProps {
  withBomb: number,
  all: number,
}