import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface SuggestionCardProps {
  suggestion: string;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => (
  <Card className="bg-card-suggestion rounded-2xl shadow-soft border border-soft-yellow mt-8">
    <CardHeader>
      <CardTitle className="text-text-primary text-lg font-medium">
        AI Suggestion
      </CardTitle>
    </CardHeader>
    <CardContent className="bg-white rounded-xl p-6 shadow-inner text-text-primary leading-relaxed">
      {suggestion}
    </CardContent>
  </Card>
);
