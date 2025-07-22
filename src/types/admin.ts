export interface Ingredient {
  id: string;
  name: string;
  inStock: boolean;
  category: string;
}

export interface Salad {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[]; // Array of ingredient IDs
  isAvailable: boolean;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}