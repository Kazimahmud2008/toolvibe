import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Tools", href: "/tools" },
  { name: "Categories", href: "/tools" },
  { name: "Index", href: "/tools" },
  { name: "Skills", href: "/tools" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header - MrFreeTools Style */}
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Heart className="h-4 w-4 text-white mr-2" />
              {navigation.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-white/90 hover:text-white px-3 py-2 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3e%3ctext x='10' y='30' fill='white' font-family='Arial, sans-serif' font-size='24' font-weight='bold'%3eMr.FreeTools%3c/text%3e%3c/svg%3e" 
                alt="Mr.FreeTools" 
                className="h-8"
              />
            </Link>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/tools" className="text-sm text-white/90 hover:text-white px-3 py-2 transition-colors">
                Deals
              </Link>
              <Link to="/tools" className="text-sm text-white/90 hover:text-white px-3 py-2 transition-colors">
                Blog
              </Link>
              <Link to="/tools" className="text-sm text-white/90 hover:text-white px-3 py-2 transition-colors">
                AI
              </Link>
              <Link to="/tools" className="text-sm text-white/90 hover:text-white px-3 py-2 transition-colors flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Favorites
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20">
              <nav className="flex flex-col space-y-1 px-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-sm text-white/90 hover:text-white transition-colors"
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

      {/* Footer - Simple like MrFreeTools */}
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Mr.FreeTools. Find Free Software, Apps, Tools, and Other Resources For Professional Growth.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};