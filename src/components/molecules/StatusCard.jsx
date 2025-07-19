import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatusCard = ({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  color = "primary",
  onClick,
  className,
  ...props
}) => {
  const colors = {
    primary: {
      bg: "bg-gradient-to-br from-primary-50 to-primary-100",
      icon: "text-primary-600",
      text: "text-primary-900"
    },
    secondary: {
      bg: "bg-gradient-to-br from-secondary-50 to-secondary-100",
      icon: "text-secondary-600",
      text: "text-secondary-900"
    },
    accent: {
      bg: "bg-gradient-to-br from-accent-50 to-accent-100",
      icon: "text-accent-600",
      text: "text-accent-900"
    },
    success: {
      bg: "bg-gradient-to-br from-success-50 to-success-100",
      icon: "text-success-600",
      text: "text-success-900"
    },
    warning: {
      bg: "bg-gradient-to-br from-warning-50 to-warning-100",
      icon: "text-warning-600",
      text: "text-warning-900"
    },
    error: {
      bg: "bg-gradient-to-br from-error-50 to-error-100",
      icon: "text-error-600",
      text: "text-error-900"
    }
  };

  const colorConfig = colors[color];

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200",
          onClick && "hover:shadow-elevated",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            colorConfig.bg
          )}>
            <ApperIcon name={icon} className={cn("w-6 h-6", colorConfig.icon)} />
          </div>
          {change && (
            <div className={cn(
              "flex items-center space-x-1 text-sm font-medium",
              changeType === "positive" ? "text-success-600" : "text-error-600"
            )}>
              <ApperIcon 
                name={changeType === "positive" ? "TrendingUp" : "TrendingDown"} 
                className="w-4 h-4" 
              />
              <span>{change}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className={cn("text-2xl font-bold", colorConfig.text)}>
            {value}
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            {title}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatusCard;