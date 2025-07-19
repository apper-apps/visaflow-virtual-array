import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import TableRow from "@/components/molecules/TableRow";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ClientTable = ({ clients, loading, error, onRetry, onClientClick, onNewClient }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = [
    { label: "All Clients", value: "all", icon: "Users" },
    { label: "Active Cases", value: "active", icon: "UserCheck" },
    { label: "Pending Documents", value: "pending", icon: "Clock" },
    { label: "Completed", value: "completed", icon: "CheckCircle" }
  ];

  const columns = [
    {
      key: "name",
      label: "Client",
      render: (value, client) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{client.firstName} {client.lastName}</div>
            <div className="text-sm text-gray-500">{client.email}</div>
          </div>
        </div>
      )
    },
    {
      key: "nationality",
      label: "Nationality",
      render: (value) => (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Flag" className="w-4 h-4 text-gray-400" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      type: "badge",
      getVariant: (status) => {
        switch (status.toLowerCase()) {
          case "active": return "success";
          case "pending": return "warning";
          case "completed": return "info";
          case "on hold": return "error";
          default: return "default";
        }
      }
    },
    {
      key: "applications",
      label: "Applications",
      render: (value) => (
        <div className="flex items-center space-x-2">
          <ApperIcon name="FileText" className="w-4 h-4 text-gray-400" />
          <span>{value} active</span>
        </div>
      )
    },
    {
      key: "lastContact",
      label: "Last Contact",
      type: "date"
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !selectedFilter || selectedFilter.value === "all" ||
      (selectedFilter.value === "active" && client.status === "Active") ||
      (selectedFilter.value === "pending" && client.status === "Pending") ||
      (selectedFilter.value === "completed" && client.status === "Completed");
    
    return matchesSearch && matchesFilter;
  });

  const actions = [
    {
      icon: "Eye",
      label: "View Details",
      onClick: (client) => onClientClick(client)
    },
    {
      icon: "Edit",
      label: "Edit Client",
      onClick: (client) => console.log("Edit", client)
    },
    {
      icon: "Plus",
      label: "New Application",
      onClick: (client) => console.log("New Application", client)
    }
  ];

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Client Database</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your immigration clients and their cases</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" icon="Download" size="sm">
              Export
            </Button>
            <Button variant="accent" icon="Plus" onClick={onNewClient}>
              Add Client
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <SearchBar
            placeholder="Search clients by name, email, or nationality..."
            onSearch={setSearchQuery}
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="p-6">
          <Empty
            type="clients"
            onAction={onNewClient}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <TableRow
                  key={client.Id}
                  data={client}
                  columns={columns}
                  actions={actions}
                  onRowClick={onClientClick}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default ClientTable;