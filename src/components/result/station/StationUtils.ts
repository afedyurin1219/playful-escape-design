
/**
 * Helper functions for station components
 */

// Check if task mentions any printable materials that need to be created
export const taskMentionsPrintableMaterials = (task: string): boolean => {
  const taskLower = task.toLowerCase();
  const printableTerms = ['chart', 'cipher', 'key', 'code sheet', 'reference', 'provided', 'decoder', 'printed'];
  return printableTerms.some(term => taskLower.includes(term));
};

// Helper function to get supplies for a station
export const getStationSupplies = (stationName: string, stationSupplies: any[] | undefined, globalSupplies: Array<any>) => {
  // First, check if the station has its own supplies array
  if (stationSupplies && Array.isArray(stationSupplies) && stationSupplies.length > 0) {
    return stationSupplies;
  }
  
  // If no station-specific supplies and no global supplies, return empty array
  if (!globalSupplies || !Array.isArray(globalSupplies) || globalSupplies.length === 0) {
    return [];
  }
  
  // Otherwise, look for station-specific supplies in the global supplies list
  const stationNameLower = stationName.toLowerCase();
  
  return globalSupplies.filter(supply => {
    if (!supply || typeof supply !== 'object') {
      return false;
    }
    
    return supply.purpose && 
           typeof supply.purpose === 'string' && 
           supply.purpose.toLowerCase().includes(stationNameLower);
  });
};

// Check if station is a physical task (find objects, assemble items, etc.)
export const isPhysicalTask = (task: string): boolean => {
  const taskLower = task.toLowerCase();
  return (
    taskLower.includes('find') || 
    taskLower.includes('search') || 
    taskLower.includes('locate') || 
    taskLower.includes('collect') ||
    taskLower.includes('gather') ||
    taskLower.includes('physical')
  );
};
