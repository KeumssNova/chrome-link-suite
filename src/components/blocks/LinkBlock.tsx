import { LinkBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import { getIconComponent } from '@/utils/icons';

interface LinkBlockProps {
  block: LinkBlock;
  isEditing: boolean;
  onEdit?: (block: LinkBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const LinkBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: LinkBlockProps) => {
  const IconComponent = getIconComponent(block.icon);

  const handleClick = () => {
    if (!isEditing && block.visible) {
      window.open(block.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className={`futuristic-block group transition-all duration-300 hover:scale-105 cursor-pointer ${
        !block.visible ? 'opacity-50' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-glass border border-primary/20 neon-glow">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{block.title}</h3>
            {block.description && (
              <p className="text-sm text-muted-foreground truncate">{block.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isEditing && block.visible && (
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
          {isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility?.(block.id);
                }}
                className="text-muted-foreground hover:text-primary"
              >
                {block.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(block);
                }}
                className="text-muted-foreground hover:text-primary"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(block.id);
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LinkBlockComponent;