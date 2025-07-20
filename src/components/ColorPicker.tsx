import { useState, useEffect } from "react";
import { Copy, Check, Download, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorFormat {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

export const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [formats, setFormats] = useState<ColorFormat>({
    hex: "#3B82F6",
    rgb: "rgb(59, 130, 246)",
    hsl: "hsl(217, 91%, 60%)",
    hsv: "hsv(217, 76%, 96%)"
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const add = max + min;
    const l = add * 0.5;

    let s, h;

    if (diff === 0) {
      s = h = 0;
    } else {
      s = l < 0.5 ? diff / add : diff / (2 - add);

      switch (max) {
        case r:
          h = ((g - b) / diff) + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert RGB to HSV
  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    const h = diff === 0 ? 0 : max === r ? ((g - b) / diff) % 6 : max === g ? (b - r) / diff + 2 : (r - g) / diff + 4;
    const s = max === 0 ? 0 : diff / max;
    const v = max;

    return {
      h: Math.round(h * 60),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  // Update all color formats when color changes
  useEffect(() => {
    const { r, g, b } = hexToRgb(selectedColor);
    const { h: hslH, s: hslS, l: hslL } = rgbToHsl(r, g, b);
    const { h: hsvH, s: hsvS, v: hsvV } = rgbToHsv(r, g, b);

    setFormats({
      hex: selectedColor.toUpperCase(),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hslH}, ${hslS}%, ${hslL}%)`,
      hsv: `hsv(${hsvH}, ${hsvS}%, ${hsvV}%)`
    });
  }, [selectedColor]);

  const copyToClipboard = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const generatePalette = () => {
    const { r, g, b } = hexToRgb(selectedColor);
    const newPalette: string[] = [];

    // Generate shades (darker)
    for (let i = 1; i <= 5; i++) {
      const factor = 1 - (i * 0.15);
      const newR = Math.round(r * factor);
      const newG = Math.round(g * factor);
      const newB = Math.round(b * factor);
      const hex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      newPalette.push(hex);
    }

    // Add original color
    newPalette.push(selectedColor);

    // Generate tints (lighter)
    for (let i = 1; i <= 5; i++) {
      const factor = i * 0.15;
      const newR = Math.round(r + (255 - r) * factor);
      const newG = Math.round(g + (255 - g) * factor);
      const newB = Math.round(b + (255 - b) * factor);
      const hex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      newPalette.push(hex);
    }

    setPalette(newPalette);
  };

  const downloadPalette = () => {
    if (palette.length === 0) return;

    const paletteData = palette.map((color, index) => {
      const { r, g, b } = hexToRgb(color);
      const { h, s, l } = rgbToHsl(r, g, b);
      return {
        name: `Color ${index + 1}`,
        hex: color,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${h}, ${s}%, ${l}%)`
      };
    });

    const csvContent = "data:text/csv;charset=utf-8," +
      "Name,HEX,RGB,HSL\n" +
      paletteData.map(color => `${color.name},${color.hex},${color.rgb},${color.hsl}`).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "color-palette.csv");
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Color Picker & Palette Generator</h1>
          <p className="text-xl text-muted-foreground">
            Pick colors and generate palettes with all format codes. No signup required!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Color Picker Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Color Picker</span>
              </CardTitle>
              <CardDescription>
                Select a color and get all format codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Input */}
              <div className="space-y-4">
                <Label htmlFor="color-picker">Pick a Color</Label>
                <div className="flex space-x-4 items-center">
                  <input
                    id="color-picker"
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <Input
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      placeholder="#3B82F6"
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Color Formats */}
              <div className="space-y-3">
                <Label>Color Formats</Label>
                {Object.entries(formats).map(([format, value]) => (
                  <div key={format} className="flex items-center space-x-2">
                    <div className="w-12 h-8 rounded border-2 border-border" style={{ backgroundColor: selectedColor }}></div>
                    <Label className="w-12 text-sm font-medium uppercase">{format}</Label>
                    <Input value={value} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(value, format)}
                    >
                      {copied === format ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={generatePalette} className="w-full btn-primary">
                Generate Color Palette
              </Button>
            </CardContent>
          </Card>

          {/* Palette Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Color Palette</span>
                {palette.length > 0 && (
                  <Button variant="outline" size="sm" onClick={downloadPalette}>
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Generated palette with shades and tints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {palette.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {palette.map((color, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer rounded-lg border-2 border-border overflow-hidden hover:border-primary transition-colors"
                        onClick={() => copyToClipboard(color, `palette-${index}`)}
                      >
                        <div 
                          className="h-16 w-full" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <div className="p-2 bg-background">
                          <p className="text-xs font-mono text-center">{color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Click any color to copy its hex code
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[200px] bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center space-y-2">
                    <Palette className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Generate a palette to see colors here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Free Color Picker Tool</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Pick colors with visual color picker</li>
                <li>• Get HEX, RGB, HSL, and HSV formats</li>
                <li>• Generate color palettes with shades and tints</li>
                <li>• Copy color codes to clipboard</li>
                <li>• Download palettes as CSV files</li>
                <li>• No registration required</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Perfect For</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Web designers and developers</li>
                <li>• Graphic designers</li>
                <li>• Brand identity projects</li>
                <li>• CSS and styling work</li>
                <li>• Color scheme planning</li>
                <li>• Design system creation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};