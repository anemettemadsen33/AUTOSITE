import VehicleForm from '@/components/VehicleForm';

export const metadata = {
  title: 'Add New Vehicle | AutoMarket',
  description: 'Create a new vehicle listing on AutoMarket',
};

export default function NewVehiclePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Vehicle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Fill in the details to create a new vehicle listing
        </p>
      </div>

      <VehicleForm mode="create" />
    </div>
  );
}
