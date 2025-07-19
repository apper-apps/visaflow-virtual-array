import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const TableRow = ({
  data,
  columns,
  onRowClick,
  actions = [],
  className,
  index = 0,
  ...props
}) => {
  const renderCellContent = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }
    
    if (column.type === "badge") {
      const variant = column.getVariant ? column.getVariant(item[column.key]) : "default";
      return (
        <Badge variant={variant} icon={column.icon}>
          {item[column.key]}
        </Badge>
      );
    }
    
    if (column.type === "date") {
      return new Date(item[column.key]).toLocaleDateString();
    }
    
    if (column.type === "currency") {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
      }).format(item[column.key]);
    }
    
    return item[column.key];
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200",
        onRowClick && "cursor-pointer",
        className
      )}
      onClick={onRowClick ? () => onRowClick(data) : undefined}
      {...props}
    >
      {columns.map((column, columnIndex) => (
        <td
          key={columnIndex}
          className={cn(
            "px-6 py-4 text-sm",
            column.align === "center" && "text-center",
            column.align === "right" && "text-right"
          )}
        >
          {renderCellContent(data, column)}
        </td>
      ))}
      
      {actions.length > 0 && (
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end space-x-2">
            {actions.map((action, actionIndex) => (
              <button
                key={actionIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(data);
                }}
                className={cn(
                  "p-2 rounded-lg transition-colors duration-200",
                  action.variant === "danger" 
                    ? "text-error-600 hover:bg-error-50" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
                title={action.label}
              >
                <ApperIcon name={action.icon} className="w-4 h-4" />
              </button>
            ))}
          </div>
        </td>
      )}
    </motion.tr>
  );
};

export default TableRow;