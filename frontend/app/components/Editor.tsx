'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader} from '@/app/components/ui/card';

// Dynamic import to prevent SSR issues
const DynamicEditorContent = dynamic(
  () => import('@tiptap/react').then((mod) => mod.EditorContent),
  { ssr: false }
);

interface EditorProps {
  editor: any;
}

export const Editor: React.FC<EditorProps> = ({ editor }) => {
  return (
    <Card className="w-full rounded-2xl shadow-scroll border border-soft-yellow bg-scroll-paper">
      <CardHeader className="bg-cozy-study bg-cover bg-center relative h-24 rounded-t-2xl flex items-center px-4 sm:px-6 lg:px-8">
      </CardHeader>
      <CardContent className="p-4 bg-transparent rounded-b-2xl">
        <div className="w-full min-h-[150px] sm:min-h-[200px]  font-cursive sm:text-lg  md:text-xl ">
          {editor ? (
            <DynamicEditorContent editor={editor} />
          ) : (
            <div className="text-gray-400 text-sm">Loading editor...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
