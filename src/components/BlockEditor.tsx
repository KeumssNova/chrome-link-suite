import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Block, BLOCK_TYPES } from '@/types/block';
import { getIconOptions } from '@/utils/icons';

interface BlockEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: Block) => void;
  block?: Block | null;
  mode: 'create' | 'edit';
}

const BlockEditor = ({ isOpen, onClose, onSave, block, mode }: BlockEditorProps) => {
  const [formData, setFormData] = useState<Partial<Block>>(() => {
    if (mode === 'edit' && block) {
      return { ...block };
    }
    return {
      type: 'link',
      title: '',
      visible: true,
      order: 0,
    };
  });

  const handleSave = () => {
    if (!formData.title) return;

    const newBlock: Block = {
      id: mode === 'edit' && block ? block.id : Date.now().toString(),
      type: formData.type!,
      title: formData.title,
      visible: formData.visible ?? true,
      order: formData.order ?? 0,
      ...formData,
    } as Block;

    onSave(newBlock);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      type: 'link',
      title: '',
      visible: true,
      order: 0,
    });
    onClose();
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'link':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://..."
                value={(formData as any).url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icône</Label>
              <Select 
                value={(formData as any).icon || 'globe'} 
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger className="glass-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-content">
                  {getIconOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <option.component className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnelle)</Label>
              <Input
                id="description"
                placeholder="Description du lien..."
                value={(formData as any).description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="glass-input"
              />
            </div>
          </>
        );

      case 'youtube':
        return (
          <div className="space-y-2">
            <Label htmlFor="videoId">ID de la vidéo YouTube</Label>
            <Input
              id="videoId"
              placeholder="dQw4w9WgXcQ"
              value={(formData as any).videoId || ''}
              onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
              className="glass-input"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="autoplay"
                checked={(formData as any).autoplay || false}
                onCheckedChange={(checked) => setFormData({ ...formData, autoplay: checked })}
              />
              <Label htmlFor="autoplay">Lecture automatique</Label>
            </div>
          </div>
        );

      case 'spotify':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="embedUrl">URL d'intégration Spotify</Label>
              <Input
                id="embedUrl"
                placeholder="https://open.spotify.com/embed/..."
                value={(formData as any).embedUrl || ''}
                onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Hauteur (px)</Label>
              <Input
                id="height"
                type="number"
                placeholder="152"
                value={(formData as any).height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 152 })}
                className="glass-input"
              />
            </div>
          </>
        );

      case 'soundcloud':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="embedUrl">URL d'intégration SoundCloud</Label>
              <Input
                id="embedUrl"
                placeholder="https://w.soundcloud.com/player/..."
                value={(formData as any).embedUrl || ''}
                onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Hauteur (px)</Label>
              <Input
                id="height"
                type="number"
                placeholder="166"
                value={(formData as any).height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 166 })}
                className="glass-input"
              />
            </div>
          </>
        );

      case 'iframe':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://..."
                value={(formData as any).url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Hauteur (px)</Label>
              <Input
                id="height"
                type="number"
                placeholder="400"
                value={(formData as any).height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 400 })}
                className="glass-input"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allowFullscreen"
                checked={(formData as any).allowFullscreen || false}
                onCheckedChange={(checked) => setFormData({ ...formData, allowFullscreen: checked })}
              />
              <Label htmlFor="allowFullscreen">Autoriser le plein écran</Label>
            </div>
          </>
        );

      case 'article':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL de l'article</Label>
              <Input
                id="url"
                placeholder="https://..."
                value={(formData as any).url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description de l'article..."
                value={(formData as any).description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="glass-input resize-none"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL de l'image (optionnelle)</Label>
              <Input
                id="image"
                placeholder="https://..."
                value={(formData as any).image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domaine (optionnel)</Label>
              <Input
                id="domain"
                placeholder="exemple.com"
                value={(formData as any).domain || ''}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="glass-input"
              />
            </div>
          </>
        );

      case 'rss':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="feedUrl">URL du flux RSS</Label>
              <Input
                id="feedUrl"
                placeholder="https://example.com/feed.xml"
                value={(formData as any).feedUrl || ''}
                onChange={(e) => setFormData({ ...formData, feedUrl: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxItems">Nombre d'articles max</Label>
              <Input
                id="maxItems"
                type="number"
                placeholder="5"
                value={(formData as any).maxItems || ''}
                onChange={(e) => setFormData({ ...formData, maxItems: parseInt(e.target.value) || 5 })}
                className="glass-input"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showDescription"
                checked={(formData as any).showDescription || false}
                onCheckedChange={(checked) => setFormData({ ...formData, showDescription: checked })}
              />
              <Label htmlFor="showDescription">Afficher les descriptions</Label>
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="content">Contenu</Label>
              <Textarea
                id="content"
                placeholder="Votre texte ici..."
                value={(formData as any).content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="glass-input resize-none"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select 
                value={(formData as any).style || 'normal'} 
                onValueChange={(value) => setFormData({ ...formData, style: value as 'normal' | 'highlight' | 'quote' })}
              >
                <SelectTrigger className="glass-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-content">
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="highlight">Surligné</SelectItem>
                  <SelectItem value="quote">Citation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="futuristic-dialog max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nouveau bloc' : 'Modifier le bloc'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de contenu</Label>
            <Select 
              value={formData.type || 'link'} 
              onValueChange={(value) => setFormData({ ...formData, type: value as Block['type'] })}
              disabled={mode === 'edit'}
            >
              <SelectTrigger className="glass-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-content">
                {Object.entries(BLOCK_TYPES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre du bloc"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="glass-input"
            />
          </div>

          {renderTypeSpecificFields()}

          <div className="flex items-center space-x-2">
            <Switch
              id="visible"
              checked={formData.visible ?? true}
              onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
            />
            <Label htmlFor="visible">Visible</Label>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleClose} variant="outline" className="flex-1 glass-button">
              Annuler
            </Button>
            <Button onClick={handleSave} className="flex-1 neon-button">
              {mode === 'create' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockEditor;