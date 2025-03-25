/**
 * Helper functions for station components
 */

// Check if task mentions any printable materials that need to be created
export const taskMentionsPrintableMaterials = (task: string): boolean => {
  const taskLower = task.toLowerCase();
  const printableTerms = ['chart', 'cipher', 'key', 'code sheet', 'reference', 'provided', 'decoder'];
  return printableTerms.some(term => taskLower.includes(term));
};

// Helper function to get supplies for a station
export const getStationSupplies = (stationName: string, stationSupplies: any[] | undefined, globalSupplies: Array<any>) => {
  // First, check if the station has its own supplies array
  if (stationSupplies && Array.isArray(stationSupplies) && stationSupplies.length > 0) {
    return stationSupplies;
  }
  
  // Otherwise, look for station-specific supplies in the global supplies list
  const stationNameLower = stationName.toLowerCase();
  
  return globalSupplies.filter(supply => {
    return supply.purpose && supply.purpose.toLowerCase().includes(stationNameLower);
  });
};
