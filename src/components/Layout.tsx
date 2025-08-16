import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Home, FolderOpen, Box, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import toolVibeLogo from "@/assets/toolvibe-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Categories", href: "/tools" },
  { name: "Products", href: "/tools" },
  { name: "Blog", href: "/tools" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header - ToolHexa Style */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img src={toolVibeLogo} alt="ToolVibe" className="w-8 h-8" />
                <span className="text-xl font-bold text-foreground">ToolVibe</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted ${
                    location.pathname === item.href ? 'text-primary bg-primary/5' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="ml-4 btn-primary">Get Started</Button>
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-4 btn-primary">Get Started</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - ToolHexa Style */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={toolVibeLogo} alt="ToolVibe" className="w-8 h-8" />
                <span className="text-xl font-bold text-foreground">ToolVibe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional developer tools designed for productivity. Fast, secure, and completely free.
              </p>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Popular Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/tools/password-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Password Generator</Link></li>
                <li><Link to="/tools/qr-code" className="text-sm text-muted-foreground hover:text-primary transition-colors">QR Code Generator</Link></li>
                <li><Link to="/tools/json-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors">JSON Formatter</Link></li>
                <li><Link to="/tools/color-picker" className="text-sm text-muted-foreground hover:text-primary transition-colors">Color Picker</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Text Tools</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">CSS Tools</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Image Tools</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Color Tools</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 ToolVibe. All rights reserved. Made with ❤️ for developers.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Twitter</span>
                  🐦
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">GitHub</span>
                  💻
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};