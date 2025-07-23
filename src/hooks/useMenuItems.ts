import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MenuItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  image_url?: string;
  ingredients: string[];
  is_available: boolean;
  rating?: number;
  is_popular: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('title');

        if (error) throw error;
        setMenuItems(data || []);
      } catch (error: any) {
        toast({
          title: "Error loading menu items",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('menu-items-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'menu_items'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMenuItems(current => [...current, payload.new as MenuItem]);
            toast({
              title: "New menu item added",
              description: `${payload.new.title} has been added to the menu.`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setMenuItems(current =>
              current.map(item =>
                item.id === payload.new.id ? payload.new as MenuItem : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setMenuItems(current =>
              current.filter(item => item.id !== payload.old.id)
            );
            toast({
              title: "Menu item removed",
              description: "A menu item has been removed from the system.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const addMenuItem = async (menuItem: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .insert(menuItem);

      if (error) throw error;

      toast({
        title: "Menu item added",
        description: `${menuItem.title} has been added successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding menu item",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Menu item updated",
        description: "The menu item has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating menu item",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Menu item deleted",
        description: "The menu item has been removed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting menu item",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    menuItems,
    loading,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};