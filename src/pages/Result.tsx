
import { motion } from 'framer-motion';
import { useEscapeRoomResult } from '../hooks/useEscapeRoomResult';
import ApiKeyInput from '../components/ApiKeyInput';
import ResultHeader from '../components/result/ResultHeader';
import ResultActions from '../components/result/ResultActions';
import ResultTabs from '../components/result/ResultTabs';
import ResultContent from '../components/result/ResultContent';

const Result = () => {
  const {
    activeTab,
    setActiveTab,
    stations,
    currentStationIndex,
    isGeneratingStation,
    isGeneratingInitialStations,
    isLoadingStory,
    showApiKeyDialog,
    setShowApiKeyDialog,
    escapeRoom,
    config,
    customStory,
    handleChangeStation,
    handleDeleteStation,
    handleAddStation,
    handleSaveApiKey,
    isValidState
  } = useEscapeRoomResult();
  
  if (!isValidState || !escapeRoom || !config) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16 print:p-0">
      <ResultHeader title={escapeRoom.title} story={customStory || ''} />
      
      <main className="max-w-6xl mx-auto px-6 print:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ApiKeyInput 
            isOpen={showApiKeyDialog} 
            onClose={() => setShowApiKeyDialog(false)}
            onSave={handleSaveApiKey}
          />
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display text-teal mb-3">{escapeRoom.title}</h1>
            {isLoadingStory ? (
              <p className="text-lg max-w-3xl mx-auto italic">Loading story introduction...</p>
            ) : (
              <p className="text-lg max-w-3xl mx-auto">{escapeRoom.story}</p>
            )}
          </div>
          
          <ResultActions escapeRoom={escapeRoom} />
          
          <ResultTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <ResultContent 
            activeTab={activeTab}
            escapeRoom={escapeRoom}
            config={config}
            stations={stations}
            isGeneratingStation={isGeneratingStation}
            isGeneratingInitialStations={isGeneratingInitialStations}
            currentStationIndex={currentStationIndex}
            onChangeStation={handleChangeStation}
            onDeleteStation={handleDeleteStation}
            onAddStation={handleAddStation}
          />
        </motion.div>
      </main>
      
      <style>{`
        @media print {
          @page { margin: 1cm; }
          body { font-size: 12pt; }
          h1 { font-size: 24pt; }
          h2 { font-size: 18pt; }
          h3 { font-size: 14pt; }
          .print-hidden { display: none !important; }
          .shadow-card { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Result;
