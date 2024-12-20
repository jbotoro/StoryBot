'use client';

import React, { useState, useEffect } from 'react';
import { VersionsModal } from './VersionsModal';
import { fetchVersions, revertVersion } from '../../../services/versions';
import { Button } from '@/app/components/ui/button';

interface VersionsManagerProps {
    storyId: number | null;
    onContentUpdate: (updatedContent: string) => void; // Callback for content update
}

export const VersionsManager: React.FC<VersionsManagerProps> = ({ storyId, onContentUpdate }) => {
    const [versions, setVersions] = useState([]);
    const [showVersionsModal, setShowVersionsModal] = useState(false);

    const handleFetchVersions = async () => {
        if (storyId === null) {
            return;
        }

        try {
            const versionsData = await fetchVersions(storyId);
            setVersions(versionsData);
            setShowVersionsModal(true);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    const handleRevertVersion = async (index: number) => {
        if (storyId === null) {
            return;
        }

        try {
            const response = await revertVersion(storyId, index);
            const revertedContent = response.story.content;
            onContentUpdate(revertedContent);
            setShowVersionsModal(false);
        } catch (error) {
            console.error('Error reverting version:', error);
        }
    };

    return (
        <>
            <Button
                onClick={handleFetchVersions}
                className="bg-soft-purple text-text-primary hover:bg-soft-purple-hover"
            >
                View Versions
            </Button>

            <VersionsModal
                isOpen={showVersionsModal}
                versions={versions}
                onRevert={handleRevertVersion}
                onClose={() => setShowVersionsModal(false)}
            />
        </>
    );
};
