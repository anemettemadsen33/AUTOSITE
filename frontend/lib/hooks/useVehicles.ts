import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import vehicleService, { VehicleFilters, Vehicle } from '../services/vehicle.service';

export function useVehicles(filters?: VehicleFilters) {
  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => vehicleService.getVehicles(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useVehicle(slug: string) {
  return useQuery({
    queryKey: ['vehicle', slug],
    queryFn: () => vehicleService.getVehicleBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Vehicle>) => vehicleService.createVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Vehicle> }) =>
      vehicleService.updateVehicle(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.id] });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}

export function useUploadVehicleImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehicleId, files }: { vehicleId: number; files: File[] }) =>
      vehicleService.uploadVehicleImages(vehicleId, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.vehicleId] });
    },
  });
}
