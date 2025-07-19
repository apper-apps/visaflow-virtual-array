import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { documentService } from "@/services/api/documentService";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = [
    { label: "All Documents", value: "all", icon: "FileText" },
    { label: "Verified", value: "verified", icon: "CheckCircle" },
    { label: "Pending Review", value: "pending", icon: "Clock" },
    { label: "Expired", value: "expired", icon: "AlertTriangle" },
    { label: "Missing", value: "missing", icon: "X" }
  ];

  const documentTypes = [
    { type: "passport", label: "Passport", icon: "Book" },
    { type: "birth_certificate", label: "Birth Certificate", icon: "FileText" },
    { type: "english_test", label: "English Test Results", icon: "Languages" },
    { type: "skills_assessment", label: "Skills Assessment", icon: "Award" },
    { type: "health_exam", label: "Health Examination", icon: "Heart" },
    { type: "character_check", label: "Character Documents", icon: "Shield" },
    { type: "financial", label: "Financial Evidence", icon: "DollarSign" },
    { type: "relationship", label: "Relationship Evidence", icon: "Users" }
  ];

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await documentService.getAll();
      setDocuments(data);
    } catch (err) {
      setError("Failed to load documents. Please try again.");
      console.error("Error loading documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !selectedFilter || selectedFilter.value === "all" ||
      (selectedFilter.value === "verified" && doc.verified) ||
      (selectedFilter.value === "pending" && !doc.verified && !isExpired(doc)) ||
      (selectedFilter.value === "expired" && isExpired(doc)) ||
      (selectedFilter.value === "missing" && doc.status === "missing");
    
    return matchesSearch && matchesFilter;
  });

  const isExpired = (document) => {
    if (!document.expiryDate) return false;
    return new Date(document.expiryDate) < new Date();
  };

  const getDocumentIcon = (type) => {
    const docType = documentTypes.find(dt => dt.type === type);
    return docType ? docType.icon : "FileText";
  };

  const getDocumentLabel = (type) => {
    const docType = documentTypes.find(dt => dt.type === type);
    return docType ? docType.label : type;
  };

  const getStatusVariant = (document) => {
    if (isExpired(document)) return "error";
    if (document.verified) return "success";
    return "warning";
  };

  const getStatusLabel = (document) => {
    if (isExpired(document)) return "Expired";
    if (document.verified) return "Verified";
    return "Pending Review";
  };

  const handleUploadDocument = () => {
    console.log("Upload new document");
    // Open upload modal
  };

  const handleDownloadDocument = (document) => {
    console.log("Download document:", document);
    // Trigger download
  };

  const handleVerifyDocument = (document) => {
    console.log("Verify document:", document);
    // Update document verification status
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDocuments} />;
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
            Document Library
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all client documents and supporting evidence.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon="Download">
            Bulk Download
          </Button>
          <Button variant="accent" icon="Upload" onClick={handleUploadDocument}>
            Upload Documents
          </Button>
        </div>
      </motion.div>

      <Card>
        <div className="p-6 border-b border-gray-100">
          <SearchBar
            placeholder="Search documents by name, type, or client..."
            onSearch={setSearchQuery}
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="p-6">
            <Empty
              type="documents"
              onAction={handleUploadDocument}
            />
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((document, index) => (
                <motion.div
                  key={document.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                          <ApperIcon 
                            name={getDocumentIcon(document.type)} 
                            className="w-6 h-6 text-secondary-600" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {getDocumentLabel(document.type)}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">{document.fileName}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(document)}>
                        {getStatusLabel(document)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Client:</span>
                        <span className="font-medium text-gray-900">{document.clientName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="text-gray-900">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </span>
                      </div>

                      {document.expiryDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Expires:</span>
                          <span className={`${isExpired(document) ? 'text-error-600' : 'text-gray-900'}`}>
                            {new Date(document.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Application:</span>
                        <span className="text-gray-900">{document.applicationRef}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between space-x-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          icon="Download"
                          onClick={() => handleDownloadDocument(document)}
                        >
                          Download
                        </Button>
                        {!document.verified && (
                          <Button 
                            variant="success" 
                            size="sm" 
                            icon="CheckCircle"
                            onClick={() => handleVerifyDocument(document)}
                          >
                            Verify
                          </Button>
                        )}
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

export default Documents;