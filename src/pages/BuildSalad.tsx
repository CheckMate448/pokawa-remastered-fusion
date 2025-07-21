import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const ingredientCategories = [
  {
    name: 'Base',
    options: [
      { name: 'Laitue', price: 3 },
      { name: 'Riz', price: 4 },
      { name: 'Quinoa', price: 5 },
      { name: 'Roquette', price: 4 }
    ]
  },
  {
    name: 'Protéines',
    options: [
      { name: 'Poulet', price: 7 },
      { name: 'Thon', price: 8 },
      { name: 'Crevettes', price: 9 },
      { name: 'Tofu', price: 6 }
    ]
  },
  {
    name: 'Toppings',
    options: [
      { name: 'Avocat', price: 3 },
      { name: 'Tomates cerises', price: 2 },
      { name: 'Oeuf', price: 2 },
      { name: 'Maïs', price: 1 },
      { name: 'Oignons', price: 1 },
      { name: 'Radis', price: 1 },
      { name: 'Graines de chia', price: 2 }
    ]
  },
  {
    name: 'Sauces',
    options: [
      { name: 'César', price: 1 },
      { name: 'Moutarde citron', price: 1 },
      { name: 'Thaï', price: 1 },
      { name: 'Pesto', price: 2 },
      { name: 'Balsamique', price: 1 }
    ]
  }
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