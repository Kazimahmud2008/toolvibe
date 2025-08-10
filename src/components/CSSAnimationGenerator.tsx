import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CSSAnimationGenerator = () => {
  const [animationType, setAnimationType] = useState("bounce");
  const [duration, setDuration] = useState("1");
  const [delay, setDelay] = useState("0");
  const [iterationCount, setIterationCount] = useState("infinite");
  const [timingFunction, setTimingFunction] = useState("ease");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const animationTypes = [
    "bounce", "shake", "pulse", "fadeIn", "fadeOut", "slideInLeft", 
    "slideInRight", "slideInUp", "slideInDown", "zoomIn", "zoomOut", 
    "rotateIn", "rotateOut", "flip", "swing"
  ];

  const timingFunctions = [
    "ease", "linear", "ease-in", "ease-out", "ease-in-out",
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    "cubic-bezier(0.215, 0.61, 0.355, 1)"
  ];

  const getKeyframes = (type: string) => {
    const keyframes = {
      bounce: `
        0%, 20%, 53%, 80%, to { transform: translate3d(0,0,0); }
        40%, 43% { transform: translate3d(0, -30px, 0); }
        70% { transform: translate3d(0, -15px, 0); }
        90% { transform: translate3d(0,-4px,0); }
      `,
      shake: `
        0%, to { transform: translate3d(0, 0, 0); }
        10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
        20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
      `,
      pulse: `
        0% { transform: scale3d(1, 1, 1); }
        50% { transform: scale3d(1.05, 1.05, 1.05); }
        to { transform: scale3d(1, 1, 1); }
      `,
      fadeIn: `
        0% { opacity: 0; }
        to { opacity: 1; }
      `,
      fadeOut: `
        0% { opacity: 1; }
        to { opacity: 0; }
      `,
      slideInLeft: `
        0% { transform: translate3d(-100%, 0, 0); visibility: visible; }
        to { transform: translate3d(0, 0, 0); }
      `,
      slideInRight: `
        0% { transform: translate3d(100%, 0, 0); visibility: visible; }
        to { transform: translate3d(0, 0, 0); }
      `,
      slideInUp: `
        0% { transform: translate3d(0, 100%, 0); visibility: visible; }
        to { transform: translate3d(0, 0, 0); }
      `,
      slideInDown: `
        0% { transform: translate3d(0, -100%, 0); visibility: visible; }
        to { transform: translate3d(0, 0, 0); }
      `,
      zoomIn: `
        0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
        50% { opacity: 1; }
      `,
      zoomOut: `
        0% { opacity: 1; }
        50% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
        to { opacity: 0; }
      `,
      rotateIn: `
        0% { transform-origin: center; transform: rotate3d(0, 0, 1, -200deg); opacity: 0; }
        to { transform-origin: center; transform: translate3d(0, 0, 0); opacity: 1; }
      `,
      rotateOut: `
        0% { transform-origin: center; opacity: 1; }
        to { transform-origin: center; transform: rotate3d(0, 0, 1, 200deg); opacity: 0; }
      `,
      flip: `
        0% { transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg); }
        40% { transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg); }
        50% { transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg); }
        80% { transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg); }
        to { transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg); }
      `,
      swing: `
        20% { transform: rotate3d(0, 0, 1, 15deg); }
        40% { transform: rotate3d(0, 0, 1, -10deg); }
        60% { transform: rotate3d(0, 0, 1, 5deg); }
        80% { transform: rotate3d(0, 0, 1, -5deg); }
        to { transform: rotate3d(0, 0, 1, 0deg); }
      `
    };
    return keyframes[type as keyof typeof keyframes] || keyframes.bounce;
  };

  const generateCSS = () => {
    const keyframes = getKeyframes(animationType);
    const css = `@keyframes ${animationType} {${keyframes}}

.${animationType} {
  animation-name: ${animationType};
  animation-duration: ${duration}s;
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
  animation-timing-function: ${timingFunction};
  animation-fill-mode: both;
}`;
    setGeneratedCSS(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSS);
    toast({
      title: "Copied!",
      description: "CSS animation code copied to clipboard.",
    });
  };

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${animationType}-animation.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const playAnimation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), parseFloat(duration) * 1000 + parseFloat(delay) * 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Animation Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animationType">Animation Type</Label>
              <Select value={animationType} onValueChange={setAnimationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                min="0.1"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay">Delay (seconds)</Label>
              <Input
                id="delay"
                type="number"
                min="0"
                step="0.1"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iterationCount">Iteration Count</Label>
              <Select value={iterationCount} onValueChange={setIterationCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="infinite">Infinite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timingFunction">Timing Function</Label>
              <Select value={timingFunction} onValueChange={setTimingFunction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timingFunctions.map((func) => (
                    <SelectItem key={func} value={func}>
                      {func.startsWith("cubic-bezier") ? "Custom Bezier" : func}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateCSS}>Generate CSS</Button>
            <Button variant="outline" onClick={playAnimation}>
              <Play className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-8 bg-muted/50 flex items-center justify-center">
            <div
              className={`w-16 h-16 bg-primary rounded-lg ${isPlaying ? animationType : ""}`}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animationIterationCount: iterationCount,
                animationTimingFunction: timingFunction,
              }}
            />
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
                  className="min-h-[200px] font-mono text-sm"
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

export default CSSAnimationGenerator;