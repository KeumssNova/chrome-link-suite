import { SoundCloudBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

interface SoundCloudBlockProps {
  block: SoundCloudBlock;
  isEditing: boolean;
  onEdit?: (block: SoundCloudBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const SoundCloudBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: SoundCloudBlockProps) => {
  if (!block.visible && !isEditing) return null;

  return (
    <Card className={`futuristic-block ${!block.visible ? 'opacity-50' : ''}`}>
      <div className="p-4">
        {/* Header avec titre et contrôles */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">{block.title}</h3>
          {isEditing && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleVisibility?.(block.id)}
                className="text-muted-foreground hover:text-primary"
              >
                {block.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(block)}
                className="text-muted-foreground hover:text-primary"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(block.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Player SoundCloud */}
        <div className="rounded-lg overflow-hidden bg-glass border border-primary/20">
          <iframe
            src={block.embedUrl}
            width="100%"
            height={block.height || 166}
            frameBorder="0"
            allow="autoplay"
            title={block.title}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default SoundCloudBlockComponent;