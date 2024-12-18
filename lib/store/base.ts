import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const createPersistedStore = <T extends object>(
  initialState: T,
  name: string
) => {
  return create(
    persist(
      () => initialState,
      { name }
    )
  )
}