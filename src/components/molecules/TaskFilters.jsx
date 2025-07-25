import React from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskFilters = ({ filters, onFiltersChange, className }) => {
  const categories = ["meeting", "email", "project", "personal"]
  const priorities = ["high", "medium", "low"]

  const updateFilters = (updates) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleCategory = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories: newCategories })
  }

  const togglePriority = (priority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority]
    updateFilters({ priorities: newPriorities })
  }

  const clearAllFilters = () => {
    updateFilters({
      searchText: "",
      categories: [],
      priorities: [],
      showCompleted: false
    })
  }

  const hasActiveFilters = filters.searchText || 
    filters.categories.length > 0 || 
    filters.priorities.length > 0 || 
    filters.showCompleted

  return (
    <div className={cn("bg-white rounded-lg shadow-card border border-slate-200 p-4", className)}>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <ApperIcon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
          />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={filters.searchText}
            onChange={(e) => updateFilters({ searchText: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Filter Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="capitalize"
                >
                  <ApperIcon 
                    name={category === "meeting" ? "Calendar" : 
                          category === "email" ? "Mail" :
                          category === "project" ? "Briefcase" : "User"} 
                    size={14} 
                    className="mr-1.5" 
                  />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Priorities */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Priorities
            </label>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <Button
                  key={priority}
                  variant={filters.priorities.includes(priority) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => togglePriority(priority)}
                  className="capitalize"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-1.5",
                    priority === "high" ? "bg-red-500" :
                    priority === "medium" ? "bg-amber-500" : "bg-emerald-500"
                  )} />
                  {priority}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateFilters({ showCompleted: !filters.showCompleted })}
            className={filters.showCompleted ? "text-primary-600" : ""}
          >
            <ApperIcon 
              name={filters.showCompleted ? "EyeOff" : "Eye"} 
              size={14} 
              className="mr-1.5" 
            />
            {filters.showCompleted ? "Hide" : "Show"} completed
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-slate-700"
            >
              <ApperIcon name="X" size={14} className="mr-1.5" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskFilters