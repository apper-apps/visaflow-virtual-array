import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardStats from "@/components/organisms/DashboardStats";
import ClientTable from "@/components/organisms/ClientTable";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { clientService } from "@/services/api/clientService";
import { applicationService } from "@/services/api/applicationService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentClients, setRecentClients] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load all data in parallel
      const [clients, applications] = await Promise.all([
        clientService.getAll(),
        applicationService.getAll()
      ]);
      
      // Calculate stats
      const activeApplications = applications.filter(app => 
        ["In Progress", "Document Review", "Processing"].includes(app.status)
      );
      
      const pendingDocuments = applications.reduce((total, app) => 
        total + (app.documents?.filter(doc => !doc.verified).length || 0), 0
      );
      
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth());
      const approvalsThisMonth = applications.filter(app => 
        app.status === "Approved" && 
        new Date(app.updatedAt) >= thisMonth
      ).length;
      
      setStats({
        totalClients: clients.length,
        activeApplications: activeApplications.length,
        pendingDocuments,
        approvalsThisMonth
      });
      
      // Set recent data
      setRecentClients(clients.slice(0, 5));
      setRecentApplications(applications.slice(0, 5));
      
      // Mock upcoming tasks
      setUpcomingTasks([
        {
          id: 1,
          title: "Health examination due - Sarah Chen",
          type: "health",
          dueDate: "2024-02-15",
          priority: "high"
        },
        {
          id: 2,
          title: "Skills assessment expires - John Smith",
          type: "document",
          dueDate: "2024-02-18",
          priority: "medium"
        },
        {
          id: 3,
          title: "MARA compliance review",
          type: "compliance",
          dueDate: "2024-02-20",
          priority: "high"
        },
        {
          id: 4,
          title: "Client meeting - Maria Rodriguez",
          type: "meeting",
          dueDate: "2024-02-22",
          priority: "low"
        }
      ]);
      
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "info";
      default: return "default";
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case "health": return "Heart";
      case "document": return "FileText";
      case "compliance": return "Shield";
      case "meeting": return "Calendar";
      default: return "Clock";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Welcome back, Sarah
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your immigration cases today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon="Download">
            Export Report
          </Button>
          <Button variant="accent" icon="Plus">
            New Application
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <DashboardStats 
        stats={stats} 
        loading={loading} 
        error={error} 
        onRetry={loadDashboardData} 
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentApplications.map((application, index) => (
                <motion.div
                  key={application.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                      <ApperIcon name="FileText" className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{application.visaType}</p>
                      <p className="text-sm text-gray-600">Ref: {application.referenceNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={
                        application.status === "Approved" ? "success" :
                        application.status === "In Progress" ? "warning" :
                        application.status === "Processing" ? "info" : "default"
                      }
                    >
                      {application.status}
                    </Badge>
                    <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
              <Badge variant="warning">{upcomingTasks.length}</Badge>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${getPriorityColor(task.priority)}-100`}>
                    <ApperIcon 
                      name={getTaskIcon(task.type)} 
                      className={`w-4 h-4 text-${getPriorityColor(task.priority)}-600`} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <Badge size="sm" variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Clients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ClientTable
          clients={recentClients}
          loading={false}
          error={null}
          onClientClick={(client) => console.log("View client:", client)}
          onNewClient={() => console.log("Add new client")}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;