
import { EscapeRoomConfig, EscapeRoomPlan } from '../EscapeRoomGenerator';

interface OverviewTabProps {
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
}

// Helper function to capitalize first letter of each word and format hyphenated strings
const formatThemeName = (str: string): string => {
  if (!str) return '';
  // Replace hyphens with spaces and then capitalize each word
  return str
    .split('-')
    .join(' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const OverviewTab = ({ escapeRoom, config }: OverviewTabProps) => {
  // Get properly formatted theme for display
  const getDisplayTheme = () => {
    if (config.customTheme) {
      return formatThemeName(config.customTheme);
    }
    return formatThemeName(config.theme);
  };

  return (
    <div className="overview">
      <h2 className="text-2xl font-display mb-6 print:block hidden">Overview</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none">
          <h2 className="text-xl font-medium mb-4">Configuration</h2>
          <ul className="space-y-3">
            <li className="flex justify-between pb-2 border-b border-gray-100">
              <span className="text-charcoal-light">Age Group:</span>
              <span className="font-medium">{config.ageGroup} years</span>
            </li>
            <li className="flex justify-between pb-2 border-b border-gray-100">
              <span className="text-charcoal-light">Theme:</span>
              <span className="font-medium">{getDisplayTheme()}</span>
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
        <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none">
          <h2 className="text-xl font-medium mb-4">Team Setup</h2>
          <p>{escapeRoom.teamSetup}</p>
          
          <h2 className="text-xl font-medium mt-6 mb-4">Prizes</h2>
          <ul className="list-disc pl-5 space-y-1">
            {escapeRoom.prizes.map((prize, index) => (
              <li key={index}>{prize}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
