import React, { useState } from "react"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskQuickAdd = ({ onAddTask, className }) => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState("project")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Please enter a task title")
      return
    }

    const newTask = {
      title: title.trim(),
      priority,
      category,
      dueDate: null,
      completed: false
    }

    onAddTask(newTask)
    setTitle("")
    setPriority("medium")
    setCategory("project")
    setIsExpanded(false)
    toast.success("Task added successfully!")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === "Escape") {
      setIsExpanded(false)
      setTitle("")
    }
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-card border border-slate-200", className)}>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Add a new task... (Press Enter to save, Esc to cancel)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              className="text-base"
              autoFocus
            />
          </div>
          <Button type="submit" className="shrink-0">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Task
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 flex gap-3 pt-4 border-t border-slate-100 animate-fade-in">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="meeting">Meeting</option>
                <option value="email">Email</option>
                <option value="project">Project</option>
                <option value="personal">Personal</option>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle("")
                }}
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default TaskQuickAdd