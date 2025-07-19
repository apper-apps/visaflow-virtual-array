import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@visaflow.com.au",
    phone: "+61 2 9876 5432",
    maraNumber: "1234567",
    
    // Firm settings
    firmName: "VisaFlow Immigration Services",
    firmAddress: "Level 15, 123 Collins Street, Melbourne VIC 3000",
    firmPhone: "+61 2 9876 5400",
    firmEmail: "info@visaflow.com.au",
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    deadlineReminders: true,
    clientUpdates: true,
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: 30
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "firm", label: "Firm Details", icon: "Building" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "billing", label: "Billing", icon: "CreditCard" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulate save operation
    toast.success("Settings saved successfully!");
  };

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Update your personal and professional details.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          required
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        <Input
          label="MARA Registration Number"
          value={formData.maraNumber}
          onChange={(e) => handleInputChange("maraNumber", e.target.value)}
          required
        />
      </div>
      
      <div className="bg-info-50 border border-info-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="w-5 h-5 text-info-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-info-800">MARA Registration</h4>
            <p className="text-sm text-info-700 mt-1">
              Your MARA registration number is verified and active. 
              This information is used for compliance reporting and client communications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const FirmSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Firm Information</h3>
        <p className="text-gray-600">Manage your practice details and contact information.</p>
      </div>
      
      <div className="space-y-6">
        <Input
          label="Firm Name"
          value={formData.firmName}
          onChange={(e) => handleInputChange("firmName", e.target.value)}
          required
        />
        <Input
          label="Business Address"
          value={formData.firmAddress}
          onChange={(e) => handleInputChange("firmAddress", e.target.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Firm Phone"
            type="tel"
            value={formData.firmPhone}
            onChange={(e) => handleInputChange("firmPhone", e.target.value)}
            required
          />
          <Input
            label="Firm Email"
            type="email"
            value={formData.firmEmail}
            onChange={(e) => handleInputChange("firmEmail", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h3>
        <p className="text-gray-600">Choose how you want to receive updates and reminders.</p>
      </div>
      
      <div className="space-y-4">
        {[
          { key: "emailNotifications", label: "Email Notifications", description: "Receive important updates via email" },
          { key: "smsNotifications", label: "SMS Notifications", description: "Get urgent alerts via text message" },
          { key: "deadlineReminders", label: "Deadline Reminders", description: "Alerts for upcoming deadlines and due dates" },
          { key: "clientUpdates", label: "Client Updates", description: "Notifications when clients upload documents or respond" }
        ].map((setting) => (
          <div key={setting.key} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{setting.label}</h4>
              <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
            </div>
            <button
              onClick={() => handleInputChange(setting.key, !formData[setting.key])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                formData[setting.key] ? "bg-primary-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  formData[setting.key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
        <p className="text-gray-600">Manage your account security and access controls.</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={formData.twoFactorAuth ? "success" : "warning"}>
              {formData.twoFactorAuth ? "Enabled" : "Disabled"}
            </Badge>
            <Button 
              variant={formData.twoFactorAuth ? "secondary" : "primary"} 
              size="sm"
              onClick={() => handleInputChange("twoFactorAuth", !formData.twoFactorAuth)}
            >
              {formData.twoFactorAuth ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select 
              value={formData.sessionTimeout}
              onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
              className="input-field"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button variant="secondary" icon="Key" className="w-full">
            Change Password
          </Button>
          <Button variant="secondary" icon="Download" className="w-full">
            Download Security Report
          </Button>
        </div>
      </div>
    </div>
  );

  const BillingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing & Subscription</h3>
        <p className="text-gray-600">Manage your subscription and billing preferences.</p>
      </div>
      
      <Card variant="gradient">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900">Professional Plan</h4>
            <p className="text-sm text-gray-600">Advanced features for migration agents</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Monthly Cost</p>
            <p className="text-xl font-bold text-gray-900">$149 AUD</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Billing</p>
            <p className="text-lg font-semibold text-gray-900">Feb 28, 2024</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            Change Plan
          </Button>
          <Button variant="secondary" size="sm">
            Billing History
          </Button>
        </div>
      </Card>
      
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="AlertTriangle" className="w-5 h-5 text-warning-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning-800">Payment Method</h4>
            <p className="text-sm text-warning-700 mt-1">
              Your credit card ending in 4242 expires next month. Update your payment method to avoid service interruption.
            </p>
            <Button variant="warning" size="sm" className="mt-3">
              Update Payment Method
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileSettings />;
      case "firm": return <FirmSettings />;
      case "notifications": return <NotificationSettings />;
      case "security": return <SecuritySettings />;
      case "billing": return <BillingSettings />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and system configuration.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary-50 text-primary-700 border-r-4 border-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon 
                    name={tab.icon} 
                    className={`mr-3 h-5 w-5 ${
                      activeTab === tab.id ? "text-primary-600" : "text-gray-400"
                    }`} 
                  />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <Card padding="lg">
            {renderTabContent()}
            
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button variant="secondary">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;