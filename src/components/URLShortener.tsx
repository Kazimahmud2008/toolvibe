import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShortenedUrl {
  id: string;
  original: string;
  short: string;
  clicks: number;
  created: Date;
}

export const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const { toast } = useToast();

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shortenUrl = () => {
    if (!originalUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    const slug = customSlug.trim() || generateShortCode();
    
    // Check if custom slug already exists
    if (shortenedUrls.some(url => url.short.endsWith(slug))) {
      toast({
        title: "Error",
        description: "This custom slug is already taken",
        variant: "destructive",
      });
      return;
    }

    const newShortened: ShortenedUrl = {
      id: Date.now().toString(),
      original: originalUrl,
      short: `https://toolvibe.link/${slug}`,
      clicks: 0,
      created: new Date()
    };

    setShortenedUrls(prev => [newShortened, ...prev]);
    setOriginalUrl('');
    setCustomSlug('');
    
    toast({
      title: "Success!",
      description: "URL shortened successfully",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const deleteUrl = (id: string) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
    toast({
      title: "Deleted",
      description: "Shortened URL removed",
    });
  };

  const simulateClick = (id: string) => {
    setShortenedUrls(prev => 
      prev.map(url => 
        url.id === id 
          ? { ...url, clicks: url.clicks + 1 }
          : url
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shorten URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="original-url">Enter Long URL</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="https://example.com/very-long-url-that-needs-shortening"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="custom-slug">Custom Slug (Optional)</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                toolvibe.link/
              </span>
              <Input
                id="custom-slug"
                placeholder="my-link"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <Button onClick={shortenUrl} className="w-full">
            Shorten URL
          </Button>
        </CardContent>
      </Card>

      {shortenedUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Shortened URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortenedUrls.map((url) => (
                <div key={url.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-primary truncate">
                        {url.short}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {url.original}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(url.short)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          window.open(url.original, '_blank');
                          simulateClick(url.id);
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteUrl(url.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Created: {url.created.toLocaleDateString()}</span>
                    <span>Clicks: {url.clicks}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Note: This is a demo URL shortener. The shortened links are for demonstration purposes only and won't redirect to the original URLs when deployed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};