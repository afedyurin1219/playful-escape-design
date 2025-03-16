
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AgeSelectorProps {
  onAgeSelected: (age: string) => void;
}

const AgeSelector = ({ onAgeSelected }: AgeSelectorProps) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  
  const ageGroups = [
    { id: "3-5", label: "3-5 years" },
    { id: "5-10", label: "5-10 years" },
    { id: "10-15", label: "10-15 years" },
    { id: "15+", label: "15+ years" }
  ];
  
  useEffect(() => {
    if (selectedAge) {
      onAgeSelected(selectedAge);
    }
  }, [selectedAge, onAgeSelected]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.h2 
        className="text-3xl font-display mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How old are the kids?
      </motion.h2>
      
      <motion.p 
        className="text-center text-charcoal-light mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select the age group of the participants to get age-appropriate activities
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ageGroups.map((age, index) => (
          <motion.div
            key={age.id}
            className={`option-card ${selectedAge === age.id ? 'selected' : ''}`}
            onClick={() => setSelectedAge(age.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex flex-col items-center p-4">
              <h3 className="text-xl font-medium mb-2">{age.label}</h3>
              <p className="text-center text-charcoal-light text-sm">
                {age.id === '3-5' && "Simple, colorful activities with parent guidance"}
                {age.id === '5-10' && "Fun challenges with moderate problem-solving"}
                {age.id === '10-15' && "More complex puzzles requiring teamwork"}
                {age.id === '15+' && "Advanced challenges with sophisticated themes"}
              </p>
            </div>
            {selectedAge === age.id && (
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

export default AgeSelector;
