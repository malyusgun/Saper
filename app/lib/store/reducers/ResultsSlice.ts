import { createSlice } from "@reduxjs/toolkit";
import results from "../../placeholder-data";
import { changeResults, getResults } from "../localstorage";

interface ResultsState {
  results: {
    easy: {
      id: number | string;
      name: string;
      time: string;
    }[];
    medium: {
      id: number | string;
      name: string;
      time: string;
    }[];
    hard: {
      id: number | string;
      name: string;
      time: string;
    }[];
  };
  level: string;
}

export const initialState: ResultsState = {
  results: results,
  level: "easy",
};

const ResultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addNewRecord(state, action) {
      let players = state.results[state.level as keyof typeof state.results];
      const place = players.findIndex(
        (player) => player.time > action.payload.timer
      );
      if (place !== -1) {
        //   Если Вы попадаете в Топ-10 на этой сложности
        let newCell = {
          id: new Date().toISOString(),
          name: "Вы",
          time: action.payload.timer,
        };
        const index = players.findIndex((player) => player.name === "Вы");
        if (index !== -1) {
          // Если Вы уже попадали в Топ-10 на этой сложности
          if (players[index].time <= action.payload.timer) return; // Если собственный рекорд не побит
          players[index] = newCell;
        } else {
          players[9] = newCell;
        }
        players.sort((a, b) => +a.time - +b.time);
        changeResults(players, state.level);
      }
    },
    initActualResults(state) {
          state.results = getResults()
    },
    switchLevel(state, action) {
      switch (action.payload) {
        case "easy":
          state.level = "easy";
          changeResults(state.results[state.level as keyof typeof state.results], "easy");
          break;
        case "medium":
          state.level = "medium";
          changeResults(state.results[state.level as keyof typeof state.results], "medium");
          break;
        case "hard":
          state.level = "hard";
          changeResults(state.results[state.level as keyof typeof state.results], "hard");
          case "custom":
            state.level = "custom";
            changeResults(state.results[state.level as keyof typeof state.results], "custom");
          break;
      }
    },
  },
});

export const { addNewRecord, switchLevel, initActualResults } = ResultsSlice.actions;
export default ResultsSlice.reducer;
