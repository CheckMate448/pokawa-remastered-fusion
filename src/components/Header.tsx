import { useState } from 'react';
import { Menu, X, ShoppingBag, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-ocean rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-playfair font-bold text-foreground">PokeFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-foreground hover:text-primary transition-smooth font-medium">Menu</a>
            <a href="#locations" className="text-foreground hover:text-primary transition-smooth font-medium">Locations</a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth font-medium">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth font-medium">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <MapPin className="w-4 h-4 mr-2" />
              Find Store
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <User className="w-4 h-4 mr-2" />
              Account
            </Button>
            <Button className="btn-primary">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#menu" className="text-foreground hover:text-primary transition-smooth font-medium">Menu</a>
              <a href="#locations" className="text-foreground hover:text-primary transition-smooth font-medium">Locations</a>
              <a href="#about" className="text-foreground hover:text-primary transition-smooth font-medium">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth font-medium">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm" className="justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Store
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
                <Button className="btn-primary">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;