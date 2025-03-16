
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressBar = ({ currentStep, totalSteps, stepTitles }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      <div className="relative pb-4">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200"></div>
        <motion.div 
          className="absolute top-4 left-0 h-0.5 bg-teal"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index < currentStep 
                    ? 'bg-teal text-white' 
                    : index === currentStep 
                    ? 'bg-teal text-white' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
                initial={{ scale: index === currentStep ? 0.5 : 1 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {index < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <div className={`text-xs mt-2 font-medium text-center ${
                index <= currentStep ? 'text-teal' : 'text-gray-400'
              }`}>
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
