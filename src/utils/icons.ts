import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  MessageCircle,
  MapPin,
  Music,
  Camera,
  Code,
  Heart,
  Star,
  Zap,
  Coffee,
  Book,
  Briefcase,
  User,
  Home,
  Settings
} from 'lucide-react';

export const iconMap = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
  phone: Phone,
  external: ExternalLink,
  message: MessageCircle,
  location: MapPin,
  music: Music,
  camera: Camera,
  code: Code,
  heart: Heart,
  star: Star,
  zap: Zap,
  coffee: Coffee,
  book: Book,
  briefcase: Briefcase,
  user: User,
  home: Home,
  settings: Settings,
};

export const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || ExternalLink;
};

export const getIconOptions = () => {
  return Object.keys(iconMap).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    component: iconMap[key as keyof typeof iconMap]
  }));
};