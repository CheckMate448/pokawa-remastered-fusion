import { useState } from 'react';
import { Menu, X, ShoppingBag, User, MapPin, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalorieCalculator from '@/components/CalorieCalculator';
import logoImage from '@/assets/VEGETA PUCTURE.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalorieCalculatorOpen, setIsCalorieCalculatorOpen] = useState(false);

  const handleFindStore = () => {
    window.open('https://www.google.com/maps/place/Vegeta/@36.8715275,10.3416246,17z/data=!4m6!3m5!1s0x12e2b50079a27d0b:0xd816c6af41ff627!8m2!3d36.8716671!4d10.3415633!16s%2Fg%2F11xdm4zlvh?entry=ttu', '_blank');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logoImage} alt="Vegeta Logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-2xl font-playfair font-bold text-foreground">Vegeta</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-foreground hover:text-primary transition-smooth font-medium">Menu</a>
            <a href="#location" className="text-foreground hover:text-primary transition-smooth font-medium">Location</a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth font-medium">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth font-medium">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground hover:text-primary"
              onClick={() => setIsCalorieCalculatorOpen(true)}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calories
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary" onClick={handleFindStore}>
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
              <a href="#location" className="text-foreground hover:text-primary transition-smooth font-medium">Location</a>
              <a href="#about" className="text-foreground hover:text-primary transition-smooth font-medium">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth font-medium">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => setIsCalorieCalculatorOpen(true)}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calories
                </Button>
                <Button variant="ghost" size="sm" className="justify-start" onClick={handleFindStore}>
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
      
      {/* Calorie Calculator Modal */}
      <CalorieCalculator 
        isOpen={isCalorieCalculatorOpen} 
        onClose={() => setIsCalorieCalculatorOpen(false)} 
      />
    </header>
  );
};

export default Header;