import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSBorderRadiusGenerator = () => {
  const [topLeft, setTopLeft] = useState([20]);
  const [topRight, setTopRight] = useState([20]);
  const [bottomRight, setBottomRight] = useState([20]);
  const [bottomLeft, setBottomLeft] = useState([20]);
  const [generatedCSS, setGeneratedCSS] = useState("");
  const { toast } = useToast();

  const generateCSS = () => {
    const css = `border-radius: ${topLeft[0]}px ${topRight[0]}px ${bottomRight[0]}px ${bottomLeft[0]}px;

/* Alternative syntax */
border-top-left-radius: ${topLeft[0]}px;
border-top-right-radius: ${topRight[0]}px;
border-bottom-right-radius: ${bottomRight[0]}px;
border-bottom-left-radius: ${bottomLeft[0]}px;`;
    setGeneratedCSS(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSS);
    toast({
      title: "Copied!",
      description: "Border radius CSS copied to clipboard.",
    });
  };

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "border-radius.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setTopLeft([0]);
    setTopRight([0]);
    setBottomRight([0]);
    setBottomLeft([0]);
  };

  const setAllSame = (value: number) => {
    setTopLeft([value]);
    setTopRight([value]);
    setBottomRight([value]);
    setBottomLeft([value]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Border Radius Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Top Left: {topLeft[0]}px</Label>
                  <Slider
                    value={topLeft}
                    onValueChange={setTopLeft}
                    max={100}
                    min={0}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Top Right: {topRight[0]}px</Label>
                  <Slider
                    value={topRight}
                    onValueChange={setTopRight}
                    max={100}
                    min={0}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bottom Right: {bottomRight[0]}px</Label>
                  <Slider
                    value={bottomRight}
                    onValueChange={setBottomRight}
                    max={100}
                    min={0}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bottom Left: {bottomLeft[0]}px</Label>
                  <Slider
                    value={bottomLeft}
                    onValueChange={setBottomLeft}
                    max={100}
                    min={0}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => setAllSame(0)} variant="outline" size="sm">
                  Square
                </Button>
                <Button onClick={() => setAllSame(10)} variant="outline" size="sm">
                  Slightly Rounded
                </Button>
                <Button onClick={() => setAllSame(20)} variant="outline" size="sm">
                  Rounded
                </Button>
                <Button onClick={() => setAllSame(50)} variant="outline" size="sm">
                  Very Rounded
                </Button>
                <Button onClick={resetAll} variant="outline" size="sm">
                  Reset
                </Button>
              </div>

              <Button onClick={generateCSS} className="w-full">
                Generate CSS
              </Button>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="border rounded-lg p-8 bg-muted/50 flex items-center justify-center">
                <div
                  className="w-32 h-32 bg-primary"
                  style={{
                    borderRadius: `${topLeft[0]}px ${topRight[0]}px ${bottomRight[0]}px ${bottomLeft[0]}px`,
                  }}
                />
              </div>
              
              {/* Visual guide */}
              <div className="relative">
                <div className="w-32 h-32 border-2 border-dashed border-muted-foreground mx-auto relative">
                  <div className="absolute -top-6 -left-6 text-xs bg-background px-2 py-1 rounded border">
                    TL: {topLeft[0]}
                  </div>
                  <div className="absolute -top-6 -right-6 text-xs bg-background px-2 py-1 rounded border">
                    TR: {topRight[0]}
                  </div>
                  <div className="absolute -bottom-6 -right-6 text-xs bg-background px-2 py-1 rounded border">
                    BR: {bottomRight[0]}
                  </div>
                  <div className="absolute -bottom-6 -left-6 text-xs bg-background px-2 py-1 rounded border">
                    BL: {bottomLeft[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {generatedCSS && (
            <Tabs defaultValue="css">
              <TabsList>
                <TabsTrigger value="css">CSS</TabsTrigger>
              </TabsList>
              <TabsContent value="css" className="space-y-4">
                <Textarea
                  value={generatedCSS}
                  readOnly
                  className="min-h-[120px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button onClick={downloadCSS} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSBorderRadiusGenerator;