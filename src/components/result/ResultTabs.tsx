
import React from 'react';

interface ResultTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResultTabs: React.FC<ResultTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['overview', 'stations', 'supplies', 'facilitation'];
  
  return (
    <div className="border-b border-gray-200 mb-6 print:hidden">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab 
                ? 'border-teal text-teal' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ResultTabs;
