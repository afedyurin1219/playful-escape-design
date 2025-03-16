
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DifficultySelectorProps {
  onDifficultySelected: (difficulty: string) => void;
}

const DifficultySelector = ({ onDifficultySelected }: DifficultySelectorProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  
  const difficulties = [
    { id: "easy", label: "Easy", description: "Simple puzzles with lots of hints" },
    { id: "medium", label: "Medium", description: "Balanced challenge level" },
    { id: "hard", label: "Hard", description: "Complex puzzles, fewer hints" }
  ];
  
  useEffect(() => {
    onDifficultySelected(selectedDifficulty);
  }, [selectedDifficulty, onDifficultySelected]);

  useEffect(() => {
    // Default to medium difficulty on component mount
    setSelectedDifficulty('medium');
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.h2 
        className="text-3xl font-display mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Select Difficulty Level
      </motion.h2>
      
      <motion.p 
        className="text-center text-charcoal-light mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Choose how challenging you want the escape room to be
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty, index) => (
          <motion.div
            key={difficulty.id}
            className={`option-card ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(difficulty.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                <span className="text-teal text-xl font-medium">
                  {difficulty.id === "easy" ? "★" : difficulty.id === "medium" ? "★★" : "★★★"}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">{difficulty.label}</h3>
              <p className="text-center text-charcoal-light text-sm">
                {difficulty.description}
              </p>
            </div>
            {selectedDifficulty === difficulty.id && (
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

export default DifficultySelector;
