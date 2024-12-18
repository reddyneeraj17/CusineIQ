import { GeneralSettings } from "@/components/settings/general-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { BusinessSettings } from "@/components/settings/business-settings"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Settings</h2>
      <div className="space-y-6">
        <GeneralSettings />
        <BusinessSettings />
        <NotificationSettings />
      </div>
    </div>
  )
}