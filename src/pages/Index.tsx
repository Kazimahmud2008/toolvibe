import { Link } from "react-router-dom";
import { 
  QrCode, 
  FileText, 
  Palette, 
  Code, 
  Image, 
  Link as LinkIcon,
  Zap,
  ArrowRight,
  Star,
  Users,
  Shield
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    badge: "Coming Soon"
  },
  {
    title: "Image Compressor",
    description: "Compress JPEG and PNG images to reduce file size while maintaining quality.",
    icon: Image,
    href: "/tools/image-compressor",
    badge: "Coming Soon"
  },
  {
    title: "URL Shortener",
    description: "Create short, memorable links from long URLs. Track clicks and manage your links.",
    icon: LinkIcon,
    href: "/tools/url-shortener",
    badge: "Coming Soon"
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools work instantly in your browser with no server delays"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your browser. Everything processed locally"
  },
  {
    icon: Users,
    title: "No Signup Required",
    description: "Access all tools immediately without creating an account"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Tools for Everyone
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              No signup required. No limitations. Just powerful utilities to boost your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/tools">
                  Explore All Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8">
                <Link to="/tools/qr-code">
                  Try QR Generator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ToolVibe?</h2>
            <p className="text-xl text-muted-foreground">Built for speed, privacy, and ease of use</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
            <p className="text-xl text-muted-foreground">
              Start using these powerful tools instantly
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-primary text-lg px-8">
              <Link to="/tools">
                View All Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Free Tools</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">No Signup Required</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Star className="inline w-8 h-8 text-yellow-500 mr-1" />
                4.9
              </div>
              <p className="text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-white text-center p-8 max-w-4xl mx-auto">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of users who trust ToolVibe for their daily tasks
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/tools">
                  Start Using Tools Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
