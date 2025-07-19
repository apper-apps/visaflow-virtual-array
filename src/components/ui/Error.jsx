import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.",
  onRetry,
  title = "Error",
  type = "general"
}) => {
  const getErrorIcon = () => {
    switch (type) {
      case "network":
        return "WifiOff";
      case "notFound":
        return "Search";
      case "permission":
        return "Lock";
      default:
        return "AlertCircle";
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case "network":
        return "Connection Error";
      case "notFound":
        return "Not Found";
      case "permission":
        return "Access Denied";
      default:
        return title;
    }
  };

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
        className="w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={getErrorIcon()} className="w-8 h-8 text-error-600" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {getErrorTitle()}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        {message}
      </motion.p>
      
      {onRetry && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;