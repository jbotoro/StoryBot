import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';

interface Version {
  content: string;
  timestamp: string;
}

interface VersionsModalProps {
  isOpen: boolean;
  versions: Version[];
  onRevert: (index: number) => void;
  onClose: () => void;
}

export const VersionsModal: React.FC<VersionsModalProps> = ({
  isOpen,
  versions,
  onRevert,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Story Versions</DialogTitle>
          <DialogDescription>
            Select a version to view or revert to.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-4">
          {versions.map((version, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <span className="block text-sm text-muted-foreground">
                  {new Date(version.timestamp).toLocaleString()}
                </span>
                <p className="text-muted-foreground text-xs">
                  {version.content.slice(0, 50)}...
                </p>
              </div>
              <button
                onClick={() => onRevert(index)}
                className="text-primary hover:underline"
              >
                Revert
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
