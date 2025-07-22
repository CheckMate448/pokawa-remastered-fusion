import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Salad } from '@/types/admin';
import { mockSalads, mockIngredients } from '@/data/mockData';

const AdminSalads = () => {
  const [salads, setSalads] = useState<Salad[]>(mockSalads);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSalad, setEditingSalad] = useState<Salad | null>(null);
  const { toast } = useToast();

  const [newSalad, setNewSalad] = useState<Partial<Salad>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    ingredients: [],
    isAvailable: true,
  });

  const handleAddSalad = () => {
    if (!newSalad.name || !newSalad.description || !newSalad.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const salad: Salad = {
      id: Date.now().toString(),
      name: newSalad.name!,
      description: newSalad.description!,
      price: newSalad.price!,
      image: newSalad.image || '/src/assets/salades/cesar.jpg',
      ingredients: newSalad.ingredients || [],
      isAvailable: newSalad.isAvailable ?? true,
    };

    setSalads([...salads, salad]);
    setNewSalad({
      name: '',
      description: '',
      price: 0,
      image: '',
      ingredients: [],
      isAvailable: true,
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Salad Added",
      description: `${salad.name} has been added to the menu.`,
    });
  };

  const handleEditSalad = (salad: Salad) => {
    setEditingSalad(salad);
    setNewSalad(salad);
  };

  const handleUpdateSalad = () => {
    if (!editingSalad) return;

    const updatedSalads = salads.map(salad =>
      salad.id === editingSalad.id ? { ...editingSalad, ...newSalad } : salad
    );
    
    setSalads(updatedSalads);
    setEditingSalad(null);
    setNewSalad({
      name: '',
      description: '',
      price: 0,
      image: '',
      ingredients: [],
      isAvailable: true,
    });
    
    toast({
      title: "Salad Updated",
      description: `${newSalad.name} has been updated.`,
    });
  };

  const handleDeleteSalad = (id: string) => {
    const saladToDelete = salads.find(s => s.id === id);
    setSalads(salads.filter(salad => salad.id !== id));
    
    toast({
      title: "Salad Deleted",
      description: `${saladToDelete?.name} has been removed from the menu.`,
    });
  };

  const toggleAvailability = (id: string) => {
    const updatedSalads = salads.map(salad =>
      salad.id === id ? { ...salad, isAvailable: !salad.isAvailable } : salad
    );
    setSalads(updatedSalads);
    
    const salad = salads.find(s => s.id === id);
    toast({
      title: "Availability Updated",
      description: `${salad?.name} is now ${!salad?.isAvailable ? 'available' : 'unavailable'}.`,
    });
  };

  const getIngredientNames = (ingredientIds: string[]) => {
    return ingredientIds
      .map(id => mockIngredients.find(ing => ing.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Salads</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Salad
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Salad</DialogTitle>
              <DialogDescription>
                Create a new salad for your menu.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newSalad.name || ''}
                  onChange={(e) => setNewSalad({ ...newSalad, name: e.target.value })}
                  placeholder="Enter salad name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newSalad.description || ''}
                  onChange={(e) => setNewSalad({ ...newSalad, description: e.target.value })}
                  placeholder="Enter salad description"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (TND) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newSalad.price || ''}
                  onChange={(e) => setNewSalad({ ...newSalad, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newSalad.isAvailable ?? true}
                  onCheckedChange={(checked) => setNewSalad({ ...newSalad, isAvailable: checked })}
                />
                <Label htmlFor="available">Available on menu</Label>
              </div>
              <Button onClick={handleAddSalad} className="w-full">
                Add Salad
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Salads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salads.map((salad) => (
          <Card key={salad.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src={salad.image}
                alt={salad.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant={salad.isAvailable ? 'default' : 'secondary'}>
                  {salad.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {salad.name}
                <span className="text-emerald-600">{salad.price.toFixed(2)} TND</span>
              </CardTitle>
              <CardDescription>{salad.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Ingredients:</p>
                  <p className="text-sm text-muted-foreground">
                    {getIngredientNames(salad.ingredients) || 'No ingredients selected'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAvailability(salad.id)}
                  >
                    {salad.isAvailable ? (
                      <><EyeOff className="mr-1 h-3 w-3" /> Hide</>
                    ) : (
                      <><Eye className="mr-1 h-3 w-3" /> Show</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSalad(salad)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteSalad(salad.id)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingSalad} onOpenChange={() => setEditingSalad(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Salad</DialogTitle>
            <DialogDescription>
              Update the salad information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={newSalad.name || ''}
                onChange={(e) => setNewSalad({ ...newSalad, name: e.target.value })}
                placeholder="Enter salad name"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={newSalad.description || ''}
                onChange={(e) => setNewSalad({ ...newSalad, description: e.target.value })}
                placeholder="Enter salad description"
              />
            </div>
            <div>
              <Label htmlFor="edit-price">Price (TND) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={newSalad.price || ''}
                onChange={(e) => setNewSalad({ ...newSalad, price: parseFloat(e.target.value) })}
                placeholder="0.00"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-available"
                checked={newSalad.isAvailable ?? true}
                onCheckedChange={(checked) => setNewSalad({ ...newSalad, isAvailable: checked })}
              />
              <Label htmlFor="edit-available">Available on menu</Label>
            </div>
            <Button onClick={handleUpdateSalad} className="w-full">
              Update Salad
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSalads;