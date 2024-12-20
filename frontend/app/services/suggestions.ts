import axiosInstance from "@/utils/axiosInstance";
import { SuggestionResponse } from "@/types/api";
import { removeOverlap } from "@/utils/stringUtils";

export const getSuggestion = async (text: string): Promise<SuggestionResponse> => {
    const response = await axiosInstance.post<SuggestionResponse>('/ai/suggest', { text });
    return response.data;
};

export const fetchSuggestion = async (
    editor: any,
    setSuggestion: (value: string) => void,
    setLoading: (value: boolean) => void
  ) => {
    if (!editor) return;
  
    const { state } = editor;
    const { from, to } = state.selection;
  
    const isTextHighlighted = from !== to;
    const textToSend = isTextHighlighted
      ? editor.state.doc.textBetween(from, to) // Extract highlighted text
      : editor.getText(); // Get full editor content if nothing is highlighted
  
    if (!textToSend.trim()) {
      console.warn('No valid text to send for suggestion.');
      return;
    }
  
    setLoading(true);
    setSuggestion('');
  
    try {
      const response = await getSuggestion(textToSend); // Fetch suggestion from API
      const rawSuggestion = response.suggestion;
  
      // Remove overlap
      const existingText = editor.getText();
      const cleanedSuggestion = removeOverlap(existingText, rawSuggestion);
  
      setSuggestion(cleanedSuggestion);
    } catch (err) {
      console.error('Error fetching suggestion:', err);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  export const applySuggestion = (editor: any, suggestion: string, setSuggestion: (value: string) => void) => {
    if (!editor || !suggestion) return;
  
    const { state, commands } = editor;
    const existingText = editor.getText();
  
    // Remove overlap before appending
    const cleanedSuggestion = removeOverlap(existingText, suggestion);
  
    const { from, to } = state.selection;
  
    if (from !== to) {
      // Replace highlighted text
      commands.insertContentAt({ from, to }, cleanedSuggestion);
    } else {
      // Append cleaned suggestion
      const lastChar = existingText.slice(-1);
      const firstCharOfSuggestion = cleanedSuggestion.trim().charAt(0);
  
      let suggestionToInsert = cleanedSuggestion.trim();
  
      if (/[a-zA-Z0-9]/.test(lastChar) && !/[\s.,;:!?]/.test(firstCharOfSuggestion)) {
        // If mid-word or no separator, add a space before the suggestion
        suggestionToInsert = ' ' + suggestionToInsert;
      }
  
      // Append the suggestion
      commands.insertContent(suggestionToInsert);
    }
  
    setSuggestion('');
  };
  
  