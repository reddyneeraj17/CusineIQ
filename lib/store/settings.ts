import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Settings {
  darkMode: boolean
  notifications: boolean
  businessName: string
  address?: string
  phone?: string
}

interface SettingsState {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
}

const DEFAULT_SETTINGS: Settings = {
  darkMode: false,
  notifications: true,
  businessName: 'CuisineIQ',
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) => 
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
    }),
    {
      name: 'settings-storage'
    }
  )
)