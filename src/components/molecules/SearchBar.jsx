import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  className,
  filters = [],
  selectedFilter,
  onFilterChange,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilterSelect = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    setIsFilterOpen(false);
  };

  return (
    <div className={cn("relative flex items-center space-x-2", className)}>
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          icon="Search"
          iconPosition="left"
          className="pr-10"
          {...props}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              if (onSearch) onSearch("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {filters.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn-secondary flex items-center space-x-2"
          >
            <ApperIcon name="Filter" className="w-4 h-4" />
            <span>Filter</span>
            <ApperIcon name="ChevronDown" className="w-4 h-4" />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-elevated border border-gray-100 py-2 z-10">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterSelect(filter)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2",
                    selectedFilter?.value === filter.value && "bg-primary-50 text-primary-700"
                  )}
                >
                  {filter.icon && <ApperIcon name={filter.icon} className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;