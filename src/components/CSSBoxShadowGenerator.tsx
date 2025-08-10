import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Shadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

const CSSBoxShadowGenerator = () => {
  const [shadows, setShadows] = useState<Shadow[]>([
    {
      id: "1",
      x: 0,
      y: 4,
      blur: 6,
      spread: 0,
      color: "#000000",
      inset: false,
    },
  ]);
  const [generatedCSS, setGeneratedCSS] = useState("");
  const { toast } = useToast();

  const addShadow = () => {
    const newShadow: Shadow = {
      id: Date.now().toString(),
      x: 0,
      y: 4,
      blur: 6,
      spread: 0,
      color: "#000000",
      inset: false,
    };
    setShadows([...shadows, newShadow]);
  };

  const removeShadow = (id: string) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((shadow) => shadow.id !== id));
    }
  };

  const updateShadow = (id: string, updates: Partial<Shadow>) => {
    setShadows(shadows.map((shadow) => 
      shadow.id === id ? { ...shadow, ...updates } : shadow
    ));
  };

  const generateCSS = () => {
    const shadowStrings = shadows.map((shadow) => {
      const insetPrefix = shadow.inset ? "inset " : "";
      return `${insetPrefix}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    });
    
    const css = `box-shadow: ${shadowStrings.join(", ")};`;
    setGeneratedCSS(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSS);
    toast({
      title: "Copied!",
      description: "Box shadow CSS copied to clipboard.",
    });
  };

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "box-shadow.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const presetShadows = [
    { name: "Subtle", shadows: [{ x: 0, y: 1, blur: 3, spread: 0, color: "#00000026", inset: false }] },
    { name: "Medium", shadows: [{ x: 0, y: 4, blur: 6, spread: -1, color: "#00000026", inset: false }] },
    { name: "Large", shadows: [{ x: 0, y: 10, blur: 15, spread: -3, color: "#00000026", inset: false }] },
    { name: "Extra Large", shadows: [{ x: 0, y: 25, blur: 50, spread: -12, color: "#00000040", inset: false }] },
    { name: "Inner", shadows: [{ x: 0, y: 2, blur: 4, spread: 0, color: "#00000026", inset: true }] },
  ];

  const applyPreset = (preset: typeof presetShadows[0]) => {
    const newShadows = preset.shadows.map((shadow, index) => ({
      id: (Date.now() + index).toString(),
      ...shadow,
    }));
    setShadows(newShadows);
  };

  const getBoxShadowStyle = () => {
    const shadowStrings = shadows.map((shadow) => {
      const insetPrefix = shadow.inset ? "inset " : "";
      return `${insetPrefix}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    });
    return shadowStrings.join(", ");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Box Shadow Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Presets */}
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="flex gap-2 flex-wrap">
              {presetShadows.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  variant="outline"
                  size="sm"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              {shadows.map((shadow, index) => (
                <Card key={shadow.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Shadow {index + 1}</h4>
                      {shadows.length > 1 && (
                        <Button
                          onClick={() => removeShadow(shadow.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>X Offset: {shadow.x}px</Label>
                        <Slider
                          value={[shadow.x]}
                          onValueChange={(value) => updateShadow(shadow.id, { x: value[0] })}
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Y Offset: {shadow.y}px</Label>
                        <Slider
                          value={[shadow.y]}
                          onValueChange={(value) => updateShadow(shadow.id, { y: value[0] })}
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Blur: {shadow.blur}px</Label>
                        <Slider
                          value={[shadow.blur]}
                          onValueChange={(value) => updateShadow(shadow.id, { blur: value[0] })}
                          min={0}
                          max={100}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Spread: {shadow.spread}px</Label>
                        <Slider
                          value={[shadow.spread]}
                          onValueChange={(value) => updateShadow(shadow.id, { spread: value[0] })}
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Color</Label>
                        <Input
                          type="color"
                          value={shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Inset</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={shadow.inset}
                            onCheckedChange={(checked) => updateShadow(shadow.id, { inset: checked })}
                          />
                          <span className="text-sm">{shadow.inset ? "Inner" : "Outer"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-2">
                <Button onClick={addShadow} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shadow
                </Button>
                <Button onClick={generateCSS}>Generate CSS</Button>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="border rounded-lg p-8 bg-muted/50 flex items-center justify-center min-h-[300px]">
                <div
                  className="w-32 h-32 bg-background rounded-lg"
                  style={{
                    boxShadow: getBoxShadowStyle(),
                  }}
                />
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
                  className="min-h-[80px] font-mono text-sm"
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

export default CSSBoxShadowGenerator;