
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface ApiKeyInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyInput = ({ isOpen, onClose, onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  // Check for the default key on component mount
  useEffect(() => {
    const defaultKey = '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';
    setApiKey(defaultKey);
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter an OpenAI API key to continue.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('openai_api_key', apiKey);
    
    // Notify parent component
    onSave(apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key Required</DialogTitle>
          <DialogDescription>
            To generate new themed stations, please enter your OpenAI API key. 
            Your key will be stored locally in your browser and is never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-2">
            You can get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-teal underline">OpenAI's dashboard</a>.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
