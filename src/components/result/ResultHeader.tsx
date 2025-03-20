
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResultHeaderProps {
  title: string;
  story: string;
}

const ResultHeader = ({ title, story }: ResultHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="py-6 px-6 border-b border-gray-200 mb-8 print:hidden">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-display text-teal">Escape Room Designer</a>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" /> Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/create')}
          >
            Create New
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ResultHeader;
