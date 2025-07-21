import { useState } from 'react';
import { Heart, Plus, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import menuImage from '@/assets/menu-bowls.jpg';

const menuItems = [
  {
    id: 1,
    name: "Signature Salmon Bowl",
    description: "Fresh Atlantic salmon, avocado, edamame, cucumber, seaweed salad with our signature sauce",
    price: 16.90,
    category: "Premium",
    image: menuImage,
    rating: 4.9,
    popular: true
  },
  {
    id: 2,
    name: "Spicy Tuna Delight",
    description: "Sashimi-grade tuna, spicy mayo, jalapeños, mango, red onion, crispy onions",
    price: 18.50,
    category: "Spicy",
    image: menuImage,
    rating: 4.8,
    popular: false
  },
  {
    id: 3,
    name: "Teriyaki Chicken Bowl",
    description: "Grilled chicken teriyaki, steamed broccoli, carrots, brown rice, sesame seeds",
    price: 14.90,
    category: "Classic",
    image: menuImage,
    rating: 4.7,
    popular: true
  },
  {
    id: 4,
    name: "Vegan Power Bowl",
    description: "Marinated tofu, quinoa, mixed greens, cherry tomatoes, hemp seeds, tahini dressing",
    price: 15.50,
    category: "Vegan",
    image: menuImage,
    rating: 4.8,
    popular: false
  },
  {
    id: 5,
    name: "Ocean Mix Supreme",
    description: "Salmon & tuna combo, tobiko, avocado, cucumber, pickled ginger, wasabi mayo",
    price: 22.90,
    category: "Premium",
    image: menuImage,
    rating: 5.0,
    popular: true
  },
  {
    id: 6,
    name: "Tropical Mango Bowl",
    description: "Grilled shrimp, fresh mango, coconut flakes, lime zest, cilantro, sweet chili sauce",
    price: 17.50,
    category: "Tropical",
    image: menuImage,
    rating: 4.9,
    popular: false
  }
];

const categories = ["All", "Premium", "Spicy", "Classic", "Vegan", "Tropical"];

const FeaturedMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="menu" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">Our Menu</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-6">
            Crafted with
            <span className="text-primary block">Love & Care</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each bowl is a masterpiece, combining the freshest ingredients with authentic Hawaiian flavors
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`px-6 py-3 rounded-full transition-smooth ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-primary/10 hover:border-primary"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="card-premium group cursor-pointer overflow-hidden transform transition-smooth hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {item.popular && (
                    <div className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`w-10 h-10 rounded-full ${favorites.includes(item.id) ? 'bg-secondary text-white' : 'bg-white/90 text-foreground'} hover:bg-secondary hover:text-white transition-smooth`}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="btn-secondary text-lg px-10 py-4">
            View Full Menu
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;