import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({
  children,
  className,
  variant = "default",
  padding = "default",
  ...props
}, ref) => {
  const baseStyles = "bg-white rounded-xl border border-gray-100 transition-all duration-200";
  
  const variants = {
    default: "shadow-card hover:shadow-elevated",
    elevated: "shadow-elevated",
    bordered: "border-2 border-gray-200",
    gradient: "bg-gradient-to-br from-white to-gray-50 shadow-card hover:shadow-elevated"
  };
  
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8"
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;