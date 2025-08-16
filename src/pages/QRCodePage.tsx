import { Layout } from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";

const QRCodePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes for URLs, text, WiFi credentials, and more. Customize colors, add logos, and download as PNG or SVG. Free QR code generator with unlimited usage.
          </p>
        </div>
        <QRCodeGenerator />
        
        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About QR Code Generator</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Our QR code generator is a powerful, free tool that allows you to create QR codes for various purposes. Whether you need to share URLs, contact information, WiFi credentials, or plain text, our generator provides a simple and efficient solution.
            </p>
            <h3 className="text-xl font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Generate QR codes for URLs, text, WiFi, and more</li>
              <li>Customize foreground and background colors</li>
              <li>Download as PNG or SVG format</li>
              <li>No registration or signup required</li>
              <li>Completely free with unlimited usage</li>
              <li>Works directly in your browser</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">How to Use</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enter your text, URL, or data in the input field</li>
              <li>Customize colors if desired</li>
              <li>Preview your QR code in real-time</li>
              <li>Download your QR code as PNG or SVG</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRCodePage;