# Vehicle Categories Feature - Testing Guide

## Overview
This document provides testing instructions for the new vehicle categories and subcategories feature.

## Features to Test

### 1. Filter Component (Filters.tsx)

**Test Steps:**
1. Navigate to the vehicles listing page (`/vehicles`)
2. Locate the category filter dropdowns
3. Select a main category (e.g., "Car")
   - **Expected:** Subcategory dropdown appears
   - **Expected:** Subcategory dropdown is populated with Car-specific options (Sedan, Cabrio, SUV, etc.)
4. Select a subcategory (e.g., "Cabrio")
   - **Expected:** Both category and subcategory are applied to filters
5. Click "Apply Filters"
   - **Expected:** URL updates with `main_category=Car&sub_category=Car.Cabrio`
   - **Expected:** Vehicle list filters accordingly (backend dependent)
6. Change main category to "Motorbike"
   - **Expected:** Subcategory is automatically reset
   - **Expected:** Subcategory dropdown shows Motorbike options (Touring, Bagger, Sport, etc.)
7. Click "Reset"
   - **Expected:** Both category fields are cleared
   - **Expected:** All vehicles are shown

### 2. Vehicle Form (VehicleForm.tsx)

**Test Steps:**
1. Log in as a dealer or admin
2. Navigate to create new vehicle page (`/user/dashboard/new`)
3. Locate the category fields in the Basic Information section
4. Select a main category (e.g., "VanUpTo7500")
   - **Expected:** Subcategory dropdown appears
   - **Expected:** Shows van-specific options (Box Van, Pickup, Panel Van, etc.)
5. Select a subcategory (e.g., "Pickup")
6. Fill in other required fields
7. Submit the form
   - **Expected:** Category fields are included in the submission
   - **Expected:** Success message appears
8. Edit an existing vehicle
   - **Expected:** Category fields are pre-populated if available

### 3. LocalStorage Persistence

**Test Steps:**
1. On the vehicles page, select a category and subcategory
2. Refresh the page
   - **Expected:** Selected categories persist after refresh
3. Clear browser storage (DevTools > Application > Local Storage)
4. Refresh the page
   - **Expected:** Categories are reset to default (empty)

### 4. Responsive Design

**Test Steps:**
1. Open the vehicles page
2. Test on desktop (1920x1080)
   - **Expected:** Category dropdowns are visible in 3-column grid
3. Test on tablet (768x1024)
   - **Expected:** Category dropdowns are visible in 2-column grid
4. Test on mobile (375x667)
   - **Expected:** Category dropdowns stack vertically
   - **Expected:** All functionality works on touch devices

### 5. Validation

**Test Steps:**
1. In developer console, test validation:
```javascript
import { vehicleFiltersSchema } from '@/lib/validationSchemas';

// Valid filters
vehicleFiltersSchema.parse({
  main_category: 'Car',
  sub_category: 'Car.Cabrio'
}); // Should succeed

// Invalid - mismatched categories
vehicleFiltersSchema.parse({
  main_category: 'Car',
  sub_category: 'Motorbike.Touring'
}); // Should fail with error

// Invalid - year range
vehicleFiltersSchema.parse({
  year_min: 2020,
  year_max: 2015
}); // Should fail with error
```

### 6. Helper Functions

**Test Steps:**
1. In developer console, test helper functions:
```javascript
import { 
  getSubCategoriesByMainCategory, 
  getMainCategoryFromSubCategory,
  VehicleClass,
  CarSubCategory 
} from '@/lib/vehicleSubCategories';

// Get subcategories for Cars
const carSubs = getSubCategoriesByMainCategory(VehicleClass.CAR);
console.log(carSubs); // Should show array of car subcategories

// Get main category from subcategory
const mainCat = getMainCategoryFromSubCategory(CarSubCategory.CABRIO);
console.log(mainCat); // Should return VehicleClass.CAR
```

## Expected Results Summary

✅ **Main category selection** shows appropriate subcategories  
✅ **Subcategory dropdown** only appears when main category is selected  
✅ **Changing main category** resets subcategory  
✅ **Filters persist** in localStorage  
✅ **URL parameters** include category filters  
✅ **Validation** prevents invalid category combinations  
✅ **Responsive design** works on all screen sizes  
✅ **Forms** properly handle category selection  

## Known Limitations

- Backend API integration is required for actual filtering to work
- Category data is stored in the database (backend schema update needed)
- Translation keys for categories may need to be added to i18n files

## Category Coverage

### Main Categories (8)
- Car
- Motorbike  
- VanUpTo7500
- Truck
- ConstructionMachine
- Trailer
- Caravan
- AgriculturalVehicle

### Subcategories (90+)
- Car: 11 subcategories (Sedan, Cabrio, SUV, etc.)
- Motorbike: 11 subcategories (Touring, Bagger, Sport, etc.)
- VanUpTo7500: 8 subcategories (Box Van, Pickup, etc.)
- Truck: 10 subcategories (Box Truck, Flatbed, etc.)
- ConstructionMachine: 12 subcategories (Excavator, Bulldozer, etc.)
- Trailer: 8 subcategories (Box Trailer, Flatbed Trailer, etc.)
- Caravan: 4 subcategories (Caravan, Motorhome, etc.)
- AgriculturalVehicle: 7 subcategories (Tractor, Harvester, etc.)

## Mobile.de Compatibility

All category codes follow mobile.de conventions:
- Format: `MainCategory.SubCategory` (e.g., `Car.Cabrio`)
- Compatible with mobile.de CSV Upload-Interface
- Bilingual labels (EN/DE) for international support

## Next Steps for Full Integration

1. **Backend**: Add `main_category` and `sub_category` columns to vehicles table
2. **Backend**: Update API to accept and filter by categories
3. **Backend**: Add validation for category codes
4. **Frontend**: Add translation keys for categories to i18n files
5. **Frontend**: Update vehicle detail page to display category
6. **Frontend**: Add category badges/icons to vehicle cards
