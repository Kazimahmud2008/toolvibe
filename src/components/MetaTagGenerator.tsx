import { useState } from "react";
import { Copy, Check, Code, Globe, Share2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export const MetaTagGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: "",
    description: "",
    keywords: "",
    author: "",
    canonical: "",
    robots: "index, follow",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: ""
  });

  const handleInputChange = (field: keyof MetaTags, value: string) => {
    setMetaTags(prev => ({ ...prev, [field]: value }));
  };

  const generateMetaTags = () => {
    const tags = [];
    
    // Basic Meta Tags
    if (metaTags.title) tags.push(`<title>${metaTags.title}</title>`);
    if (metaTags.description) tags.push(`<meta name="description" content="${metaTags.description}">`);
    if (metaTags.keywords) tags.push(`<meta name="keywords" content="${metaTags.keywords}">`);
    if (metaTags.author) tags.push(`<meta name="author" content="${metaTags.author}">`);
    if (metaTags.canonical) tags.push(`<link rel="canonical" href="${metaTags.canonical}">`);
    if (metaTags.robots) tags.push(`<meta name="robots" content="${metaTags.robots}">`);
    
    // Open Graph Tags
    if (metaTags.ogTitle || metaTags.title) tags.push(`<meta property="og:title" content="${metaTags.ogTitle || metaTags.title}">`);
    if (metaTags.ogDescription || metaTags.description) tags.push(`<meta property="og:description" content="${metaTags.ogDescription || metaTags.description}">`);
    if (metaTags.ogImage) tags.push(`<meta property="og:image" content="${metaTags.ogImage}">`);
    if (metaTags.ogUrl) tags.push(`<meta property="og:url" content="${metaTags.ogUrl}">`);
    if (metaTags.ogTitle || metaTags.title) tags.push(`<meta property="og:type" content="website">`);
    
    // Twitter Card Tags
    if (metaTags.twitterCard) tags.push(`<meta name="twitter:card" content="${metaTags.twitterCard}">`);
    if (metaTags.twitterTitle || metaTags.title) tags.push(`<meta name="twitter:title" content="${metaTags.twitterTitle || metaTags.title}">`);
    if (metaTags.twitterDescription || metaTags.description) tags.push(`<meta name="twitter:description" content="${metaTags.twitterDescription || metaTags.description}">`);
    if (metaTags.twitterImage || metaTags.ogImage) tags.push(`<meta name="twitter:image" content="${metaTags.twitterImage || metaTags.ogImage}">`);
    
    return tags.join('\n');
  };

  const copyToClipboard = async () => {
    const generatedTags = generateMetaTags();
    try {
      await navigator.clipboard.writeText(generatedTags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Meta tags copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>SEO Meta Tags</span>
            </CardTitle>
            <CardDescription>
              Enter your page information to generate optimized meta tags
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                placeholder="Your awesome page title"
                value={metaTags.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">{metaTags.title.length}/60 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your page content..."
                value={metaTags.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">{metaTags.description.length}/160 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="keyword1, keyword2, keyword3"
                value={metaTags.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Author name"
                value={metaTags.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="canonical">Canonical URL</Label>
              <Input
                id="canonical"
                placeholder="https://yoursite.com/page"
                value={metaTags.canonical}
                onChange={(e) => handleInputChange("canonical", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="robots">Robots</Label>
              <Select value={metaTags.robots} onValueChange={(value) => handleInputChange("robots", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  <SelectItem value="index, follow">Index, Follow</SelectItem>
                  <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                  <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                  <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Social Media Tags</span>
            </CardTitle>
            <CardDescription>
              Optimize for Facebook, Twitter, and other social platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="og-title">Open Graph Title</Label>
              <Input
                id="og-title"
                placeholder="Leave empty to use page title"
                value={metaTags.ogTitle}
                onChange={(e) => handleInputChange("ogTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-description">Open Graph Description</Label>
              <Textarea
                id="og-description"
                placeholder="Leave empty to use meta description"
                value={metaTags.ogDescription}
                onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-image">Open Graph Image URL</Label>
              <Input
                id="og-image"
                placeholder="https://yoursite.com/image.jpg"
                value={metaTags.ogImage}
                onChange={(e) => handleInputChange("ogImage", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-url">Open Graph URL</Label>
              <Input
                id="og-url"
                placeholder="https://yoursite.com/page"
                value={metaTags.ogUrl}
                onChange={(e) => handleInputChange("ogUrl", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-card">Twitter Card Type</Label>
              <Select value={metaTags.twitterCard} onValueChange={(value) => handleInputChange("twitterCard", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-title">Twitter Title</Label>
              <Input
                id="twitter-title"
                placeholder="Leave empty to use page title"
                value={metaTags.twitterTitle}
                onChange={(e) => handleInputChange("twitterTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-description">Twitter Description</Label>
              <Textarea
                id="twitter-description"
                placeholder="Leave empty to use meta description"
                value={metaTags.twitterDescription}
                onChange={(e) => handleInputChange("twitterDescription", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-image">Twitter Image URL</Label>
              <Input
                id="twitter-image"
                placeholder="Leave empty to use OG image"
                value={metaTags.twitterImage}
                onChange={(e) => handleInputChange("twitterImage", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Generated Meta Tags</span>
            </div>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy HTML"}
            </Button>
          </CardTitle>
          <CardDescription>
            Copy these tags and paste them in your HTML &lt;head&gt; section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto max-h-96 border">
              <code>{generateMetaTags() || "<!-- Enter page information above to generate meta tags -->"}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>SEO Best Practices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Title Tag Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep it under 60 characters</li>
                <li>• Include your primary keyword</li>
                <li>• Make it unique for each page</li>
                <li>• Write for users, not just search engines</li>
                <li>• Include your brand name at the end</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Meta Description Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep it under 160 characters</li>
                <li>• Write a compelling call-to-action</li>
                <li>• Include relevant keywords naturally</li>
                <li>• Make it unique for each page</li>
                <li>• Accurately describe page content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Open Graph Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use high-quality images (1200x630px)</li>
                <li>• Include specific titles for social sharing</li>
                <li>• Test with Facebook Sharing Debugger</li>
                <li>• Use absolute URLs for images</li>
                <li>• Keep descriptions engaging and concise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Twitter Card Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose the right card type for content</li>
                <li>• Use summary_large_image for most pages</li>
                <li>• Test with Twitter Card Validator</li>
                <li>• Optimize images for Twitter's format</li>
                <li>• Include Twitter handle when relevant</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};