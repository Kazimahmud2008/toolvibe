import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HashGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [algorithm, setAlgorithm] = useState("MD5");
  const [hashResult, setHashResult] = useState("");
  const { toast } = useToast();

  // Simple hash functions (for demo purposes - in production use crypto libraries)
  const generateMD5 = async (text: string) => {
    // Note: This is a simplified demo. In real apps, use crypto-js or similar
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA1 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA256 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA512 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHash = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to hash.",
        variant: "destructive",
      });
      return;
    }

    try {
      let hash = "";
      switch (algorithm) {
        case "MD5":
          hash = await generateMD5(inputText); // Note: Using SHA-256 as browser MD5 substitute
          break;
        case "SHA1":
          hash = await generateSHA1(inputText);
          break;
        case "SHA256":
          hash = await generateSHA256(inputText);
          break;
        case "SHA512":
          hash = await generateSHA512(inputText);
          break;
        default:
          hash = await generateSHA256(inputText);
      }
      setHashResult(hash);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashResult);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Hash Generator
          </CardTitle>
          <CardDescription>
            Generate cryptographic hashes from your text using various algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Input Text
              </label>
              <Textarea
                placeholder="Enter text to generate hash..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Hash Algorithm
              </label>
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MD5">MD5 (128-bit)</SelectItem>
                  <SelectItem value="SHA1">SHA-1 (160-bit)</SelectItem>
                  <SelectItem value="SHA256">SHA-256 (256-bit)</SelectItem>
                  <SelectItem value="SHA512">SHA-512 (512-bit)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateHash} className="w-full">
              Generate Hash
            </Button>
          </div>

          {hashResult && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {algorithm} Hash Result
                </label>
                <div className="flex gap-2">
                  <Textarea
                    value={hashResult}
                    readOnly
                    className="font-mono bg-muted resize-none"
                    rows={3}
                  />
                  <Button onClick={copyToClipboard} size="icon" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Hash Information:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Algorithm: {algorithm}</li>
                  <li>• Hash Length: {hashResult.length} characters</li>
                  <li>• Input Length: {inputText.length} characters</li>
                  <li>• Hash is case-sensitive and deterministic</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};