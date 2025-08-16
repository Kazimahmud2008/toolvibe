import { Link } from "react-router-dom";
import { 
  QrCode, 
  FileText, 
  Palette, 
  Code, 
  Image, 
  Link as LinkIcon,
  Users,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Star
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import toolVibeLogo from "@/assets/toolvibe-logo.png";

const tools = [
  {
    title: "Password Generator",
    description: "Generate secure passwords with customizable options.",
    icon: Shield,
    href: "/tools/password-generator",
    badge: "Popular",
    rating: "4.9",
    uses: "61.2K"
  },
  {
    title: "QR Code Generator", 
    description: "Generate QR codes for URLs, text, and contact information.",
    icon: QrCode,
    href: "/tools/qr-code",
    badge: "Popular", 
    rating: "4.9",
    uses: "52.1K"
  },
  {
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting and error detection.",
    icon: FileText,
    href: "/tools/json-formatter",
    badge: "Popular",
    rating: "4.9", 
    uses: "50.2K"
  },
  {
    title: "Color Picker",
    description: "Pick colors and get values in different formats (HEX, RGB, HSL).",
    icon: Palette,
    href: "/tools/color-picker", 
    badge: "Popular",
    rating: "4.9",
    uses: "48.7K"
  },
  {
    title: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients with live preview.",
    icon: Code,
    href: "/tools/css-gradient",
    badge: "Popular",
    rating: "4.9", 
    uses: "45.3K"
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text to/from Base64 format safely and quickly.",
    icon: FileText,
    href: "/tools/base64",
    badge: "Popular",
    rating: "4.8",
    uses: "45.1K" 
  }
];

const categories = [
  {
    title: "Text Tools",
    description: "Process, format, and manipulate text data",
    toolCount: 11,
    icon: FileText,
    href: "/tools"
  },
  {
    title: "Image Tools", 
    description: "Edit, resize, and optimize images",
    toolCount: 9,
    icon: Image,
    href: "/tools"
  },
  {
    title: "CSS Tools",
    description: "Generate and format CSS code", 
    toolCount: 10,
    icon: Code,
    href: "/tools"
  },
  {
    title: "Coding Tools",
    description: "Format and validate code",
    toolCount: 8,
    icon: Code,
    href: "/tools"
  },
  {
    title: "Color Tools",
    description: "Work with colors and palettes",
    toolCount: 4,
    icon: Palette,
    href: "/tools"
  },
  {
    title: "Social Media Tools", 
    description: "Tools for social media content",
    toolCount: 4,
    icon: LinkIcon,
    href: "/tools"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8">
            <Zap className="w-4 h-4 mr-2" />
            55+ Professional Developer Tools
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Modern Tools for{" "}
            <span className="gradient-text">Smart Developers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
            Enhance your development workflow with our collection of fast, secure, and 
            intuitive browser-based utilities.
          </p>
          
          <p className="text-lg md:text-xl text-primary mb-12 font-medium">
            No installations. No signups. Just pure productivity.
          </p>

          {/* Stats */}
          <div className="feature-grid max-w-4xl mx-auto mb-12">
            <div className="stats-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">55+</div>
              <div className="text-sm text-muted-foreground">Free Tools</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Monthly Users</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="btn-primary text-lg px-8 py-4">
              <Link to="/tools">
                <Zap className="w-5 h-5 mr-2" />
                Browse All Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Categories</h2>
            <p className="text-xl text-muted-foreground">
              Professional tools organized by functionality
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.href}>
                <div className="category-card group">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                      <span className="text-sm text-primary font-medium">{category.toolCount} tools</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="px-6 py-3">
              <Link to="/tools">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
            <p className="text-xl text-muted-foreground">
              Most used by developers worldwide
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
            {tools.map((tool, index) => (
              <Link key={index} to={tool.href}>
                <div className="tool-card group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      {tool.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tool.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{tool.uses} uses</span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Click to open <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className="btn-primary px-6 py-3">
              <Link to="/tools">View All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose ToolVibe?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional tools designed for productivity
            </p>
          </div>

          <div className="feature-grid max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast</h3>
              <p className="text-muted-foreground text-sm">Browser-based tools with instant results</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure</h3>
              <p className="text-muted-foreground text-sm">Your data never leaves your device</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Reliable</h3>
              <p className="text-muted-foreground text-sm">Trusted by thousands of developers</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free</h3>
              <p className="text-muted-foreground text-sm">No subscriptions or limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Building Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Access professional developer tools instantly - no setup required
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg">
            <Link to="/tools">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
