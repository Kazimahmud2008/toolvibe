import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [quality, setQuality] = useState([0.8]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }
      
      setOriginalImage(file);
      setOriginalSize(file.size);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async () => {
    if (!originalImage || !originalUrl) return;
    
    setIsProcessing(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setCompressedUrl(url);
              
              toast({
                title: "Success!",
                description: "Image compressed successfully",
              });
            }
            setIsProcessing(false);
          },
          originalImage.type,
          quality[0]
        );
      };
      
      img.src = originalUrl;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedUrl) return;
    
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${originalImage?.name || 'image'}`;
    a.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavingPercentage = () => {
    if (!originalSize || !compressedSize) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Select Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
            </div>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Image File
            </Button>
          </div>
        </CardContent>
      </Card>

      {originalUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Compression Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Quality: {Math.round(quality[0] * 100)}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={1}
                min={0.1}
                step={0.1}
                className="mt-2"
              />
            </div>
            
            <Button 
              onClick={compressImage} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Compressing...' : 'Compress Image'}
            </Button>
          </CardContent>
        </Card>
      )}

      {originalUrl && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Original Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={originalUrl}
                alt="Original"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Size: {formatFileSize(originalSize)}
              </p>
            </CardContent>
          </Card>

          {compressedUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Compressed Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    Size: {formatFileSize(compressedSize)}
                  </p>
                  <p className="text-green-600 font-medium">
                    Saved: {getSavingPercentage()}%
                  </p>
                </div>
                <Button onClick={downloadCompressed} className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};