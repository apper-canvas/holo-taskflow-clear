import React, { useState } from "react"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Input from "@/components/atoms/Input"
import PriorityIndicator from "@/components/molecules/PriorityIndicator"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskItem = ({ task, onToggleComplete, onUpdateTask, onDeleteTask, className }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdateTask(task.Id, { title: editTitle.trim() })
    }
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  const formatDueDate = (date) => {
    if (!date) return null
    const taskDate = new Date(date)
    
    if (isToday(taskDate)) return "Today"
    if (isTomorrow(taskDate)) return "Tomorrow"
    return format(taskDate, "MMM d")
  }

  const isDueSoon = task.dueDate && (isToday(new Date(task.dueDate)) || isPast(new Date(task.dueDate)))

  return (
    <div className={cn(
      "task-item bg-white rounded-lg shadow-card border border-slate-200 p-4 animate-fade-in",
      task.completed && "opacity-75",
      className
    )}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveEdit}
                  className="text-base font-medium"
                  autoFocus
                />
              ) : (
                <h3 
                  className={cn(
                    "text-base font-medium text-slate-900 cursor-pointer hover:text-primary-600 transition-colors",
                    task.completed && "strikethrough"
                  )}
                  onClick={() => setIsEditing(true)}
                >
                  {task.title}
                </h3>
              )}
            </div>

            {/* Priority & Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <PriorityIndicator priority={task.priority} />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.Id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>

          {/* Task Meta */}
          <div className="mt-2 flex items-center gap-3 text-sm">
            <Badge variant={task.category} className="capitalize">
              <ApperIcon 
                name={task.category === "meeting" ? "Calendar" : 
                      task.category === "email" ? "Mail" :
                      task.category === "project" ? "Briefcase" : "User"} 
                size={12} 
                className="mr-1" 
              />
              {task.category}
            </Badge>

            {task.dueDate && (
              <span className={cn(
                "flex items-center gap-1",
                isDueSoon && !task.completed ? "text-red-600 font-medium" : "text-slate-500"
              )}>
                <ApperIcon name="Calendar" size={12} />
                {formatDueDate(task.dueDate)}
              </span>
            )}

            <span className="text-slate-400">
              {format(new Date(task.createdAt), "MMM d, h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem