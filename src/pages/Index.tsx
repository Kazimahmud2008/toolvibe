import React from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Palette, 
  Hash, 
  Code, 
  FileText,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Gauge,
  QrCode,
  Image,
  Link as LinkIcon,
  Key,
  Scissors,
  RotateCcw,
  Eye,
  Briefcase
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    title: "Password Generator",
    description: "Generate secure passwords with customizable options for enhanced security.",
    icon: Shield,
    href: "/tools/password-generator",
    badge: "Popular",
    rating: "4.9",
    uses: "61.2K",
    category: "Miscellaneous Tools"
  },
  {
    title: "QR Code Generator", 
    description: "Generate QR codes for URLs, text, and contact information instantly.",
    icon: QrCode,
    href: "/tools/qr-code",
    badge: "Popular", 
    rating: "4.9",
    uses: "52.1K",
    category: "Social Media Tools"
  },
  {
    title: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting and error detection.",
    icon: FileText,
    href: "/tools/json-formatter",
    badge: "Popular",
    rating: "4.9", 
    uses: "50.2K",
    category: "Text Tools"
  },
  {
    title: "Color Picker",
    description: "Pick colors and get values in different formats (HEX, RGB, HSL).",
    icon: Palette,
    href: "/tools/color-picker", 
    badge: "Popular",
    rating: "4.9",
    uses: "48.7K",
    category: "Color Tools"
  },
  {
    title: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients with live preview and code generation.",
    icon: Code,
    href: "/tools/css-gradient",
    badge: "Popular",
    rating: "4.9", 
    uses: "45.3K",
    category: "CSS Tools"
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text to/from Base64 format safely and quickly.",
    icon: FileText,
    href: "/tools/base64",
    badge: "Popular",
    rating: "4.8",
    uses: "45.1K",
    category: "Text Tools"
  },
  {
    title: "URL Shortener",
    description: "Create short URLs for better link management and tracking.",
    icon: LinkIcon,
    href: "/tools/url-shortener",
    badge: "New",
    rating: "4.7",
    uses: "32.5K",
    category: "Social Media Tools"
  },
  {
    title: "Image Compressor",
    description: "Compress images without losing quality for faster web performance.",
    icon: Image,
    href: "/tools/image-compressor",
    badge: "Trending",
    rating: "4.8",
    uses: "28.9K",
    category: "Image Tools"
  },
  {
    title: "CSS Box Shadow Generator",
    description: "Generate CSS box shadows with live preview and customization.",
    icon: Code,
    href: "/tools/css-box-shadow",
    badge: "New",
    rating: "4.6",
    uses: "25.4K",
    category: "CSS Tools"
  }
];

const categories = [
  {
    title: "Text Tools",
    description: "Process, format, and manipulate text data efficiently",
    toolCount: 11,
    icon: FileText,
    href: "/tools",
    tools: ["JSON Formatter", "Base64 Encoder", "Lorem Ipsum Generator", "Word Counter", "Text Case Converter"]
  },
  {
    title: "Image Tools", 
    description: "Edit, resize, and optimize images for web and mobile",
    toolCount: 9,
    icon: Image,
    href: "/tools",
    tools: ["Image Compressor", "Favicon Generator", "Image Converter", "Photo Editor"]
  },
  {
    title: "CSS Tools",
    description: "Generate beautiful CSS code and styling utilities", 
    toolCount: 10,
    icon: Code,
    href: "/tools",
    tools: ["CSS Gradient Generator", "Box Shadow Generator", "Border Radius Generator", "CSS Grid Generator", "CSS Animation Generator"]
  },
  {
    title: "Coding Tools",
    description: "Format, validate, and optimize your code",
    toolCount: 8,
    icon: Code,
    href: "/tools",
    tools: ["CSS Formatter", "HTML Generator", "Regex Tester", "Hash Generator"]
  },
  {
    title: "Color Tools",
    description: "Work with colors, palettes, and design systems",
    toolCount: 4,
    icon: Palette,
    href: "/tools",
    tools: ["Color Picker", "Color Converter", "Gradient Generator", "Palette Creator"]
  },
  {
    title: "Social Media Tools", 
    description: "Create content for social media platforms",
    toolCount: 4,
    icon: LinkIcon,
    href: "/tools",
    tools: ["QR Code Generator", "URL Shortener", "Link in Bio", "Meta Tag Generator"]
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 futuristic-grid opacity-30"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-8 py-4 rounded-full glass-effect text-primary text-sm font-bold mb-12 pulse-glow gradient-border">
              <div className="flex items-center px-6 py-2">
                <Sparkles className="h-5 w-5 mr-3" />
                55+ Professional Developer Tools
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight hero-text-glow">
              Modern Tools for{" "}
              <span className="gradient-text block md:inline">Smart Developers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-4xl mx-auto leading-relaxed font-medium">
              Enhance your development workflow with our collection of fast, secure, and 
              intuitive browser-based utilities designed for modern developers and teams.
            </p>
            
            <p className="text-lg text-primary font-bold mb-16 tracking-wide">
              No installations. No signups. Just pure productivity.
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
              <div className="stats-card floating-animation">
                <div className="text-5xl md:text-6xl font-black gradient-text mb-4">55+</div>
                <div className="text-base font-bold text-slate-700">Free Tools</div>
              </div>
              <div className="stats-card floating-animation" style={{ animationDelay: '0.5s' }}>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-4">1M+</div>
                <div className="text-base font-bold text-slate-700">Monthly Users</div>
              </div>
              <div className="stats-card floating-animation" style={{ animationDelay: '1s' }}>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-4">99.9%</div>
                <div className="text-base font-bold text-slate-700">Uptime</div>
              </div>
              <div className="stats-card floating-animation" style={{ animationDelay: '1.5s' }}>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-4">24/7</div>
                <div className="text-base font-bold text-slate-700">Available</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button asChild size="lg" className="btn-primary text-xl px-12 py-8 rounded-2xl font-bold">
                <Link to="/tools">
                  <Zap className="h-6 w-6 mr-3" />
                  Browse All Tools
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-12 py-8 rounded-2xl font-bold glass-effect border-2 border-gray-200 hover:border-primary">
                <Link to="/categories">View Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">Categories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Professional developer tools organized by functionality for maximum productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <Link key={index} to={category.href} className="group">
                <Card className="category-card group-hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{category.title}</CardTitle>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                      {category.toolCount} tools
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-slate-600 font-medium leading-relaxed mb-4">{category.description}</p>
                    <div className="text-xs text-slate-500 space-y-1">
                      {category.tools.slice(0, 3).map((tool, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                          <span>{tool}</span>
                        </div>
                      ))}
                      {category.tools.length > 3 && (
                        <div className="text-primary font-medium">+{category.tools.length - 3} more</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="glass-effect border-0 px-8 py-4 text-lg font-semibold">
              <Link to="/categories">
                View All Categories
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50/50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">Popular Tools</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Most used developer tools by thousands of professionals worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tools.slice(0, 9).map((tool, index) => (
              <Link key={index} to={tool.href} className="group">
                <Card className="tool-card h-full group-hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <tool.icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`font-semibold px-3 py-1 ${
                          tool.badge === 'Popular' ? 'bg-green-100 text-green-700' :
                          tool.badge === 'New' ? 'bg-blue-100 text-blue-700' :
                          tool.badge === 'Trending' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tool.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{tool.title}</CardTitle>
                    <div className="text-sm text-primary font-medium mb-2">
                      {tool.category}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 mb-6 font-medium leading-relaxed">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                        <span className="font-bold text-lg">{tool.rating}</span>
                      </div>
                      <div className="text-slate-500 font-semibold">
                        {tool.uses} uses
                      </div>
                    </div>
                    <div className="mt-4 text-primary font-medium text-sm flex items-center">
                      Click to open
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl">
              <Link to="/tools">
                View All Tools
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">Why Choose ToolVibe?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Professional developer tools designed for maximum productivity and efficiency
            </p>
          </div>
          
          <div className="feature-grid">
            <Card className="text-center p-10 border-0 glass-effect shadow-xl floating-animation">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Fast</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">Lightning-fast browser-based tools with instant results and zero loading time</p>
            </Card>
            
            <Card className="text-center p-10 border-0 glass-effect shadow-xl floating-animation" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Secure</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">Your data never leaves your device - complete privacy and security guaranteed</p>
            </Card>
            
            <Card className="text-center p-10 border-0 glass-effect shadow-xl floating-animation" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Reliable</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">Trusted by thousands of developers worldwide with 99.9% uptime</p>
            </Card>
            
            <Card className="text-center p-10 border-0 glass-effect shadow-xl floating-animation" style={{ animationDelay: '0.6s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Free</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">No subscriptions, no limits, no hidden fees - professional tools forever free</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-shadow">Start Building Today</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Access 55+ professional developer tools instantly - no setup, no installation, no signup required
          </p>
          <Button asChild size="lg" variant="secondary" className="px-10 py-6 text-lg font-bold rounded-xl bg-white text-primary hover:bg-white/90 shadow-2xl">
            <Link to="/tools">
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;