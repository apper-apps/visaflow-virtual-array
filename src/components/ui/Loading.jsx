import { motion } from "framer-motion";

const Loading = ({ type = "dashboard" }) => {
  if (type === "table") {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-100"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
            </div>
            <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-200 to-primary-300 rounded animate-pulse" />
              <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="w-16 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;