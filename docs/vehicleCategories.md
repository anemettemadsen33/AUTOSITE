# Vehicle Categories and Subcategories

This document describes the vehicle category structure used in the AUTOSITE platform, based on mobile.de classification standards.

## Overview

The platform supports multiple vehicle classes, each with specific subcategories. This structure follows the mobile.de CSV Upload-Interface specification to ensure compatibility with industry standards.

## Main Vehicle Classes

| Class Code | Description |
|-----------|-------------|
| `Car` | Passenger cars |
| `Motorbike` | Motorcycles and scooters |
| `VanUpTo7500` | Vans and utility vehicles up to 7500kg |
| `Truck` | Heavy trucks over 7500kg |
| `ConstructionMachine` | Construction and heavy machinery |
| `Trailer` | Trailers and semi-trailers |
| `Caravan` | Caravans and motorhomes |
| `AgriculturalVehicle` | Agricultural vehicles and equipment |

## Category Details with Subcategories

### Car (Passenger Vehicles)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `Car.Sedan` | Sedan | Limousine |
| `Car.Cabrio` | Cabrio | Cabrio |
| `Car.Coupe` | Coupe | Coupé |
| `Car.StationWagon` | Station Wagon | Kombi |
| `Car.SUV` | SUV | SUV |
| `Car.Hatchback` | Hatchback | Schrägheck |
| `Car.Compact` | Compact | Kleinwagen |
| `Car.SportsCar` | Sports Car | Sportwagen |
| `Car.Van` | Van | Van |
| `Car.Limousine` | Limousine | Limousine |
| `Car.OffRoad` | Off-Road | Geländewagen |

### Motorbike (Motorcycles)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `Motorbike.Touring` | Touring | Tourer |
| `Motorbike.Bagger` | Bagger | Bagger |
| `Motorbike.Sport` | Sport | Sportler |
| `Motorbike.NakedBike` | Naked Bike | Naked Bike |
| `Motorbike.Cruiser` | Cruiser | Cruiser |
| `Motorbike.Chopper` | Chopper | Chopper |
| `Motorbike.Enduro` | Enduro | Enduro |
| `Motorbike.Motocross` | Motocross | Motocross |
| `Motorbike.Scooter` | Scooter | Roller |
| `Motorbike.Classic` | Classic | Oldtimer |
| `Motorbike.QuadATV` | Quad/ATV | Quad/ATV |

### VanUpTo7500 (Utility Vehicles)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `VanUpTo7500.BoxVan` | Box Van | Kastenwagen |
| `VanUpTo7500.PanelVan` | Panel Van | Transporter |
| `VanUpTo7500.Pickup` | Pickup | Pritschenwagen |
| `VanUpTo7500.ChassisCab` | Chassis Cab | Fahrgestell |
| `VanUpTo7500.RefrigeratedVan` | Refrigerated Van | Kühlwagen |
| `VanUpTo7500.Tipper` | Tipper | Kipper |
| `VanUpTo7500.Minibus` | Minibus | Kleinbus |
| `VanUpTo7500.PlatformChassis` | Platform Chassis | Pritsche/Fahrgestell |

### Truck (Heavy Trucks)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `Truck.BoxTruck` | Box Truck | Koffer-LKW |
| `Truck.Flatbed` | Flatbed | Pritsche |
| `Truck.Refrigerated` | Refrigerated | Kühl-LKW |
| `Truck.Tipper` | Tipper | Kipper |
| `Truck.Tanker` | Tanker | Tankwagen |
| `Truck.Crane` | Crane Truck | Kranwagen |
| `Truck.TractorUnit` | Tractor Unit | Sattelzugmaschine |
| `Truck.ConcreteMixer` | Concrete Mixer | Betonmischer |
| `Truck.GarbageTruck` | Garbage Truck | Müllwagen |
| `Truck.CarTransporter` | Car Transporter | Autotransporter |

### ConstructionMachine (Construction Machinery)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `ConstructionMachine.Excavator` | Excavator | Bagger |
| `ConstructionMachine.MiniExcavator` | Mini Excavator | Minibagger |
| `ConstructionMachine.WheelLoader` | Wheel Loader | Radlader |
| `ConstructionMachine.Bulldozer` | Bulldozer | Planierraupe |
| `ConstructionMachine.BackhoeLoader` | Backhoe Loader | Baggerlader |
| `ConstructionMachine.TelescopicHandler` | Telescopic Handler | Teleskoplader |
| `ConstructionMachine.Forklift` | Forklift | Gabelstapler |
| `ConstructionMachine.Crane` | Crane | Kran |
| `ConstructionMachine.Roller` | Roller | Walze |
| `ConstructionMachine.Grader` | Grader | Grader |
| `ConstructionMachine.Compactor` | Compactor | Verdichter |
| `ConstructionMachine.ConcretePump` | Concrete Pump | Betonpumpe |

### Trailer (Trailers)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `Trailer.BoxTrailer` | Box Trailer | Kofferanhänger |
| `Trailer.FlatbedTrailer` | Flatbed Trailer | Pritschenanhänger |
| `Trailer.RefrigeratedTrailer` | Refrigerated Trailer | Kühlanhänger |
| `Trailer.TipperTrailer` | Tipper Trailer | Kippanhänger |
| `Trailer.TankerTrailer` | Tanker Trailer | Tankanhänger |
| `Trailer.Lowloader` | Lowloader | Tieflader |
| `Trailer.Curtainsider` | Curtainsider | Planenanhänger |
| `Trailer.CarCarrier` | Car Carrier | Autotransportanhänger |

### Caravan (Caravans & Motorhomes)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `Caravan.Caravan` | Caravan | Wohnwagen |
| `Caravan.Motorhome` | Motorhome | Wohnmobil |
| `Caravan.CamperVan` | Camper Van | Campingbus |
| `Caravan.FifthWheel` | Fifth Wheel | Fünfte Rad |

### AgriculturalVehicle (Agricultural Vehicles)

| Code | Label (EN) | Label (DE) |
|------|-----------|-----------|
| `AgriculturalVehicle.Tractor` | Tractor | Traktor |
| `AgriculturalVehicle.CombineHarvester` | Combine Harvester | Mähdrescher |
| `AgriculturalVehicle.ForageHarvester` | Forage Harvester | Feldhäcksler |
| `AgriculturalVehicle.Baler` | Baler | Ballenpresse |
| `AgriculturalVehicle.Sprayer` | Sprayer | Feldspritze |
| `AgriculturalVehicle.SeedingMachine` | Seeding Machine | Sämaschine |
| `AgriculturalVehicle.Plough` | Plough | Pflug |

## Implementation

### Frontend Files

1. **`/lib/vehicleSubCategories.ts`** - Core definitions, enums, and helper functions
2. **`/hooks/useVehicleSubCategories.ts`** - React hook for managing categories
3. **`/stores/filterStore.ts`** - Zustand store for category state with localStorage persistence
4. **`/components/Filters.tsx`** - Updated filter component with dependent dropdowns
5. **`/components/VehicleForm.tsx`** - Updated vehicle form with category fields

### Usage Examples

#### Using the Hook

```typescript
import { useVehicleSubCategories } from '@/hooks/useVehicleSubCategories';

const MyComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleClass>();
  
  const { mainCategoryOptions, subCategoryOptions } = useVehicleSubCategories({
    mainCategory: selectedCategory,
    locale: 'en', // or 'de' for German
  });
  
  // Use the options in your component
};
```

#### Using the Filter Store

```typescript
import { useFilterStore } from '@/stores/filterStore';

const FilterComponent = () => {
  const { mainCategory, subCategory, setMainCategory, setSubCategory } = useFilterStore();
  
  const handleCategoryChange = (category: VehicleClass) => {
    setMainCategory(category);
    // Subcategory is automatically reset
  };
};
```

#### Helper Functions

```typescript
import { getSubCategoriesByMainCategory, getMainCategoryFromSubCategory } from '@/lib/vehicleSubCategories';

// Get all subcategories for a main category
const carSubCategories = getSubCategoriesByMainCategory(VehicleClass.CAR);

// Get main category from a subcategory code
const mainCat = getMainCategoryFromSubCategory(CarSubCategory.CABRIO);
```

## Validation

Categories are validated at multiple levels:

1. **TypeScript Types** - Compile-time type checking
2. **Form Validation** - React Hook Form validation rules
3. **API Validation** - Backend validation (to be implemented)

## Filtering

Vehicles can be filtered by:
- Main category only (shows all subcategories within that category)
- Main category + subcategory (precise filtering)
- No category selection (shows all vehicles)

## UI Behavior

- When a user selects a main category, the subcategory dropdown appears
- When the main category is changed, the subcategory selection is automatically reset
- Both selections are persisted to localStorage
- Filters are included in URL query parameters for shareable links

## References

- mobile.de API Documentation: https://services.mobile.de/
- CSV Upload-Interface: https://services.mobile.de/manual/upload-interface-csv_en.html
- Search API: https://services.mobile.de/docs/search-api.html
