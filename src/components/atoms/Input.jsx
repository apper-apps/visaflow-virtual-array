import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({
  type = "text",
  className,
  label,
  error,
  success,
  icon,
  iconPosition = "left",
  required = false,
  ...props
}, ref) => {
  const inputStyles = cn(
    "w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0",
    error 
      ? "border-error-300 focus:border-error-500 focus:ring-error-500" 
      : success 
      ? "border-success-300 focus:border-success-500 focus:ring-success-500"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
    icon && iconPosition === "left" && "pl-10",
    icon && iconPosition === "right" && "pr-10",
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className={cn(
                "w-5 h-5",
                error ? "text-error-400" : success ? "text-success-400" : "text-gray-400"
              )} 
            />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={inputStyles}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className={cn(
                "w-5 h-5",
                error ? "text-error-400" : success ? "text-success-400" : "text-gray-400"
              )} 
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-error-600 flex items-center">
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-success-600 flex items-center">
          <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
          {success}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;