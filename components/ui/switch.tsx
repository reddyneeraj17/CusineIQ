"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      className={cn(
        "peer h-6 w-11 appearance-none rounded-full bg-gray-200 checked:bg-primary transition-colors relative cursor-pointer",
        "after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
        "peer-checked:after:translate-x-full peer-checked:after:border-white",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)

Switch.displayName = "Switch"

export { Switch }