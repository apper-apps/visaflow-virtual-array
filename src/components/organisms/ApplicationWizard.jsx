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
  const [errors, setErrors] = useState({});
  const [validationTouched, setValidationTouched] = useState({});

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

const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 1 && formData.visaSubclass === "482") {
      const required482Fields = [
        'givenNames', 'familyName', 'dateOfBirth', 'passportNumber',
        'countryOfBirth', 'nationality', 'email', 'phone',
        'jobTitle', 'employerName', 'employerABN', 'workLocation',
        'skillsAssessmentBody', 'englishTestType', 'englishTestScore'
      ];
      
      required482Fields.forEach(field => {
        if (!formData.applicantDetails[field] || formData.applicantDetails[field].trim() === '') {
          newErrors[field] = 'This field is required for subclass 482';
        }
      });
      
      // Email validation
      if (formData.applicantDetails.email && !/\S+@\S+\.\S+/.test(formData.applicantDetails.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      // ABN validation
      if (formData.applicantDetails.employerABN && !/^\d{11}$/.test(formData.applicantDetails.employerABN.replace(/\s/g, ''))) {
        newErrors.employerABN = 'ABN must be 11 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1);
      }
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
      visaSubclass: visa.code,
      applicantDetails: {} // Reset form when visa type changes
    });
    setErrors({});
    setValidationTouched({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      applicantDetails: {
        ...prev.applicantDetails,
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
    
    setValidationTouched(prev => ({
      ...prev,
      [field]: true
    }));
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

const ApplicantDetailsStep = () => {
    const is482Visa = formData.visaSubclass === "482";
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Applicant Information
            {is482Visa && <span className="text-primary-600"> - Skills in Demand visa</span>}
          </h3>
          <p className="text-gray-600">
            {is482Visa 
              ? "Provide comprehensive details required for the Temporary Skill Shortage visa application."
              : "Provide personal details for the primary applicant."
            }
          </p>
        </div>
        
        {/* Personal Details Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Personal Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Given Names"
              placeholder="Enter given names"
              value={formData.applicantDetails.givenNames || ''}
              onChange={(e) => handleInputChange('givenNames', e.target.value)}
              error={errors.givenNames}
              required
            />
            <Input
              label="Family Name"
              placeholder="Enter family name"
              value={formData.applicantDetails.familyName || ''}
              onChange={(e) => handleInputChange('familyName', e.target.value)}
              error={errors.familyName}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.applicantDetails.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              error={errors.dateOfBirth}
              required
            />
            <Input
              label="Passport Number"
              placeholder="Enter passport number"
              value={formData.applicantDetails.passportNumber || ''}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              error={errors.passportNumber}
              required
            />
            <Input
              label="Country of Birth"
              placeholder="Enter country of birth"
              value={formData.applicantDetails.countryOfBirth || ''}
              onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
              error={errors.countryOfBirth}
              required
            />
            <Input
              label="Current Nationality"
              placeholder="Enter nationality"
              value={formData.applicantDetails.nationality || ''}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              error={errors.nationality}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={formData.applicantDetails.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={formData.applicantDetails.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
          </div>
        </div>

        {/* 482-Specific Fields */}
        {is482Visa && (
          <>
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Employment Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Job Title"
                  placeholder="Enter nominated occupation"
                  value={formData.applicantDetails.jobTitle || ''}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  error={errors.jobTitle}
                  required
                />
                <Input
                  label="Sponsoring Employer Name"
                  placeholder="Enter employer name"
                  value={formData.applicantDetails.employerName || ''}
                  onChange={(e) => handleInputChange('employerName', e.target.value)}
                  error={errors.employerName}
                  required
                />
                <Input
                  label="Employer ABN"
                  placeholder="12 345 678 901"
                  value={formData.applicantDetails.employerABN || ''}
                  onChange={(e) => handleInputChange('employerABN', e.target.value)}
                  error={errors.employerABN}
                  required
                />
                <Input
                  label="Work Location"
                  placeholder="City, State"
                  value={formData.applicantDetails.workLocation || ''}
                  onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  error={errors.workLocation}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Skills Assessment & English Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Skills Assessment Body"
                  placeholder="e.g., Engineers Australia, VETASSESS"
                  value={formData.applicantDetails.skillsAssessmentBody || ''}
                  onChange={(e) => handleInputChange('skillsAssessmentBody', e.target.value)}
                  error={errors.skillsAssessmentBody}
                  required
                />
                <Input
                  label="English Test Type"
                  placeholder="IELTS, PTE, TOEFL iBT, etc."
                  value={formData.applicantDetails.englishTestType || ''}
                  onChange={(e) => handleInputChange('englishTestType', e.target.value)}
                  error={errors.englishTestType}
                  required
                />
                <Input
                  label="English Test Overall Score"
                  placeholder="Enter overall score"
                  value={formData.applicantDetails.englishTestScore || ''}
                  onChange={(e) => handleInputChange('englishTestScore', e.target.value)}
                  error={errors.englishTestScore}
                  required
                />
                <Input
                  label="Test Date"
                  type="date"
                  value={formData.applicantDetails.englishTestDate || ''}
                  onChange={(e) => handleInputChange('englishTestDate', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-info-50 border border-info-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" className="w-5 h-5 text-info-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-info-800">Subclass 482 Requirements</h4>
                  <p className="text-sm text-info-700 mt-1">
                    This visa requires a valid job offer from an approved sponsor, positive skills assessment, 
                    and competent English (minimum IELTS 5.0 or equivalent in each component).
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

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
                disabled={
                  (currentStep === 0 && !formData.visaSubclass) ||
                  (currentStep === 1 && formData.visaSubclass === "482" && Object.keys(errors).length > 0)
                }
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