import React from "react"
import { cn } from "@/utils/cn"

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Loading skeleton for task items */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="bg-white rounded-lg shadow-card border border-slate-200 p-4 animate-pulse"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-slate-200 rounded border-2 mt-0.5" />
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-200 rounded-full" />
                  <div className="w-6 h-6 bg-slate-200 rounded" />
                  <div className="w-6 h-6 bg-slate-200 rounded" />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-5 bg-slate-200 rounded-full w-20" />
                <div className="h-4 bg-slate-200 rounded w-16" />
                <div className="h-4 bg-slate-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading