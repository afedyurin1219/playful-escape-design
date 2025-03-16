
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DurationSelectorProps {
  onDurationSelected: (duration: string) => void;
}

const DurationSelector = ({ onDurationSelected }: DurationSelectorProps) => {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  
  const durations = [
    { id: "0-30", label: "< 30 minutes", description: "Quick activity" },
    { id: "30-60", label: "30-60 minutes", description: "Standard length" },
    { id: "60-120", label: "1-2 hours", description: "Extended experience" }
  ];
  
  useEffect(() => {
    if (selectedDuration) {
      onDurationSelected(selectedDuration);
    }
  }, [selectedDuration, onDurationSelected]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.h2 
        className="text-3xl font-display mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How long should the activity last?
      </motion.h2>
      
      <motion.p 
        className="text-center text-charcoal-light mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select the desired duration for your escape room experience
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {durations.map((duration, index) => (
          <motion.div
            key={duration.id}
            className={`option-card ${selectedDuration === duration.id ? 'selected' : ''}`}
            onClick={() => setSelectedDuration(duration.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">{duration.label}</h3>
              <p className="text-center text-charcoal-light text-sm">
                {duration.description}
              </p>
            </div>
            {selectedDuration === duration.id && (
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

export default DurationSelector;
