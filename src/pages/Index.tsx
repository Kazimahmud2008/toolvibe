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
  },
  {
    title: "URL Shortener",
    description: "Create short, memorable links from long URLs. Track clicks and manage your links.",
    icon: LinkIcon,
    href: "/tools/url-shortener",
    badge: "New"
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
      {/* Hero Section - MrFreeTools Style */}
      <section className="mrfree-hero text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Tools for Everyone
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95">
              No signup required. No limitations. Just powerful utilities to boost your productivity.
            </p>
            
            {/* Tool Count Badge */}
            <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="bg-white text-red-500 px-2 py-1 rounded mr-2 text-xs font-bold">10+ Free Tools</span>
              Always Available
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input 
                  placeholder="Search ToolVibe" 
                  className="w-full py-4 px-6 text-lg rounded-full bg-white text-gray-900 border-0"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 bg-primary hover:bg-primary/90">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <p className="text-white/80 mb-12">
              Or <Link to="/tools" className="underline hover:no-underline">Browse All Free Tools</Link>
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">{highlight.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link to={category.href} key={index}>
                <div className="category-card text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose ToolVibe?</h2>
            <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              ToolVibe is your go-to destination for free online tools. No registration required, 
              no hidden fees, no limitations. Just powerful, browser-based utilities to help you 
              get work done faster and more efficiently.
            </p>
          </div>

          {/* Popular Tools Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="btn-primary text-lg px-8">
              <Link to="/tools">
                View All Tools
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
