import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const HTMLCSSGenerator = () => {
  const [componentType, setComponentType] = useState('button');
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonColor, setButtonColor] = useState('#3b82f6');
  const [buttonStyle, setButtonStyle] = useState('solid');
  const [cardTitle, setCardTitle] = useState('Card Title');
  const [cardContent, setCardContent] = useState('This is the card content.');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [generatedCSS, setGeneratedCSS] = useState('');
  const { toast } = useToast();

  const generateButtonCode = () => {
    const html = `<button class="custom-button">${buttonText}</button>`;
    
    let css = '';
    if (buttonStyle === 'solid') {
      css = `.custom-button {
  background-color: ${buttonColor};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}`;
    } else {
      css = `.custom-button {
  background-color: transparent;
  color: ${buttonColor};
  padding: 12px 24px;
  border: 2px solid ${buttonColor};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: ${buttonColor};
  color: white;
}`;
    }
    
    setGeneratedHTML(html);
    setGeneratedCSS(css);
  };

  const generateCardCode = () => {
    const html = `<div class="custom-card">
  <h3 class="card-title">${cardTitle}</h3>
  <p class="card-content">${cardContent}</p>
</div>`;
    
    const css = `.custom-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  max-width: 400px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1f2937;
}

.card-content {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}`;
    
    setGeneratedHTML(html);
    setGeneratedCSS(css);
  };

  const generateCode = () => {
    if (componentType === 'button') {
      generateButtonCode();
    } else if (componentType === 'card') {
      generateCardCode();
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const downloadCode = () => {
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Component</title>
    <style>
${generatedCSS}
    </style>
</head>
<body>
    ${generatedHTML}
</body>
</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentType}-component.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="component-type">Component Type</Label>
            <Select value={componentType} onValueChange={setComponentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="button">Button</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {componentType === 'button' && (
            <>
              <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="button-color">Button Color</Label>
                <Input
                  id="button-color"
                  type="color"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="button-style">Button Style</Label>
                <Select value={buttonStyle} onValueChange={setButtonStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {componentType === 'card' && (
            <>
              <div>
                <Label htmlFor="card-title">Card Title</Label>
                <Input
                  id="card-title"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="card-content">Card Content</Label>
                <Textarea
                  id="card-content"
                  value={cardContent}
                  onChange={(e) => setCardContent(e.target.value)}
                />
              </div>
            </>
          )}

          <Button onClick={generateCode} className="w-full">
            Generate Code
          </Button>
        </CardContent>
      </Card>

      {generatedHTML && (
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-4 border rounded-lg bg-white"
              dangerouslySetInnerHTML={{ 
                __html: `<style>${generatedCSS}</style>${generatedHTML}` 
              }}
            />
          </CardContent>
        </Card>
      )}

      {generatedHTML && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="html" className="w-full">
              <TabsList>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
              </TabsList>
              <TabsContent value="html">
                <div className="relative">
                  <Textarea
                    value={generatedHTML}
                    readOnly
                    className="font-mono text-sm"
                    rows={5}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generatedHTML, 'HTML')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="css">
                <div className="relative">
                  <Textarea
                    value={generatedCSS}
                    readOnly
                    className="font-mono text-sm"
                    rows={10}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generatedCSS, 'CSS')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex gap-2 mt-4">
              <Button onClick={downloadCode}>
                <Download className="w-4 h-4 mr-2" />
                Download HTML File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};