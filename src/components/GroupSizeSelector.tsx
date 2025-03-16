
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GroupSizeSelectorProps {
  onGroupSizeSelected: (size: string) => void;
}

const GroupSizeSelector = ({ onGroupSizeSelected }: GroupSizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const groupSizes = [
    { id: "0-5", label: "0-5 kids", description: "Small intimate group" },
    { id: "5-10", label: "5-10 kids", description: "Medium-sized group" },
    { id: "10+", label: "10+ kids", description: "Large group" }
  ];
  
  useEffect(() => {
    if (selectedSize) {
      onGroupSizeSelected(selectedSize);
    }
  }, [selectedSize, onGroupSizeSelected]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.h2 
        className="text-3xl font-display mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How many kids will participate?
      </motion.h2>
      
      <motion.p 
        className="text-center text-charcoal-light mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The number of participants will help us design team activities
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupSizes.map((size, index) => (
          <motion.div
            key={size.id}
            className={`option-card ${selectedSize === size.id ? 'selected' : ''}`}
            onClick={() => setSelectedSize(size.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                <span className="text-teal text-xl font-medium">
                  {size.id === "0-5" ? "S" : size.id === "5-10" ? "M" : "L"}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">{size.label}</h3>
              <p className="text-center text-charcoal-light text-sm">
                {size.description}
              </p>
            </div>
            {selectedSize === size.id && (
              <motion.div 
                className="absolute top-3 right-3 bg-teal text-white rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroupSizeSelector;
