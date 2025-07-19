import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClientTable from "@/components/organisms/ClientTable";
import { clientService } from "@/services/api/clientService";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      setError("Failed to load clients. Please try again.");
      console.error("Error loading clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleClientClick = (client) => {
    console.log("View client details:", client);
    // Navigate to client detail page
  };

  const handleNewClient = () => {
    console.log("Create new client");
    // Open new client modal or navigate to form
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
            Client Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your immigration clients and their information.
          </p>
        </div>
      </motion.div>

      <ClientTable
        clients={clients}
        loading={loading}
        error={error}
        onRetry={loadClients}
        onClientClick={handleClientClick}
        onNewClient={handleNewClient}
      />
    </div>
  );
};

export default Clients;