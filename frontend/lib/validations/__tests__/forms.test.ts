import { loginSchema, registerSchema, vehicleSearchSchema, contactFormSchema } from '../forms';

describe('Form Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'Password123',
      };
      
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123',
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'short',
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        passwordConfirmation: 'Password123',
      };
      
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject password without uppercase letter', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };
      
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        passwordConfirmation: 'DifferentPass123',
      };
      
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('vehicleSearchSchema', () => {
    it('should validate correct search data', () => {
      const validData = {
        make: 'BMW',
        model: 'X5',
        yearMin: 2015,
        yearMax: 2024,
        priceMin: 10000,
        priceMax: 50000,
      };
      
      const result = vehicleSearchSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid year range', () => {
      const invalidData = {
        yearMin: 2024,
        yearMax: 2015,
      };
      
      const result = vehicleSearchSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid price range', () => {
      const invalidData = {
        priceMin: 50000,
        priceMax: 10000,
      };
      
      const result = vehicleSearchSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept valid fuel type', () => {
      const validData = {
        fuel: 'electric' as const,
      };
      
      const result = vehicleSearchSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('contactFormSchema', () => {
    it('should validate correct contact data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with more than 10 characters.',
      };
      
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject short message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      };
      
      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept optional phone number', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'This is a valid message with more than 10 characters.',
      };
      
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
