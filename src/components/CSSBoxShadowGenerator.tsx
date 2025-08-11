import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSBoxShadowGenerator = () => {
  const [horizontalOffset, setHorizontalOffset] = useState([0]);
  const [verticalOffset, setVerticalOffset] = useState([4]);
  const [blurRadius, setBlurRadius] = useState([8]);
  const [spreadRadius, setSpreadRadius] = useState([0]);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState([25]);
  const [inset, setInset] = useState(false);
  const { toast } = useToast();

  const generateCSS = () => {
    const alpha = opacity[0] / 100;
    const shadowType = inset ? "inset " : "";
    return `box-shadow: ${shadowType}${horizontalOffset[0]}px ${verticalOffset[0]}px ${blurRadius[0]}px ${spreadRadius[0]}px ${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')};`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: "Copied!",
      description: "CSS copied to clipboard",
    });
  };

  const reset = () => {
    setHorizontalOffset([0]);
    setVerticalOffset([4]);
    setBlurRadius([8]);
    setSpreadRadius([0]);
    setColor("#000000");
    setOpacity([25]);
    setInset(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">CSS Box Shadow Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Horizontal Offset: {horizontalOffset[0]}px</Label>
                  <Slider
                    value={horizontalOffset}
                    onValueChange={setHorizontalOffset}
                    min={-50}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Vertical Offset: {verticalOffset[0]}px</Label>
                  <Slider
                    value={verticalOffset}
                    onValueChange={setVerticalOffset}
                    min={-50}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Blur Radius: {blurRadius[0]}px</Label>
                  <Slider
                    value={blurRadius}
                    onValueChange={setBlurRadius}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Spread Radius: {spreadRadius[0]}px</Label>
                  <Slider
                    value={spreadRadius}
                    onValueChange={setSpreadRadius}
                    min={-50}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Opacity: {opacity[0]}%</Label>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Color</Label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 mt-2 rounded border border-border"
                    />
                  </div>
                  <div>
                    <Label>Shadow Type</Label>
                    <Select value={inset ? "inset" : "outset"} onValueChange={(value) => setInset(value === "inset")}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="outset">Outset</SelectItem>
                        <SelectItem value="inset">Inset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <div className="flex justify-center p-8">
                  <div
                    className="w-48 h-48 bg-white border border-border rounded-lg"
                    style={{
                      boxShadow: `${inset ? "inset " : ""}${horizontalOffset[0]}px ${verticalOffset[0]}px ${blurRadius[0]}px ${spreadRadius[0]}px ${color}${Math.floor((opacity[0] / 100) * 255).toString(16).padStart(2, '0')}`,
                    }}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Generated CSS</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-sm font-mono bg-muted p-3 rounded block break-all">
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

export default CSSBoxShadowGenerator;