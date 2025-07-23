import { useState } from 'react';
import { Heart, Plus, Star, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useIngredients } from '@/hooks/useIngredients';
import menuImage from '@/assets/menu-bowls.jpg';

// Fallback images for menu items without images
import saladeCesareImage from '@/assets/salades/cesar.jpg';
import saladeItalienneImage from '@/assets/salades/italienne.jpg';
import saladeNicoiseImage from '@/assets/salades/nicoise.jpg';
import saladeExotiqueImage from '@/assets/salades/exotique.jpg';
import saladeMexicaineImage from '@/assets/salades/mexicaine.jpg';
import saladeProteineeImage from '@/assets/salades/proteinee.jpg';

const fallbackImages: Record<string, string> = {
  'Salade César': saladeCesareImage,
  'Salade Italienne': saladeItalienneImage,
  'Salade Niçoise': saladeNicoiseImage,
  'Salade Exotique': saladeExotiqueImage,
  'Salade Mexicaine': saladeMexicaineImage,
  'Salade Protéinée': saladeProteineeImage,
};

const FeaturedMenu = () => {
  const { menuItems, loading: menuLoading } = useMenuItems();
  const { ingredients, loading: ingredientsLoading } = useIngredients();
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter available menu items (only show items that are available)
  const availableMenuItems = menuItems.filter(item => item.is_available);
  
  // Get unique categories from menu items
  const categories = ["All", ...Array.from(new Set(availableMenuItems.map(item => item.category)))];

  const filteredItems = activeCategory === "All" 
    ? availableMenuItems 
    : availableMenuItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Function to get ingredient names for display
  const getIngredientNames = (ingredientIds: string[]) => {
    return ingredientIds
      .map(id => ingredients.find(ing => ing.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3) // Show only first 3 ingredients
      .join(', ');
  };

  // Get image URL with fallback
  const getImageUrl = (item: any) => {
    if (item.image_url) return item.image_url;
    return fallbackImages[item.title] || menuImage;
  };

  if (menuLoading || ingredientsLoading) {
    return (
      <section id="menu" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading menu...</p>
          </div>
        </div>
      </section>
    );
  }

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
            Each dish is a masterpiece, combining the freshest ingredients with authentic local flavors
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
                  src={getImageUrl(item)} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {item.is_popular && (
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
                {item.rating && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {item.title}
                  </h3>
                  <span className="text-2xl font-bold text-primary">{item.price.toFixed(2)} TND</span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description || `Delicious salad with ${getIngredientNames(item.ingredients)}`}
                </p>

                {/* Ingredients preview */}
                {item.ingredients.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Ingredients: </span>
                    {getIngredientNames(item.ingredients)}
                    {item.ingredients.length > 3 && '...'}
                  </div>
                )}

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

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No menu items available in this category.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="/build-salad">
            <Button className="btn-secondary text-lg px-10 py-4">
              Build Your Salad
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;