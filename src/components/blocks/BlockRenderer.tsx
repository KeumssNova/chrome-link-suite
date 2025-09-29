import { Block } from '@/types/block';
import LinkBlockComponent from './LinkBlock';
import YouTubeBlockComponent from './YouTubeBlock';
import SpotifyBlockComponent from './SpotifyBlock';
import SoundCloudBlockComponent from './SoundCloudBlock';
import IframeBlockComponent from './IframeBlock';
import ArticleBlockComponent from './ArticleBlock';
import RSSBlockComponent from './RSSBlock';
import TextBlockComponent from './TextBlock';

interface BlockRendererProps {
  block: Block;
  isEditing: boolean;
  onEdit?: (block: Block) => void;
  onDelete?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

const BlockRenderer = ({ block, isEditing, onEdit, onDelete, onToggleVisibility }: BlockRendererProps) => {
  const baseProps = {
    block,
    isEditing,
    onEdit,
    onDelete,
    onToggleVisibility,
  };

  switch (block.type) {
    case 'link':
      return <LinkBlockComponent {...baseProps} block={block as any} />;
    case 'youtube':
      return <YouTubeBlockComponent {...baseProps} block={block as any} />;
    case 'spotify':
      return <SpotifyBlockComponent {...baseProps} block={block as any} />;
    case 'soundcloud':
      return <SoundCloudBlockComponent {...baseProps} block={block as any} />;
    case 'iframe':
      return <IframeBlockComponent {...baseProps} block={block as any} />;
    case 'article':
      return <ArticleBlockComponent {...baseProps} block={block as any} />;
    case 'rss':
      return <RSSBlockComponent {...baseProps} block={block as any} />;
    case 'text':
      return <TextBlockComponent {...baseProps} block={block as any} />;
    default:
      return (
        <div className="futuristic-card p-4 text-center text-muted-foreground">
          Type de bloc non supporté: {(block as any).type}
        </div>
      );
  }
};

export default BlockRenderer;