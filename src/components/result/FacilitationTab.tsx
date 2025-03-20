
const FacilitationTab = () => {
  return (
    <div className="facilitation mt-8">
      <h2 className="text-2xl font-display mb-6 print:page-break-before">Facilitation Guide</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 mb-6">
        <h3 className="text-xl font-medium mb-4">Setup</h3>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Read through all stations and challenges to understand the flow.</li>
          <li>Gather all supplies listed in the Supplies tab.</li>
          <li>Set up each station in a different part of your home.</li>
          <li>Hide clues and items as indicated in the facilitator instructions.</li>
          <li>Set up team markers if you're dividing kids into teams.</li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 mb-6">
        <h3 className="text-xl font-medium mb-4">Running the Activity</h3>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Begin with a dramatic reading of the story to set the scene.</li>
          <li>Explain the team setup to the participants.</li>
          <li>Start with the first station, giving each team their first clue.</li>
          <li>Use the hints provided only when teams are struggling.</li>
          <li>Keep track of time to ensure the activity stays within the planned duration.</li>
          <li>Award prizes at the conclusion of the activity.</li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200">
        <h3 className="text-xl font-medium mb-4">Tips for Success</h3>
        <ul className="list-disc pl-5 space-y-3">
          <li>Take photos of each station before kids arrive, so you can reset if needed.</li>
          <li>Have extra paper, pencils, and supplies on hand.</li>
          <li>Consider having small hints or clues for teams that fall behind.</li>
          <li>Keep the difficulty level appropriate - it's better for kids to succeed with some hints than to get frustrated.</li>
          <li>Consider having small prizes for everyone, not just the winning team.</li>
          <li>Take photos during the activity to share with parents afterward.</li>
        </ul>
      </div>
    </div>
  );
};

export default FacilitationTab;
