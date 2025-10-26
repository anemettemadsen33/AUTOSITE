import {
  VehicleClass,
  CarSubCategory,
  MotorbikeSubCategory,
  getSubCategoriesByMainCategory,
  getMainCategoryFromSubCategory,
  VEHICLE_SUB_CATEGORIES,
  getMainCategoryOptions,
} from '@/lib/vehicleSubCategories';

describe('vehicleSubCategories', () => {
  describe('VEHICLE_SUB_CATEGORIES', () => {
    it('should have subcategories defined', () => {
      expect(VEHICLE_SUB_CATEGORIES).toBeDefined();
      expect(VEHICLE_SUB_CATEGORIES.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each subcategory', () => {
      VEHICLE_SUB_CATEGORIES.forEach((subCat) => {
        expect(subCat).toHaveProperty('code');
        expect(subCat).toHaveProperty('label');
        expect(subCat).toHaveProperty('labelDe');
        expect(subCat).toHaveProperty('mainCategory');
      });
    });

    it('should have valid main category references', () => {
      const validMainCategories = Object.values(VehicleClass);
      VEHICLE_SUB_CATEGORIES.forEach((subCat) => {
        expect(validMainCategories).toContain(subCat.mainCategory);
      });
    });
  });

  describe('getSubCategoriesByMainCategory', () => {
    it('should return car subcategories for Car main category', () => {
      const carSubCategories = getSubCategoriesByMainCategory(VehicleClass.CAR);
      expect(carSubCategories.length).toBeGreaterThan(0);
      carSubCategories.forEach((subCat) => {
        expect(subCat.mainCategory).toBe(VehicleClass.CAR);
      });
    });

    it('should return motorbike subcategories for Motorbike main category', () => {
      const motorbikeSubCategories = getSubCategoriesByMainCategory(VehicleClass.MOTORBIKE);
      expect(motorbikeSubCategories.length).toBeGreaterThan(0);
      motorbikeSubCategories.forEach((subCat) => {
        expect(subCat.mainCategory).toBe(VehicleClass.MOTORBIKE);
      });
    });

    it('should return empty array for invalid main category', () => {
      const invalidCategories = getSubCategoriesByMainCategory('InvalidCategory' as VehicleClass);
      expect(invalidCategories).toEqual([]);
    });
  });

  describe('getMainCategoryFromSubCategory', () => {
    it('should return correct main category for car subcategory', () => {
      const mainCategory = getMainCategoryFromSubCategory(CarSubCategory.CABRIO);
      expect(mainCategory).toBe(VehicleClass.CAR);
    });

    it('should return correct main category for motorbike subcategory', () => {
      const mainCategory = getMainCategoryFromSubCategory(MotorbikeSubCategory.TOURING);
      expect(mainCategory).toBe(VehicleClass.MOTORBIKE);
    });

    it('should return undefined for invalid subcategory', () => {
      const mainCategory = getMainCategoryFromSubCategory('Invalid.SubCategory' as any);
      expect(mainCategory).toBeUndefined();
    });
  });

  describe('getMainCategoryOptions', () => {
    it('should return all main category options', () => {
      const options = getMainCategoryOptions();
      expect(options.length).toBe(Object.values(VehicleClass).length);
    });

    it('should have value and label for each option', () => {
      const options = getMainCategoryOptions();
      options.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
      });
    });
  });

  describe('Category Code Format', () => {
    it('should have correct format for all subcategory codes', () => {
      VEHICLE_SUB_CATEGORIES.forEach((subCat) => {
        // Code should be in format MainCategory.SubCategory
        // MainCategory can start with uppercase and contain numbers (e.g., VanUpTo7500)
        expect(subCat.code).toMatch(/^[A-Z][a-zA-Z0-9]*\.[A-Z][a-zA-Z0-9]+$/);
      });
    });

    it('should have unique codes', () => {
      const codes = VEHICLE_SUB_CATEGORIES.map(sub => sub.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });
  });

  describe('Bilingual Support', () => {
    it('should have English labels for all subcategories', () => {
      VEHICLE_SUB_CATEGORIES.forEach((subCat) => {
        expect(subCat.label).toBeTruthy();
        expect(subCat.label.length).toBeGreaterThan(0);
      });
    });

    it('should have German labels for all subcategories', () => {
      VEHICLE_SUB_CATEGORIES.forEach((subCat) => {
        expect(subCat.labelDe).toBeTruthy();
        expect(subCat.labelDe.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Coverage by Main Category', () => {
    it('should have car subcategories', () => {
      const carSubs = getSubCategoriesByMainCategory(VehicleClass.CAR);
      expect(carSubs.length).toBeGreaterThan(5); // At least 5 car subcategories
    });

    it('should have motorbike subcategories', () => {
      const bikeSubs = getSubCategoriesByMainCategory(VehicleClass.MOTORBIKE);
      expect(bikeSubs.length).toBeGreaterThan(5); // At least 5 motorbike subcategories
    });

    it('should have van subcategories', () => {
      const vanSubs = getSubCategoriesByMainCategory(VehicleClass.VAN_UP_TO_7500);
      expect(vanSubs.length).toBeGreaterThan(3); // At least 3 van subcategories
    });

    it('should have construction machine subcategories', () => {
      const machineSubs = getSubCategoriesByMainCategory(VehicleClass.CONSTRUCTION_MACHINE);
      expect(machineSubs.length).toBeGreaterThan(5); // At least 5 construction machine subcategories
    });
  });
});
