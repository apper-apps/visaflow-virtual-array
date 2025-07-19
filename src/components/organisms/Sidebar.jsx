import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
      description: "Overview & Analytics"
    },
    {
      name: "Clients",
      href: "/clients",
      icon: "Users",
      description: "Client Management"
    },
    {
      name: "Applications",
      href: "/applications",
      icon: "FileText",
      description: "Visa Applications"
    },
    {
      name: "Documents",
      href: "/documents",
      icon: "Folder",
      description: "Document Library"
    },
    {
      name: "Compliance",
      href: "/compliance",
      icon: "Shield",
      description: "MARA & Legal"
    },
    {
      name: "Settings",
      href: "/settings",
      icon: "Settings",
      description: "System Configuration"
    }
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Scale" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                VisaFlow Pro
              </h1>
              <p className="text-xs text-gray-500">Immigration Legal Services</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary-50 text-primary-700 border-r-4 border-primary-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <ApperIcon 
                name={item.icon} 
                className={cn(
                  "mr-3 h-5 w-5 transition-colors duration-200",
                  isActive(item.href) ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              </div>
            </Link>
          ))}
        </nav>
        
        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Migration Agent</p>
              <p className="text-xs text-gray-500 truncate">MARA: 1234567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <div className="lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-primary-500 to-primary-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Scale" className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-white">VisaFlow Pro</h1>
                  </div>
                  <button
                    onClick={onToggle}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onToggle}
                      className={cn(
                        "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <ApperIcon 
                        name={item.icon} 
                        className={cn(
                          "mr-3 h-5 w-5",
                          isActive(item.href) ? "text-primary-600" : "text-gray-400"
                        )}
                      />
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;