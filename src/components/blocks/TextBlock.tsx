import { TextBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff, Type } from 'lucide-react';

interface TextBlockProps {
  block: TextBlock;
  isEditing: boolean;
  onEdit?: (block: TextBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const TextBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: TextBlockProps) => {
  if (!block.visible && !isEditing) return null;

  const getStyleClasses = () => {
    switch (block.style) {
      case 'highlight':
        return 'bg-primary/10 border-primary/30 text-primary font-medium';
      case 'quote':
        return 'border-l-4 border-primary pl-4 italic text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className={`futuristic-block ${!block.visible ? 'opacity-50' : ''}`}>
      <div className="p-4">
        {/* Header avec titre et contrôles */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-primary" />
            <h3 className="font-medium">{block.title}</h3>
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

        {/* Contenu du texte */}
        <div className={`p-3 rounded-lg ${getStyleClasses()}`}>
          <div className="whitespace-pre-wrap">
            {block.content}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TextBlockComponent;