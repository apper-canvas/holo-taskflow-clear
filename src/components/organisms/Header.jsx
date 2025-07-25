import React, { useState, useEffect, useContext } from "react"
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"
import { taskService } from "@/services/api/taskService"
import { AuthContext } from "../../App"

const Header = ({ className }) => {
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const loadTaskStats = async () => {
      try {
        setLoading(true)
        const tasks = await taskService.getAll()
        setTotalTasks(tasks.length)
        setCompletedTasks(tasks.filter(task => task.completed_c).length)
      } catch (error) {
        console.error("Error loading task statistics:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadTaskStats()
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
  }

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
            {isAuthenticated && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {loading ? "..." : totalTasks}
                  </div>
                  <div className="text-sm text-slate-500">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {loading ? "..." : completedTasks}
                  </div>
                  <div className="text-sm text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-600">
                    {loading ? "..." : totalTasks - completedTasks}
                  </div>
                  <div className="text-sm text-slate-500">Remaining</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-600">
                    Welcome, {user?.firstName || user?.name || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <ApperIcon name="LogOut" size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header