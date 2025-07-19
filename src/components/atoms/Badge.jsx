import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Badge = forwardRef(({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    accent: "bg-accent-100 text-accent-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    error: "bg-error-100 text-error-800",
    info: "bg-info-100 text-info-800"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm"
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          className={cn(iconSizes[size], children ? "mr-1" : "")} 
        />
      )}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;