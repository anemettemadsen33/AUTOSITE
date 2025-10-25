import { z } from 'zod';

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Registration form validation schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ['passwordConfirmation'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Vehicle search form validation schema
 */
export const vehicleSearchSchema = z.object({
  query: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  yearMin: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  yearMax: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  mileageMax: z.number().min(0).optional(),
  fuel: z.enum(['petrol', 'diesel', 'electric', 'hybrid', 'plugin_hybrid', 'other']).optional(),
  transmission: z.enum(['manual', 'automatic', 'semi_automatic']).optional(),
  bodyType: z.enum(['sedan', 'suv', 'coupe', 'convertible', 'wagon', 'van', 'truck', 'hatchback', 'other']).optional(),
  condition: z.enum(['new', 'used', 'certified']).optional(),
  locationCountry: z.string().length(2).optional(),
  locationCity: z.string().optional(),
}).refine((data) => {
  if (data.yearMin && data.yearMax) {
    return data.yearMin <= data.yearMax;
  }
  return true;
}, {
  message: 'Minimum year must be less than or equal to maximum year',
  path: ['yearMax'],
}).refine((data) => {
  if (data.priceMin && data.priceMax) {
    return data.priceMin <= data.priceMax;
  }
  return true;
}, {
  message: 'Minimum price must be less than or equal to maximum price',
  path: ['priceMax'],
});

export type VehicleSearchFormData = z.infer<typeof vehicleSearchSchema>;

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number is too long')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
