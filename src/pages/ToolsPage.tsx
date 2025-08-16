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
  Grid3X3,
  Key,
  Hash,
  Type,
  Clock,
  TestTube,
  Wand2,
  PaintBucket,
  Radius,
  Droplets
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";

const allTools = [
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
    badge: "Popular"
  },
  {
    title: "Color Picker & Palette Generator",
    description: "Pick colors and generate palettes with HEX, RGB, HSL codes. Create beautiful color schemes.",
    icon: Palette,
    href: "/tools/color-picker",
    badge: "Popular"
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character options.",
    icon: Key,
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
    icon: Code,
    href: "/tools/uuid-generator",
    badge: "Developer"
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from your text.",
    icon: Hash,
    href: "/tools/hash-generator",
    badge: "Security"
  },
  {
    title: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients with live preview. Copy-ready code for your projects.",
    icon: Droplets,
    href: "/tools/css-gradient",
    badge: "CSS"
  },
  {
    title: "CSS Box Shadow Generator",
    description: "Generate CSS box-shadow effects with visual preview. Perfect for modern UI design.",
    icon: PaintBucket,
    href: "/tools/css-box-shadow",
    badge: "CSS"
  },
  {
    title: "CSS Border Radius Generator",
    description: "Create custom border radius effects with live preview and copy-ready CSS code.",
    icon: Radius,
    href: "/tools/css-border-radius",
    badge: "CSS"
  },
  {
    title: "CSS Formatter & Minifier",
    description: "Format and minify CSS code. Clean up your stylesheets and optimize for production.",
    icon: Code,
    href: "/tools/css-formatter",
    badge: "CSS"
  },
  {
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and HSV formats instantly.",
    icon: Palette,
    href: "/tools/color-converter",
    badge: "Design"
  },
  {
    title: "CSS Animation Generator",
    description: "Create CSS animations with keyframes and timing functions. Preview and copy code.",
    icon: Wand2,
    href: "/tools/css-animation",
    badge: "CSS"
  },
  {
    title: "Text Case Converter",
    description: "Convert text between different cases: uppercase, lowercase, title case, and more.",
    icon: Type,
    href: "/tools/text-case-converter",
    badge: "Text"
  },
  {
    title: "Word Counter",
    description: "Count words, characters, paragraphs, and lines in your text. Perfect for content writers.",
    icon: FileText,
    href: "/tools/word-counter",
    badge: "Text"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups. Multiple formats available.",
    icon: FileText,
    href: "/tools/lorem-ipsum",
    badge: "Text"
  },
  {
    title: "Regex Tester",
    description: "Test regular expressions with real-time matching and detailed explanations.",
    icon: TestTube,
    href: "/tools/regex-tester",
    badge: "Developer"
  },
  {
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates. Multiple timezone support.",
    icon: Clock,
    href: "/tools/timestamp-converter",
    badge: "Developer"
  },
  {
    title: "HTML/CSS Code Generator",
    description: "Generate HTML and CSS code for buttons, cards, forms, and layouts with live preview.",
    icon: Code,
    href: "/tools/html-css",
    badge: "Developer"
  },
  {
    title: "Image Compressor",
    description: "Compress JPEG and PNG images to reduce file size while maintaining quality.",
    icon: Image,
    href: "/tools/image-compressor",
    badge: "Media"
  },
  {
    title: "URL Shortener",
    description: "Create short, memorable links from long URLs. Track clicks and manage your links.",
    icon: Scissors,
    href: "/tools/url-shortener",
    badge: "Utility"
  },
  {
    title: "Favicon Generator",
    description: "Create favicons from any image. Generate multiple sizes and formats for all devices.",
    icon: FileImage,
    href: "/tools/favicon",
    badge: "Design"
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
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Complete Collection of Free Online Tools</h2>
          <p className="text-muted-foreground mb-8">
            ToolVibe is your ultimate destination for free online tools. Our comprehensive collection includes developer utilities, 
            design tools, text processors, CSS generators, and productivity enhancers. All tools work instantly in your browser 
            without requiring registration, downloads, or payments. Perfect for developers, designers, marketers, content creators, 
            and anyone looking to boost their productivity.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">🛠️ Developer Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• JSON Formatter & Validator</li>
                <li>• Base64 Encoder/Decoder</li>
                <li>• Hash Generator (MD5, SHA)</li>
                <li>• UUID Generator</li>
                <li>• Regex Tester</li>
                <li>• Timestamp Converter</li>
                <li>• HTML/CSS Generator</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">🎨 CSS & Design Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• CSS Gradient Generator</li>
                <li>• CSS Box Shadow Generator</li>
                <li>• CSS Border Radius Tool</li>
                <li>• CSS Animation Generator</li>
                <li>• Color Picker & Converter</li>
                <li>• CSS Formatter & Minifier</li>
                <li>• Favicon Generator</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">📝 Text & Utility Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Word Counter</li>
                <li>• Text Case Converter</li>
                <li>• Lorem Ipsum Generator</li>
                <li>• QR Code Generator</li>
                <li>• URL Shortener</li>
                <li>• Image Compressor</li>
                <li>• Password Generator</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">⭐ Why Choose ToolVibe?</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">🚀 Instant Access</h4>
                <p className="text-muted-foreground text-sm">No registration, no downloads, no waiting. All tools work immediately in your browser.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔒 Privacy First</h4>
                <p className="text-muted-foreground text-sm">All processing happens locally in your browser. Your data never leaves your device.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 Completely Free</h4>
                <p className="text-muted-foreground text-sm">All tools are free forever. No hidden costs, no limitations, no premium plans.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Mobile Optimized</h4>
                <p className="text-muted-foreground text-sm">All tools work perfectly on desktop, tablet, and mobile devices.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🌟 Popular Categories</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Web Development</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">CSS Tools</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Color Tools</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Text Processing</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Security Tools</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Image Tools</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">SEO Tools</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Productivity</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;