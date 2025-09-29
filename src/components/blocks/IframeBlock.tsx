import { IframeBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface IframeBlockProps {
  block: IframeBlock;
  isEditing: boolean;
  onEdit?: (block: IframeBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const IframeBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: IframeBlockProps) => {
  if (!block.visible && !isEditing) return null;

  return (
    <Card className={`futuristic-block ${!block.visible ? 'opacity-50' : ''}`}>
      <div className="p-4">
        {/* Header avec titre et contrôles */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{block.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(block.url, '_blank', 'noopener,noreferrer')}
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
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

        {/* Iframe */}
        <div className="rounded-lg overflow-hidden bg-glass border border-primary/20">
          <iframe
            src={block.url}
            width="100%"
            height={block.height || 400}
            frameBorder="0"
            allowFullScreen={block.allowFullscreen}
            title={block.title}
            className="w-full"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </Card>
  );
};

export default IframeBlockComponent;