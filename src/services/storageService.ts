import { supabase } from '@/integrations/supabase/client';

export class StorageService {
  static async uploadImage(file: File, bucket: 'ingredients' | 'menu-items', fileName?: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const finalFileName = fileName || `${Math.random()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(finalFileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  static async deleteImage(imageUrl: string, bucket: 'ingredients' | 'menu-items'): Promise<void> {
    try {
      // Extract the file path from the URL
      const url = new URL(imageUrl);
      const pathSegments = url.pathname.split('/');
      const fileName = pathSegments[pathSegments.length - 1];

      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  static async updateImage(
    oldImageUrl: string, 
    newFile: File, 
    bucket: 'ingredients' | 'menu-items',
    fileName?: string
  ): Promise<string> {
    try {
      // Delete old image if it exists
      if (oldImageUrl) {
        await this.deleteImage(oldImageUrl, bucket);
      }
      
      // Upload new image
      return await this.uploadImage(newFile, bucket, fileName);
    } catch (error: any) {
      console.error('Error updating image:', error);
      throw new Error(`Failed to update image: ${error.message}`);
    }
  }
}