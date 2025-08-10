import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoremIpsumGenerator = () => {
  const [count, setCount] = useState("5");
  const [type, setType] = useState("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "accusantium", "doloremque", "laudantium", "totam", "rem",
    "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis",
    "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo",
    "nemo", "ipsam", "voluptatem", "quia", "voluptas", "aspernatur", "odit",
    "aut", "fugit", "sed", "quia", "consequuntur", "magni", "dolores", "ratione",
    "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci",
    "numquam", "eius", "modi", "tempora", "incidunt", "magnam", "quam", "quaerat"
  ];

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 15) + 4; // 4-18 words per sentence
    let sentence = [];
    
    for (let i = 0; i < length; i++) {
      sentence.push(generateWord());
    }
    
    // Capitalize first word
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    
    return sentence.join(" ") + ".";
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-7 sentences per paragraph
    let paragraph = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      paragraph.push(generateSentence());
    }
    
    return paragraph.join(" ");
  };

  const generateText = () => {
    const numCount = parseInt(count);
    let result = [];
    
    if (type === "words") {
      const words = [];
      for (let i = 0; i < numCount; i++) {
        words.push(generateWord());
      }
      if (startWithLorem && words.length > 0) {
        words[0] = "Lorem";
        if (words.length > 1) words[1] = "ipsum";
      }
      result.push(words.join(" ") + ".");
    } else if (type === "sentences") {
      for (let i = 0; i < numCount; i++) {
        let sentence = generateSentence();
        if (i === 0 && startWithLorem) {
          sentence = "Lorem ipsum " + sentence.toLowerCase();
        }
        result.push(sentence);
      }
    } else if (type === "paragraphs") {
      for (let i = 0; i < numCount; i++) {
        let paragraph = generateParagraph();
        if (i === 0 && startWithLorem) {
          paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraph;
        }
        result.push(paragraph);
      }
    }
    
    setGeneratedText(result.join(type === "paragraphs" ? "\n\n" : " "));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied!",
      description: "Lorem ipsum text copied to clipboard.",
    });
  };

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lorem Ipsum Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Generate</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start with "Lorem ipsum"</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={startWithLorem}
                  onCheckedChange={setStartWithLorem}
                />
                <span className="text-sm">{startWithLorem ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <Button onClick={generateText} className="w-full">
            Generate Lorem Ipsum
          </Button>

          {generatedText && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Generated Text</Label>
                <Textarea
                  value={generatedText}
                  readOnly
                  className="min-h-[200px] font-serif"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </Button>
                <Button onClick={downloadText} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Generated {generatedText.split(/\s+/).length} words, {generatedText.length} characters
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoremIpsumGenerator;