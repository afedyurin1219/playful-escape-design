
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getThemesByAgeGroup, Theme } from './ThemeData';

interface ThemeSelectorProps {
  ageGroup: string;
  onThemeSelected: (theme: string, customTheme?: string) => void;
}

const ThemeSelector = ({ ageGroup, onThemeSelected }: ThemeSelectorProps) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  
  useEffect(() => {
    // Get themes for the selected age group
    let themesForAge = getThemesByAgeGroup(ageGroup);
    
    // Ensure we have exactly 9 themes (3x3 grid)
    if (themesForAge.length > 9) {
      themesForAge = themesForAge.slice(0, 9);
    } else if (themesForAge.length < 9) {
      // If fewer than 9 themes, duplicate some to fill the grid
      const originalCount = themesForAge.length;
      for (let i = 0; i < 9 - originalCount; i++) {
        themesForAge.push({
          ...themesForAge[i % originalCount],
          id: `${themesForAge[i % originalCount].id}-copy-${i}`,
        });
      }
    }
    
    setThemes(themesForAge);
  }, [ageGroup]);
  
  useEffect(() => {
    if (selectedTheme) {
      onThemeSelected(selectedTheme, isCustom ? customTheme : undefined);
    }
  }, [selectedTheme, customTheme, isCustom, onThemeSelected]);
  
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setIsCustom(false);
  };
  
  const handleCustomThemeSelect = () => {
    if (customTheme.trim()) {
      setSelectedTheme('custom');
      setIsCustom(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-display mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose a Theme
      </motion.h2>
      
      <motion.p 
        className="text-center text-charcoal-light mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select a theme for your escape room or create your own
      </motion.p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            className={`option-card ${selectedTheme === theme.id ? 'selected' : ''}`}
            onClick={() => handleThemeSelect(theme.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
          >
            <div className="flex flex-col items-center p-3">
              {theme.imageUrl ? (
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-100">
                  <img 
                    src={theme.imageUrl} 
                    alt={theme.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                  <span className="text-teal text-xl font-medium">{theme.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-lg font-medium mb-1">{theme.name}</h3>
              <p className="text-center text-charcoal-light text-sm line-clamp-2">
                {theme.description}
              </p>
            </div>
            {selectedTheme === theme.id && (
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
      
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium mb-3 text-center">Create your own theme</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Enter your own theme..."
            className="input-field flex-grow"
          />
          <button 
            className="btn-primary whitespace-nowrap"
            onClick={handleCustomThemeSelect}
            disabled={!customTheme.trim()}
          >
            Use Custom
          </button>
        </div>
        {isCustom && selectedTheme === 'custom' && (
          <motion.p 
            className="mt-2 text-teal text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Custom theme selected: {customTheme}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ThemeSelector;
