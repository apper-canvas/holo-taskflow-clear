import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    meeting: "bg-blue-100 text-blue-700",
    email: "bg-green-100 text-green-700", 
    project: "bg-purple-100 text-purple-700",
    personal: "bg-amber-100 text-amber-700"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge