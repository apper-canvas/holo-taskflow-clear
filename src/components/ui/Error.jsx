import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Oops! Something went wrong
          </h3>
          
          <p className="text-red-700 mb-6">
            {message}
          </p>
          
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Error