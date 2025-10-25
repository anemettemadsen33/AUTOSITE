// Comprehensive car database - like mobile.de
export const CAR_BRANDS_MODELS = {
  'Audi': ['A1', 'A3', 'A4', 'A4 Allroad', 'A5', 'A6', 'A6 Allroad', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q8'],
  'BMW': ['Seria 1', 'Seria 2', 'Seria 2 Active Tourer', 'Seria 2 Gran Coupe', 'Seria 3', 'Seria 3 Touring', 'Seria 4', 'Seria 4 Gran Coupe', 'Seria 5', 'Seria 5 Touring', 'Seria 6', 'Seria 6 Gran Turismo', 'Seria 7', 'Seria 8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M8'],
  'Mercedes-Benz': ['Clasa A', 'Clasa B', 'Clasa C', 'Clasa C Estate', 'Clasa E', 'Clasa E Estate', 'Clasa S', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLC Coupe', 'GLE', 'GLE Coupe', 'GLS', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'AMG GT', 'G-Class', 'V-Class', 'Vito', 'Sprinter'],
  'Volkswagen': ['Polo', 'Golf', 'Golf Sportsvan', 'Passat', 'Passat Variant', 'Arteon', 'T-Cross', 'T-Roc', 'Tiguan', 'Tiguan Allspace', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'ID. Buzz', 'Up!', 'Taigo', 'Caddy', 'Multivan', 'Transporter'],
  'Toyota': ['Yaris', 'Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Land Cruiser', 'C-HR', 'Aygo X', 'bZ4X', 'GR Supra', 'GR86', 'Hilux', 'Proace', 'Proace City'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Mustang Mach-E', 'Puma', 'Kuga', 'Explorer', 'Ranger', 'Transit', 'Transit Custom', 'Bronco', 'Edge'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Combo', 'Vivaro', 'Movano'],
  'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Arkana', 'Austral', 'Scenic E-Tech', 'Zoe', 'Trafic', 'Master', 'Kangoo'],
  'Peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'e-208', 'e-2008', 'Rifter', 'Expert', 'Boxer'],
  'Dacia': ['Sandero', 'Sandero Stepway', 'Logan', 'Duster', 'Jogger', 'Spring', 'Bigster'],
  'Skoda': ['Fabia', 'Scala', 'Octavia', 'Octavia Combi', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq iV'],
  'Hyundai': ['i10', 'i20', 'i30', 'i30 Fastback', 'Elantra', 'Ioniq 5', 'Ioniq 6', 'Kona', 'Tucson', 'Santa Fe', 'Palisade', 'Staria'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Ceed Sportswagon', 'Proceed', 'Stonic', 'XCeed', 'Sportage', 'Sorento', 'EV6', 'EV9', 'Niro', 'Carnival'],
  'Mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'CX-80', 'MX-5', 'MX-30'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Ariya', 'Leaf', 'GT-R', 'Navara', 'NV300'],
  'Honda': ['Jazz', 'Civic', 'Civic Type R', 'Accord', 'HR-V', 'CR-V', 'ZR-V', 'e:Ny1'],
  'Volvo': ['XC40', 'XC40 Recharge', 'XC60', 'XC90', 'C40 Recharge', 'S60', 'S90', 'V60', 'V60 Cross Country', 'V90', 'V90 Cross Country'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
  'Porsche': ['911', 'Taycan', '718 Boxster', '718 Cayman', 'Panamera', 'Macan', 'Cayenne', 'Cayenne Coupe'],
  'Fiat': ['500', '500X', 'Panda', 'Tipo', '500e', '600e', 'Ducato', 'Doblo'],
  'Citroen': ['C3', 'C3 Aircross', 'C4', 'C5 X', 'C5 Aircross', 'e-C4', 'Berlingo', 'SpaceTourer', 'Jumpy'],
  'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  'Mini': ['Cooper 3-Door', 'Cooper 5-Door', 'Countryman', 'Clubman', 'Electric', 'Cabrio'],
  'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator', 'Avenger'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar'],
  'Lexus': ['UX', 'NX', 'RX', 'ES', 'IS', 'LC', 'LS'],
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale'],
  'Suzuki': ['Swift', 'Vitara', 'S-Cross', 'Jimny', 'Across', 'Ignis'],
  'Subaru': ['Impreza', 'XV', 'Forester', 'Outback', 'Solterra', 'WRX'],
  'Mitsubishi': ['Space Star', 'ASX', 'Eclipse Cross', 'Outlander', 'L200'],
};

export const ALL_BRANDS = Object.keys(CAR_BRANDS_MODELS).sort();

export const getModelsForBrand = (brand: string): string[] => {
  return CAR_BRANDS_MODELS[brand as keyof typeof CAR_BRANDS_MODELS] || [];
};

export const fuelTypes = [
  { value: 'petrol', label: 'Benzină' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hibrid' },
  { value: 'plug-in-hybrid', label: 'Plug-in Hibrid' },
  { value: 'lpg', label: 'GPL' },
  { value: 'cng', label: 'CNG' },
];

export const transmissionTypes = [
  { value: 'manual', label: 'Manuală' },
  { value: 'automatic', label: 'Automată' },
  { value: 'semi-automatic', label: 'Semi-automată' },
];

export const bodyTypes = [
  { value: 'sedan', label: 'Sedan', icon: '🚗' },
  { value: 'hatchback', label: 'Hatchback', icon: '🚕' },
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'coupe', label: 'Coupe', icon: '🏎️' },
  { value: 'wagon', label: 'Break', icon: '🚐' },
  { value: 'convertible', label: 'Cabrio', icon: '🏁' },
  { value: 'van', label: 'Monovolum', icon: '🚌' },
  { value: 'pickup', label: 'Pick-up', icon: '🛻' },
];

export const conditions = [
  { value: 'new', label: 'Nou' },
  { value: 'used', label: 'Second Hand' },
  { value: 'certified', label: 'Certificat Pre-Owned' },
  { value: 'demo', label: 'Demonstrativ' },
];

export const colors = [
  'Negru', 'Alb', 'Gri', 'Argintiu', 'Albastru', 'Roșu', 'Verde', 'Galben', 'Portocaliu', 'Maro', 'Bej', 'Auriu', 'Violet'
];

export const features = [
  'ABS', 'Airbag-uri', 'Climatizare automată', 'Scaune încălzite', 'Navigație GPS', 'Senzori de parcare', 'Camera marsarier',
  'Pilot automat', 'Faruri LED', 'Faruri Xenon', 'Jante aluminiu', 'Tapițerie piele', 'Scaune sport', 'Volan multifuncțional',
  'Cruise control adaptiv', 'Asistent parcare', 'Keyless entry', 'Start/Stop', 'Suspensie sport', 'Trapa panoramică',
  'Head-up display', 'Sistem audio premium', 'Apple CarPlay', 'Android Auto', 'Încărcare wireless', '360° Camera'
];
