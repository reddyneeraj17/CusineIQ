import { executeQuery } from './base'
import { prisma } from '@/lib/db'
import type { Settings, SettingsFormData } from '@/lib/types'

export async function getSettings(): Promise<Settings> {
  return executeQuery(
    async () => {
      const settings = await prisma.settings.findFirst()
      if (!settings) {
        return prisma.settings.create({
          data: {
            businessName: 'My Restaurant',
            darkMode: false,
            notifications: true,
          },
        })
      }
      return settings
    },
    'Failed to fetch settings'
  )
}

export async function updateSettings(data: SettingsFormData): Promise<Settings> {
  return executeQuery(
    async () => {
      const settings = await prisma.settings.findFirst()
      if (!settings) {
        return prisma.settings.create({
          data: {
            ...data,
            darkMode: false,
            notifications: true,
          },
        })
      }
      return prisma.settings.update({
        where: { id: settings.id },
        data,
      })
    },
    'Failed to update settings'
  )
}