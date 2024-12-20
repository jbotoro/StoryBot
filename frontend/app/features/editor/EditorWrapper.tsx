'use client';

import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor } from '@/app/components/Editor';
import { SuggestionCard } from '@/app/components/SuggestionCard';
import { SuggestionActions } from '@/app/components/SuggestionActions';
import { VersionsManager } from '@/app/features/story/versions/VersionsManager';
import { fetchSuggestion as fetchSuggestionUtility } from '@/app/services/suggestions';
import { createStory, updateStory } from '@/app/services/stories';
import { applySuggestion } from '@/app/services/suggestions';

export const EditorWrapper: React.FC = () => {
  const [storyId, setStoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing your story here...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  const saveStory = async () => {
    if (!editor) return;

    try {
      const content = editor.getText();

      if (storyId) {
        await updateStory(storyId, content);
      } else {
        const response = await createStory(content);
        setStoryId(response.id);
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  const fetchSuggestion = async () => {
    if (!editor) return;

    const currentText = editor.getText();
    if (!currentText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (!storyId) await saveStory();
      await fetchSuggestionUtility(editor, setSuggestion, setLoading);
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setError('Failed to fetch suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentUpdate = (updatedContent: string) => {
    if (!editor) return;
    editor.commands.setContent(updatedContent);
  };

  const handleUseSuggestion = () => {
    if (!editor || !suggestion) return;

    applySuggestion(editor, suggestion, setSuggestion);
    saveStory();
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-[720px] lg:max-w-[960px] xl:max-w-[1200px]">
      <Editor editor={editor} />
      <div className="mt-6">
        <SuggestionActions
          loading={loading}
          fetchSuggestion={fetchSuggestion}
          replaceSuggestion={handleUseSuggestion}
          clearEditor={() => editor?.commands.clearContent()}
          suggestionAvailable={!!suggestion}
        />
      </div>
      {storyId && (
        <div className="flex justify-center mt-4">
          <VersionsManager storyId={storyId} onContentUpdate={handleContentUpdate} />
        </div>
      )}
      {suggestion && (
        <div className="mt-6">
          <SuggestionCard suggestion={suggestion} />
        </div>
      )}
    </div>
  );
};
