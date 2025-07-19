import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";

const ApplicationWizard = ({ onComplete, onCancel, clientId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    visaType: "",
    visaSubclass: "",
    applicantDetails: {},
    documents: [],
    declaration: false
  });

  const steps = [
    {
      id: "visa-type",
      title: "Visa Selection",
      description: "Choose the appropriate visa category",
      icon: "FileText"
    },
    {
      id: "applicant-details",
      title: "Applicant Details",
      description: "Personal and contact information",
      icon: "User"
    },
    {
      id: "documents",
      title: "Required Documents",
      description: "Upload supporting documentation",
      icon: "Upload"
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Verify all information",
      icon: "CheckCircle"
    }
  ];

  const visaTypes = [
    {
      code: "189",
      name: "Skilled Independent visa",
      category: "Permanent",
      description: "Points-tested skilled migration visa",
      requirements: ["Skills assessment", "English test", "Health check"],
      processingTime: "8-12 months"
    },
    {
      code: "190",
      name: "Skilled Nominated visa",
      category: "Permanent", 
      description: "State/territory nominated skilled visa",
      requirements: ["State nomination", "Skills assessment", "English test"],
      processingTime: "8-12 months"
    },
    {
      code: "820/801",
      name: "Partner visa",
      category: "Temporary/Permanent",
      description: "For partners of Australian citizens/residents",
      requirements: ["Relationship evidence", "Character check", "Health check"],
      processingTime: "12-24 months"
    },
    {
      code: "500",
      name: "Student visa",
      category: "Temporary",
      description: "For international students",
      requirements: ["CoE", "GTE statement", "Financial evidence"],
      processingTime: "1-4 months"
    },
    {
      code: "482",
      name: "Temporary Skill Shortage visa",
      category: "Temporary",
      description: "Employer sponsored work visa",
      requirements: ["Job offer", "Skills assessment", "Labour agreement"],
      processingTime: "3-6 months"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVisaSelect = (visa) => {
    setFormData({
      ...formData,
      visaType: visa.name,
      visaSubclass: visa.code
    });
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
              index <= currentStep
                ? "bg-primary-600 border-primary-600 text-white"
                : "border-gray-300 text-gray-400"
            )}
          >
            <ApperIcon name={step.icon} className="w-5 h-5" />
          </div>
          <div className="ml-3 hidden sm:block">
            <p className={cn(
              "text-sm font-medium",
              index <= currentStep ? "text-primary-600" : "text-gray-500"
            )}>
              {step.title}
            </p>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-4 transition-all duration-200",
                index < currentStep ? "bg-primary-600" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const VisaSelectionStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Visa Type</h3>
        <p className="text-gray-600">Choose the most appropriate visa category for your client.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visaTypes.map((visa) => (
          <motion.div
            key={visa.code}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
              formData.visaSubclass === visa.code
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => handleVisaSelect(visa)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{visa.name}</h4>
                <p className="text-sm text-gray-600">Subclass {visa.code}</p>
              </div>
              <Badge variant={visa.category === "Permanent" ? "success" : "warning"}>
                {visa.category}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{visa.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                {visa.processingTime}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">Key Requirements:</p>
                {visa.requirements.slice(0, 2).map((req, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <ApperIcon name="Check" className="w-3 h-3 mr-2 text-success-500" />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ApplicantDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Applicant Information</h3>
        <p className="text-gray-600">Provide personal details for the primary applicant.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Given Names"
          placeholder="Enter given names"
          required
        />
        <Input
          label="Family Name"
          placeholder="Enter family name"
          required
        />
        <Input
          label="Date of Birth"
          type="date"
          required
        />
        <Input
          label="Passport Number"
          placeholder="Enter passport number"
          required
        />
        <Input
          label="Country of Birth"
          placeholder="Enter country of birth"
          required
        />
        <Input
          label="Current Nationality"
          placeholder="Enter nationality"
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          required
        />
      </div>
    </div>
  );

  const DocumentsStep = () => {
    const requiredDocs = [
      { name: "Passport", status: "pending", required: true },
      { name: "Birth Certificate", status: "pending", required: true },
      { name: "English Test Results", status: "pending", required: true },
      { name: "Skills Assessment", status: "pending", required: true },
      { name: "Health Examination", status: "pending", required: false },
      { name: "Character Documents", status: "pending", required: false }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Documents</h3>
          <p className="text-gray-600">Upload all required supporting documents for the application.</p>
        </div>
        
        <div className="space-y-4">
          {requiredDocs.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="FileText" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  {doc.required && <p className="text-xs text-error-600">Required</p>}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={doc.status === "uploaded" ? "success" : "warning"}>
                  {doc.status === "uploaded" ? "Uploaded" : "Pending"}
                </Badge>
                <Button variant="secondary" size="sm" icon="Upload">
                  Upload
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Application</h3>
        <p className="text-gray-600">Review all information before submitting to the Department of Home Affairs.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold text-gray-900 mb-4">Visa Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Visa Type:</span>
              <span className="font-medium">{formData.visaType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subclass:</span>
              <span className="font-medium">{formData.visaSubclass}</span>
            </div>
          </div>
        </Card>
        
        <Card>
          <h4 className="font-semibold text-gray-900 mb-4">Application Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Documents:</span>
              <span className="font-medium">6 items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Processing:</span>
              <span className="font-medium">8-12 months</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="AlertTriangle" className="w-5 h-5 text-warning-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning-800">Important Notice</h4>
            <p className="text-sm text-warning-700 mt-1">
              By submitting this application, you confirm that all information provided is true and correct. 
              False or misleading information may result in visa refusal and future visa restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <VisaSelectionStep />;
      case 1: return <ApplicantDetailsStep />;
      case 2: return <DocumentsStep />;
      case 3: return <ReviewStep />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg">
        <StepIndicator />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handlePrev} icon="ChevronLeft">
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button 
                variant="primary" 
                onClick={handleNext} 
                iconPosition="right" 
                icon="ChevronRight"
                disabled={currentStep === 0 && !formData.visaSubclass}
              >
                Next
              </Button>
            ) : (
              <Button variant="accent" onClick={onComplete} icon="Send">
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApplicationWizard;