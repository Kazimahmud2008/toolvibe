import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorConverter = () => {
  const [hex, setHex] = useState("#8B5CF6");
  const [rgb, setRgb] = useState({ r: 139, g: 92, b: 246 });
  const [hsl, setHsl] = useState({ h: 262, s: 83, l: 66 });
  const [cmyk, setCmyk] = useState({ c: 43, m: 63, y: 0, k: 4 });
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateFromHex = (newHex: string) => {
    if (/^#?[0-9A-F]{6}$/i.test(newHex)) {
      setHex(newHex);
      const newRgb = hexToRgb(newHex);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const updateFromRgb = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [component]: Math.max(0, Math.min(255, value)) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} value copied to clipboard`,
    });
  };

  const reset = () => {
    updateFromHex("#8B5CF6");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">Color Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Input and Preview */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Color Picker</Label>
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => updateFromHex(e.target.value)}
                    className="w-full h-20 mt-2 rounded-lg border border-border"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Label>HEX</Label>
                      <Input
                        value={hex}
                        onChange={(e) => updateFromHex(e.target.value)}
                        className="mt-1 font-mono"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(hex, "HEX")}
                      className="mt-6"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label>R</Label>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => updateFromRgb('r', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>G</Label>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => updateFromRgb('g', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>B</Label>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => updateFromRgb('b', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={reset} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Color Values */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color Values</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">RGB</p>
                        <p className="text-sm font-mono text-muted-foreground">
                          rgb({rgb.r}, {rgb.g}, {rgb.b})
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">HSL</p>
                        <p className="text-sm font-mono text-muted-foreground">
                          hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">CMYK</p>
                        <p className="text-sm font-mono text-muted-foreground">
                          cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, "CMYK")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Color Preview */}
                <Card>
                  <CardContent className="p-4">
                    <p className="font-medium mb-3">Color Preview</p>
                    <div
                      className="w-full h-24 rounded-lg border border-border"
                      style={{ backgroundColor: hex }}
                    />
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

export default ColorConverter;