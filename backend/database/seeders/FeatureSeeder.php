<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            // Safety Features
            ['name' => 'ABS', 'category' => 'Safety', 'label' => ['en' => 'ABS', 'de' => 'ABS', 'ro' => 'ABS', 'es' => 'ABS', 'fr' => 'ABS', 'it' => 'ABS']],
            ['name' => 'ESP', 'category' => 'Safety', 'label' => ['en' => 'ESP', 'de' => 'ESP', 'ro' => 'ESP', 'es' => 'ESP', 'fr' => 'ESP', 'it' => 'ESP']],
            ['name' => 'Airbags', 'category' => 'Safety', 'label' => ['en' => 'Airbags', 'de' => 'Airbags', 'ro' => 'Airbaguri', 'es' => 'Airbags', 'fr' => 'Airbags', 'it' => 'Airbag']],
            ['name' => 'Lane Assist', 'category' => 'Safety', 'label' => ['en' => 'Lane Assist', 'de' => 'Spurassistent', 'ro' => 'Asistent bandă', 'es' => 'Asistente de carril', 'fr' => 'Aide au maintien de voie', 'it' => 'Assistente di corsia']],
            ['name' => 'Blind Spot Monitor', 'category' => 'Safety', 'label' => ['en' => 'Blind Spot Monitor', 'de' => 'Totwinkel-Assistent', 'ro' => 'Monitor unghi mort', 'es' => 'Monitor de punto ciego', 'fr' => 'Surveillance angle mort', 'it' => 'Monitoraggio angolo cieco']],
            
            // Comfort Features
            ['name' => 'Air Conditioning', 'category' => 'Comfort', 'label' => ['en' => 'Air Conditioning', 'de' => 'Klimaanlage', 'ro' => 'Aer condiționat', 'es' => 'Aire acondicionado', 'fr' => 'Climatisation', 'it' => 'Aria condizionata']],
            ['name' => 'Climate Control', 'category' => 'Comfort', 'label' => ['en' => 'Climate Control', 'de' => 'Klimaautomatik', 'ro' => 'Control climă', 'es' => 'Control climático', 'fr' => 'Climatisation automatique', 'it' => 'Controllo climatico']],
            ['name' => 'Heated Seats', 'category' => 'Comfort', 'label' => ['en' => 'Heated Seats', 'de' => 'Sitzheizung', 'ro' => 'Scaune încălzite', 'es' => 'Asientos calefactados', 'fr' => 'Sièges chauffants', 'it' => 'Sedili riscaldati']],
            ['name' => 'Leather Seats', 'category' => 'Comfort', 'label' => ['en' => 'Leather Seats', 'de' => 'Ledersitze', 'ro' => 'Scaune piele', 'es' => 'Asientos de cuero', 'fr' => 'Sièges en cuir', 'it' => 'Sedili in pelle']],
            ['name' => 'Panoramic Roof', 'category' => 'Comfort', 'label' => ['en' => 'Panoramic Roof', 'de' => 'Panoramadach', 'ro' => 'Trapă panoramică', 'es' => 'Techo panorámico', 'fr' => 'Toit panoramique', 'it' => 'Tetto panoramico']],
            
            // Technology Features
            ['name' => 'Navigation System', 'category' => 'Technology', 'label' => ['en' => 'Navigation System', 'de' => 'Navigationssystem', 'ro' => 'Sistem navigație', 'es' => 'Sistema de navegación', 'fr' => 'Système de navigation', 'it' => 'Sistema di navigazione']],
            ['name' => 'Parking Camera', 'category' => 'Technology', 'label' => ['en' => 'Parking Camera', 'de' => 'Rückfahrkamera', 'ro' => 'Cameră parcare', 'es' => 'Cámara de estacionamiento', 'fr' => 'Caméra de recul', 'it' => 'Telecamera di parcheggio']],
            ['name' => 'Parking Sensors', 'category' => 'Technology', 'label' => ['en' => 'Parking Sensors', 'de' => 'Einparkhilfe', 'ro' => 'Senzori parcare', 'es' => 'Sensores de aparcamiento', 'fr' => 'Capteurs de stationnement', 'it' => 'Sensori di parcheggio']],
            ['name' => 'Bluetooth', 'category' => 'Technology', 'label' => ['en' => 'Bluetooth', 'de' => 'Bluetooth', 'ro' => 'Bluetooth', 'es' => 'Bluetooth', 'fr' => 'Bluetooth', 'it' => 'Bluetooth']],
            ['name' => 'Apple CarPlay', 'category' => 'Technology', 'label' => ['en' => 'Apple CarPlay', 'de' => 'Apple CarPlay', 'ro' => 'Apple CarPlay', 'es' => 'Apple CarPlay', 'fr' => 'Apple CarPlay', 'it' => 'Apple CarPlay']],
            ['name' => 'Android Auto', 'category' => 'Technology', 'label' => ['en' => 'Android Auto', 'de' => 'Android Auto', 'ro' => 'Android Auto', 'es' => 'Android Auto', 'fr' => 'Android Auto', 'it' => 'Android Auto']],
            
            // Performance Features
            ['name' => 'Adaptive Cruise Control', 'category' => 'Performance', 'label' => ['en' => 'Adaptive Cruise Control', 'de' => 'Adaptiver Tempomat', 'ro' => 'Cruise control adaptiv', 'es' => 'Control de crucero adaptativo', 'fr' => 'Régulateur adaptatif', 'it' => 'Cruise control adattivo']],
            ['name' => 'Sport Mode', 'category' => 'Performance', 'label' => ['en' => 'Sport Mode', 'de' => 'Sportmodus', 'ro' => 'Mod sport', 'es' => 'Modo deportivo', 'fr' => 'Mode sport', 'it' => 'Modalità sport']],
            ['name' => 'All-Wheel Drive', 'category' => 'Performance', 'label' => ['en' => 'All-Wheel Drive', 'de' => 'Allradantrieb', 'ro' => 'Tracțiune integrală', 'es' => 'Tracción total', 'fr' => 'Transmission intégrale', 'it' => 'Trazione integrale']],
            
            // Other Features
            ['name' => 'LED Headlights', 'category' => 'Other', 'label' => ['en' => 'LED Headlights', 'de' => 'LED-Scheinwerfer', 'ro' => 'Faruri LED', 'es' => 'Faros LED', 'fr' => 'Phares LED', 'it' => 'Fari LED']],
            ['name' => 'Alloy Wheels', 'category' => 'Other', 'label' => ['en' => 'Alloy Wheels', 'de' => 'Leichtmetallfelgen', 'ro' => 'Jante aluminiu', 'es' => 'Llantas de aleación', 'fr' => 'Jantes alliage', 'it' => 'Cerchi in lega']],
        ];

        foreach ($features as $index => $feature) {
            Feature::updateOrCreate(
                ['name' => $feature['name']],
                array_merge($feature, ['is_active' => true, 'order' => $index])
            );
        }
    }
}
