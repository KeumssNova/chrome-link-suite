import { YouTubeBlock } from '@/types/block';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, Eye, EyeOff, Play } from 'lucide-react';
import { useState } from 'react';

interface YouTubeBlockProps {
  block: YouTubeBlock;
  isEditing: boolean;
  onEdit?: (block: YouTubeBlock) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const YouTubeBlockComponent = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: YouTubeBlockProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${block.videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${block.videoId}${block.autoplay ? '?autoplay=1' : ''}`;

  const handlePlay = () => {
    if (!isEditing && block.visible) {
      setIsPlaying(true);
    }
  };

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

        {/* Contenu vidéo */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-glass border border-primary/20">
          {!isPlaying ? (
            <div 
              className="relative w-full h-full cursor-pointer group"
              onClick={handlePlay}
            >
              <img 
                src={thumbnailUrl} 
                alt={block.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${block.videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform neon-glow">
                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={block.title}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default YouTubeBlockComponent;