import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Package, AlertTriangle, Upload, Loader2, Trash2, Edit } from 'lucide-react';
import { useIngredients, Ingredient } from '@/hooks/useIngredients';
import { StorageService } from '@/services/storageService';

const AdminIngredients = () => {
  const { ingredients, loading, addIngredient, updateIngredient, deleteIngredient } = useIngredients();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    category: '',
    description: '',
    calories: 0,
    in_stock: true,
  });

  const categories = ['Base', 'Vegetables', 'Dairy', 'Protein', 'Dressing', 'Toppings'];

  const handleAddIngredient = async () => {
    if (!newIngredient.name || !newIngredient.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addIngredient({
        name: newIngredient.name!,
        category: newIngredient.category!,
        description: newIngredient.description,
        calories: newIngredient.calories,
        in_stock: newIngredient.in_stock ?? true,
      });

      setNewIngredient({
        name: '',
        category: '',
        description: '',
        calories: 0,
        in_stock: true,
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleEditIngredient = async () => {
    if (!editingIngredient) return;

    try {
      await updateIngredient(editingIngredient.id, {
        name: editingIngredient.name,
        category: editingIngredient.category,
        description: editingIngredient.description,
        calories: editingIngredient.calories,
        in_stock: editingIngredient.in_stock,
      });
      
      setIsEditDialogOpen(false);
      setEditingIngredient(null);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleImageUpload = async (file: File, isEdit: boolean = false) => {
    setIsUploading(true);
    try {
      const imageUrl = await StorageService.uploadImage(file, 'ingredients');
      
      if (isEdit && editingIngredient) {
        setEditingIngredient({ ...editingIngredient, image_url: imageUrl });
      } else {
        setNewIngredient({ ...newIngredient, image_url: imageUrl });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const toggleStock = async (ingredient: Ingredient) => {
    try {
      await updateIngredient(ingredient.id, { in_stock: !ingredient.in_stock });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDeleteIngredient = async (ingredient: Ingredient) => {
    try {
      if (ingredient.image_url) {
        await StorageService.deleteImage(ingredient.image_url, 'ingredients');
      }
      await deleteIngredient(ingredient.id);
    } catch (error) {
      // Error handled by hook
    }
  };

  const openEditDialog = (ingredient: Ingredient) => {
    setEditingIngredient({ ...ingredient });
    setIsEditDialogOpen(true);
  };

  const groupedIngredients = categories.map(category => ({
    category,
    items: ingredients.filter(ingredient => ingredient.category === category)
  })).filter(group => group.items.length > 0);

  const totalIngredients = ingredients.length;
  const inStockCount = ingredients.filter(i => i.in_stock).length;
  const outOfStockCount = ingredients.filter(i => !i.in_stock).length;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newIngredient.description || ''}
                  onChange={(e) => setNewIngredient({ ...newIngredient, description: e.target.value })}
                  placeholder="Enter ingredient description"
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={newIngredient.calories || 0}
                  onChange={(e) => setNewIngredient({ ...newIngredient, calories: parseInt(e.target.value) || 0 })}
                  placeholder="Enter calories"
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
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="flex items-center mt-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="in_stock"
                  checked={newIngredient.in_stock ?? true}
                  onCheckedChange={(checked) => setNewIngredient({ ...newIngredient, in_stock: checked })}
                />
                <Label htmlFor="in_stock">In Stock</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddIngredient} disabled={isUploading}>
                Add Ingredient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Ingredient</DialogTitle>
            <DialogDescription>
              Update the ingredient information.
            </DialogDescription>
          </DialogHeader>
          {editingIngredient && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name *</Label>
                <Input
                  id="edit-name"
                  value={editingIngredient.name || ''}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, name: e.target.value })}
                  placeholder="Enter ingredient name"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingIngredient.description || ''}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, description: e.target.value })}
                  placeholder="Enter ingredient description"
                />
              </div>
              <div>
                <Label htmlFor="edit-calories">Calories</Label>
                <Input
                  id="edit-calories"
                  type="number"
                  value={editingIngredient.calories || 0}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, calories: parseInt(e.target.value) || 0 })}
                  placeholder="Enter calories"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={editingIngredient.category || ''}
                  onValueChange={(value) => setEditingIngredient({ ...editingIngredient, category: value })}
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
              <div>
                <Label htmlFor="edit-image">Update Image</Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, true);
                  }}
                  disabled={isUploading}
                />
                {editingIngredient.image_url && (
                  <img 
                    src={editingIngredient.image_url} 
                    alt={editingIngredient.name} 
                    className="mt-2 h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-in_stock"
                  checked={editingIngredient.in_stock ?? true}
                  onCheckedChange={(checked) => setEditingIngredient({ ...editingIngredient, in_stock: checked })}
                />
                <Label htmlFor="edit-in_stock">In Stock</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditIngredient} disabled={isUploading}>
              Update Ingredient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                      {ingredient.image_url && (
                        <img 
                          src={ingredient.image_url} 
                          alt={ingredient.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{ingredient.name}</p>
                        {ingredient.description && (
                          <p className="text-xs text-muted-foreground">{ingredient.description}</p>
                        )}
                        {ingredient.calories && (
                          <p className="text-xs text-muted-foreground">{ingredient.calories} cal</p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={ingredient.in_stock ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {ingredient.in_stock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(ingredient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteIngredient(ingredient)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={ingredient.in_stock}
                        onCheckedChange={() => toggleStock(ingredient)}
                      />
                    </div>
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