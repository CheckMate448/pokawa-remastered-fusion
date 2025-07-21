import { ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-poke-bowl.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Vegeta Restaurant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      
      <div className="absolute top-20 right-10 w-16 h-16 gradient-sunset rounded-full opacity-20 float-animation"></div>
      <div className="absolute bottom-32 left-10 w-24 h-24 gradient-fresh rounded-full opacity-15 float-animation" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-6 slide-in-up">
            <Star className="w-4 h-4 text-secondary mr-2" />
            <span className="text-white font-medium">Fresh Quality Ingredients Daily</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 slide-in-left">
            Fresh
            <span className="block text-secondary">Vegeta</span>
            <span className="block text-accent">Perfection</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl slide-in-left" style={{ animationDelay: '0.2s' }}>
            Experience the finest Salad Bar with our premium dishes, 
            crafted with fresh local ingredients and authentic flavors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 slide-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="https://wa.me/21626338571" target="_blank" rel="noopener noreferrer">
              <Button className="btn-secondary text-lg px-10 py-6 shadow-floating">
                Reserve Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-10 py-6 transition-smooth"
            >
              <Play className="w-5 h-5 mr-2" />
              Our Story
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 slide-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-white/70">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30+</div>
              <div className="text-white/70">Fresh Dishes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8★</div>
              <div className="text-white/70">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;