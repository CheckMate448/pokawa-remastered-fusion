-- Create ingredients table
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  calories INTEGER,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 4.5,
  is_popular BOOLEAN DEFAULT false,
  category TEXT NOT NULL DEFAULT 'Salades',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin management
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  username TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for ingredients (admin-only access)
CREATE POLICY "Admin users can view ingredients" 
ON public.ingredients 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can insert ingredients" 
ON public.ingredients 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can update ingredients" 
ON public.ingredients 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can delete ingredients" 
ON public.ingredients 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create policies for menu_items (public read, admin write)
CREATE POLICY "Anyone can view available menu items" 
ON public.menu_items 
FOR SELECT 
USING (is_available = true);

CREATE POLICY "Admin users can view all menu items" 
ON public.menu_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can insert menu items" 
ON public.menu_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can update menu items" 
ON public.menu_items 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can delete menu items" 
ON public.menu_items 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create policies for admin_users
CREATE POLICY "Admin users can view other admins" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('ingredients', 'ingredients', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-items', 'menu-items', true);

-- Create storage policies for ingredient images
CREATE POLICY "Anyone can view ingredient images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'ingredients');

CREATE POLICY "Admin users can upload ingredient images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'ingredients' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can update ingredient images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'ingredients' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can delete ingredient images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'ingredients' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create storage policies for menu item images
CREATE POLICY "Anyone can view menu item images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'menu-items');

CREATE POLICY "Admin users can upload menu item images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'menu-items' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can update menu item images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'menu-items' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admin users can delete menu item images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'menu-items' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Insert some sample data
INSERT INTO public.ingredients (name, description, category, calories, in_stock) VALUES
('Lettuce', 'Fresh romaine lettuce', 'Base', 10, true),
('Tomatoes', 'Fresh cherry tomatoes', 'Vegetables', 15, true),
('Cucumber', 'Crisp cucumber slices', 'Vegetables', 8, true),
('Chicken Breast', 'Grilled chicken breast', 'Protein', 165, true),
('Feta Cheese', 'Crumbled feta cheese', 'Dairy', 75, true),
('Olive Oil', 'Extra virgin olive oil', 'Dressing', 120, true),
('Red Onion', 'Sliced red onion', 'Vegetables', 12, true),
('Avocado', 'Fresh avocado slices', 'Vegetables', 160, false);

INSERT INTO public.menu_items (title, description, price, category, ingredients, is_popular, rating) VALUES
('Salade César', 'Salade traditionnelle avec parmesan, croûtons et sauce césar', 12.50, 'Salades', ARRAY(SELECT id::text FROM public.ingredients WHERE name IN ('Lettuce', 'Chicken Breast', 'Feta Cheese') LIMIT 3), true, 4.8),
('Salade Méditerranéenne', 'Mélange de légumes frais avec feta et olives', 11.00, 'Salades', ARRAY(SELECT id::text FROM public.ingredients WHERE name IN ('Lettuce', 'Tomatoes', 'Feta Cheese', 'Olive Oil') LIMIT 4), false, 4.6),
('Salade Protéinée', 'Salade riche en protéines avec poulet grillé', 14.00, 'Salades', ARRAY(SELECT id::text FROM public.ingredients WHERE name IN ('Lettuce', 'Chicken Breast', 'Tomatoes') LIMIT 3), true, 4.9);