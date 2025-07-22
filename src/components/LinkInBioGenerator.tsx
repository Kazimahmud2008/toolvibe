import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  User, 
  Image as ImageIcon,
  Eye,
  Download,
  Upload,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
  theme: string;
  backgroundColor: string;
  textColor: string;
}

const themes = [
  { name: "Modern", bg: "from-blue-500 to-purple-600", text: "text-white" },
  { name: "Sunset", bg: "from-orange-400 to-red-500", text: "text-white" },
  { name: "Forest", bg: "from-green-400 to-blue-500", text: "text-white" },
  { name: "Minimalist", bg: "from-gray-100 to-gray-200", text: "text-gray-900" },
  { name: "Dark", bg: "from-gray-800 to-gray-900", text: "text-white" },
  { name: "Ocean", bg: "from-cyan-400 to-blue-600", text: "text-white" },
];

export const LinkInBioGenerator = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    bio: "",
    avatar: "",
    theme: "Modern",
    backgroundColor: "from-blue-500 to-purple-600",
    textColor: "text-white"
  });

  const [links, setLinks] = useState<LinkItem[]>([
    { id: "1", title: "", url: "", description: "" }
  ]);

  const [previewMode, setPreviewMode] = useState(false);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      setProfile(prev => ({
        ...prev,
        theme: themeName,
        backgroundColor: theme.bg,
        textColor: theme.text
      }));
    }
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "",
      url: "",
      description: ""
    };
    setLinks(prev => [...prev, newLink]);
  };

  const removeLink = (id: string) => {
    if (links.length > 1) {
      setLinks(prev => prev.filter(link => link.id !== id));
    }
  };

  const updateLink = (id: string, field: keyof LinkItem, value: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHTML = () => {
    const validLinks = links.filter(link => link.title && link.url);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name || 'Link in Bio'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, ${profile.backgroundColor.replace('from-', '').replace('to-', ', ')});
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            padding: 20px;
        }
        .container { 
            max-width: 400px; 
            width: 100%; 
            text-align: center; 
        }
        .avatar { 
            width: 100px; 
            height: 100px; 
            border-radius: 50%; 
            margin: 0 auto 20px; 
            object-fit: cover;
            border: 4px solid rgba(255,255,255,0.3);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .name { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 10px; 
            color: ${profile.textColor.includes('white') ? '#ffffff' : '#1a1a1a'};
        }
        .bio { 
            font-size: 16px; 
            margin-bottom: 30px; 
            opacity: 0.9;
            color: ${profile.textColor.includes('white') ? '#ffffff' : '#666666'};
        }
        .link { 
            display: block; 
            background: rgba(255,255,255,0.1); 
            color: ${profile.textColor.includes('white') ? '#ffffff' : '#1a1a1a'};
            text-decoration: none; 
            padding: 15px 20px; 
            margin: 15px 0; 
            border-radius: 25px; 
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .link:hover { 
            background: rgba(255,255,255,0.2); 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .link-title { 
            font-weight: bold; 
            font-size: 16px; 
        }
        .link-desc { 
            font-size: 14px; 
            opacity: 0.8; 
            margin-top: 5px;
        }
        @media (max-width: 480px) {
            .container { padding: 10px; }
            .name { font-size: 20px; }
            .bio { font-size: 14px; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${profile.avatar ? `<img src="${profile.avatar}" alt="Avatar" class="avatar">` : ''}
        ${profile.name ? `<h1 class="name">${profile.name}</h1>` : ''}
        ${profile.bio ? `<p class="bio">${profile.bio}</p>` : ''}
        
        ${validLinks.map(link => `
        <a href="${link.url}" class="link" target="_blank" rel="noopener noreferrer">
            <div class="link-title">${link.title}</div>
            ${link.description ? `<div class="link-desc">${link.description}</div>` : ''}
        </a>`).join('')}
    </div>
</body>
</html>`;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link-in-bio.html';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your Link-in-Bio page has been downloaded",
    });
  };

  const PreviewComponent = () => {
    const validLinks = links.filter(link => link.title && link.url);
    
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className={`p-6 text-center bg-gradient-to-br ${profile.backgroundColor} rounded-lg`}>
          {profile.avatar && (
            <img 
              src={profile.avatar} 
              alt="Avatar" 
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white/30"
            />
          )}
          {profile.name && (
            <h2 className={`text-xl font-bold mb-2 ${profile.textColor}`}>
              {profile.name}
            </h2>
          )}
          {profile.bio && (
            <p className={`text-sm mb-6 opacity-90 ${profile.textColor}`}>
              {profile.bio}
            </p>
          )}
          
          <div className="space-y-3">
            {validLinks.map(link => (
              <div
                key={link.id}
                className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className={`font-medium ${profile.textColor}`}>
                  {link.title}
                </div>
                {link.description && (
                  <div className={`text-xs opacity-80 mt-1 ${profile.textColor}`}>
                    {link.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Link-in-Bio Generator</h1>
          <p className="text-muted-foreground">Create a beautiful landing page for your social media bio</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setPreviewMode(!previewMode)}
            variant="outline"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={downloadHTML}>
            <Download className="w-4 h-4 mr-2" />
            Download HTML
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="flex justify-center py-8">
          <PreviewComponent />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself..."
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    {profile.avatar && (
                      <img 
                        src={profile.avatar} 
                        alt="Avatar preview" 
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Theme</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme.name)}
                      className={`p-3 rounded-lg bg-gradient-to-r ${theme.bg} text-center transition-all ${
                        profile.theme === theme.name 
                          ? "ring-2 ring-primary ring-offset-2" 
                          : "hover:scale-105"
                      }`}
                    >
                      <span className={`text-sm font-medium ${theme.text}`}>
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5" />
                  <span>Links</span>
                </div>
                <Button onClick={addLink} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {links.map((link, index) => (
                <div key={link.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">Link {index + 1}</Badge>
                    {links.length > 1 && (
                      <Button
                        onClick={() => removeLink(link.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="Link title"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, "title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL *</Label>
                    <Input
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={(e) => updateLink(link.id, "url", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Optional description"
                      value={link.description}
                      onChange={(e) => updateLink(link.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for a Great Link-in-Bio Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Content Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep your bio concise and engaging</li>
                <li>• Use clear, descriptive link titles</li>
                <li>• Prioritize your most important links</li>
                <li>• Update regularly with fresh content</li>
                <li>• Use a high-quality profile picture</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Technical Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Test all links before going live</li>
                <li>• Use HTTPS URLs for security</li>
                <li>• Optimize images for faster loading</li>
                <li>• Consider mobile users first</li>
                <li>• Host on a reliable platform</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};