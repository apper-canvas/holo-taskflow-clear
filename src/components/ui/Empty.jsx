import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Empty = ({ 
  title = "No items found", 
  message = "Get started by creating your first item",
  actionText = "Get Started",
  onAction,
  className 
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <div className="bg-slate-100 p-4 rounded-full">
              <ApperIcon name="CheckSquare" size={40} className="text-slate-400" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {title}
          </h3>
          
          <p className="text-slate-600 mb-6">
            {message}
          </p>
          
          {onAction && (
            <Button onClick={onAction} className="bg-primary-500 hover:bg-primary-600">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Empty