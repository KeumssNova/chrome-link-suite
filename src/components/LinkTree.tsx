import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Mail,
  Phone,
  Camera
} from 'lucide-react';

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  color?: string;
}

interface Profile {
  name: string;
  bio: string;
  avatar: string;
  background?: string;
}

const iconMap = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
  phone: Phone,
  external: ExternalLink,
};

const LinkTree = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "Votre Nom",
    bio: "Votre bio créative ici...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Mon Portfolio',
      url: 'https://example.com',
      icon: 'globe',
      color: 'primary'
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
      color: 'secondary'
    },
    {
      id: '3',
      title: 'Twitter / X',
      url: 'https://twitter.com',
      icon: 'twitter',
      color: 'primary'
    },
  ]);

  const [newLink, setNewLink] = useState({ title: '', url: '', icon: 'globe' });

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const link: Link = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url,
        icon: newLink.icon,
        color: Math.random() > 0.5 ? 'primary' : 'secondary'
      };
      setLinks([...links, link]);
      setNewLink({ title: '', url: '', icon: 'globe' });
    }
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Main content */}
      <div className="relative z-10 container max-w-md mx-auto px-4 py-8">
        {/* Edit toggle */}
        <div className="flex justify-end mb-6">
          <Button
            variant={isEditing ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="glass-button"
          >
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? 'Terminer' : 'Éditer'}
          </Button>
        </div>

        {/* Profile section */}
        <Card className="futuristic-card mb-8 p-6 text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 mx-auto ring-2 ring-primary glow-avatar">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-primary text-white text-xl font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="glass-input text-center font-semibold"
                placeholder="Votre nom"
              />
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="glass-input text-center resize-none"
                placeholder="Votre bio"
                rows={2}
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2 neon-text">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.bio}</p>
            </>
          )}
        </Card>

        {/* Links section */}
        <div className="space-y-4">
          {links.map((link, index) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ExternalLink;
            
            return (
              <Card 
                key={link.id}
                className={`futuristic-link group transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => !isEditing && handleLinkClick(link.url)}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${link.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{link.title}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isEditing && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLink(link.id);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Add new link */}
          {isEditing && (
            <Dialog>
              <DialogTrigger asChild>
                <Card className="futuristic-link border-dashed border-primary/50 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center justify-center p-4 space-x-2 text-primary">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Ajouter un lien</span>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="futuristic-dialog">
                <DialogHeader>
                  <DialogTitle>Nouveau lien</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Titre du lien"
                    value={newLink.title}
                    onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                    className="glass-input"
                  />
                  <Input
                    placeholder="URL (https://...)"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    className="glass-input"
                  />
                  <select
                    value={newLink.icon}
                    onChange={(e) => setNewLink({...newLink, icon: e.target.value})}
                    className="w-full p-2 bg-glass border border-glass-border rounded-lg text-foreground"
                  >
                    <option value="globe">🌐 Site Web</option>
                    <option value="github">GitHub</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="mail">Email</option>
                    <option value="phone">Téléphone</option>
                  </select>
                  <Button onClick={addLink} className="w-full neon-button">
                    Ajouter le lien
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Badge variant="outline" className="glass-badge">
            Fait avec ❤️ et du code futuriste
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;