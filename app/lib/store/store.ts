import { combineReducers, configureStore } from "@reduxjs/toolkit"
import playersReducer from "./reducers/ResultsSlice"

const rootReducer = combineReducers({
  playersReducer,
})

const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore