import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        ref={ref}
        checked={checked}
        {...props}
      />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200 cursor-pointer checkbox-animation",
          checked
            ? "bg-primary-500 border-primary-500 text-white"
            : "border-slate-300 bg-white hover:border-primary-400",
          className
        )}
        onClick={() => props.onChange && props.onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-fade-in" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox