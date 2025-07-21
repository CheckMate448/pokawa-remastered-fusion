import { CheckCircle, Clock, Leaf, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ingredientsImage from '@/assets/ingredients-spread.jpg';

const features = [
  {
    icon: Heart,
    title: "Fresh Daily",
    description: "We source the finest ingredients daily from trusted suppliers"
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly packaging and sustainably sourced seafood"
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Ready in under 10 minutes without compromising quality"
  },
  {
    icon: CheckCircle,
    title: "Health Focused",
    description: "Nutritious, balanced meals that fuel your active lifestyle"
  }
];

const Experience = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-floating">
              <img 
                src={ingredientsImage} 
                alt="Fresh Ingredients" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-8 -right-8 bg-white rounded-3xl p-6 shadow-floating">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-secondary rounded-3xl p-6 shadow-floating text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-90">Bowls Served</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full mb-4">
                <span className="font-semibold">The Vegeta Experience</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-6">
                Why We're
                <span className="text-primary block">Different</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At Vegeta, we believe that great food starts with great ingredients. 
                Every bowl is crafted with passion, using only the freshest, highest-quality 
                ingredients sourced from trusted partners who share our commitment to excellence.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="p-6 bg-muted/50 border-0 rounded-2xl hover:bg-muted transition-smooth group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-ocean rounded-xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quality Promise */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-playfair font-semibold text-xl text-foreground mb-3">
                Our Quality Promise
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                If you're not completely satisfied with your bowl, we'll make it right. 
                That's our commitment to delivering the perfect poké experience, every single time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;