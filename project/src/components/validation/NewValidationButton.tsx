import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface NewValidationButtonProps {
  onClick: () => void;
}

export function NewValidationButton({ onClick }: NewValidationButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 gap-2 shadow-lg transition-all hover:scale-105"
    >
      <PlusCircle className="h-4 w-4" />
      <span>New Validation</span>
    </Button>
  );
}