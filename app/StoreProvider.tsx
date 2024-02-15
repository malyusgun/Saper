'use client'

import { useEffect, useRef } from "react"
import setupStore, { AppStore } from "./lib/store/store"
import { Provider } from "react-redux"
import { initResults, initSettings } from "./lib/store/localstorage"
import results from "./lib/placeholder-data"

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  
  useEffect(() => {
    initResults(results)
    initSettings({
      level: 'easy',
      theme: 'green-blue',
      width: 8,
      height: 8,
      cellsAmount: 64,
      bombsAmount: 10,
    })
  }, [])

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = setupStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}