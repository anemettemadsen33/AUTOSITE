import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';

interface ImageUploadProps {
  vehicleId: number;
  currentImages?: string[];
  onUploadSuccess?: (images: string[]) => void;
}

export function ImageUpload({ vehicleId, currentImages = [], onUploadSuccess }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(currentImages);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images[]', file);
      });

      const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newImages = response.data.images.map((img: any) => img.url);
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      
      toast.success('Images uploaded successfully');
      onUploadSuccess?.(updatedImages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await api.delete(`/vehicles/${vehicleId}/images/${index}`);
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      toast.success('Image deleted');
      onUploadSuccess?.(updatedImages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete image');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {uploading ? 'Uploading...' : 'Click to upload images (max 10, 5MB each)'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Vehicle ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
