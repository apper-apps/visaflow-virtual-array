import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuToggle, showSearch = true }) => {
  const [notifications] = useState([
    { id: 1, type: "warning", message: "Client document expires in 3 days", time: "5m ago" },
    { id: 2, type: "success", message: "Application 189-2024-001 approved", time: "1h ago" },
    { id: 3, type: "info", message: "MARA compliance check due", time: "2h ago" }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning": return "AlertTriangle";
      case "success": return "CheckCircle";
      case "error": return "AlertCircle";
      default: return "Info";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "warning": return "text-warning-600";
      case "success": return "text-success-600";
      case "error": return "text-error-600";
      default: return "text-info-600";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 lg:pl-64">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>
          
          {/* Page title for mobile */}
          <div className="lg:hidden">
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Search bar - hidden on mobile */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar
              placeholder="Search clients, applications, documents..."
              onSearch={setSearchValue}
              className="w-full"
            />
          </div>
        )}

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Quick actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="secondary" icon="Plus" size="sm">
              New Client
            </Button>
            <Button variant="accent" icon="FileText" size="sm">
              New Application
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ApperIcon name="Bell" className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-elevated border border-gray-100 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <ApperIcon 
                          name={getNotificationIcon(notification.type)} 
                          className={cn("w-5 h-5 mt-0.5", getNotificationColor(notification.type))} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Sarah Mitchell</p>
              <p className="text-xs text-gray-500">Registered Migration Agent</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search - shown below header on mobile */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 border-b border-gray-200">
          <SearchBar
            placeholder="Search clients, applications..."
            onSearch={setSearchValue}
            className="w-full"
          />
        </div>
      )}
    </header>
  );
};

export default Header;