"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function BusinessSettings() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Business Information</h3>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input id="business-name" placeholder="Enter business name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter business address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter phone number" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </Card>
  )
}