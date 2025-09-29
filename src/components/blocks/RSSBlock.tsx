import { RSSBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff, Rss, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
}

interface RSSBlockProps {
  block: RSSBlock;
  isEditing: boolean;
  onEdit?: (block: RSSBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const RSSBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: RSSBlockProps) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulation du chargement RSS (en réalité il faudrait un proxy ou une API)
  useEffect(() => {
    if (block.visible) {
      setLoading(true);
      // Simulation d'articles RSS
      setTimeout(() => {
        setItems([
          {
            title: "Exemple d'article RSS",
            link: "https://example.com/article1",
            description: "Description de l'article...",
            pubDate: new Date().toLocaleDateString()
          },
          {
            title: "Autre article du flux",
            link: "https://example.com/article2", 
            description: "Autre description...",
            pubDate: new Date(Date.now() - 86400000).toLocaleDateString()
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [block.visible, block.feedUrl]);

  if (!block.visible && !isEditing) return null;

  return (
    <Card className={`futuristic-block ${!block.visible ? 'opacity-50' : ''}`}>
      <div className="p-4">
        {/* Header avec titre et contrôles */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Rss className="w-4 h-4 text-primary" />
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

        {/* Contenu RSS */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center text-muted-foreground py-4">
              Chargement du flux RSS...
            </div>
          )}
          
          {error && (
            <div className="text-center text-destructive py-4">
              Erreur: {error}
            </div>
          )}

          {items.slice(0, block.maxItems || 5).map((item, index) => (
            <div 
              key={index}
              className="p-3 bg-glass/40 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group"
              onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h4>
                  {block.showDescription && item.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.pubDate && (
                    <span className="text-xs text-accent-muted">
                      {item.pubDate}
                    </span>
                  )}
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RSSBlockComponent;