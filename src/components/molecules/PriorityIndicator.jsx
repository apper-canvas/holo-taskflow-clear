import React from "react"
import { cn } from "@/utils/cn"

const PriorityIndicator = ({ priority, showLabel = false, className }) => {
  const priorityConfig = {
    high: {
      color: "bg-red-500",
      label: "High",
      textColor: "text-red-700"
    },
    medium: {
      color: "bg-amber-500", 
      label: "Medium",
      textColor: "text-amber-700"
    },
    low: {
      color: "bg-emerald-500",
      label: "Low", 
      textColor: "text-emerald-700"
    }
  }

  const config = priorityConfig[priority] || priorityConfig.medium

  if (showLabel) {
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        `bg-${priority === "high" ? "red" : priority === "medium" ? "amber" : "emerald"}-100`,
        config.textColor,
        className
      )}>
        <div className={cn("w-2 h-2 rounded-full priority-dot", config.color)} />
        {config.label}
      </span>
    )
  }

  return (
    <div 
      className={cn(
        "w-3 h-3 rounded-full priority-dot cursor-help", 
        config.color,
        className
      )}
      title={`${config.label} priority`}
    />
  )
}

export default PriorityIndicator