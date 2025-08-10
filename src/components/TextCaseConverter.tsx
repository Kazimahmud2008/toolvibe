import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const convertToUpperCase = () => inputText.toUpperCase();
  const convertToLowerCase = () => inputText.toLowerCase();
  const convertToTitleCase = () => {
    return inputText.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };
  const convertToSentenceCase = () => {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
  };
  const convertToCamelCase = () => {
    return inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  };
  const convertToPascalCase = () => {
    return inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '');
  };
  const convertToKebabCase = () => {
    return inputText
      .replace(/\s+/g, '-')
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/^-/, '')
      .toLowerCase();
  };
  const convertToSnakeCase = () => {
    return inputText
      .replace(/\s+/g, '_')
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, '')
      .toLowerCase();
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} text copied to clipboard.`,
    });
  };

  const conversions = [
    { name: "UPPERCASE", convert: convertToUpperCase },
    { name: "lowercase", convert: convertToLowerCase },
    { name: "Title Case", convert: convertToTitleCase },
    { name: "Sentence case", convert: convertToSentenceCase },
    { name: "camelCase", convert: convertToCamelCase },
    { name: "PascalCase", convert: convertToPascalCase },
    { name: "kebab-case", convert: convertToKebabCase },
    { name: "snake_case", convert: convertToSnakeCase },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Case Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversions.map((conversion) => {
              const convertedText = conversion.convert();
              return (
                <Card key={conversion.name}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{conversion.name}</h4>
                      <Button
                        onClick={() => copyToClipboard(convertedText, conversion.name)}
                        variant="outline"
                        size="sm"
                        disabled={!inputText}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[80px] p-3 bg-muted rounded-md text-sm overflow-auto">
                      {convertedText || "Enter text to see conversion"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {inputText && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {inputText.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {inputText.replace(/\s/g, '').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {inputText.trim().split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {inputText.split('\n').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Lines</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TextCaseConverter;