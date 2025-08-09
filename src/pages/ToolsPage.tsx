import { 
  QrCode, 
  FileText, 
  Palette, 
  Code, 
  Image, 
  Link as LinkIcon,
  Tags,
  FileImage,
  Scissors,
  Grid3X3
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";

const allTools = [
  {
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character options.",
    icon: Code,
    href: "/tools/password-generator",
    badge: "Security"
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to text instantly.",
    icon: FileText,
    href: "/tools/base64",
    badge: "Developer"
  },
  {
    title: "UUID Generator",
    description: "Generate unique identifiers (UUID v4) for your applications.",
    icon: QrCode,
    href: "/tools/uuid-generator",
    badge: "Developer"
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from your text.",
    icon: Code,
    href: "/tools/hash-generator",
    badge: "Security"
  },
  {
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, WiFi, and more. Customize colors and download as PNG.",
    icon: QrCode,
    href: "/tools/qr-code",
    badge: "Popular"
  },
  {
    title: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data instantly. Perfect for developers and API testing.",
    icon: FileText,
    href: "/tools/json-formatter",
    badge: "Developer"
  },
  {
    title: "Color Picker & Palette Generator",
    description: "Pick colors and generate palettes with HEX, RGB, HSL codes. Create beautiful color schemes.",
    icon: Palette,
    href: "/tools/color-picker",
    badge: "Design"
  },
  {
    title: "HTML/CSS Code Generator",
    description: "Generate HTML and CSS code for buttons, cards, forms, and layouts with live preview.",
    icon: Code,
    href: "/tools/html-css",
    badge: "Developer"
  },
  {
    title: "Meta Tag Generator",
    description: "Generate SEO-optimized meta tags for better search engine visibility and social sharing.",
    icon: Tags,
    href: "/tools/meta-tags",
    badge: "SEO"
  },
  {
    title: "Link-in-Bio Generator",
    description: "Create beautiful landing pages with multiple links for your social media bio.",
    icon: LinkIcon,
    href: "/tools/link-in-bio",
    badge: "Social"
  },
  {
    title: "Image Compressor",
    description: "Compress JPEG and PNG images to reduce file size while maintaining quality.",
    icon: Image,
    href: "/tools/image-compressor",
    badge: "Media"
  },
  {
    title: "Favicon Generator",
    description: "Create favicons from any image. Generate multiple sizes and formats for all devices.",
    icon: FileImage,
    href: "/tools/favicon",
    badge: "Design"
  },
  {
    title: "URL Shortener",
    description: "Create short, memorable links from long URLs. Track clicks and manage your links.",
    icon: Scissors,
    href: "/tools/url-shortener",
    badge: "Utility"
  },
  {
    title: "CSS Grid Generator",
    description: "Visual CSS Grid generator with live preview. Create responsive grid layouts effortlessly.",
    icon: Grid3X3,
    href: "/tools/css-grid",
    badge: "Developer"
  }
];

const ToolsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of free online tools. No signup required, 
            no limitations. Just powerful utilities to boost your productivity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {allTools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-gray">
          <h2 className="text-2xl font-bold mb-4">Free Online Tools - No Signup Required</h2>
          <p className="text-muted-foreground mb-6">
            ToolVibe offers a comprehensive collection of free online tools designed to boost your productivity. 
            Whether you're a developer, designer, marketer, or just need quick utilities, our tools work 
            instantly in your browser without requiring any registration or downloads.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• JSON Formatter and Validator</li>
                <li>• HTML/CSS Code Generator</li>
                <li>• Meta Tag Generator</li>
                <li>• CSS Grid Generator</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Design & Media Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Color Picker & Palette Generator</li>
                <li>• Image Compressor</li>
                <li>• Favicon Generator</li>
                <li>• QR Code Generator</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Why Choose ToolVibe?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>No Registration:</strong> Access all tools immediately without creating an account</li>
              <li>• <strong>Privacy First:</strong> All processing happens in your browser - no data sent to servers</li>
              <li>• <strong>Always Free:</strong> All tools are completely free with no hidden costs or limitations</li>
              <li>• <strong>Mobile Friendly:</strong> All tools work perfectly on mobile devices</li>
              <li>• <strong>Regular Updates:</strong> New tools added regularly based on user feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;