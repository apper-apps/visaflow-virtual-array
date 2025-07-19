import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import ApplicationWizard from "@/components/organisms/ApplicationWizard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { applicationService } from "@/services/api/applicationService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = [
    { label: "All Applications", value: "all", icon: "FileText" },
    { label: "In Progress", value: "progress", icon: "Clock" },
    { label: "Document Review", value: "review", icon: "Eye" },
    { label: "Approved", value: "approved", icon: "CheckCircle" },
    { label: "Processing", value: "processing", icon: "Loader" }
  ];

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      app.visaType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !selectedFilter || selectedFilter.value === "all" ||
      (selectedFilter.value === "progress" && app.status === "In Progress") ||
      (selectedFilter.value === "review" && app.status === "Document Review") ||
      (selectedFilter.value === "approved" && app.status === "Approved") ||
      (selectedFilter.value === "processing" && app.status === "Processing");
    
    return matchesSearch && matchesFilter;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Approved": return "success";
      case "In Progress": return "warning";
      case "Document Review": return "info";
      case "Processing": return "secondary";
      case "Rejected": return "error";
      default: return "default";
    }
  };

  const getVisaIcon = (visaType) => {
    if (visaType.includes("Skilled")) return "Briefcase";
    if (visaType.includes("Partner")) return "Heart";
    if (visaType.includes("Student")) return "GraduationCap";
    if (visaType.includes("Tourist")) return "Plane";
    return "FileText";
  };

  const handleNewApplication = () => {
    setShowWizard(true);
  };

  const handleWizardComplete = () => {
    setShowWizard(false);
    loadApplications(); // Reload applications
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
  };

  if (showWizard) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          <Button 
            variant="secondary" 
            icon="ArrowLeft" 
            onClick={handleWizardCancel}
          >
            Back to Applications
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              New Visa Application
            </h1>
            <p className="text-gray-600 mt-1">
              Create a new visa application for your client.
            </p>
          </div>
        </motion.div>

        <ApplicationWizard
          onComplete={handleWizardComplete}
          onCancel={handleWizardCancel}
        />
      </div>
    );
  }

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadApplications} />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Visa Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all visa applications and their progress.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon="Download">
            Export Applications
          </Button>
          <Button variant="accent" icon="Plus" onClick={handleNewApplication}>
            New Application
          </Button>
        </div>
      </motion.div>

      <Card>
        <div className="p-6 border-b border-gray-100">
          <SearchBar
            placeholder="Search applications by visa type, reference, or client..."
            onSearch={setSearchQuery}
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {filteredApplications.length === 0 ? (
          <div className="p-6">
            <Empty
              type="applications"
              onAction={handleNewApplication}
            />
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                          <ApperIcon 
                            name={getVisaIcon(application.visaType)} 
                            className="w-6 h-6 text-primary-600" 
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.visaType}</h3>
                          <p className="text-sm text-gray-600">Subclass {application.visaSubclass}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Reference:</span>
                        <span className="font-medium text-gray-900">{application.referenceNumber}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Lodged:</span>
                        <span className="text-gray-900">
                          {new Date(application.lodgementDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Agent:</span>
                        <span className="text-gray-900">{application.assignedAgent}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Documents:</span>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Paperclip" className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{application.documents?.length || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <Button variant="secondary" size="sm" icon="Eye">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm" icon="Edit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Applications;