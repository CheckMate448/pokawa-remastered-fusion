import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ingredientCategories = [
  {
    nameKey: 'category.base',
    options: [
      { nameKey: 'ingredient.lettuce', price: 3.5 },
      { nameKey: 'ingredient.rice', price: 4 },
      { nameKey: 'ingredient.quinoa', price: 7 },
      { nameKey: 'ingredient.lettuceRice', price: 5 }
    ]
  },
  {
    nameKey: 'category.protein',
    options: [
      { nameKey: 'ingredient.spicyChicken', price: 4 },
      { nameKey: 'ingredient.lemonMustardChicken', price: 4 },
      { nameKey: 'ingredient.chickenSupreme', price: 4 },
      { nameKey: 'ingredient.tuna', price: 3.5 },
      { nameKey: 'ingredient.ham', price: 3.5 },
      { nameKey: 'ingredient.octopus', price: 11 },
      { nameKey: 'ingredient.shrimp', price: 11 },
      { nameKey: 'ingredient.egg', price: 1 }
    ]
  },
  {
    nameKey: 'category.vegetables',
    options: [
      { nameKey: 'ingredient.corn', price: 1.5 },
      { nameKey: 'ingredient.sweetPotato', price: 2.5 },
      { nameKey: 'ingredient.carrot', price: 1 },
      { nameKey: 'ingredient.cabbage', price: 1 },
      { nameKey: 'ingredient.zucchini', price: 1.5 },
      { nameKey: 'ingredient.broccoli', price: 3 },
      { nameKey: 'ingredient.cherryTomato', price: 1.5 },
      { nameKey: 'ingredient.spinach', price: 2.5 },
      { nameKey: 'ingredient.caramelizedOnions', price: 1.5 },
      { nameKey: 'ingredient.bellPepper', price: 2 },
      { nameKey: 'ingredient.cucumber', price: 1 },
      { nameKey: 'ingredient.beetroot', price: 1.5 },
      { nameKey: 'ingredient.eggplant', price: 1.5 },
      { nameKey: 'ingredient.mushroom', price: 3.5 },
      { nameKey: 'ingredient.onion', price: 1 },
      { nameKey: 'ingredient.arugula', price: 1.5 },
      { nameKey: 'ingredient.beans', price: 2.5 },
      { nameKey: 'ingredient.potato', price: 1.5 },
      { nameKey: 'ingredient.artichoke', price: 2.5 }
    ]
  },
  {
    nameKey: 'category.cheese',
    options: [
      { nameKey: 'ingredient.sicilien', price: 3 },
      { nameKey: 'ingredient.ricotta', price: 3 },
      { nameKey: 'ingredient.mozzarellaBall', price: 4 },
      { nameKey: 'ingredient.gouda', price: 3.5 },
      { nameKey: 'ingredient.gruyere', price: 3.5 },
      { nameKey: 'ingredient.granaPadano', price: 4.5 }
    ]
  },
  {
    nameKey: 'category.fruitsSeeds',
    options: [
      { nameKey: 'ingredient.avocado', price: 6 },
      { nameKey: 'ingredient.pineapple', price: 4 },
      { nameKey: 'ingredient.seedMix', price: 3.5 },
      { nameKey: 'ingredient.chiaSeeds', price: 2 },
      { nameKey: 'ingredient.kiwi', price: 3 },
      { nameKey: 'ingredient.lemon', price: 0.5 },
      { nameKey: 'ingredient.caramelizedNuts', price: 3.5 },
      { nameKey: 'ingredient.cashewNuts', price: 3 },
      { nameKey: 'ingredient.peanut', price: 1.5 },
      { nameKey: 'ingredient.raisins', price: 1.5 },
      { nameKey: 'ingredient.slicedAlmonds', price: 3 },
      { nameKey: 'ingredient.sesame', price: 2 }
    ]
  },
  {
    nameKey: 'category.extras',
    options: [
      { nameKey: 'ingredient.preservedLemon', price: 1 },
      { nameKey: 'ingredient.asianPickles', price: 4 },
      { nameKey: 'ingredient.sunDriedTomatoes', price: 1.5 },
      { nameKey: 'ingredient.cayennePepper', price: 1 },
      { nameKey: 'ingredient.pickles', price: 1 },
      { nameKey: 'ingredient.capres', price: 1 },
      { nameKey: 'ingredient.olives', price: 1 },
      { nameKey: 'ingredient.crouton', price: 0.5 },
      { nameKey: 'ingredient.crackers', price: 0.5 }
    ]
  },
  {
    nameKey: 'category.sauce',
    options: [
      { nameKey: 'ingredient.pestoSauce', price: 0 },
      { nameKey: 'ingredient.creamyCheeseSauce', price: 0 },
      { nameKey: 'ingredient.asianSauce', price: 0 },
      { nameKey: 'ingredient.citrusSauce', price: 0 },
      { nameKey: 'ingredient.honeyBalsamicSauce', price: 0 },
      { nameKey: 'ingredient.classicSauce', price: 0 },
      { nameKey: 'ingredient.balsamicCream', price: 0 },
      { nameKey: 'ingredient.caesarSauce', price: 0 },
      { nameKey: 'ingredient.thaiSauce', price: 0 }
    ]
  }
];

interface Salad {
  id: string;
  ingredients: { [cat: string]: string[] };
}

const BuildSalad: React.FC = () => {
  const { t } = useLanguage();
  const [salads, setSalads] = useState<Salad[]>([{ id: '1', ingredients: {} }]);
  const [activeSaladId, setActiveSaladId] = useState<string>('1');

  const activeSalad = salads.find(s => s.id === activeSaladId)!;

  const handleSelect = (catKey: string, optionKey: string) => {
    setSalads(prev => prev.map(salad => 
      salad.id === activeSaladId 
        ? {
            ...salad,
            ingredients: {
              ...salad.ingredients,
              [catKey]: salad.ingredients[catKey]?.includes(optionKey)
                ? salad.ingredients[catKey].filter(o => o !== optionKey)
                : [...(salad.ingredients[catKey] || []), optionKey]
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
      .filter(cat => salad.ingredients[cat.nameKey]?.length > 0)
      .map(cat => `🥗 ${t(cat.nameKey)}:\n   ${salad.ingredients[cat.nameKey].map(key => t(key)).join(', ')}`)
      .join('\n\n');
  };

  const getTotal = (salad: Salad) => {
    let total = 0;
    ingredientCategories.forEach((cat) => {
      (salad.ingredients[cat.nameKey] || []).forEach((sel) => {
        const found = cat.options.find((opt) => opt.nameKey === sel);
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
        return `🌟 ${t('buildSalad.salad').toUpperCase()} ${index + 1}:\n${summary}\n💰 ${t('whatsapp.price')}: ${total} TND`;
      })
      .join('\n\n' + '═'.repeat(40) + '\n\n');

    return `🥗 ${t('whatsapp.customSalads').toUpperCase()}\n${'═'.repeat(40)}\n\n${orderDetails}\n\n🛒 ${t('whatsapp.totalOrder')}: ${getTotalOrder()} TND\n\n📞 ${t('whatsapp.confirmOrder')}`;
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
            {t('buildSalad.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('buildSalad.subtitle')}
          </p>
        </div>

        {/* Salad Tabs */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-primary">{t('buildSalad.mySalads')}</CardTitle>
              <Button onClick={addNewSalad} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                {t('buildSalad.newSalad')}
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
                    {t('buildSalad.salad')} {index + 1} ({getTotal(salad)} TND)
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
              <Card key={cat.nameKey} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary font-semibold">
                    {t(cat.nameKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.options.map((option) => (
                      <label
                        key={option.nameKey}
                        className={`group relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          activeSalad.ingredients[cat.nameKey]?.includes(option.nameKey)
                            ? 'bg-primary/10 border-primary text-primary shadow-md transform scale-105'
                            : 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeSalad.ingredients[cat.nameKey]?.includes(option.nameKey) || false}
                          onChange={() => handleSelect(cat.nameKey, option.nameKey)}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{t(option.nameKey)}</span>
                          <Badge variant="secondary" className="text-xs">
                            {option.price} TND
                          </Badge>
                        </div>
                        {activeSalad.ingredients[cat.nameKey]?.includes(option.nameKey) && (
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
                    {t('buildSalad.salad')} {salads.findIndex(s => s.id === activeSaladId) + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ingredientCategories.map((cat) => {
                    const selected = activeSalad.ingredients[cat.nameKey] || [];
                    if (selected.length === 0) return null;
                    return (
                      <div key={cat.nameKey} className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">
                          {t(cat.nameKey)}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selected.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {t(item)}
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
                    {t('buildSalad.totalOrder')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {salads.map((salad, index) => (
                      <div key={salad.id} className="flex justify-between items-center py-2 px-3 rounded-lg bg-background/50">
                        <span className="font-medium">{t('buildSalad.salad')} {index + 1}</span>
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
                      {t('buildSalad.orderViaWhatsApp')}
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