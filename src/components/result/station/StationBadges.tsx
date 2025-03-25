
import { Badge } from '@/components/ui/badge';
import { Printer } from 'lucide-react';
import { Station } from '../../EscapeRoomGenerator';
import { hasPrintableContent } from '../../../utils/printUtils';

interface StationBadgesProps {
  station: Station;
  difficulty: string | null;
  hasPrintableMaterials: boolean;
}

const StationBadges = ({ station, difficulty, hasPrintableMaterials }: StationBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {hasPrintableMaterials && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 w-fit">
          <Printer className="h-3 w-3" /> Printable Materials
        </Badge>
      )}
      {difficulty && (
        <Badge variant="outline" className={`
          flex items-center gap-1 w-fit
          ${difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : 
            difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
            'bg-red-50 text-red-700 border-red-200'}
        `}>
          {difficulty === 'easy' ? 'Easy' : 
           difficulty === 'medium' ? 'Medium' : 'Hard'}
        </Badge>
      )}
    </div>
  );
};

export default StationBadges;
