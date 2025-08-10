import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [replacement, setReplacement] = useState("");
  const [replacedText, setReplacedText] = useState("");
  const { toast } = useToast();

  const commonPatterns = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "Phone (US)", pattern: "\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})" },
    { name: "URL", pattern: "https?://[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?" },
    { name: "IP Address", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
    { name: "Date (MM/DD/YYYY)", pattern: "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d\\d" },
    { name: "Credit Card", pattern: "\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b" },
    { name: "Hex Color", pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})" },
    { name: "Username", pattern: "^[a-zA-Z0-9_]{3,16}$" },
    { name: "Password (Strong)", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" },
    { name: "HTML Tags", pattern: "<[^>]*>" },
  ];

  useEffect(() => {
    if (pattern && testString) {
      testRegex();
    } else {
      setMatches([]);
      setIsValid(true);
      setError("");
    }
  }, [pattern, testString, flags]);

  useEffect(() => {
    if (pattern && replacement !== undefined) {
      performReplacement();
    }
  }, [pattern, testString, flags, replacement]);

  const getFlagsString = () => {
    return Object.entries(flags)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join("");
  };

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, getFlagsString());
      setIsValid(true);
      setError("");

      if (flags.g) {
        const allMatches = [...testString.matchAll(regex)];
        setMatches(allMatches);
      } else {
        const match = testString.match(regex);
        setMatches(match ? [match] : []);
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
    }
  };

  const performReplacement = () => {
    if (!pattern || replacement === undefined) {
      setReplacedText("");
      return;
    }

    try {
      const regex = new RegExp(pattern, getFlagsString());
      const result = testString.replace(regex, replacement);
      setReplacedText(result);
    } catch (err) {
      setReplacedText("");
    }
  };

  const highlightMatches = (text: string) => {
    if (!pattern || !isValid || matches.length === 0) {
      return text;
    }

    try {
      const regex = new RegExp(pattern, getFlagsString());
      return text.replace(regex, (match) => `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`);
    } catch (err) {
      return text;
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const loadPattern = (selectedPattern: string) => {
    const found = commonPatterns.find(p => p.name === selectedPattern);
    if (found) {
      setPattern(found.pattern);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regular Expression Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Patterns */}
          <div className="space-y-2">
            <Label>Common Patterns</Label>
            <Select onValueChange={loadPattern}>
              <SelectTrigger>
                <SelectValue placeholder="Select a common pattern..." />
              </SelectTrigger>
              <SelectContent>
                {commonPatterns.map((pattern) => (
                  <SelectItem key={pattern.name} value={pattern.name}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Regex Pattern */}
          <div className="space-y-2">
            <Label htmlFor="pattern">Regular Expression Pattern</Label>
            <div className="relative">
              <Input
                id="pattern"
                placeholder="Enter your regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={!isValid ? "border-destructive" : ""}
              />
              {isValid && pattern ? (
                <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
              ) : !isValid ? (
                <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-destructive" />
              ) : null}
            </div>
            {error && (
              <div className="text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <Label>Flags</Label>
            <div className="flex gap-4">
              {Object.entries(flags).map(([flag, value]) => (
                <div key={flag} className="flex items-center space-x-2">
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setFlags(prev => ({ ...prev, [flag]: checked }))
                    }
                  />
                  <Label className="text-sm">
                    {flag} - {
                      flag === 'g' ? 'Global' :
                      flag === 'i' ? 'Ignore Case' :
                      flag === 'm' ? 'Multiline' :
                      flag === 's' ? 'Dot All' : flag
                    }
                  </Label>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Current flags: /{pattern}/{getFlagsString()}
            </div>
          </div>

          {/* Test String */}
          <div className="space-y-2">
            <Label htmlFor="testString">Test String</Label>
            <Textarea
              id="testString"
              placeholder="Enter text to test against your regex..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Tabs defaultValue="matches">
            <TabsList>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="replace">Replace</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-4">
              {/* Results */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Matches Found:</Label>
                  <Badge variant={matches.length > 0 ? "default" : "secondary"}>
                    {matches.length}
                  </Badge>
                </div>

                {testString && pattern && isValid && (
                  <div className="space-y-2">
                    <Label>Highlighted Text</Label>
                    <div 
                      className="p-3 border rounded-md bg-muted/50 min-h-[100px] whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
                    />
                  </div>
                )}

                {matches.length > 0 && (
                  <div className="space-y-2">
                    <Label>Match Details</Label>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {matches.map((match, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <strong>Match {index + 1}:</strong> "{match[0]}"
                              </div>
                              <div>
                                <strong>Index:</strong> {match.index}
                              </div>
                              <div>
                                <strong>Length:</strong> {match[0].length}
                              </div>
                            </div>
                            {match.length > 1 && (
                              <div className="mt-2 text-sm">
                                <strong>Groups:</strong> {match.slice(1).map((group, i) => 
                                  `$${i + 1}: "${group}"`
                                ).join(", ")}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="replace" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="replacement">Replacement String</Label>
                <Input
                  id="replacement"
                  placeholder="Enter replacement text (use $1, $2, etc. for capture groups)"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                />
              </div>

              {replacedText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Replaced Text</Label>
                    <Button
                      onClick={() => copyToClipboard(replacedText, "Replaced text")}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={replacedText}
                    readOnly
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegexTester;