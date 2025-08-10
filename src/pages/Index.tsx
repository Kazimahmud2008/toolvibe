import { Link } from "react-router-dom";
import { 
  QrCode, 
  FileText, 
  Palette, 
  Code, 
  Image, 
  Link as LinkIcon,
  Search,
  Gift,
  Hand,
  User,
  Monitor,
  Compass,
  Layers,
  TrendingUp,
  FileType
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const tools = [
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
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data instantly. Perfect for developers and API testing.",
    icon: FileText,
    href: "/tools/json-formatter",
    badge: "Developer"
  },
  {
    title: "Color Picker",
    description: "Pick colors and generate palettes with HEX, RGB, HSL codes. Create beautiful color schemes.",
    icon: Palette,
    href: "/tools/color-picker",
    badge: "Design"
  },
  {
    title: "HTML/CSS Generator",
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
    badge: "Popular"
  }
];

const highlights = [
  {
    icon: Gift,
    title: "Only Free Tools",
    description: ""
  },
  {
    icon: Hand,
    title: "Free & Open Service",
    description: ""
  },
  {
    icon: User,
    title: "No Signup Required",
    description: ""
  },
  {
    icon: Monitor,
    title: "Ad Free Website",
    description: ""
  }
];

const categories = [
  {
    icon: Compass,
    title: "All Tools",
    description: "Explore our complete collection of free online tools.",
    href: "/tools"
  },
  {
    icon: Layers,
    title: "Popular Tools",
    description: "Most used tools by our community members.",
    href: "/tools"
  },
  {
    icon: TrendingUp,
    title: "New Tools",
    description: "Recently added tools and latest updates.",
    href: "/tools"
  },
  {
    icon: FileType,
    title: "Categories",
    description: "Browse tools organized by categories and use cases.",
    href: "/tools"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section - 10015.io Style */}
      <section className="clean-hero py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              All <span className="text-primary underline decoration-wavy decoration-primary/50">Online Tools</span> in "One Box"
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              No need to bookmark the tools you like separately.
            </p>
            <p className="text-lg mb-12 text-muted-foreground">
              ToolVibe is a <strong className="text-primary">"free all-in-one toolbox"</strong> solution created to ease your life by preventing bookmark mess.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <Link to="/tools">
                  Explore Tools →
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <QrCode className="w-5 h-5 mr-2" />
                Product Finder
              </Button>
            </div>

            {/* Featured Brands */}
            <div className="mb-16">
              <p className="text-sm text-muted-foreground mb-6">Featured in:</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-sm font-medium text-muted-foreground">Product Hunt</div>
                <div className="text-sm font-medium text-muted-foreground">Y Combinator</div>
                <div className="text-sm font-medium text-muted-foreground">Indie Hackers</div>
                <div className="text-sm font-medium text-muted-foreground">Reddit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground flex items-center justify-center gap-3">
              <QrCode className="w-8 h-8 text-primary" />
              Featured Tools
              <QrCode className="w-8 h-8 text-primary" />
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {tools.slice(0, 6).map((tool, index) => (
              <Link to={tool.href} key={index}>
                <div className="tool-card text-center group">
                  <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {tool.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Why Choose ToolVibe?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ToolVibe is your go-to destination for free online tools. No registration required, 
              no hidden fees, no limitations. Just powerful, browser-based utilities.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{highlight.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
              <Link to="/tools">
                View All Tools →
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
