import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Package, AlertTriangle } from 'lucide-react';
import { Ingredient } from '@/types/admin';
import { mockIngredients } from '@/data/mockData';

const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    category: '',
    inStock: true,
  });

  const categories = ['Greens', 'Vegetables', 'Cheese', 'Protein', 'Toppings'];

  const handleAddIngredient = () => {
    if (!newIngredient.name || !newIngredient.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const ingredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name!,
      category: newIngredient.category!,
      inStock: newIngredient.inStock ?? true,
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient({
      name: '',
      category: '',
      inStock: true,
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Ingredient Added",
      description: `${ingredient.name} has been added to the inventory.`,
    });
  };

  const toggleStock = (id: string) => {
    const updatedIngredients = ingredients.map(ingredient =>
      ingredient.id === id ? { ...ingredient, inStock: !ingredient.inStock } : ingredient
    );
    setIngredients(updatedIngredients);
    
    const ingredient = ingredients.find(i => i.id === id);
    toast({
      title: "Stock Updated",
      description: `${ingredient?.name} is now ${!ingredient?.inStock ? 'in stock' : 'out of stock'}.`,
    });
  };

  const groupedIngredients = categories.map(category => ({
    category,
    items: ingredients.filter(ingredient => ingredient.category === category)
  })).filter(group => group.items.length > 0);

  const totalIngredients = ingredients.length;
  const inStockCount = ingredients.filter(i => i.inStock).length;
  const outOfStockCount = ingredients.filter(i => !i.inStock).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Ingredients</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Ingredient</DialogTitle>
              <DialogDescription>
                Add a new ingredient to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newIngredient.name || ''}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  placeholder="Enter ingredient name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newIngredient.category || ''}
                  onValueChange={(value) => setNewIngredient({ ...newIngredient, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={newIngredient.inStock ?? true}
                  onCheckedChange={(checked) => setNewIngredient({ ...newIngredient, inStock: checked })}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <Button onClick={handleAddIngredient} className="w-full">
                Add Ingredient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIngredients}</div>
            <p className="text-xs text-muted-foreground">All categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{inStockCount}</div>
            <p className="text-xs text-muted-foreground">Available ingredients</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Ingredients by Category */}
      <div className="space-y-6">
        {groupedIngredients.map((group) => (
          <Card key={group.category}>
            <CardHeader>
              <CardTitle>{group.category}</CardTitle>
              <CardDescription>
                {group.items.length} ingredients in this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <p className="font-medium">{ingredient.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={ingredient.inStock ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {ingredient.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={ingredient.inStock}
                      onCheckedChange={() => toggleStock(ingredient.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminIngredients;