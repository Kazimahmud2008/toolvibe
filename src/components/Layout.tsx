import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Product Finder", href: "/tools" },
  { name: "Categories", href: "/tools" },
  { name: "Extensions", href: "/tools" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header - 10015.io Style */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">10</span>
                </div>
                <span className="text-xl font-bold text-foreground">ToolVibe</span>
              </Link>
            </div>

            {/* Center Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Tools"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/tools"
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted"
              >
                All Tools
              </Link>
              <Link
                to="/tools/qr-code"
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted"
              >
                QR Code
              </Link>
              <Link
                to="/tools/json-formatter"
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted"
              >
                JSON
              </Link>
              <Link
                to="/tools/color-picker"
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted"
              >
                Colors
              </Link>
              <Button className="ml-4">Get Started</Button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border">
              <nav className="flex flex-col space-y-1 px-4 py-4">
                <Link
                  to="/tools"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Tools
                </Link>
                <Link
                  to="/tools/qr-code"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  QR Code
                </Link>
                <Link
                  to="/tools/json-formatter"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  JSON
                </Link>
                <Link
                  to="/tools/color-picker"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Colors
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Clean like 10015.io */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TV</span>
                </div>
                <span className="text-xl font-bold text-foreground">ToolVibe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All online tools in "one box". Free forever. The ultimate collection of web tools for developers, designers, and professionals.
              </p>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Popular Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/tools/qr-code" className="text-sm text-muted-foreground hover:text-primary transition-colors">QR Code Generator</Link></li>
                <li><Link to="/tools/json-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors">JSON Formatter</Link></li>
                <li><Link to="/tools/color-picker" className="text-sm text-muted-foreground hover:text-primary transition-colors">Color Picker</Link></li>
                <li><Link to="/tools/image-compressor" className="text-sm text-muted-foreground hover:text-primary transition-colors">Image Compressor</Link></li>
              </ul>
            </div>

            {/* Developer Tools */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Developer Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/tools/base64" className="text-sm text-muted-foreground hover:text-primary transition-colors">Base64 Encoder</Link></li>
                <li><Link to="/tools/hash-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hash Generator</Link></li>
                <li><Link to="/tools/uuid-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">UUID Generator</Link></li>
                <li><Link to="/tools/regex-tester" className="text-sm text-muted-foreground hover:text-primary transition-colors">Regex Tester</Link></li>
              </ul>
            </div>

            {/* CSS Tools */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">CSS Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/tools/css-gradient" className="text-sm text-muted-foreground hover:text-primary transition-colors">CSS Gradient</Link></li>
                <li><Link to="/tools/css-box-shadow" className="text-sm text-muted-foreground hover:text-primary transition-colors">Box Shadow</Link></li>
                <li><Link to="/tools/css-border-radius" className="text-sm text-muted-foreground hover:text-primary transition-colors">Border Radius</Link></li>
                <li><Link to="/tools/css-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors">CSS Formatter</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; 2024 ToolVibe. Made with ❤️ for the community. All tools are free and open source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};