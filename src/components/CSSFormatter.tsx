import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSFormatter = () => {
  const [inputCSS, setInputCSS] = useState("");
  const [outputCSS, setOutputCSS] = useState("");
  const [isMinified, setIsMinified] = useState(false);
  const { toast } = useToast();

  const formatCSS = (css: string, minify: boolean = false) => {
    try {
      // Remove comments
      let formatted = css.replace(/\/\*[\s\S]*?\*\//g, '');
      
      if (minify) {
        // Minify: remove all unnecessary whitespace
        formatted = formatted
          .replace(/\s+/g, ' ')
          .replace(/;\s*}/g, '}')
          .replace(/{\s*/g, '{')
          .replace(/;\s*/g, ';')
          .replace(/,\s*/g, ',')
          .replace(/:\s*/g, ':')
          .trim();
      } else {
        // Format: add proper indentation and spacing
        formatted = formatted
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n  ')
          .replace(/\s*}\s*/g, '\n}\n\n')
          .replace(/,\s*/g, ',\n')
          .replace(/:\s*/g, ': ')
          .replace(/\n  \n/g, '\n')
          .replace(/\n\n\n+/g, '\n\n')
          .trim();
      }
      
      return formatted;
    } catch (error) {
      return "Invalid CSS";
    }
  };

  const handleFormat = () => {
    const result = formatCSS(inputCSS, false);
    setOutputCSS(result);
    setIsMinified(false);
  };

  const handleMinify = () => {
    const result = formatCSS(inputCSS, true);
    setOutputCSS(result);
    setIsMinified(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCSS);
    toast({
      title: "Copied!",
      description: "Formatted CSS copied to clipboard",
    });
  };

  const loadSample = () => {
    const sampleCSS = `.header{background-color:#333;color:white;padding:20px;margin:0}.nav{display:flex;justify-content:space-between;align-items:center}.nav a{color:white;text-decoration:none;margin:0 10px}.nav a:hover{color:#ddd}`;
    setInputCSS(sampleCSS);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">CSS Formatter & Minifier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Input CSS</Label>
                <Button variant="outline" size="sm" onClick={loadSample}>
                  Load Sample
                </Button>
              </div>
              <Textarea
                placeholder="Paste your CSS here..."
                value={inputCSS}
                onChange={(e) => setInputCSS(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleFormat} className="btn-gradient">
                  <Code className="w-4 h-4 mr-2" />
                  Format
                </Button>
                <Button onClick={handleMinify} variant="outline">
                  Minify
                </Button>
              </div>
            </div>

            {/* Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>
                  {isMinified ? "Minified" : "Formatted"} CSS
                  {outputCSS && (
                    <span className="text-sm text-muted-foreground ml-2">
                      ({outputCSS.length} characters)
                    </span>
                  )}
                </Label>
                {outputCSS && (
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              <Textarea
                value={outputCSS}
                readOnly
                className="min-h-[400px] font-mono text-sm"
                placeholder="Formatted CSS will appear here..."
              />
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Format CSS with proper indentation and spacing</li>
                <li>• Minify CSS to reduce file size</li>
                <li>• Remove comments and unnecessary whitespace</li>
                <li>• Organize selectors and properties</li>
                <li>• Copy formatted output to clipboard</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSFormatter;