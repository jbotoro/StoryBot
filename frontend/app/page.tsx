'use client';

import React from 'react';
import Image from 'next/image';
import { EditorWrapper } from "./features/editor/EditorWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-beige flex flex-col items-center p-6 bg-candlelight">
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src="/assets/storybot-logo.webp"
          alt="StoryBot Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary font-heading">
          StoryBot
        </h1>
      </div>

      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <EditorWrapper />
      </div>
    </div>
  );
}
