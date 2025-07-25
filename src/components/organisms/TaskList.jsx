import React, { useState, useEffect } from "react"
import TaskItem from "@/components/molecules/TaskItem"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { taskService } from "@/services/api/taskService"
import { toast } from "react-toastify"

const TaskList = ({ filters, onTasksChange }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.getAll()
      setTasks(data)
      onTasksChange && onTasksChange(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (!task) return

      const updatedTask = await taskService.update(taskId, {
        completed_c: !task.completed_c
      })

      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t))
      toast.success(updatedTask.completed_c ? "Task completed!" : "Task marked as incomplete")
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates)
      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t))
      toast.success("Task updated successfully")
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(tasks.filter(t => t.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

const filterTasks = (tasks) => {
    return tasks.filter(task => {
      // Search filter
      if (filters.searchText && !task.title_c?.toLowerCase().includes(filters.searchText.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(task.category_c)) {
        return false
      }

      // Priority filter  
      if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority_c)) {
        return false
      }

      // Completed filter
      if (!filters.showCompleted && task.completed_c) {
        return false
      }

      return true
    })
  }

const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      // Completed tasks to bottom
      if (a.completed_c !== b.completed_c) {
        return a.completed_c ? 1 : -1
      }

      // Sort by priority (high > medium > low)
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (a.priority_c !== b.priority_c) {
        return priorityOrder[b.priority_c] - priorityOrder[a.priority_c]
      }

      // Sort by due date (earlier dates first)
      if (a.due_date_c && b.due_date_c) {
        return new Date(a.due_date_c) - new Date(b.due_date_c)
      }
      if (a.due_date_c && !b.due_date_c) return -1
      if (!a.due_date_c && b.due_date_c) return 1

      // Sort by creation date (newest first)
      return new Date(b.created_at_c || b.CreatedOn) - new Date(a.created_at_c || a.CreatedOn)
    })
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />

  const filteredTasks = sortTasks(filterTasks(tasks))

  if (filteredTasks.length === 0) {
    const hasFilters = filters.searchText || 
      filters.categories.length > 0 || 
      filters.priorities.length > 0 || 
      !filters.showCompleted

    return (
      <Empty 
        title={hasFilters ? "No tasks match your filters" : "No tasks yet"}
        message={hasFilters ? 
          "Try adjusting your search or filter criteria to find tasks." :
          "Create your first task to get started with TaskFlow."
        }
        actionText={hasFilters ? "Clear filters" : "Add your first task"}
        onAction={hasFilters ? () => {
          // Clear filters logic would be handled by parent
        } : undefined}
      />
    )
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.Id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          className="group"
        />
      ))}
    </div>
  )
}

export default TaskList