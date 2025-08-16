import { Layout } from "@/components/Layout";
import { ColorPicker } from "@/components/ColorPicker";

const ColorPickerPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Color Picker & Palette Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pick colors and generate beautiful color palettes with HEX, RGB, HSL, and HSV codes. Perfect for web design, UI/UX projects, and brand development.
          </p>
        </div>
        <ColorPicker />
        
        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Professional Color Picker Tool</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Color is fundamental to design and branding. Our advanced color picker tool helps designers, developers, and creatives find the perfect colors for their projects with precision and ease.
            </p>
            <h3 className="text-xl font-semibold mb-3">Color Formats Supported</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>HEX codes (#FF5733) - Web standard format</li>
              <li>RGB values (255, 87, 51) - Red, Green, Blue</li>
              <li>HSL values (11°, 100%, 60%) - Hue, Saturation, Lightness</li>
              <li>HSV values (11°, 80%, 100%) - Hue, Saturation, Value</li>
              <li>CMYK values for print design</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">Perfect For</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Web design and development</li>
              <li>UI/UX design projects</li>
              <li>Brand color palette creation</li>
              <li>Print design and marketing materials</li>
              <li>Digital art and illustration</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ColorPickerPage;