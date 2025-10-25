'use client';

import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Star } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface UploadedImage {
  id: number;
  uuid: string;
  url: string;
  thumb_url: string;
  large_url: string;
  name: string;
  size: number;
  order?: number;
}

interface ImageUploadProps {
  vehicleId: number;
  onUploadComplete?: (images: UploadedImage[]) => void;
  onDeleteImage?: (imageId: number) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  vehicleId,
  onUploadComplete,
  onDeleteImage,
  maxFiles = 10,
  maxSize = 5,
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      
      // Validate number of files
      if (images.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed`);
        return;
      }

      // Validate file sizes
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxSize * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        setError(`Some files are larger than ${maxSize}MB`);
        return;
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append('images[]', file);
        });

        const token = localStorage.getItem('auth_token');
        
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/images`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        const newImages = data.data || [];

        setImages((prev) => [...prev, ...newImages]);
        setUploadProgress(100);
        onUploadComplete?.(newImages);

        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      } catch (err) {
        setError('Failed to upload images. Please try again.');
        console.error(err);
      } finally {
        setUploading(false);
      }
    },
    [vehicleId, images.length, maxFiles, maxSize, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: maxFiles - images.length,
    disabled: uploading || images.length >= maxFiles,
  });

  const handleDeleteImage = async (imageId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/images/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setImages((prev) => prev.filter((img) => img.id !== imageId));
      onDeleteImage?.(imageId);
    } catch (err) {
      setError('Failed to delete image');
      console.error(err);
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/vehicles/${vehicleId}/images/${imageId}/primary`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to set primary image');
      }

      // Move image to first position
      setImages((prev) => {
        const image = prev.find((img) => img.id === imageId);
        if (!image) return prev;
        const others = prev.filter((img) => img.id !== imageId);
        return [image, ...others];
      });
    } catch (err) {
      setError('Failed to set primary image');
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${uploading || images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to select files
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Max {maxFiles} images • Up to {maxSize}MB each • JPEG, PNG, WebP
            </p>
            <p className="text-xs text-gray-500">
              {images.length} / {maxFiles} uploaded
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span className="text-sm">{error}</span>
          <button onClick={() => setError(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all"
            >
              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Primary
                  </span>
                </div>
              )}

              {/* Image */}
              <img
                src={image.thumb_url || image.url}
                alt={image.name}
                className="w-full h-48 object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {index !== 0 && (
                  <button
                    onClick={() => handleSetPrimary(image.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors"
                    title="Set as primary"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs truncate">{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !uploading && (
        <div className="text-center py-8">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
