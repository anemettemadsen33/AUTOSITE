// Complete car makes and models database
export const carModelsData: Record<string, string[]> = {
  'BMW': [
    'Seria 1', 'Seria 2', 'Seria 3', 'Seria 4', 'Seria 5', 'Seria 6', 'Seria 7', 'Seria 8',
    'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
    'Z4', 'i3', 'i4', 'iX', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M8'
  ],
  'Mercedes-Benz': [
    'Clasa A', 'Clasa B', 'Clasa C', 'Clasa E', 'Clasa S',
    'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS',
    'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS',
    'G-Class', 'V-Class', 'Sprinter', 'Vito'
  ],
  'Audi': [
    'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
    'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8',
    'TT', 'R8', 'e-tron GT', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7'
  ],
  'Volkswagen': [
    'Polo', 'Golf', 'Passat', 'Arteon', 'Jetta',
    'T-Cross', 'T-Roc', 'Tiguan', 'Touareg',
    'ID.3', 'ID.4', 'ID.5', 'ID. Buzz',
    'Caddy', 'Transporter', 'Multivan'
  ],
  'Tesla': [
    'Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'
  ],
  'Toyota': [
    'Yaris', 'Corolla', 'Camry', 'Prius', 'Mirai',
    'C-HR', 'RAV4', 'Highlander', 'Land Cruiser',
    'Aygo X', 'bZ4X', 'Hilux', 'Proace'
  ],
  'Porsche': [
    '911', 'Cayenne', 'Macan', 'Panamera',
    'Taycan', 'Boxster', 'Cayman', '718'
  ],
  'Ford': [
    'Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Mustang Mach-E',
    'Puma', 'Kuga', 'Explorer', 'Bronco',
    'F-150', 'Ranger', 'Transit'
  ],
  'Opel': [
    'Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland',
    'Grandland', 'Combo', 'Vivaro', 'Movano'
  ],
  'Renault': [
    'Clio', 'Megane', 'Talisman', 'Captur', 'Kadjar',
    'Koleos', 'Arkana', 'ZOE', 'Megane E-Tech'
  ],
  'Peugeot': [
    '208', '308', '408', '508', '2008', '3008',
    '5008', 'Rifter', 'Partner', 'e-208', 'e-2008'
  ],
  'Dacia': [
    'Sandero', 'Logan', 'Duster', 'Jogger', 'Spring'
  ],
  'Skoda': [
    'Fabia', 'Scala', 'Octavia', 'Superb',
    'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq iV'
  ]
};

export const getAllMakes = () => Object.keys(carModelsData).sort();
export const getModelsByMake = (make: string): string[] => carModelsData[make] || [];
