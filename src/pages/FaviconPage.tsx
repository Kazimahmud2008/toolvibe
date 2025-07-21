import { Layout } from "@/components/Layout";
import { FaviconGenerator } from "@/components/FaviconGenerator";

const FaviconPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Favicon Generator</h1>
            <p className="text-xl text-muted-foreground">
              Create favicons from any image. Generate multiple sizes and formats for all devices.
            </p>
          </div>

          <FaviconGenerator />

          <div className="mt-12 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold mb-4">About Favicon Generator</h2>
            <p className="text-muted-foreground mb-6">
              A favicon is a small icon that represents your website in browser tabs, bookmarks, and mobile home screens. 
              Our favicon generator creates all the sizes you need from a single image upload.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Supported Sizes</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 16×16 - Browser tab icon</li>
                  <li>• 32×32 - Standard favicon</li>
                  <li>• 48×48 - Windows site icon</li>
                  <li>• 64×64, 96×96 - Desktop shortcuts</li>
                  <li>• 128×128, 152×152 - High resolution</li>
                  <li>• 167×167, 180×180 - Apple devices</li>
                  <li>• 192×192, 256×256 - Android devices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use a square image for best results</li>
                  <li>• Minimum 256×256 pixels recommended</li>
                  <li>• Simple designs work better at small sizes</li>
                  <li>• High contrast colors for visibility</li>
                  <li>• Test on different backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaviconPage;