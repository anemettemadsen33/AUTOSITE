import { z } from 'zod';
import {
  VehicleClass,
  CarSubCategory,
  MotorbikeSubCategory,
  VanSubCategory,
  TruckSubCategory,
  ConstructionMachineSubCategory,
  TrailerSubCategory,
  CaravanSubCategory,
  AgriculturalVehicleSubCategory,
  getMainCategoryFromSubCategory,
} from './vehicleSubCategories';

// Enum validators for main categories
export const vehicleClassSchema = z.nativeEnum(VehicleClass);

// Enum validators for subcategories
export const carSubCategorySchema = z.nativeEnum(CarSubCategory);
export const motorbikeSubCategorySchema = z.nativeEnum(MotorbikeSubCategory);
export const vanSubCategorySchema = z.nativeEnum(VanSubCategory);
export const truckSubCategorySchema = z.nativeEnum(TruckSubCategory);
export const constructionMachineSubCategorySchema = z.nativeEnum(ConstructionMachineSubCategory);
export const trailerSubCategorySchema = z.nativeEnum(TrailerSubCategory);
export const caravanSubCategorySchema = z.nativeEnum(CaravanSubCategory);
export const agriculturalVehicleSubCategorySchema = z.nativeEnum(AgriculturalVehicleSubCategory);

// Union of all subcategory schemas
export const vehicleSubCategorySchema = z.union([
  carSubCategorySchema,
  motorbikeSubCategorySchema,
  vanSubCategorySchema,
  truckSubCategorySchema,
  constructionMachineSubCategorySchema,
  trailerSubCategorySchema,
  caravanSubCategorySchema,
  agriculturalVehicleSubCategorySchema,
]);

// Vehicle filter schema with category validation
export const vehicleFiltersSchema = z
  .object({
    make: z.string().optional(),
    model: z.string().optional(),
    year_min: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    year_max: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    price_min: z.number().min(0).optional(),
    price_max: z.number().min(0).optional(),
    mileage_min: z.number().min(0).optional(),
    mileage_max: z.number().min(0).optional(),
    fuel_type: z.string().optional(),
    transmission: z.string().optional(),
    body_type: z.string().optional(),
    color: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    main_category: vehicleClassSchema.optional(),
    sub_category: vehicleSubCategorySchema.optional(),
    sort: z.string().optional(),
    page: z.number().int().positive().optional(),
    per_page: z.number().int().positive().max(100).optional(),
  })
  .refine(
    (data) => {
      // If year_max is provided, it should be >= year_min
      if (data.year_min !== undefined && data.year_max !== undefined) {
        return data.year_max >= data.year_min;
      }
      return true;
    },
    {
      message: 'Maximum year must be greater than or equal to minimum year',
      path: ['year_max'],
    }
  )
  .refine(
    (data) => {
      // If price_max is provided, it should be >= price_min
      if (data.price_min !== undefined && data.price_max !== undefined) {
        return data.price_max >= data.price_min;
      }
      return true;
    },
    {
      message: 'Maximum price must be greater than or equal to minimum price',
      path: ['price_max'],
    }
  )
  .refine(
    (data) => {
      // If mileage_max is provided, it should be >= mileage_min
      if (data.mileage_min !== undefined && data.mileage_max !== undefined) {
        return data.mileage_max >= data.mileage_min;
      }
      return true;
    },
    {
      message: 'Maximum mileage must be greater than or equal to minimum mileage',
      path: ['mileage_max'],
    }
  )
  .refine(
    (data) => {
      // If sub_category is provided, it must match the main_category
      if (data.sub_category && data.main_category) {
        const expectedMainCategory = getMainCategoryFromSubCategory(data.sub_category);
        return expectedMainCategory === data.main_category;
      }
      return true;
    },
    {
      message: 'Sub-category must belong to the selected main category',
      path: ['sub_category'],
    }
  );

// Vehicle form data schema
export const vehicleFormSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .int()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Invalid year'),
  mileage: z.number().min(0, 'Mileage must be positive'),
  price_amount: z.number().min(1, 'Price must be greater than 0'),
  price_currency: z.string().min(1, 'Currency is required'),
  fuel_type: z.string().optional(),
  transmission: z.string().optional(),
  body_type: z.string().optional(),
  color: z.string().optional(),
  vin: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(['available', 'sold', 'reserved']),
  title_en: z.string().optional(),
  title_ro: z.string().optional(),
  description_en: z.string().optional(),
  description_ro: z.string().optional(),
  meta_title: z.string().max(60, 'Meta title should not exceed 60 characters').optional(),
  meta_description: z.string().max(160, 'Meta description should not exceed 160 characters').optional(),
  main_category: vehicleClassSchema.optional(),
  sub_category: vehicleSubCategorySchema.optional(),
}).refine(
  (data) => {
    // If sub_category is provided, main_category must also be provided
    if (data.sub_category && !data.main_category) {
      return false;
    }
    return true;
  },
  {
    message: 'Main category is required when sub-category is selected',
    path: ['main_category'],
  }
).refine(
  (data) => {
    // If sub_category is provided, it must match the main_category
    if (data.sub_category && data.main_category) {
      const expectedMainCategory = getMainCategoryFromSubCategory(data.sub_category);
      return expectedMainCategory === data.main_category;
    }
    return true;
  },
  {
    message: 'Sub-category must belong to the selected main category',
    path: ['sub_category'],
  }
);

export type VehicleFilters = z.infer<typeof vehicleFiltersSchema>;
export type VehicleFormData = z.infer<typeof vehicleFormSchema>;
