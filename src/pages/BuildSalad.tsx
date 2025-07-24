import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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

const BuildSalad: React.FC = () => {
  const [selected, setSelected] = useState<{ [cat: string]: string[] }>({});

  const handleSelect = (cat: string, option: string) => {
    setSelected((prev) => {
      const already = prev[cat]?.includes(option);
      return {
        ...prev,
        [cat]: already
          ? prev[cat].filter((o) => o !== option)
          : [...(prev[cat] || []), option]
      };
    });
  };

  const getSummary = () =>
    ingredientCategories
      .map((cat) => `${cat.name}: ${(selected[cat.name] || []).join(', ')}`)
      .join('\n');

  const getTotal = () => {
    let total = 0;
    ingredientCategories.forEach((cat) => {
      (selected[cat.name] || []).forEach((sel) => {
        const found = cat.options.find((opt) => opt.name === sel);
        if (found) total += found.price;
      });
    });
    return total;
  };

  const handleAddSalad = () => {
    const msg = encodeURIComponent(
      `Je veux composer ma salade:\n${getSummary()}\nTotal: ${getTotal()} TND`
    );
    window.open(`https://wa.me/21626338571?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-8 text-center">
          Composez votre salade
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {ingredientCategories.map((cat) => (
              <div key={cat.name}>
                <h2 className="text-2xl font-semibold mb-2 text-foreground">{cat.name}</h2>
                <div className="flex flex-wrap gap-3">
                  {cat.options.map((option) => (
                    <label key={option.name} className={`px-4 py-2 rounded-full border cursor-pointer transition-smooth ${selected[cat.name]?.includes(option.name) ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selected[cat.name]?.includes(option.name) || false}
                        onChange={() => handleSelect(cat.name, option.name)}
                      />
                      {option.name} <span className="ml-2 text-xs text-muted-foreground">({option.price} TND)</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-muted rounded-2xl p-8 shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Votre sélection</h2>
            <pre className="mb-4 whitespace-pre-wrap text-lg text-muted-foreground text-center">
              {getSummary()}
            </pre>
            <div className="text-xl font-bold mb-8 text-primary">Total : {getTotal()} TND</div>
            <Button className="btn-primary text-lg px-10 py-4" onClick={handleAddSalad}>
              Ajouter ma salade (WhatsApp)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildSalad; 