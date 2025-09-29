export interface BaseBlock {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  order: number;
}

export interface LinkBlock extends BaseBlock {
  type: 'link';
  url: string;
  icon: string;
  description?: string;
}

export interface YouTubeBlock extends BaseBlock {
  type: 'youtube';
  videoId: string;
  autoplay?: boolean;
  thumbnail?: string;
}

export interface SpotifyBlock extends BaseBlock {
  type: 'spotify';
  embedUrl: string;
  height?: number;
}

export interface SoundCloudBlock extends BaseBlock {
  type: 'soundcloud';
  embedUrl: string;
  height?: number;
}

export interface IframeBlock extends BaseBlock {
  type: 'iframe';
  url: string;
  height?: number;
  allowFullscreen?: boolean;
}

export interface ArticleBlock extends BaseBlock {
  type: 'article';
  url: string;
  description?: string;
  image?: string;
  domain?: string;
}

export interface RSSBlock extends BaseBlock {
  type: 'rss';
  feedUrl: string;
  maxItems?: number;
  showDescription?: boolean;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  style?: 'normal' | 'highlight' | 'quote';
}

export type Block = 
  | LinkBlock 
  | YouTubeBlock 
  | SpotifyBlock 
  | SoundCloudBlock 
  | IframeBlock 
  | ArticleBlock 
  | RSSBlock 
  | TextBlock;

export const BLOCK_TYPES = {
  link: 'Lien',
  youtube: 'Vidéo YouTube',
  spotify: 'Spotify',
  soundcloud: 'SoundCloud',
  iframe: 'Iframe / Widget',
  article: 'Article / Blog',
  rss: 'Flux RSS',
  text: 'Texte / Note'
} as const;