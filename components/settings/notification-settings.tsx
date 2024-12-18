"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="low-stock">Low Stock Alerts</Label>
          <Switch id="low-stock" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="daily-summary">Daily Summary</Label>
          <Switch id="daily-summary" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="order-updates">Order Updates</Label>
          <Switch id="order-updates" />
        </div>
      </div>
    </Card>
  )
}