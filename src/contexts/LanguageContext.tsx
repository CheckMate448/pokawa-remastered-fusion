import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.buildSalad': 'Build Salad',
    'nav.admin': 'Admin',
    'nav.language': 'Language',
    
    // Build Salad Page
    'buildSalad.title': 'Build Your Salads',
    'buildSalad.subtitle': 'Create custom salads with our fresh, quality ingredients',
    'buildSalad.mySalads': 'My Salads',
    'buildSalad.newSalad': 'New Salad',
    'buildSalad.salad': 'Salad',
    'buildSalad.totalOrder': 'Total Order',
    'buildSalad.orderViaWhatsApp': 'Order via WhatsApp',
    
    // Ingredient Categories
    'category.base': 'Choose a Base',
    'category.protein': 'Choose a Protein (OR GO VEGETARIAN)',
    'category.vegetables': 'CHOOSE YOUR VEGETABLES',
    'category.cheese': 'CHOOSE 1 CHEESE',
    'category.fruitsSeeds': 'CHOOSE YOUR FRUITS & SEEDS',
    'category.extras': 'EXTRA & TOPPINGS',
    'category.sauce': 'CHOOSE A SAUCE',
    
    // Ingredients
    'ingredient.lettuce': 'Lettuce',
    'ingredient.rice': 'Rice',
    'ingredient.quinoa': 'Quinoa',
    'ingredient.lettuceRice': 'Lettuce & Rice',
    'ingredient.spicyChicken': 'Spicy Chicken',
    'ingredient.lemonMustardChicken': 'Lemon Mustard Chicken Escalope',
    'ingredient.chickenSupreme': 'Chicken Supreme',
    'ingredient.tuna': 'Tuna',
    'ingredient.ham': 'Ham',
    'ingredient.octopus': 'Octopus',
    'ingredient.shrimp': 'Shrimp',
    'ingredient.egg': 'Egg',
    'ingredient.corn': 'Corn',
    'ingredient.sweetPotato': 'Sweet Potato',
    'ingredient.carrot': 'Carrot',
    'ingredient.cabbage': 'Red/Green Cabbage',
    'ingredient.zucchini': 'Zucchini',
    'ingredient.broccoli': 'Broccoli',
    'ingredient.cherryTomato': 'Cherry Tomato',
    'ingredient.spinach': 'Spinach',
    'ingredient.caramelizedOnions': 'Caramelized Onions',
    'ingredient.bellPepper': 'Bell Pepper',
    'ingredient.cucumber': 'Cucumber',
    'ingredient.beetroot': 'Beetroot',
    'ingredient.eggplant': 'Eggplant',
    'ingredient.mushroom': 'Mushroom',
    'ingredient.onion': 'Onion',
    'ingredient.arugula': 'Arugula',
    'ingredient.beans': 'Green/Red Bean',
    'ingredient.potato': 'Potato',
    'ingredient.artichoke': 'Artichoke',
    'ingredient.sicilien': 'Sicilien',
    'ingredient.ricotta': 'Ricotta',
    'ingredient.mozzarellaBall': 'Mozzarella Ball',
    'ingredient.gouda': 'Gouda',
    'ingredient.gruyere': 'Gruyère',
    'ingredient.granaPadano': 'Grana Padano',
    'ingredient.avocado': 'Avocado',
    'ingredient.pineapple': 'Pineapple',
    'ingredient.seedMix': 'Seed Mix',
    'ingredient.chiaSeeds': 'Chia Seeds',
    'ingredient.kiwi': 'Kiwi',
    'ingredient.lemon': 'Lemon',
    'ingredient.caramelizedNuts': 'Caramelized Nuts',
    'ingredient.cashewNuts': 'Cashew Nuts',
    'ingredient.peanut': 'Peanut',
    'ingredient.raisins': 'Raisins',
    'ingredient.slicedAlmonds': 'Sliced Almonds',
    'ingredient.sesame': 'Sesame',
    'ingredient.preservedLemon': 'Preserved Lemon',
    'ingredient.asianPickles': 'Asian Pickles (Cucumber & Carrot)',
    'ingredient.sunDriedTomatoes': 'Sun-Dried Tomatoes',
    'ingredient.cayennePepper': 'Cayenne Pepper',
    'ingredient.pickles': 'Pickles',
    'ingredient.capres': 'Capres',
    'ingredient.olives': 'Olives',
    'ingredient.crouton': 'Crouton',
    'ingredient.crackers': 'Crackers',
    'ingredient.pestoSauce': 'Pesto Sauce',
    'ingredient.creamyCheeseSauce': 'Creamy Cheese Sauce',
    'ingredient.asianSauce': 'Asian Sauce',
    'ingredient.citrusSauce': 'Citrus Sauce (Orange & Lemon)',
    'ingredient.honeyBalsamicSauce': 'Honey Balsamic Sauce',
    'ingredient.classicSauce': 'Classic Sauce (Lemon & Olive Oil)',
    'ingredient.balsamicCream': 'Balsamic Cream',
    'ingredient.caesarSauce': 'Caesar Sauce',
    'ingredient.thaiSauce': 'Thai Sauce',
    
    // WhatsApp Message
    'whatsapp.customSalads': 'CUSTOM SALAD ORDER',
    'whatsapp.totalOrder': 'TOTAL ORDER',
    'whatsapp.confirmOrder': 'Please confirm the order!',
    'whatsapp.price': 'Price'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.buildSalad': 'Composer Salade',
    'nav.admin': 'Admin',
    'nav.language': 'Langue',
    
    // Build Salad Page
    'buildSalad.title': 'Composez vos salades',
    'buildSalad.subtitle': 'Créez des salades sur mesure avec nos ingrédients frais et de qualité',
    'buildSalad.mySalads': 'Mes Salades',
    'buildSalad.newSalad': 'Nouvelle Salade',
    'buildSalad.salad': 'Salade',
    'buildSalad.totalOrder': 'Commande Totale',
    'buildSalad.orderViaWhatsApp': 'Commander via WhatsApp',
    
    // Ingredient Categories
    'category.base': 'Choisissez une Base',
    'category.protein': 'Choisissez une Protéine (OU VÉGÉTARIEN)',
    'category.vegetables': 'CHOISISSEZ VOS LÉGUMES',
    'category.cheese': 'CHOISISSEZ 1 FROMAGE',
    'category.fruitsSeeds': 'CHOISISSEZ VOS FRUITS & GRAINES',
    'category.extras': 'EXTRA & GARNITURES',
    'category.sauce': 'CHOISISSEZ UNE SAUCE',
    
    // Ingredients (keeping original French names)
    'ingredient.lettuce': 'Salade',
    'ingredient.rice': 'Riz',
    'ingredient.quinoa': 'Quinoa',
    'ingredient.lettuceRice': 'Salade & Riz',
    'ingredient.spicyChicken': 'Poulet Épicé',
    'ingredient.lemonMustardChicken': 'Escalope de Poulet Citron Moutarde',
    'ingredient.chickenSupreme': 'Poulet Suprême',
    'ingredient.tuna': 'Thon',
    'ingredient.ham': 'Jambon',
    'ingredient.octopus': 'Poulpe',
    'ingredient.shrimp': 'Crevettes',
    'ingredient.egg': 'Œuf',
    'ingredient.corn': 'Maïs',
    'ingredient.sweetPotato': 'Patate Douce',
    'ingredient.carrot': 'Carotte',
    'ingredient.cabbage': 'Chou Rouge/Vert',
    'ingredient.zucchini': 'Courgette',
    'ingredient.broccoli': 'Brocoli',
    'ingredient.cherryTomato': 'Tomate Cerise',
    'ingredient.spinach': 'Épinards',
    'ingredient.caramelizedOnions': 'Oignons Caramélisés',
    'ingredient.bellPepper': 'Poivron',
    'ingredient.cucumber': 'Concombre',
    'ingredient.beetroot': 'Betterave',
    'ingredient.eggplant': 'Aubergine',
    'ingredient.mushroom': 'Champignon',
    'ingredient.onion': 'Oignon',
    'ingredient.arugula': 'Roquette',
    'ingredient.beans': 'Haricot Vert/Rouge',
    'ingredient.potato': 'Pomme de Terre',
    'ingredient.artichoke': 'Artichaut',
    'ingredient.sicilien': 'Sicilien',
    'ingredient.ricotta': 'Ricotta',
    'ingredient.mozzarellaBall': 'Boule de Mozzarella',
    'ingredient.gouda': 'Gouda',
    'ingredient.gruyere': 'Gruyère',
    'ingredient.granaPadano': 'Grana Padano',
    'ingredient.avocado': 'Avocat',
    'ingredient.pineapple': 'Ananas',
    'ingredient.seedMix': 'Mélange de Graines',
    'ingredient.chiaSeeds': 'Graines de Chia',
    'ingredient.kiwi': 'Kiwi',
    'ingredient.lemon': 'Citron',
    'ingredient.caramelizedNuts': 'Noix Caramélisées',
    'ingredient.cashewNuts': 'Noix de Cajou',
    'ingredient.peanut': 'Cacahuète',
    'ingredient.raisins': 'Raisins Secs',
    'ingredient.slicedAlmonds': 'Amandes Effilées',
    'ingredient.sesame': 'Sésame',
    'ingredient.preservedLemon': 'Citron Confit',
    'ingredient.asianPickles': 'Pickles Asiatiques (Concombre & Carotte)',
    'ingredient.sunDriedTomatoes': 'Tomates Séchées',
    'ingredient.cayennePepper': 'Piment de Cayenne',
    'ingredient.pickles': 'Cornichons',
    'ingredient.capres': 'Câpres',
    'ingredient.olives': 'Olives',
    'ingredient.crouton': 'Croûton',
    'ingredient.crackers': 'Crackers',
    'ingredient.pestoSauce': 'Sauce Pesto',
    'ingredient.creamyCheeseSauce': 'Sauce Fromage Crémeuse',
    'ingredient.asianSauce': 'Sauce Asiatique',
    'ingredient.citrusSauce': 'Sauce Agrumes (Orange & Citron)',
    'ingredient.honeyBalsamicSauce': 'Sauce Balsamique Miel',
    'ingredient.classicSauce': 'Sauce Classique (Citron & Huile d\'Olive)',
    'ingredient.balsamicCream': 'Crème Balsamique',
    'ingredient.caesarSauce': 'Sauce César',
    'ingredient.thaiSauce': 'Sauce Thaï',
    
    // WhatsApp Message
    'whatsapp.customSalads': 'COMMANDE SALADES PERSONNALISÉES',
    'whatsapp.totalOrder': 'TOTAL COMMANDE',
    'whatsapp.confirmOrder': 'Merci de confirmer la commande!',
    'whatsapp.price': 'Prix'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
