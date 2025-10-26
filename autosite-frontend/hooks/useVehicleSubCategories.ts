import { useMemo } from 'react';
import {
  VehicleClass,
  VehicleSubCategoryCode,
  getSubCategoriesByMainCategory,
  getMainCategoryFromSubCategory,
  getMainCategoryOptions,
  VEHICLE_SUB_CATEGORIES,
} from '@/lib/vehicleSubCategories';

interface UseVehicleSubCategoriesProps {
  mainCategory?: VehicleClass;
  locale?: string;
}

interface SubCategoryOption {
  value: VehicleSubCategoryCode;
  label: string;
}

interface MainCategoryOption {
  value: VehicleClass;
  label: string;
}

/**
 * Hook to manage vehicle subcategories based on the selected main category
 * 
 * @param mainCategory - The selected main category (e.g., Car, Motorbike, etc.)
 * @param locale - The locale for labels (en or de), defaults to 'en'
 * 
 * @returns Object containing:
 *   - mainCategoryOptions: Array of main category options
 *   - subCategoryOptions: Array of subcategory options filtered by main category
 *   - getMainCategoryFromSubCategory: Function to get main category from subcategory
 *   - allSubCategories: All available subcategories
 */
export const useVehicleSubCategories = ({
  mainCategory,
  locale = 'en',
}: UseVehicleSubCategoriesProps = {}) => {
  // Get main category options
  const mainCategoryOptions: MainCategoryOption[] = useMemo(() => {
    return getMainCategoryOptions();
  }, []);

  // Get subcategories filtered by main category
  const subCategoryOptions: SubCategoryOption[] = useMemo(() => {
    if (!mainCategory) {
      return [];
    }

    const subcategories = getSubCategoriesByMainCategory(mainCategory);
    return subcategories.map((sub) => ({
      value: sub.code,
      label: locale === 'de' ? sub.labelDe : sub.label,
    }));
  }, [mainCategory, locale]);

  // Get all subcategories (for reference or fallback)
  const allSubCategories = useMemo(() => {
    return VEHICLE_SUB_CATEGORIES.map((sub) => ({
      value: sub.code,
      label: locale === 'de' ? sub.labelDe : sub.label,
      mainCategory: sub.mainCategory,
    }));
  }, [locale]);

  return {
    mainCategoryOptions,
    subCategoryOptions,
    getMainCategoryFromSubCategory,
    allSubCategories,
  };
};
