
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle } from 'lucide-react';
import { PROJECT_API_KEY } from '@/utils/openai/constants';
import { isValidOpenAIKey } from '@/utils/openai/validation';

interface ApiKeyInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyInput = ({ isOpen, onClose, onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isProjectKeyValid, setIsProjectKeyValid] = useState(false);

  // Check if project API key is valid and load user API key from localStorage if available
  useEffect(() => {
    const projectKeyValid = isValidOpenAIKey(PROJECT_API_KEY);
    setIsProjectKeyValid(projectKeyValid);
    
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    setError(null);
  }, [isOpen]);

  const validateApiKey = (key: string): boolean => {
    if (!key.trim()) {
      setError("API key cannot be empty");
      return false;
    }
    
    if (!key.startsWith('sk-')) {
      setError("API key must start with 'sk-'");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSave = () => {
    if (!validateApiKey(apiKey)) {
      return;
    }

    // Save to localStorage
    localStorage.setItem('openai_api_key', apiKey);
    
    // Notify parent component
    onSave(apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved as a backup.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            {isProjectKeyValid ? (
              <>The project has a valid API key configured. You can optionally provide your own API key as a backup.</>
            ) : (
              <><span className="text-red-500 font-semibold">IMPORTANT:</span> Project API key is invalid. You must provide your own API key to use this application.</>
            )}
            <p className="mt-2">Your key will be stored locally in your browser and is never sent to our servers.</p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              if (error) validateApiKey(e.target.value);
            }}
            className={`w-full ${error ? 'border-red-500' : ''}`}
          />
          
          {error && (
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-2">
            <p>You can get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-teal underline">OpenAI's dashboard</a>.</p>
            <p className="mt-1">Valid keys start with "sk-".</p>
            <p className="mt-1 text-red-500">Never share your API key or commit it to version control.</p>
          </div>
        </div>
        
        <DialogFooter>
          {isProjectKeyValid && (
            <Button variant="outline" onClick={onClose}>Use Project Key</Button>
          )}
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
