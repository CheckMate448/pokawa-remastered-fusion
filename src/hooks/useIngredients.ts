import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  calories?: number;
  category: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data, error } = await supabase
          .from('ingredients')
          .select('*')
          .order('name');

        if (error) throw error;
        setIngredients(data || []);
      } catch (error: any) {
        toast({
          title: "Error loading ingredients",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();

    // Set up real-time subscription
    const channel = supabase
      .channel('ingredients-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ingredients'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setIngredients(current => [...current, payload.new as Ingredient]);
            toast({
              title: "New ingredient added",
              description: `${payload.new.name} has been added to the system.`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setIngredients(current =>
              current.map(item =>
                item.id === payload.new.id ? payload.new as Ingredient : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setIngredients(current =>
              current.filter(item => item.id !== payload.old.id)
            );
            toast({
              title: "Ingredient removed",
              description: "An ingredient has been removed from the system.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const addIngredient = async (ingredient: Omit<Ingredient, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('ingredients')
        .insert(ingredient);

      if (error) throw error;

      toast({
        title: "Ingredient added",
        description: `${ingredient.name} has been added successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding ingredient",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateIngredient = async (id: string, updates: Partial<Ingredient>) => {
    try {
      const { error } = await supabase
        .from('ingredients')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Ingredient updated",
        description: "The ingredient has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating ingredient",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteIngredient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ingredients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Ingredient deleted",
        description: "The ingredient has been removed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting ingredient",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    ingredients,
    loading,
    addIngredient,
    updateIngredient,
    deleteIngredient
  };
};