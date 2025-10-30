import { useParams, useNavigate } from 'react-router-dom';
import { ImageUpload } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function VehicleImageUploadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">Upload Vehicle Images</h1>
          <p className="text-gray-600 mb-6">
            Add photos of your vehicle. You can upload up to 10 images.
          </p>

          <ImageUpload
            vehicleId={parseInt(id || '0')}
            onUploadSuccess={(images) => {
              console.log('Images uploaded:', images);
            }}
          />
        </div>
      </div>
    </div>
  );
}
