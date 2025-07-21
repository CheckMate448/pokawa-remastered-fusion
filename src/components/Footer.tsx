import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/VEGETA PUCTURE.jpg';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logoImage} alt="Vegeta Logo" className="w-10 h-10 rounded-xl object-cover" />
              <span className="text-2xl font-playfair font-bold">Vegeta</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Experience the authentic taste of Tunisia with our premium dishes, 
              crafted with love and the freshest local ingredients.
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
              <li><a href="#location" className="text-gray-300 hover:text-secondary transition-smooth">Location</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-secondary transition-smooth">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-secondary transition-smooth">Contact</a></li>
              <li><a href="#reservation" className="text-gray-300 hover:text-secondary transition-smooth">Reservation</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">La Marsa<br />Tunisia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">26 338 571</span>
              </li>
              <li className="flex items-center space-x-3 pl-8 gap-2">
                <a href="tel:26338571" className="inline-block">
                  <Button size="sm" variant="secondary">Appeler</Button>
                </a>
                <a href="https://wa.me/21626338571" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="sm" style={{ backgroundColor: '#25D366', color: 'white', border: 'none' }}>WhatsApp</Button>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">contact@vegeta.tn</span>
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
                  <div className="text-sm">11:00 AM - 11:00 PM</div>
                </div>
              </div>
              <div className="text-gray-300 ml-8">
                <div className="font-medium">Fri - Sat</div>
                <div className="text-sm">11:00 AM - 12:00 AM</div>
              </div>
              <div className="text-gray-300 ml-8">
                <div className="font-medium">Sunday</div>
                <div className="text-sm">11:00 AM - 11:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Vegeta. All rights reserved.
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