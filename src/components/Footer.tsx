import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-ocean rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-playfair font-bold">PokeFlow</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Experience the authentic taste of Hawaii with our premium poké bowls, 
              crafted with love and the freshest ingredients.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-secondary hover:bg-secondary/10 p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-secondary hover:bg-secondary/10 p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-secondary hover:bg-secondary/10 p-2">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#menu" className="text-gray-300 hover:text-secondary transition-smooth">Menu</a></li>
              <li><a href="#locations" className="text-gray-300 hover:text-secondary transition-smooth">Locations</a></li>
              <li><a href="#catering" className="text-gray-300 hover:text-secondary transition-smooth">Catering</a></li>
              <li><a href="#nutrition" className="text-gray-300 hover:text-secondary transition-smooth">Nutrition</a></li>
              <li><a href="#rewards" className="text-gray-300 hover:text-secondary transition-smooth">Rewards Program</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Ocean Drive<br />Honolulu, HI 96815</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">(808) 555-POKE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">hello@pokeflow.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-playfair font-semibold text-xl mb-6">Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Mon - Thu</div>
                  <div className="text-sm">11:00 AM - 9:00 PM</div>
                </div>
              </div>
              <div className="text-gray-300 ml-8">
                <div className="font-medium">Fri - Sat</div>
                <div className="text-sm">11:00 AM - 10:00 PM</div>
              </div>
              <div className="text-gray-300 ml-8">
                <div className="font-medium">Sunday</div>
                <div className="text-sm">12:00 PM - 8:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 PokeFlow. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-secondary transition-smooth">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 hover:text-secondary transition-smooth">Terms of Service</a>
            <a href="#accessibility" className="text-gray-400 hover:text-secondary transition-smooth">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;