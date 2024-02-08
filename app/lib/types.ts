import { Dispatch, SetStateAction } from "react";

export interface SettingsProps {
  level: string,
  setLevel: Dispatch<SetStateAction<string>>,
  setWindow: Dispatch<SetStateAction<string>>,
}