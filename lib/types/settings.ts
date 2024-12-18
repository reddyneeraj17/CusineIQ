export interface Settings {
  id: number
  businessName: string
  address?: string
  phone?: string
  darkMode: boolean
  notifications: boolean
}

export interface SettingsFormData {
  businessName: string
  address?: string
  phone?: string
}