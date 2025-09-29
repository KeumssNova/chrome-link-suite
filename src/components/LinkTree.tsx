import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Camera } from 'lucide-react';
import { Block } from '@/types/block';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import BlockEditor from '@/components/BlockEditor';

interface Profile {
  name: string;
  bio: string;
  avatar: string;
  background?: string;
}

const LinkTree = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');

  const [profile, setProfile] = useState<Profile>({
    name: "Votre Nom",
    bio: "Créez votre page de liens personnalisée avec tous vos contenus...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      type: 'link',
      title: 'Mon Portfolio',
      url: 'https://example.com',
      icon: 'globe',
      description: 'Découvrez mes projets',
      visible: true,
      order: 0,
    },
    {
      id: '2',
      type: 'youtube',
      title: 'Ma dernière vidéo',
      videoId: 'dQw4w9WgXcQ',
      visible: true,
      order: 1,
    },
    {
      id: '3',
      type: 'text',
      title: 'Note importante',
      content: "Bienvenue sur ma page ! Vous trouverez ici tous mes liens et contenus préférés. N'hésitez pas à explorer.",
      style: 'highlight',
      visible: true,
      order: 2,
    },
  ]);

  const addBlock = (block: Block) => {
    const newBlock = {
      ...block,
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (updatedBlock: Block) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const toggleBlockVisibility = (blockId: string) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, visible: !block.visible } : block
    ));
  };

  const handleEditBlock = (block: Block) => {
    setEditingBlock(block);
    setEditorMode('edit');
    setShowBlockEditor(true);
  };

  const handleCreateBlock = () => {
    setEditingBlock(null);
    setEditorMode('create');
    setShowBlockEditor(true);
  };

  const handleSaveBlock = (block: Block) => {
    if (editorMode === 'create') {
      addBlock(block);
    } else {
      updateBlock(block);
    }
    setShowBlockEditor(false);
    setEditingBlock(null);
  };

  // Filtrer et trier les blocs visibles
  const visibleBlocks = blocks
    .filter(block => block.visible || isEditing)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />
      
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
              <AvatarFallback className="bg-gradient-primary text-background text-xl font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 neon-button">
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

        {/* Blocks section */}
        <div className="space-y-4">
          {visibleBlocks.map((block, index) => (
            <div 
              key={block.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlockRenderer
                block={block}
                isEditing={isEditing}
                onEdit={handleEditBlock}
                onDelete={deleteBlock}
                onToggleVisibility={toggleBlockVisibility}
              />
            </div>
          ))}

          {/* Add new block */}
          {isEditing && (
            <Card 
              className="futuristic-block border-dashed border-primary/50 hover:border-primary transition-colors cursor-pointer"
              onClick={handleCreateBlock}
            >
              <div className="flex items-center justify-center p-6 space-x-2 text-primary">
                <Plus className="w-6 h-6" />
                <span className="font-medium text-lg">Ajouter un bloc</span>
              </div>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Badge variant="outline" className="glass-badge">
            Powered by Future Tech ⚡
          </Badge>
        </div>
      </div>

      {/* Block Editor Modal */}
      <BlockEditor
        isOpen={showBlockEditor}
        onClose={() => {
          setShowBlockEditor(false);
          setEditingBlock(null);
        }}
        onSave={handleSaveBlock}
        block={editingBlock}
        mode={editorMode}
      />
    </div>
  );
};

export default LinkTree;