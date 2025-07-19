import { motion } from "framer-motion";
import StatusCard from "@/components/molecules/StatusCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const DashboardStats = ({ stats, loading, error, onRetry }) => {
  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  const statsData = [
    {
      title: "Total Clients",
      value: stats?.totalClients || 0,
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Applications",
      value: stats?.activeApplications || 0,
      change: "+8%",
      changeType: "positive",
      icon: "FileText",
      color: "accent"
    },
    {
      title: "Pending Documents",
      value: stats?.pendingDocuments || 0,
      change: "-5%",
      changeType: "negative",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Approvals This Month",
      value: stats?.approvalsThisMonth || 0,
      change: "+23%",
      changeType: "positive",
      icon: "CheckCircle",
      color: "success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
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
  );
};

export default DashboardStats;