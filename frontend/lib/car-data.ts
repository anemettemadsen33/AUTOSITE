// Brand to models mapping
export const CAR_BRANDS_MODELS = {
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8'],
  'BMW': ['Seria 1', 'Seria 2', 'Seria 3', 'Seria 4', 'Seria 5', 'Seria 6', 'Seria 7', 'Seria 8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i4', 'iX'],
  'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQC', 'EQE', 'EQS'],
  'Volkswagen': ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'T-Roc', 'T-Cross', 'Arteon', 'ID.3', 'ID.4', 'ID.5'],
  'Toyota': ['Yaris', 'Corolla', 'Camry', 'RAV4', 'Highlander', 'Land Cruiser', 'C-HR', 'Aygo', 'Prius', 'Supra'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Kuga', 'Puma', 'Explorer', 'Ranger', 'Transit'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Combo'],
  'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Koleos', 'Talisman', 'Zoe'],
  'Peugeot': ['208', '308', '508', '2008', '3008', '5008', 'Rifter'],
  'Dacia': ['Sandero', 'Logan', 'Duster', 'Jogger', 'Spring'],
  'Skoda': ['Fabia', 'Octavia', 'Superb', 'Scala', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'],
  'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Kona', 'Ioniq 5'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Stonic', 'EV6'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'MX-5'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya'],
  'Honda': ['Jazz', 'Civic', 'Accord', 'CR-V', 'HR-V', 'e'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'V60', 'V90', 'S60', 'S90'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y'],
  'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  'Fiat': ['500', 'Panda', '500X', 'Tipo', 'Ducato'],
};

export const ALL_BRANDS = Object.keys(CAR_BRANDS_MODELS).sort();

export const getModelsForBrand = (brand: string): string[] => {
  return CAR_BRANDS_MODELS[brand as keyof typeof CAR_BRANDS_MODELS] || [];
};
