import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSBorderRadiusGenerator = () => {
  const [topLeft, setTopLeft] = useState([20]);
  const [topRight, setTopRight] = useState([20]);
  const [bottomLeft, setBottomLeft] = useState([20]);
  const [bottomRight, setBottomRight] = useState([20]);
  const { toast } = useToast();

  const generateCSS = () => {
    return `border-radius: ${topLeft[0]}px ${topRight[0]}px ${bottomRight[0]}px ${bottomLeft[0]}px;`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: "Copied!",
      description: "CSS copied to clipboard",
    });
  };

  const reset = () => {
    setTopLeft([20]);
    setTopRight([20]);
    setBottomLeft([20]);
    setBottomRight([20]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">CSS Border Radius Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Top Left: {topLeft[0]}px</Label>
                  <Slider
                    value={topLeft}
                    onValueChange={setTopLeft}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Top Right: {topRight[0]}px</Label>
                  <Slider
                    value={topRight}
                    onValueChange={setTopRight}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Bottom Left: {bottomLeft[0]}px</Label>
                  <Slider
                    value={bottomLeft}
                    onValueChange={setBottomLeft}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Bottom Right: {bottomRight[0]}px</Label>
                  <Slider
                    value={bottomRight}
                    onValueChange={setBottomRight}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyToClipboard} className="btn-gradient">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="flex justify-center">
                  <div
                    className="w-48 h-48 bg-gradient-primary shadow-lg"
                    style={{
                      borderRadius: `${topLeft[0]}px ${topRight[0]}px ${bottomRight[0]}px ${bottomLeft[0]}px`,
                    }}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Generated CSS</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-sm font-mono bg-muted p-3 rounded block">
                    {generateCSS()}
                  </code>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSBorderRadiusGenerator;