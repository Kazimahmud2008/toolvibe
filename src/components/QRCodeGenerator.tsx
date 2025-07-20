import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const QRCodeGenerator = () => {
  const [text, setText] = useState("https://toolvibe.com");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrType, setQrType] = useState("url");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        color: {
          dark: color,
          light: backgroundColor,
        },
        width: 300,
        margin: 2,
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("QR Code generation failed:", error);
    }
  };

  useEffect(() => {
    if (text) {
      generateQR();
    }
  }, [text, color, backgroundColor]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = qrDataUrl;
      link.click();
    }
  };

  const handleTypeChange = (type: string) => {
    setQrType(type);
    switch (type) {
      case "url":
        setText("https://toolvibe.com");
        break;
      case "text":
        setText("Hello, World!");
        break;
      case "email":
        setText("mailto:hello@toolvibe.com");
        break;
      case "phone":
        setText("tel:+1234567890");
        break;
      case "wifi":
        setText("WIFI:T:WPA;S:MyNetwork;P:MyPassword;;");
        break;
      default:
        setText("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-xl text-muted-foreground">
            Create custom QR codes instantly. No signup required, completely free!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Settings</CardTitle>
              <CardDescription>
                Customize your QR code content and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Type Selector */}
              <div className="space-y-2">
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Select value={qrType} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select QR type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url">Website URL</SelectItem>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="email">Email Address</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="wifi">WiFi Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <Label htmlFor="qr-content">Content</Label>
                {qrType === "text" || qrType === "wifi" ? (
                  <Textarea
                    id="qr-content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your content here..."
                    rows={4}
                  />
                ) : (
                  <Input
                    id="qr-content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your content here..."
                  />
                )}
              </div>

              {/* Color Customization */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-color">QR Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="qr-color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bg-color">Background</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#FFFFFF"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  onClick={copyToClipboard} 
                  variant="outline" 
                  className="flex-1"
                  disabled={!text}
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Text"}
                </Button>
                <Button 
                  onClick={downloadQR} 
                  className="flex-1 btn-primary"
                  disabled={!qrDataUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Preview */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                Your QR code will appear here instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
                {qrDataUrl ? (
                  <div className="text-center space-y-4">
                    <img 
                      src={qrDataUrl} 
                      alt="Generated QR Code" 
                      className="mx-auto rounded-lg shadow-card hover:shadow-glow transition-all duration-300"
                    />
                    <p className="text-sm text-muted-foreground">
                      QR Code generated successfully!
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto"></div>
                    <p className="text-muted-foreground">Enter content to generate QR code</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold mb-4">Free QR Code Generator - No Signup Required</h2>
          <p className="text-muted-foreground mb-4">
            Generate QR codes instantly with our free online QR code generator. Create QR codes for URLs, 
            text, email addresses, phone numbers, and WiFi networks. Customize colors and download in PNG format.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Features:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Create QR codes for websites, text, emails, and more</li>
            <li>Customize QR code and background colors</li>
            <li>High-quality PNG download</li>
            <li>No registration or signup required</li>
            <li>Completely free to use</li>
            <li>Mobile-friendly interface</li>
          </ul>
        </div>
      </div>
    </div>
  );
};