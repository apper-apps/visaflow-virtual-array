import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import StatusCard from "@/components/molecules/StatusCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Compliance = () => {
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComplianceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setComplianceData({
        maraRegistration: {
          number: "1234567",
          status: "Active",
          expiryDate: "2024-12-31",
          lastRenewal: "2023-12-31"
        },
        professionalIndemnity: {
          provider: "Professional Risk Underwriters",
          policyNumber: "PI-2024-001234",
          coverage: 2000000,
          expiryDate: "2024-06-30"
        },
        cpd: {
          requiredHours: 20,
          completedHours: 15,
          deadline: "2024-12-31"
        },
        clientFunds: {
          trustAccountBalance: 50000,
          lastAudit: "2023-12-01",
          nextAudit: "2024-12-01"
        },
        recentActivities: [
          {
            id: 1,
            type: "cpd",
            description: "Completed Immigration Law Updates seminar",
            date: "2024-01-15",
            hours: 3
          },
          {
            id: 2,
            type: "audit",
            description: "Annual trust account audit completed",
            date: "2023-12-01",
            status: "Passed"
          },
          {
            id: 3,
            type: "renewal",
            description: "MARA registration renewed",
            date: "2023-12-31",
            status: "Completed"
          }
        ]
      });
    } catch (err) {
      setError("Failed to load compliance data. Please try again.");
      console.error("Error loading compliance data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplianceData();
  }, []);

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "cpd": return "GraduationCap";
      case "audit": return "Search";
      case "renewal": return "RefreshCw";
      default: return "FileText";
    }
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadComplianceData} />;
  }

  const stats = [
    {
      title: "MARA Status",
      value: complianceData.maraRegistration.status,
      icon: "Shield",
      color: "success"
    },
    {
      title: "CPD Progress",
      value: `${complianceData.cpd.completedHours}/${complianceData.cpd.requiredHours}h`,
      icon: "BookOpen",
      color: complianceData.cpd.completedHours >= complianceData.cpd.requiredHours ? "success" : "warning"
    },
    {
      title: "Trust Account",
      value: formatCurrency(complianceData.clientFunds.trustAccountBalance),
      icon: "DollarSign",
      color: "primary"
    },
    {
      title: "Insurance Status",
      value: "Active",
      icon: "Heart",
      color: "info"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            MARA Compliance
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor regulatory compliance and professional obligations.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon="Download">
            Export Report
          </Button>
          <Button variant="accent" icon="AlertTriangle">
            Submit Compliance
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatusCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MARA Registration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">MARA Registration</h2>
              <Badge variant="success">Active</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Registration Number:</span>
                <span className="font-medium text-gray-900">{complianceData.maraRegistration.number}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Expiry Date:</span>
                <span className={`font-medium ${isExpiringSoon(complianceData.maraRegistration.expiryDate) ? 'text-warning-600' : 'text-gray-900'}`}>
                  {new Date(complianceData.maraRegistration.expiryDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Last Renewal:</span>
                <span className="font-medium text-gray-900">
                  {new Date(complianceData.maraRegistration.lastRenewal).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button variant="primary" icon="RefreshCw" className="w-full">
                Renew Registration
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Professional Indemnity Insurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Professional Indemnity</h2>
              <Badge variant="success">Current</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium text-gray-900">{complianceData.professionalIndemnity.provider}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Policy Number:</span>
                <span className="font-medium text-gray-900">{complianceData.professionalIndemnity.policyNumber}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Coverage:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(complianceData.professionalIndemnity.coverage)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Expiry Date:</span>
                <span className={`font-medium ${isExpiringSoon(complianceData.professionalIndemnity.expiryDate) ? 'text-warning-600' : 'text-gray-900'}`}>
                  {new Date(complianceData.professionalIndemnity.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button variant="secondary" icon="FileText" className="w-full">
                View Certificate
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* CPD Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">CPD Requirements</h2>
              <Badge variant={complianceData.cpd.completedHours >= complianceData.cpd.requiredHours ? "success" : "warning"}>
                {complianceData.cpd.completedHours}/{complianceData.cpd.requiredHours} Hours
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Required Hours:</span>
                <span className="font-medium text-gray-900">{complianceData.cpd.requiredHours} hours</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Completed Hours:</span>
                <span className="font-medium text-gray-900">{complianceData.cpd.completedHours} hours</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-medium text-gray-900">
                  {new Date(complianceData.cpd.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(complianceData.cpd.completedHours / complianceData.cpd.requiredHours) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button variant="accent" icon="Plus" className="w-full">
                Log CPD Activity
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {complianceData.recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-info-100 to-info-200 rounded-lg flex items-center justify-center">
                    <ApperIcon 
                      name={getActivityIcon(activity.type)} 
                      className="w-4 h-4 text-info-600" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                      {activity.hours && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{activity.hours} hours</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Compliance;