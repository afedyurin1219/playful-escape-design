
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AgeSelector from '../components/AgeSelector';
import ThemeSelector from '../components/ThemeSelector';
import GroupSizeSelector from '../components/GroupSizeSelector';
import DifficultySelector from '../components/DifficultySelector';
import DurationSelector from '../components/DurationSelector';
import ProgressBar from '../components/ProgressBar';
import { EscapeRoomConfig, generateEscapeRoom, EscapeRoomPlan } from '../components/EscapeRoomGenerator';

const Creator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [config, setConfig] = useState<EscapeRoomConfig>({
    ageGroup: '',
    theme: '',
    customTheme: '',
    groupSize: '',
    difficulty: 'medium', // Default value
    duration: ''
  });
  
  const stepTitles = [
    "Age",
    "Theme",
    "Group Size",
    "Difficulty",
    "Duration",
    "Create"
  ];
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prevStep => prevStep + 1);
  };
  
  const handleBack = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prevStep => prevStep - 1);
  };
  
  const handleAgeSelected = (age: string) => {
    setConfig({ ...config, ageGroup: age });
  };
  
  const handleThemeSelected = (theme: string, customTheme?: string) => {
    setConfig({ ...config, theme, customTheme });
  };
  
  const handleGroupSizeSelected = (size: string) => {
    setConfig({ ...config, groupSize: size });
  };
  
  const handleDifficultySelected = (difficulty: string) => {
    setConfig({ ...config, difficulty });
  };
  
  const handleDurationSelected = (duration: string) => {
    setConfig({ ...config, duration });
  };
  
  const handleCreate = () => {
    setLoading(true);
    
    // In a real app, we might call an AI service here
    // For now, we'll use a timeout to simulate processing
    setTimeout(() => {
      const escapeRoom = generateEscapeRoom(config);
      navigate('/result', { state: { escapeRoom, config } });
      setLoading(false);
    }, 3000);
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 0: return !!config.ageGroup;
      case 1: return !!config.theme || !!config.customTheme;
      case 2: return !!config.groupSize;
      case 3: return !!config.difficulty;
      case 4: return !!config.duration;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16">
      {/* Header */}
      <header className="py-6 px-6 border-b border-gray-200 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-display text-teal">EscapeLab</a>
        </div>
      </header>
      
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={stepTitles.length} stepTitles={stepTitles} />
      
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="page-transition"
        >
          {currentStep === 0 && (
            <div className="step-container">
              <AgeSelector onAgeSelected={handleAgeSelected} />
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="step-container">
              <ThemeSelector ageGroup={config.ageGroup} onThemeSelected={handleThemeSelected} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="step-container">
              <GroupSizeSelector onGroupSizeSelected={handleGroupSizeSelected} />
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="step-container">
              <DifficultySelector onDifficultySelected={handleDifficultySelected} />
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="step-container">
              <DurationSelector onDurationSelected={handleDurationSelected} />
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="step-container">
              <motion.div 
                className="w-full max-w-2xl mx-auto text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-display mb-6">Ready to Create Your Escape Room</h2>
                
                <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
                  <h3 className="text-xl font-medium mb-4">Your Selections</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Age Group:</span>
                      <span className="font-medium">{config.ageGroup} years</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Theme:</span>
                      <span className="font-medium">{config.customTheme || config.theme}</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Group Size:</span>
                      <span className="font-medium">{config.groupSize} kids</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Difficulty:</span>
                      <span className="font-medium capitalize">{config.difficulty}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-charcoal-light">Duration:</span>
                      <span className="font-medium">
                        {config.duration === '0-30' ? 'Less than 30 minutes' :
                         config.duration === '30-60' ? '30-60 minutes' :
                         '1-2 hours'}
                      </span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-charcoal-light mb-8">
                  Our system will generate a complete escape room plan based on your selections, including puzzles, hints, and a supply list.
                </p>
                
                <button 
                  className="btn-primary relative"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="opacity-0">Design Escape Room</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    "Design Escape Room"
                  )}
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <button 
            className="btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          
          {currentStep < 5 && (
            <button 
              className="btn-primary"
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creator;
