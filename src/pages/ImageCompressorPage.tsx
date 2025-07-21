import { Layout } from '@/components/Layout';
import { ImageCompressor } from '@/components/ImageCompressor';

const ImageCompressorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Image Compressor
            </h1>
            <p className="text-xl text-muted-foreground">
              Compress JPEG and PNG images to reduce file size while maintaining quality
            </p>
          </div>
          
          <ImageCompressor />
        </div>
      </div>
    </Layout>
  );
};

export default ImageCompressorPage;