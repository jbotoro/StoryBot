import React from 'react';
import { Button } from '@/app/components/ui/button';

interface ActionsProps {
  loading: boolean;
  fetchSuggestion: () => void;
  replaceSuggestion: () => void;
  clearEditor: () => void;
  suggestionAvailable: boolean;
}

export const SuggestionActions: React.FC<ActionsProps> = ({
  loading,
  fetchSuggestion,
  replaceSuggestion,
  clearEditor,
  suggestionAvailable,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      <Button
        onClick={fetchSuggestion}
        disabled={loading}
        className="w-[100px] sm:w-[120px] lg:w-[140px] bg-button-primary text-text-primary rounded-full px-4 py-2 shadow-soft transition-all hover:bg-soft-blue/80 hover:shadow-lg hover:scale-105"
      >
        {loading ? 'Loading...' : 'Get Suggestion'}
      </Button>
  
      <Button
        onClick={replaceSuggestion}
        disabled={!suggestionAvailable}
        className="w-[100px] sm:w-[120px] lg:w-[140px] bg-button-secondary text-text-primary rounded-full px-4 py-2 shadow-soft transition-all hover:bg-soft-pink/80 hover:shadow-lg hover:scale-105"
      >
        Use Suggestion
      </Button>
  
      <Button
        onClick={clearEditor}
        className="w-[100px] sm:w-[120px] lg:w-[140px] bg-button-tertiary text-text-primary rounded-full px-4 py-2 shadow-soft transition-all hover:bg-soft-yellow/80 hover:shadow-lg hover:scale-105"
      >
        Clear Editor
      </Button>
    </div>
  );
  
};
