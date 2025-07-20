import { useState } from "react";
import { Copy, Check, Download, FileText, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMinified, setIsMinified] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
      setIsMinified(false);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      setIsMinified(true);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setError("");
      return true;
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      return false;
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  const downloadJSON = () => {
    if (output) {
      const blob = new Blob([output], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `formatted_${Date.now()}.json`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSample = () => {
    const sampleJSON = {
      "name": "ToolVibe",
      "description": "Free tools for everyone",
      "tools": [
        { "name": "QR Generator", "category": "utility" },
        { "name": "JSON Formatter", "category": "developer" },
        { "name": "Color Picker", "category": "design" }
      ],
      "features": {
        "free": true,
        "noSignup": true,
        "responsive": true
      }
    };
    setInput(JSON.stringify(sampleJSON));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
          <p className="text-xl text-muted-foreground">
            Format, validate, and minify JSON data instantly. No signup required!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>JSON Input</span>
              </CardTitle>
              <CardDescription>
                Paste your JSON data here to format or validate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="json-input">Raw JSON</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadSample}
                  >
                    Load Sample
                  </Button>
                </div>
                <Textarea
                  id="json-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"name": "example", "value": 123}'
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={formatJSON} 
                  className="btn-primary"
                  disabled={!input.trim()}
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Format
                </Button>
                <Button 
                  onClick={minifyJSON} 
                  variant="outline"
                  disabled={!input.trim()}
                >
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Minify
                </Button>
                <Button 
                  onClick={validateJSON} 
                  variant="outline"
                  disabled={!input.trim()}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Validate
                </Button>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">Error:</p>
                  <p className="text-sm text-destructive mt-1">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Formatted Output</span>
                </div>
                {output && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={downloadJSON}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {isMinified ? "Minified JSON output" : "Formatted JSON output"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {output ? (
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm font-mono overflow-auto max-h-[350px] border">
                    <code className="text-foreground">{output}</code>
                  </pre>
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                    {output.split('\n').length} lines
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center space-y-2">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Formatted JSON will appear here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features and SEO Content */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-4">JSON Formatter Features</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Format JSON with proper indentation</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Minify JSON to reduce file size</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Validate JSON syntax</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Copy formatted output to clipboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Download as JSON file</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No signup or registration required</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Why Use Our JSON Formatter?</h2>
            <p className="text-muted-foreground mb-4">
              Our free JSON formatter and validator helps developers quickly format, 
              validate, and minify JSON data. Perfect for debugging APIs, 
              configuring applications, or cleaning up data files.
            </p>
            <p className="text-muted-foreground">
              Works entirely in your browser - no data is sent to our servers, 
              ensuring your JSON data stays private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};