import React from "react"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Header = ({ className }) => {
  const totalTasks = 0 // This will be passed from parent component
  const completedTasks = 0 // This will be passed from parent component

  return (
    <header className={cn("bg-white border-b border-slate-200 shadow-soft", className)}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">TaskFlow</h1>
              <p className="text-slate-600">Streamlined office task management</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{totalTasks}</div>
              <div className="text-sm text-slate-500">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{completedTasks}</div>
              <div className="text-sm text-slate-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">{totalTasks - completedTasks}</div>
              <div className="text-sm text-slate-500">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header