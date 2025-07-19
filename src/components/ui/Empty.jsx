import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({
  title = "No data available",
  description = "Get started by adding your first item.",
  actionLabel = "Add New",
  onAction,
  icon = "Plus",
  type = "general"
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "clients":
        return {
          icon: "Users",
          title: "No clients yet",
          description: "Start by adding your first client to begin managing their visa applications.",
          actionLabel: "Add Client"
        };
      case "applications":
        return {
          icon: "FileText",
          title: "No applications found",
          description: "Create your first visa application to start the immigration process.",
          actionLabel: "New Application"
        };
      case "documents":
        return {
          icon: "Upload",
          title: "No documents uploaded",
          description: "Upload required documents to complete the application process.",
          actionLabel: "Upload Documents"
        };
      case "search":
        return {
          icon: "Search",
          title: "No results found",
          description: "Try adjusting your search criteria or filters.",
          actionLabel: "Clear Filters"
        };
      default:
        return {
          icon,
          title,
          description,
          actionLabel
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={config.icon} className="w-10 h-10 text-primary-600" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {config.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        {config.description}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className="btn-accent flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name={config.icon} className="w-4 h-4" />
          <span>{config.actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;