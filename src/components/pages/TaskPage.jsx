import React, { useState } from "react"
import TaskQuickAdd from "@/components/molecules/TaskQuickAdd"
import TaskFilters from "@/components/molecules/TaskFilters"
import TaskList from "@/components/organisms/TaskList"
import { taskService } from "@/services/api/taskService"
import { toast } from "react-toastify"

const TaskPage = () => {
  const [filters, setFilters] = useState({
    searchText: "",
    categories: [],
    priorities: [],
    showCompleted: false
  })

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      // TaskList will reload automatically due to service layer update
    } catch (err) {
      toast.error("Failed to create task")
      console.error("Error creating task:", err)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Quick Add */}
      <TaskQuickAdd onAddTask={handleAddTask} />

      {/* Filters */}
      <TaskFilters 
        filters={filters} 
        onFiltersChange={handleFiltersChange} 
      />

      {/* Task List */}
      <TaskList filters={filters} />
    </div>
  )
}

export default TaskPage