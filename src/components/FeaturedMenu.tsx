import { useState } from 'react';
import { Heart, Plus, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import menuImage from '@/assets/menu-bowls.jpg';
import saladeCesareImage from '@/assets/salades/cesar.jpg';
import saladeItalienneImage from '@/assets/salades/italienne.jpg';
import saladeNicoiseImage from '@/assets/salades/nicoise.jpg';
import saladeExotiqueImage from '@/assets/salades/exotique.jpg';
import saladeMexicaineImage from '@/assets/salades/mexicaine.jpg';
import saladeProteineeImage from '@/assets/salades/proteinee.jpg';
import RizBowlsImage from '@/assets/VEGETA PUCTURE.jpg'


const menuItems = [
  {
    id: 10,
    name: "Salade César",
    description: "Une salade classique revisitée : laitue romaine croquante, tomates cerises juteuses, croûtons dorés, graines de chia, roquette fraîche, coriandre et graines de courge. Accompagnée d’un œuf poché, de fromage Grana Padano, et d’une escalope tendre (panée ou sauce moutarde citron). Le tout nappé d’une savoureuse sauce César.",
    price: 20.00,
    category: "Salades",
    image: saladeCesareImage,
    rating: 4.8,
    popular: true
  },
  {
    id: 11,
    name: "Salade Italienne",
    description: "Une explosion de saveurs méditerranéennes avec du pain banette croustillant, des tomates fraîches, de la roquette, des courgettes grillées et une burrata onctueuse. Garnie de chips d’ail, menthe, coriandre, noix caramélisées et basilic. Arrosée de crème balsamique, sauce pesto et parsemée de Grana Padano.",
    price: 25.00,
    category: "Salades",
    image: saladeItalienneImage,
    rating: 4.9,
    popular: true
  },
  {
    id: 12,
    name: "Salade Niçoise",
    description: "Un classique du sud de la France : laitue fraîche, tomates cerises, œuf dur, poivrons, haricots verts, radis et pommes de terre sautées. Le tout relevé avec une sauce au thon et olives, des oignons fins et une vinaigrette classique.",
    price: 18.00,
    category: "Salades",
    image: saladeNicoiseImage,
    rating: 4.7,
    popular: false
  },
  {
    id: 13,
    name: "Salade Exotique",
    description: "Fraîcheur tropicale garantie ! Roquette, tomates cerises, avocat crémeux, carottes croquantes, crevettes, radis, ananas sucré, menthe et aneth. Complétée par du concombre, de la ricotta, des graines de chia, du maïs et une délicieuse sauce thaïe.",
    price: 32.00,
    category: "Salades",
    image: saladeExotiqueImage,
    rating: 4.8,
    popular: false
  },
  {
    id: 14,
    name: "Salade Mexicaine",
    description: "Une salade épicée et gourmande avec de la laitue, du poulet piquant, du maïs, des tomates cerises, des crackers de pita, poivrons sautés, haricots rouges, avocat, pommes de terre, oignons caramélisés, persil et une sauce fromagère onctueuse.",
    price: 26.00,
    category: "Salades",
    image: saladeMexicaineImage,
    rating: 4.7,
    popular: true
  },
  {
    id: 15,
    name: "Salade Protéinée",
    description: "Un boost d’énergie et de protéines ! Laitue, riz basmati, tomates cerises, escalope moutarde citron, deux œufs durs, poulet fumé, maïs, persil et fromage sicilien. Garnie d’un mix de graines croquantes et d’une sauce fromagère savoureuse.",
    price: 28.00,
    category: "Salades",
    image: saladeProteineeImage,
    rating: 4.9,
    popular: true
  },
  {
  id: 16,
  name: "Bol de Riz Japonais",
  description: "Riz japonais, poulet pané, graines de sésame, sauce curry (pommes de terre, oignons, carottes), oignons fins, coriandre, sauce croustillante.",
  price: 26.00,
  category: "Bowls",
  image: saladeCesareImage,
  rating: 4.8,
  popular: true
},
{
  id: 17,
  name: "Bol de Riz Mexicain",
  description: "Riz basmati, sauce au bœuf émincé, haricots rouges, coriandre, crackers, tomates cerises, poivrons variés, avocat, maïs, oignons caramélisés.",
  price: 29.00,
  category: "Bowls",
  image: saladeCesareImage,
  rating: 4.9,
  popular: true
},
{
  id: 18,
  name: "Bol de Riz Français",
  description: "Riz basmati, haricots verts, épinards, sauce blanquette (carottes, poulet, oignons), oignons caramélisés, noix caramélisées, champignons, Grana Padano.",
  price: 25.00,
  category: "Bowls",
  image: saladeCesareImage,
  rating: 4.7,
  popular: false
}

    
];

const categories = ["All", "Salades","Bowls"];

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
                  <span className="text-2xl font-bold text-primary">{item.price.toFixed(2)} TND</span>
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