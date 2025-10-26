/**
 * Vehicle categories and subcategories based on mobile.de classification
 * Reference: mobile.de Upload-Interface CSV documentation
 */

// Main vehicle classes
export enum VehicleClass {
  CAR = 'Car',
  MOTORBIKE = 'Motorbike',
  VAN_UP_TO_7500 = 'VanUpTo7500',
  TRUCK = 'Truck',
  CONSTRUCTION_MACHINE = 'ConstructionMachine',
  TRAILER = 'Trailer',
  CARAVAN = 'Caravan',
  AGRICULTURAL_VEHICLE = 'AgriculturalVehicle',
}

// Car subcategories
export enum CarSubCategory {
  SEDAN = 'Car.Sedan',
  CABRIO = 'Car.Cabrio',
  COUPE = 'Car.Coupe',
  STATION_WAGON = 'Car.StationWagon',
  SUV = 'Car.SUV',
  HATCHBACK = 'Car.Hatchback',
  COMPACT = 'Car.Compact',
  SPORTS_CAR = 'Car.SportsCar',
  VAN = 'Car.Van',
  LIMOUSINE = 'Car.Limousine',
  OFF_ROAD = 'Car.OffRoad',
}

// Motorbike subcategories
export enum MotorbikeSubCategory {
  TOURING = 'Motorbike.Touring',
  BAGGER = 'Motorbike.Bagger',
  SPORT = 'Motorbike.Sport',
  NAKED_BIKE = 'Motorbike.NakedBike',
  CRUISER = 'Motorbike.Cruiser',
  CHOPPER = 'Motorbike.Chopper',
  ENDURO = 'Motorbike.Enduro',
  MOTOCROSS = 'Motorbike.Motocross',
  SCOOTER = 'Motorbike.Scooter',
  CLASSIC = 'Motorbike.Classic',
  QUAD_ATV = 'Motorbike.QuadATV',
}

// Van/Utility vehicle subcategories
export enum VanSubCategory {
  BOX_VAN = 'VanUpTo7500.BoxVan',
  PANEL_VAN = 'VanUpTo7500.PanelVan',
  PICKUP = 'VanUpTo7500.Pickup',
  CHASSIS_CAB = 'VanUpTo7500.ChassisCab',
  REFRIGERATED_VAN = 'VanUpTo7500.RefrigeratedVan',
  TIPPER = 'VanUpTo7500.Tipper',
  MINIBUS = 'VanUpTo7500.Minibus',
  PLATFORM_CHASSIS = 'VanUpTo7500.PlatformChassis',
}

// Truck subcategories
export enum TruckSubCategory {
  BOX_TRUCK = 'Truck.BoxTruck',
  FLATBED = 'Truck.Flatbed',
  REFRIGERATED = 'Truck.Refrigerated',
  TIPPER_TRUCK = 'Truck.Tipper',
  TANKER = 'Truck.Tanker',
  CRANE_TRUCK = 'Truck.Crane',
  TRACTOR_UNIT = 'Truck.TractorUnit',
  CONCRETE_MIXER = 'Truck.ConcreteMixer',
  GARBAGE_TRUCK = 'Truck.GarbageTruck',
  CAR_TRANSPORTER = 'Truck.CarTransporter',
}

// Construction machine subcategories
export enum ConstructionMachineSubCategory {
  EXCAVATOR = 'ConstructionMachine.Excavator',
  MINI_EXCAVATOR = 'ConstructionMachine.MiniExcavator',
  WHEEL_LOADER = 'ConstructionMachine.WheelLoader',
  BULLDOZER = 'ConstructionMachine.Bulldozer',
  BACKHOE_LOADER = 'ConstructionMachine.BackhoeLoader',
  TELESCOPIC_HANDLER = 'ConstructionMachine.TelescopicHandler',
  FORKLIFT = 'ConstructionMachine.Forklift',
  CRANE = 'ConstructionMachine.Crane',
  ROLLER = 'ConstructionMachine.Roller',
  GRADER = 'ConstructionMachine.Grader',
  COMPACTOR = 'ConstructionMachine.Compactor',
  CONCRETE_PUMP = 'ConstructionMachine.ConcretePump',
}

// Trailer subcategories
export enum TrailerSubCategory {
  BOX_TRAILER = 'Trailer.BoxTrailer',
  FLATBED_TRAILER = 'Trailer.FlatbedTrailer',
  REFRIGERATED_TRAILER = 'Trailer.RefrigeratedTrailer',
  TIPPER_TRAILER = 'Trailer.TipperTrailer',
  TANKER_TRAILER = 'Trailer.TankerTrailer',
  LOWLOADER = 'Trailer.Lowloader',
  CURTAINSIDER = 'Trailer.Curtainsider',
  CAR_CARRIER = 'Trailer.CarCarrier',
}

// Caravan/Motorhome subcategories
export enum CaravanSubCategory {
  CARAVAN = 'Caravan.Caravan',
  MOTORHOME = 'Caravan.Motorhome',
  CAMPER_VAN = 'Caravan.CamperVan',
  FIFTH_WHEEL = 'Caravan.FifthWheel',
}

// Agricultural vehicle subcategories
export enum AgriculturalVehicleSubCategory {
  TRACTOR = 'AgriculturalVehicle.Tractor',
  COMBINE_HARVESTER = 'AgriculturalVehicle.CombineHarvester',
  FORAGE_HARVESTER = 'AgriculturalVehicle.ForageHarvester',
  BALER = 'AgriculturalVehicle.Baler',
  SPRAYER = 'AgriculturalVehicle.Sprayer',
  SEEDING_MACHINE = 'AgriculturalVehicle.SeedingMachine',
  PLOUGH = 'AgriculturalVehicle.Plough',
}

export type VehicleSubCategoryCode =
  | CarSubCategory
  | MotorbikeSubCategory
  | VanSubCategory
  | TruckSubCategory
  | ConstructionMachineSubCategory
  | TrailerSubCategory
  | CaravanSubCategory
  | AgriculturalVehicleSubCategory;

export interface VehicleSubCategoryOption {
  code: VehicleSubCategoryCode;
  label: string;
  labelDe: string;
  mainCategory: VehicleClass;
}

// Complete list of all subcategories with labels
export const VEHICLE_SUB_CATEGORIES: VehicleSubCategoryOption[] = [
  // Car subcategories
  { code: CarSubCategory.SEDAN, label: 'Sedan', labelDe: 'Limousine', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.CABRIO, label: 'Cabrio', labelDe: 'Cabrio', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.COUPE, label: 'Coupe', labelDe: 'Coupé', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.STATION_WAGON, label: 'Station Wagon', labelDe: 'Kombi', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.SUV, label: 'SUV', labelDe: 'SUV', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.HATCHBACK, label: 'Hatchback', labelDe: 'Schrägheck', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.COMPACT, label: 'Compact', labelDe: 'Kleinwagen', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.SPORTS_CAR, label: 'Sports Car', labelDe: 'Sportwagen', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.VAN, label: 'Van', labelDe: 'Van', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.LIMOUSINE, label: 'Limousine', labelDe: 'Limousine', mainCategory: VehicleClass.CAR },
  { code: CarSubCategory.OFF_ROAD, label: 'Off-Road', labelDe: 'Geländewagen', mainCategory: VehicleClass.CAR },

  // Motorbike subcategories
  { code: MotorbikeSubCategory.TOURING, label: 'Touring', labelDe: 'Tourer', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.BAGGER, label: 'Bagger', labelDe: 'Bagger', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.SPORT, label: 'Sport', labelDe: 'Sportler', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.NAKED_BIKE, label: 'Naked Bike', labelDe: 'Naked Bike', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.CRUISER, label: 'Cruiser', labelDe: 'Cruiser', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.CHOPPER, label: 'Chopper', labelDe: 'Chopper', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.ENDURO, label: 'Enduro', labelDe: 'Enduro', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.MOTOCROSS, label: 'Motocross', labelDe: 'Motocross', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.SCOOTER, label: 'Scooter', labelDe: 'Roller', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.CLASSIC, label: 'Classic', labelDe: 'Oldtimer', mainCategory: VehicleClass.MOTORBIKE },
  { code: MotorbikeSubCategory.QUAD_ATV, label: 'Quad/ATV', labelDe: 'Quad/ATV', mainCategory: VehicleClass.MOTORBIKE },

  // Van subcategories
  { code: VanSubCategory.BOX_VAN, label: 'Box Van', labelDe: 'Kastenwagen', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.PANEL_VAN, label: 'Panel Van', labelDe: 'Transporter', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.PICKUP, label: 'Pickup', labelDe: 'Pritschenwagen', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.CHASSIS_CAB, label: 'Chassis Cab', labelDe: 'Fahrgestell', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.REFRIGERATED_VAN, label: 'Refrigerated Van', labelDe: 'Kühlwagen', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.TIPPER, label: 'Tipper', labelDe: 'Kipper', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.MINIBUS, label: 'Minibus', labelDe: 'Kleinbus', mainCategory: VehicleClass.VAN_UP_TO_7500 },
  { code: VanSubCategory.PLATFORM_CHASSIS, label: 'Platform Chassis', labelDe: 'Pritsche/Fahrgestell', mainCategory: VehicleClass.VAN_UP_TO_7500 },

  // Truck subcategories
  { code: TruckSubCategory.BOX_TRUCK, label: 'Box Truck', labelDe: 'Koffer-LKW', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.FLATBED, label: 'Flatbed', labelDe: 'Pritsche', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.REFRIGERATED, label: 'Refrigerated', labelDe: 'Kühl-LKW', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.TIPPER_TRUCK, label: 'Tipper', labelDe: 'Kipper', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.TANKER, label: 'Tanker', labelDe: 'Tankwagen', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.CRANE_TRUCK, label: 'Crane Truck', labelDe: 'Kranwagen', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.TRACTOR_UNIT, label: 'Tractor Unit', labelDe: 'Sattelzugmaschine', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.CONCRETE_MIXER, label: 'Concrete Mixer', labelDe: 'Betonmischer', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.GARBAGE_TRUCK, label: 'Garbage Truck', labelDe: 'Müllwagen', mainCategory: VehicleClass.TRUCK },
  { code: TruckSubCategory.CAR_TRANSPORTER, label: 'Car Transporter', labelDe: 'Autotransporter', mainCategory: VehicleClass.TRUCK },

  // Construction machine subcategories
  { code: ConstructionMachineSubCategory.EXCAVATOR, label: 'Excavator', labelDe: 'Bagger', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.MINI_EXCAVATOR, label: 'Mini Excavator', labelDe: 'Minibagger', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.WHEEL_LOADER, label: 'Wheel Loader', labelDe: 'Radlader', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.BULLDOZER, label: 'Bulldozer', labelDe: 'Planierraupe', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.BACKHOE_LOADER, label: 'Backhoe Loader', labelDe: 'Baggerlader', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.TELESCOPIC_HANDLER, label: 'Telescopic Handler', labelDe: 'Teleskoplader', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.FORKLIFT, label: 'Forklift', labelDe: 'Gabelstapler', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.CRANE, label: 'Crane', labelDe: 'Kran', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.ROLLER, label: 'Roller', labelDe: 'Walze', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.GRADER, label: 'Grader', labelDe: 'Grader', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.COMPACTOR, label: 'Compactor', labelDe: 'Verdichter', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },
  { code: ConstructionMachineSubCategory.CONCRETE_PUMP, label: 'Concrete Pump', labelDe: 'Betonpumpe', mainCategory: VehicleClass.CONSTRUCTION_MACHINE },

  // Trailer subcategories
  { code: TrailerSubCategory.BOX_TRAILER, label: 'Box Trailer', labelDe: 'Kofferanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.FLATBED_TRAILER, label: 'Flatbed Trailer', labelDe: 'Pritschenanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.REFRIGERATED_TRAILER, label: 'Refrigerated Trailer', labelDe: 'Kühlanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.TIPPER_TRAILER, label: 'Tipper Trailer', labelDe: 'Kippanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.TANKER_TRAILER, label: 'Tanker Trailer', labelDe: 'Tankanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.LOWLOADER, label: 'Lowloader', labelDe: 'Tieflader', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.CURTAINSIDER, label: 'Curtainsider', labelDe: 'Planenanhänger', mainCategory: VehicleClass.TRAILER },
  { code: TrailerSubCategory.CAR_CARRIER, label: 'Car Carrier', labelDe: 'Autotransportanhänger', mainCategory: VehicleClass.TRAILER },

  // Caravan subcategories
  { code: CaravanSubCategory.CARAVAN, label: 'Caravan', labelDe: 'Wohnwagen', mainCategory: VehicleClass.CARAVAN },
  { code: CaravanSubCategory.MOTORHOME, label: 'Motorhome', labelDe: 'Wohnmobil', mainCategory: VehicleClass.CARAVAN },
  { code: CaravanSubCategory.CAMPER_VAN, label: 'Camper Van', labelDe: 'Campingbus', mainCategory: VehicleClass.CARAVAN },
  { code: CaravanSubCategory.FIFTH_WHEEL, label: 'Fifth Wheel', labelDe: 'Fünfte Rad', mainCategory: VehicleClass.CARAVAN },

  // Agricultural vehicle subcategories
  { code: AgriculturalVehicleSubCategory.TRACTOR, label: 'Tractor', labelDe: 'Traktor', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.COMBINE_HARVESTER, label: 'Combine Harvester', labelDe: 'Mähdrescher', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.FORAGE_HARVESTER, label: 'Forage Harvester', labelDe: 'Feldhäcksler', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.BALER, label: 'Baler', labelDe: 'Ballenpresse', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.SPRAYER, label: 'Sprayer', labelDe: 'Feldspritze', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.SEEDING_MACHINE, label: 'Seeding Machine', labelDe: 'Sämaschine', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
  { code: AgriculturalVehicleSubCategory.PLOUGH, label: 'Plough', labelDe: 'Pflug', mainCategory: VehicleClass.AGRICULTURAL_VEHICLE },
];

// Helper function to get subcategories by main category
export const getSubCategoriesByMainCategory = (mainCategory: VehicleClass): VehicleSubCategoryOption[] => {
  return VEHICLE_SUB_CATEGORIES.filter((sub) => sub.mainCategory === mainCategory);
};

// Helper function to get main category from subcategory code
export const getMainCategoryFromSubCategory = (subCategory: VehicleSubCategoryCode): VehicleClass | undefined => {
  const option = VEHICLE_SUB_CATEGORIES.find((sub) => sub.code === subCategory);
  return option?.mainCategory;
};

// Get all main categories as options
export const getMainCategoryOptions = () => {
  return Object.values(VehicleClass).map((value) => ({
    value,
    label: value.replace(/([A-Z])/g, ' $1').trim(), // Convert PascalCase to words
  }));
};
