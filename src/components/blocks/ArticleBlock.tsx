import { ArticleBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface ArticleBlockProps {
  block: ArticleBlock;
  isEditing: boolean;
  onEdit?: (block: ArticleBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const ArticleBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: ArticleBlockProps) => {
  if (!block.visible && !isEditing) return null;

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
      <div className="p-4">
        {/* Header avec titre et contrôles */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex-1">{block.title}</h3>
          {isEditing && (
            <div className="flex items-center space-x-2">
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
            </div>
          )}
        </div>

        {/* Contenu de l'article */}
        <div className="flex space-x-4">
          {block.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-glass border border-primary/20 flex-shrink-0">
              <img 
                src={block.image} 
                alt={block.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {block.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                {block.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              {block.domain && (
                <span className="text-xs text-accent-muted bg-glass px-2 py-1 rounded border border-primary/20">
                  {block.domain}
                </span>
              )}
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArticleBlockComponent;