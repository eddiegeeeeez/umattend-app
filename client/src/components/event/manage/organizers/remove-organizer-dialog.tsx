'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RemoveOrganizerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizerName: string;
  organizerEmail: string;
  onConfirm: () => void;
}

export function RemoveOrganizerDialog({ open, onOpenChange, organizerName, organizerEmail, onConfirm }: RemoveOrganizerDialogProps) {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');

  // Reset input when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setEmailInput('');
      setError('');
    }
  }, [open]);

  const handleConfirm = () => {
    if (emailInput !== organizerEmail) {
      setError('Email does not match. Please type the exact email address.');
      return;
    }

    onConfirm();
    onOpenChange(false);
    setEmailInput('');
    setError('');
  };

  const isEmailMatch = emailInput === organizerEmail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive size-5" />
            </div>
            <DialogTitle>Remove Organizer</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            Are you sure you want to remove <span className="text-foreground font-semibold">{organizerName}</span> as an organizer?
            <br />
            <br />
            This action cannot be undone. They will no longer have organizer permissions for this event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="email-confirm" className="text-sm font-medium">
            Type <span className="text-destructive">{organizerEmail}</span> to confirm.
          </Label>
          <Input
            id="email-confirm"
            type="text"
            placeholder="Enter email address"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setError('');
            }}
            className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {error && (
            <p className="text-destructive flex items-center gap-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={!isEmailMatch}>
            Remove Organizer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
