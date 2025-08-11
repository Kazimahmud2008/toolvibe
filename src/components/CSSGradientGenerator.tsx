import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSGradientGenerator = () => {
  const [direction, setDirection] = useState("to right");
  const [color1, setColor1] = useState("#8B5CF6");
  const [color2, setColor2] = useState("#3B82F6");
  const [color3, setColor3] = useState("#06B6D4");
  const [useThirdColor, setUseThirdColor] = useState(true);
  const [position1, setPosition1] = useState([0]);
  const [position2, setPosition2] = useState([50]);
  const [position3, setPosition3] = useState([100]);
  const { toast } = useToast();

  const directions = [
    { value: "to right", label: "To Right" },
    { value: "to left", label: "To Left" },
    { value: "to bottom", label: "To Bottom" },
    { value: "to top", label: "To Top" },
    { value: "to bottom right", label: "To Bottom Right" },
    { value: "to bottom left", label: "To Bottom Left" },
    { value: "to top right", label: "To Top Right" },
    { value: "to top left", label: "To Top Left" },
    { value: "45deg", label: "45 degrees" },
    { value: "90deg", label: "90 degrees" },
    { value: "135deg", label: "135 degrees" },
    { value: "180deg", label: "180 degrees" },
  ];

  const generateCSS = () => {
    const stops = useThirdColor 
      ? `${color1} ${position1[0]}%, ${color2} ${position2[0]}%, ${color3} ${position3[0]}%`
      : `${color1} ${position1[0]}%, ${color2} ${position2[0]}%`;
    
    return `background: linear-gradient(${direction}, ${stops});`;
  };

  const generateRadialCSS = () => {
    const stops = useThirdColor 
      ? `${color1} ${position1[0]}%, ${color2} ${position2[0]}%, ${color3} ${position3[0]}%`
      : `${color1} ${position1[0]}%, ${color2} ${position2[0]}%`;
    
    return `background: radial-gradient(circle, ${stops});`;
  };

  const copyToClipboard = (css: string) => {
    navigator.clipboard.writeText(css);
    toast({
      title: "Copied!",
      description: "CSS copied to clipboard",
    });
  };

  const randomizeColors = () => {
    const getRandomColor = () => {
      const colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    setColor1(getRandomColor());
    setColor2(getRandomColor());
    setColor3(getRandomColor());
  };

  const reset = () => {
    setDirection("to right");
    setColor1("#8B5CF6");
    setColor2("#3B82F6");
    setColor3("#06B6D4");
    setUseThirdColor(true);
    setPosition1([0]);
    setPosition2([50]);
    setPosition3([100]);
  };

  const currentGradient = useThirdColor 
    ? `linear-gradient(${direction}, ${color1} ${position1[0]}%, ${color2} ${position2[0]}%, ${color3} ${position3[0]}%)`
    : `linear-gradient(${direction}, ${color1} ${position1[0]}%, ${color2} ${position2[0]}%)`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">CSS Gradient Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Direction</Label>
                  <Select value={direction} onValueChange={setDirection}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {directions.map((dir) => (
                        <SelectItem key={dir.value} value={dir.value}>
                          {dir.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Color 1</Label>
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-full h-10 mt-2 rounded border border-border"
                    />
                    <div className="mt-2">
                      <Label className="text-xs">Position: {position1[0]}%</Label>
                      <Slider
                        value={position1}
                        onValueChange={setPosition1}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Color 2</Label>
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-full h-10 mt-2 rounded border border-border"
                    />
                    <div className="mt-2">
                      <Label className="text-xs">Position: {position2[0]}%</Label>
                      <Slider
                        value={position2}
                        onValueChange={setPosition2}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useThirdColor"
                    checked={useThirdColor}
                    onChange={(e) => setUseThirdColor(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="useThirdColor">Use third color</Label>
                </div>

                {useThirdColor && (
                  <div>
                    <Label>Color 3</Label>
                    <input
                      type="color"
                      value={color3}
                      onChange={(e) => setColor3(e.target.value)}
                      className="w-full h-20 mt-2 rounded border border-border"
                    />
                    <div className="mt-2">
                      <Label className="text-xs">Position: {position3[0]}%</Label>
                      <Slider
                        value={position3}
                        onValueChange={setPosition3}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => copyToClipboard(generateCSS())} className="btn-gradient">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Linear
                </Button>
                <Button onClick={() => copyToClipboard(generateRadialCSS())} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Radial
                </Button>
                <Button onClick={randomizeColors} variant="outline">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random
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
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Linear Gradient</p>
                    <div
                      className="w-full h-32 rounded-lg border border-border"
                      style={{ background: currentGradient }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Radial Gradient</p>
                    <div
                      className="w-full h-32 rounded-lg border border-border"
                      style={{ 
                        background: useThirdColor 
                          ? `radial-gradient(circle, ${color1} ${position1[0]}%, ${color2} ${position2[0]}%, ${color3} ${position3[0]}%)`
                          : `radial-gradient(circle, ${color1} ${position1[0]}%, ${color2} ${position2[0]}%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Linear Gradient CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-sm font-mono bg-muted p-3 rounded block break-all">
                      {generateCSS()}
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Radial Gradient CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-sm font-mono bg-muted p-3 rounded block break-all">
                      {generateRadialCSS()}
                    </code>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSGradientGenerator;