"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function GeneralSettings() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">General Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Dark Mode</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <Label>Enable Notifications</Label>
          <Switch />
        </div>
      </div>
    </Card>
  )
}