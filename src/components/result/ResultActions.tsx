
import { Button } from '@/components/ui/button';
import { Copy, Printer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { EscapeRoomPlan } from '../EscapeRoomGenerator';

interface ResultActionsProps {
  escapeRoom: EscapeRoomPlan;
}

const ResultActions = ({ escapeRoom }: ResultActionsProps) => {
  const { toast } = useToast();
  
  const handleCopyToClipboard = () => {
    const summary = `
${escapeRoom.title}

STORY:
${escapeRoom.story}

TEAM SETUP:
${escapeRoom.teamSetup}

STATIONS:
${escapeRoom.stations.map((station, index) => `
${index + 1}. ${station.name}
Task: ${station.task}
Answer: ${station.answer}
Hints: ${station.hints.join(', ')}
Instructions: ${station.facilitatorInstructions}
`).join('')}

SUPPLIES:
${escapeRoom.supplies.map(supply => `- ${supply.name}: ${supply.purpose}`).join('\n')}

PRIZES:
${escapeRoom.prizes.join(', ')}
    `;
    
    navigator.clipboard.writeText(summary).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "You can now paste the escape room plan anywhere you want.",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Please try again or manually select and copy the text.",
        variant: "destructive"
      });
    });
  };
  
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };
  
  return (
    <div className="flex justify-center gap-4 mb-8 print:hidden">
      <Button 
        onClick={handleCopyToClipboard}
        className="flex items-center gap-2"
      >
        <Copy className="h-4 w-4" /> Copy to Clipboard
      </Button>
      <Button 
        variant="outline" 
        onClick={handlePrint}
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" /> Print
      </Button>
    </div>
  );
};

export default ResultActions;
