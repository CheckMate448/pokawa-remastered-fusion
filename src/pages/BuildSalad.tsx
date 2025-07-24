import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';

const ingredientCategories = [
  {
    name: 'Choose a Base',
    options: [
      { name: 'Lettuce', price: 3.5 },
      { name: 'Rice', price: 4 },
      { name: 'Quinoa', price: 7 },
      { name: 'Lettuce & Rice', price: 5 }
    ]
  },
  {
    name: 'Choose a Protein (OR GO VEGETARIAN)',
    options: [
      { name: 'Spicy Chicken', price: 4 },
      { name: 'Lemon Mustard Chicken Escalope', price: 4 },
      { name: 'Chicken Supreme', price: 4 },
      { name: 'Tuna', price: 3.5 },
      { name: 'Ham', price: 3.5 },
      { name: 'Octopus', price: 11 },
      { name: 'Shrimp', price: 11 },
      { name: 'Egg', price: 1 }
      
    ]
  },
  {
    name: 'CHOOSE YOUR VEGETABLES',
    options: [
      { name: 'Corn', price: 1.5 },
      { name: 'Sweet Potato', price: 2.5 },
      { name: 'Carrot', price: 1 },
      { name: 'Red/Green Cabbage', price: 1 },
      { name: 'Zucchini', price: 1.5 },
      { name: 'Broccoli', price: 3 },
      { name: 'Cherry Tomato', price: 1.5 },
      { name: 'Spinach', price: 2.5 },
      { name: 'Caramelized Onions', price: 1.5 },
      { name: 'Bell Pepper', price: 2 },
      { name: 'Cucumber', price: 1 },
      { name: 'Beetroot', price: 1.5 },
      { name: 'Eggplant', price: 1.5 },
      { name: 'Mushroom', price: 3.5 },
      { name: 'Onion', price: 1 },
      { name: 'Arugula', price: 1.5 },
      { name: 'Green/Red Bean', price: 2.5 },
      { name: 'Potato', price: 1.5 },
      { name: 'Artichoke', price: 2.5 },

    ]
  },
{
  name: 'CHOOSE 1 CHEESE',
  options: [
    { name: 'Sicilien', price: 3 },
    { name: 'Ricotta', price: 3 },
    { name: 'Mozzarella Ball', price: 4 },
    { name: 'Gouda', price: 3.5 },
    { name: 'Gruyère', price: 3.5 },
    { name: 'Grana Padano', price: 4.5 }
  ]
},

{
  name: 'CHOOSE YOUR FRUITS & SEEDS',
  options: [
    { name: 'Avocado', price: 6 },
    { name: 'Pineapple', price: 4 },
    { name: 'Seed Mix', price: 3.5 },
    { name: 'Chia Seeds', price: 2 },
    { name: 'Kiwi', price: 3 },
    { name: 'Lemon', price: 0.5 },
    { name: 'Caramelized Nuts', price: 3.5 },
    { name: 'Cashew Nuts', price: 3 },
    { name: 'Peanut', price: 1.5 },
    { name: 'Raisins', price: 1.5 },
    { name: 'Sliced Almonds', price: 3 },
    { name: 'Sesame', price: 2 }
  ]
},
{
  name: 'EXTRA & TOPPINGS',
  options: [
    { name: 'Preserved Lemon', price: 1 },
    { name: 'Asian Pickles (Cucumber & Carrot)', price: 4 },
    { name: 'Sun-Dried Tomatoes', price: 1.5 },
    { name: 'Cayenne Pepper', price: 1 },
    { name: 'Pickles', price: 1 },
    { name: 'Capres', price: 1 },
    { name: 'Olives', price: 1 },
    { name: 'Crouton', price: 0.5 },
    { name: 'Crackers', price: 0.5 }
  ]
},
{
  name: 'CHOOSE A SAUCE',
  options: [
    { name: 'Pesto Sauce', price: 0 },
    { name: 'Creamy Cheese Sauce', price: 0 },
    { name: 'Asian Sauce', price: 0 },
    { name: 'Citrus Sauce (Orange & Lemon)', price: 0 },
    { name: 'Honey Balsamic Sauce', price: 0 },
    { name: 'Classic Sauce (Lemon & Olive Oil)', price: 0 },
    { name: 'Balsamic Cream', price: 0 },
    { name: 'Caesar Sauce', price: 0 },
    { name: 'Thai Sauce', price: 0 }
  ]
},





];

interface Salad {
  id: string;
  ingredients: { [cat: string]: string[] };
}

const BuildSalad: React.FC = () => {
  const [salads, setSalads] = useState<Salad[]>([{ id: '1', ingredients: {} }]);
  const [activeSaladId, setActiveSaladId] = useState<string>('1');

  const activeSalad = salads.find(s => s.id === activeSaladId)!;

  const handleSelect = (cat: string, option: string) => {
    setSalads(prev => prev.map(salad => 
      salad.id === activeSaladId 
        ? {
            ...salad,
            ingredients: {
              ...salad.ingredients,
              [cat]: salad.ingredients[cat]?.includes(option)
                ? salad.ingredients[cat].filter(o => o !== option)
                : [...(salad.ingredients[cat] || []), option]
            }
          }
        : salad
    ));
  };

  const addNewSalad = () => {
    const newId = Date.now().toString();
    setSalads(prev => [...prev, { id: newId, ingredients: {} }]);
    setActiveSaladId(newId);
  };

  const removeSalad = (id: string) => {
    if (salads.length === 1) return;
    setSalads(prev => prev.filter(s => s.id !== id));
    if (activeSaladId === id) {
      setActiveSaladId(salads.find(s => s.id !== id)!.id);
    }
  };

  const getSummary = (salad: Salad) => {
    return ingredientCategories
      .filter(cat => salad.ingredients[cat.name]?.length > 0)
      .map(cat => `🥗 ${cat.name}:\n   ${salad.ingredients[cat.name].join(', ')}`)
      .join('\n\n');
  };

  const getTotal = (salad: Salad) => {
    let total = 0;
    ingredientCategories.forEach((cat) => {
      (salad.ingredients[cat.name] || []).forEach((sel) => {
        const found = cat.options.find((opt) => opt.name === sel);
        if (found) total += found.price;
      });
    });
    return total;
  };

  const getTotalOrder = () => {
    return salads.reduce((sum, salad) => sum + getTotal(salad), 0);
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = salads
      .map((salad, index) => {
        const summary = getSummary(salad);
        const total = getTotal(salad);
        return `🌟 SALADE ${index + 1}:\n${summary}\n💰 Prix: ${total} TND`;
      })
      .join('\n\n' + '═'.repeat(40) + '\n\n');

    return `🥗 COMMANDE SALADES PERSONNALISÉES\n${'═'.repeat(40)}\n\n${orderDetails}\n\n🛒 TOTAL COMMANDE: ${getTotalOrder()} TND\n\n📞 Merci de confirmer la commande!`;
  };

  const handleSendOrder = () => {
    const msg = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/21626338571?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-primary mb-4">
            Composez vos salades
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Créez des salades sur mesure avec nos ingrédients frais et de qualité
          </p>
        </div>

        {/* Salad Tabs */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-primary">Mes Salades</CardTitle>
              <Button onClick={addNewSalad} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle Salade
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {salads.map((salad, index) => (
                <div key={salad.id} className="flex items-center gap-1">
                  <Badge
                    variant={activeSaladId === salad.id ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                      activeSaladId === salad.id 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveSaladId(salad.id)}
                  >
                    Salade {index + 1} ({getTotal(salad)} TND)
                  </Badge>
                  {salads.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      onClick={() => removeSalad(salad.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients Selection */}
          <div className="lg:col-span-2 space-y-6">
            {ingredientCategories.map((cat) => (
              <Card key={cat.name} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary font-semibold">
                    {cat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.options.map((option) => (
                      <label
                        key={option.name}
                        className={`group relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          activeSalad.ingredients[cat.name]?.includes(option.name)
                            ? 'bg-primary/10 border-primary text-primary shadow-md transform scale-105'
                            : 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeSalad.ingredients[cat.name]?.includes(option.name) || false}
                          onChange={() => handleSelect(cat.name, option.name)}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{option.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {option.price} TND
                          </Badge>
                        </div>
                        {activeSalad.ingredients[cat.name]?.includes(option.name) && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Current Salad Summary */}
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center text-primary">
                    Salade {salads.findIndex(s => s.id === activeSaladId) + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ingredientCategories.map((cat) => {
                    const selected = activeSalad.ingredients[cat.name] || [];
                    if (selected.length === 0) return null;
                    return (
                      <div key={cat.name} className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">
                          {cat.name}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selected.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <Separator />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {getTotal(activeSalad)} TND
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Order */}
              <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Commande Totale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {salads.map((salad, index) => (
                      <div key={salad.id} className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                        <span className="font-medium">Salade {index + 1}</span>
                        <Badge className="bg-primary text-primary-foreground">
                          {getTotal(salad)} TND
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-primary">
                      {getTotalOrder()} TND
                    </div>
                    <Button 
                      onClick={handleSendOrder} 
                      size="lg" 
                      className="w-full gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={salads.every(salad => Object.keys(salad.ingredients).length === 0)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Commander via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildSalad; 