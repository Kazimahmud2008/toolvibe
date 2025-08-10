import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    const words = inputText.trim() 
      ? inputText.trim().split(/\s+/).length 
      : 0;
    
    const sentences = inputText.trim()
      ? inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
      : 0;
    
    const paragraphs = inputText.trim()
      ? inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
      : 0;
    
    // Average reading speed: 200-250 words per minute
    const readingTime = Math.ceil(words / 225);
    
    // Average speaking speed: 130-150 words per minute
    const speakingTime = Math.ceil(words / 140);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    });
  };

  const getReadabilityScore = () => {
    if (stats.words === 0 || stats.sentences === 0) return 0;
    
    // Simplified Flesch Reading Ease approximation
    const avgWordsPerSentence = stats.words / stats.sentences;
    const avgSyllablesPerWord = 1.5; // Rough estimate
    
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  const readabilityScore = getReadabilityScore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Word Counter & Text Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Enter your text</Label>
            <Textarea
              id="text"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          {/* Basic Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.characters.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.charactersNoSpaces.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.words.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Words</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.sentences.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Sentences</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.paragraphs.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Paragraphs</div>
              </CardContent>
            </Card>
          </div>

          {/* Reading & Speaking Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Reading Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats.readingTime} min
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on 225 words per minute
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Speaking Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats.speakingTime} min
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on 140 words per minute
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Readability Score */}
          {stats.words > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Readability Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {readabilityScore}/100
                  </span>
                  <span className="text-lg font-medium">
                    {getReadabilityLevel(readabilityScore)}
                  </span>
                </div>
                <Progress value={readabilityScore} className="w-full" />
                <div className="text-sm text-muted-foreground">
                  Higher scores indicate easier readability
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Statistics */}
          {stats.words > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">
                      {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg words/sentence</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">
                      {stats.words > 0 ? (stats.characters / stats.words).toFixed(1) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg chars/word</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">
                      {stats.paragraphs > 0 ? (stats.sentences / stats.paragraphs).toFixed(1) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg sentences/paragraph</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">
                      {stats.paragraphs > 0 ? (stats.words / stats.paragraphs).toFixed(0) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg words/paragraph</div>
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

export default WordCounter;