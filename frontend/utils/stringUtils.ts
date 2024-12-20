export const removeOverlap = (existingText: string, suggestion: string): string => {
    let overlapLength = 0;
  
    const maxLength = Math.min(existingText.length, suggestion.length);
  
    for (let i = 1; i <= maxLength; i++) {
      const endOfExisting = existingText.slice(-i);
      const startOfSuggestion = suggestion.slice(0, i);
  
      if (endOfExisting === startOfSuggestion) {
        overlapLength = i;
      }
    }
  
    const cleanedSuggestion = suggestion.slice(overlapLength);

    return cleanedSuggestion;
  };
  
  