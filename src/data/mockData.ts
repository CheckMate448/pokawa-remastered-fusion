import { Ingredient, Salad } from '@/types/admin';

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Lettuce', inStock: true, category: 'Greens' },
  { id: '2', name: 'Tomatoes', inStock: true, category: 'Vegetables' },
  { id: '3', name: 'Cucumber', inStock: true, category: 'Vegetables' },
  { id: '4', name: 'Red Onion', inStock: false, category: 'Vegetables' },
  { id: '5', name: 'Carrots', inStock: true, category: 'Vegetables' },
  { id: '6', name: 'Bell Peppers', inStock: true, category: 'Vegetables' },
  { id: '7', name: 'Feta Cheese', inStock: true, category: 'Cheese' },
  { id: '8', name: 'Mozzarella', inStock: false, category: 'Cheese' },
  { id: '9', name: 'Chicken Breast', inStock: true, category: 'Protein' },
  { id: '10', name: 'Tuna', inStock: true, category: 'Protein' },
  { id: '11', name: 'Olives', inStock: true, category: 'Toppings' },
  { id: '12', name: 'Croutons', inStock: true, category: 'Toppings' },
];

export const mockSalads: Salad[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Classic Caesar with crispy lettuce, parmesan, and croutons',
    price: 12.99,
    image: '/src/assets/salades/cesar.jpg',
    ingredients: ['1', '7', '12'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Mediterranean Salad',
    description: 'Fresh salad with feta cheese, olives, and tomatoes',
    price: 14.99,
    image: '/src/assets/salades/exotique.jpg',
    ingredients: ['1', '2', '3', '7', '11'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Italian Salad',
    description: 'Traditional Italian mix with mozzarella and basil',
    price: 13.99,
    image: '/src/assets/salades/italienne.jpg',
    ingredients: ['1', '2', '8', '6'],
    isAvailable: false, // Out of stock due to mozzarella
  },
  {
    id: '4',
    name: 'Mexican Salad',
    description: 'Spicy salad with peppers and fresh vegetables',
    price: 13.49,
    image: '/src/assets/salades/mexicaine.jpg',
    ingredients: ['1', '2', '5', '6'],
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Niçoise Salad',
    description: 'French salad with tuna, olives, and fresh vegetables',
    price: 15.99,
    image: '/src/assets/salades/nicoise.jpg',
    ingredients: ['1', '2', '3', '10', '11'],
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Protein Power Salad',
    description: 'High-protein salad with chicken and mixed vegetables',
    price: 16.99,
    image: '/src/assets/salades/proteinee.jpg',
    ingredients: ['1', '2', '5', '9'],
    isAvailable: true,
  },
];