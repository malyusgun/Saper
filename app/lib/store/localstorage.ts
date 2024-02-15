import { settingsProps } from "../types";

export const initResults = (results: any) => {
  try {
    const resultsThere = localStorage.getItem("results");
    if (!resultsThere) {
      const resultsState = JSON.stringify(results);
      localStorage.setItem("results", resultsState);
    } else return;
  } catch (error) {
    console.log(error);
  }
};

export const getResults = () => {
  try {
    const resultsState = localStorage.getItem("results");
    if (resultsState) {
      return JSON.parse(resultsState);
    }
  } catch (error) {
    return undefined;
  }
};

export const changeResults = (
  state: {
    id: number | string;
    name: string;
    time: string;
  }[],
  level: string
) => {
  try {
    const resultsState = localStorage.getItem("results");
    if (resultsState) {
      let parsed = JSON.parse(resultsState);
      parsed[level] = state;
      localStorage.setItem("results", JSON.stringify(parsed));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPlayers = (level: string) => {
  try {
    const resultsState = localStorage.getItem("results");
    if (resultsState) {
      let parsed = JSON.parse(resultsState);
      return parsed[level];
    }
  } catch (error) {
    return undefined;
  }
};
export const initSettings = (settings: settingsProps) => {
  try {
    const settingsThere = localStorage.getItem("settings");
    if (!settingsThere) {
      const settingsState = JSON.stringify(settings);
      localStorage.setItem("settings", settingsState);
    } else return;
  } catch (error) {
    console.log(error);
  }
};

export const getSettings = () => {
  try {
    const settingsState = localStorage.getItem("settings");
    if (settingsState) {
      return JSON.parse(settingsState);
    }
  } catch (error) {
    return undefined;
  }
};

export const changeTheme = (theme:string) => {
  try {
    const settingsState = localStorage.getItem("settings");
    if (settingsState) {
      let parsed = JSON.parse(settingsState);
      parsed.theme = theme
      localStorage.setItem("settings", JSON.stringify(parsed))
      return parsed
    }
  } catch (error) {
    console.log(error)
  }
}

export const changeSettings = (
  level: string,
  width?: number,
  settings?: settingsProps
) => {
  try {
    const settingsState = localStorage.getItem("settings");
    if (settingsState) {
      let parsed = JSON.parse(settingsState);
      switch (level) {
        case "easy":
          parsed = {
            level: "easy",
            theme: parsed.theme,
            width: 8,
            height: 8,
            cellsAmount: 64,
            bombsAmount: 10,
          };
          break;
        case "medium":
          parsed = {
            level: "medium",
            theme: parsed.theme,
            width: 16,
            height: 16,
            cellsAmount: 256,
            bombsAmount: 40,
          };
          break;
        case "hard":
          parsed = {
            level: "hard",
            theme: parsed.theme,
            width: 32,
            height: 16,
            cellsAmount: 512,
            bombsAmount: 100,
          };
          break;
        case "custom":
          parsed = settings;
      }
      if (
        width &&
        width < 520 &&
        parsed.cellsAmount > 256 &&
        parsed.width > 16
      ) {
        let newSettings = { ...parsed };
        newSettings.width = parsed.height;
        newSettings.height = parsed.width;
        parsed = newSettings;
      }
      localStorage.setItem("settings", JSON.stringify(parsed));
      return parsed;
    }
  } catch (error) {
    console.log(error);
  }
};
