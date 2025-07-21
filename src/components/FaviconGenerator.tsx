import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FAVICON_SIZES = [16, 32, 48, 64, 96, 128, 152, 167, 180, 192, 256];

export const FaviconGenerator = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const generateFavicon = async (size: number) => {
    if (!uploadedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise<string>((resolve) => {
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0, size, size);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = uploadedImage;
    });
  };

  const downloadFavicon = async (size: number) => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    try {
      const faviconDataUrl = await generateFavicon(size);
      const link = document.createElement('a');
      link.download = `favicon-${size}x${size}.png`;
      link.href = faviconDataUrl;
      link.click();
      
      toast({
        title: "Success!",
        description: `Favicon ${size}x${size} downloaded successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate favicon",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllFavicons = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    try {
      for (const size of FAVICON_SIZES) {
        const faviconDataUrl = await generateFavicon(size);
        const link = document.createElement('a');
        link.download = `favicon-${size}x${size}.png`;
        link.href = faviconDataUrl;
        link.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between downloads
      }
      
      toast({
        title: "Success!",
        description: "All favicon sizes downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate favicons",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Choose an image file</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="mt-2"
            />
          </div>
          
          {uploadedImage && (
            <div className="flex flex-col items-center space-y-4">
              <div className="border rounded-lg p-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Preview of your uploaded image
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Generate Favicons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                onClick={downloadAllFavicons}
                disabled={isGenerating}
                className="mb-2"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All Sizes
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {FAVICON_SIZES.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  onClick={() => downloadFavicon(size)}
                  disabled={isGenerating}
                  className="h-auto py-3 flex flex-col items-center"
                >
                  <FileImage className="h-4 w-4 mb-1" />
                  <span className="text-xs">{size}×{size}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">How to use your favicons:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Upload the generated favicons to your website's root directory</p>
                <p>2. Add these meta tags to your HTML &lt;head&gt; section:</p>
                <code className="block bg-background p-2 rounded text-xs mt-2">
                  {`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};