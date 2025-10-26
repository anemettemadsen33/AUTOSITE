import { renderHook } from '@testing-library/react';
import { useVehicleSubCategories } from '@/hooks/useVehicleSubCategories';
import { VehicleClass } from '@/lib/vehicleSubCategories';

describe('useVehicleSubCategories', () => {
  it('should return main category options', () => {
    const { result } = renderHook(() => useVehicleSubCategories());
    
    expect(result.current.mainCategoryOptions).toBeDefined();
    expect(result.current.mainCategoryOptions.length).toBeGreaterThan(0);
  });

  it('should return empty subcategories when no main category is selected', () => {
    const { result } = renderHook(() => useVehicleSubCategories());
    
    expect(result.current.subCategoryOptions).toEqual([]);
  });

  it('should return car subcategories when Car is selected', () => {
    const { result } = renderHook(() => 
      useVehicleSubCategories({ mainCategory: VehicleClass.CAR })
    );
    
    expect(result.current.subCategoryOptions.length).toBeGreaterThan(0);
    expect(result.current.subCategoryOptions[0]).toHaveProperty('value');
    expect(result.current.subCategoryOptions[0]).toHaveProperty('label');
  });

  it('should return motorbike subcategories when Motorbike is selected', () => {
    const { result } = renderHook(() => 
      useVehicleSubCategories({ mainCategory: VehicleClass.MOTORBIKE })
    );
    
    expect(result.current.subCategoryOptions.length).toBeGreaterThan(0);
    // Check that subcategories are motorbike-specific
    const labels = result.current.subCategoryOptions.map(opt => opt.label);
    expect(labels).toContain('Touring');
    expect(labels).toContain('Bagger');
  });

  it('should return German labels when locale is de', () => {
    const { result } = renderHook(() => 
      useVehicleSubCategories({ mainCategory: VehicleClass.CAR, locale: 'de' })
    );
    
    const labels = result.current.subCategoryOptions.map(opt => opt.label);
    // Check for German labels
    expect(labels).toContain('Cabrio');
    expect(labels).toContain('Kombi');
  });

  it('should provide all subcategories list', () => {
    const { result } = renderHook(() => useVehicleSubCategories());
    
    expect(result.current.allSubCategories).toBeDefined();
    expect(result.current.allSubCategories.length).toBeGreaterThan(0);
    expect(result.current.allSubCategories[0]).toHaveProperty('mainCategory');
  });

  it('should provide helper function to get main category from subcategory', () => {
    const { result } = renderHook(() => useVehicleSubCategories());
    
    expect(result.current.getMainCategoryFromSubCategory).toBeDefined();
    expect(typeof result.current.getMainCategoryFromSubCategory).toBe('function');
  });
});
