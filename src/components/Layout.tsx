import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "QR Generator", href: "/tools/qr-code" },
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Color Picker", href: "/tools/color-picker" },
  { name: "All Tools", href: "/tools" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-hero rounded-lg p-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ToolVibe</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
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
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
              <nav className="flex flex-col space-y-1 px-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-hero rounded-lg p-2">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">ToolVibe</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Free tools for everyone. No signup required, no limitations. 
                Just powerful utilities to boost your productivity.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">All Tools</Link></li>
                <li><Link to="/tools/qr-code" className="text-muted-foreground hover:text-foreground transition-colors">QR Generator</Link></li>
                <li><Link to="/tools/json-formatter" className="text-muted-foreground hover:text-foreground transition-colors">JSON Formatter</Link></li>
                <li><Link to="/tools/color-picker" className="text-muted-foreground hover:text-foreground transition-colors">Color Picker</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get notified about new tools and features
              </p>
              <form className="flex space-x-2" onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                if (email) {
                  // Simple client-side storage
                  const emails = JSON.parse(localStorage.getItem('newsletter-emails') || '[]');
                  emails.push(email);
                  localStorage.setItem('newsletter-emails', JSON.stringify(emails));
                  alert('Thanks for subscribing!');
                  (e.target as HTMLFormElement).reset();
                }
              }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
                  required
                />
                <Button type="submit" size="sm" className="btn-primary">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ToolVibe. Free tools for everyone, no signup required!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};