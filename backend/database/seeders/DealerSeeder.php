<?php

namespace Database\Seeders;

use App\Models\Dealer;
use App\Models\User;
use Illuminate\Database\Seeder;

class DealerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dealers = [
            [
                'email' => 'dealer1@autosite.com',
                'company_name' => 'Premium Motors GmbH',
                'description' => [
                    'en' => 'Premium selection of luxury vehicles in Germany',
                    'de' => 'Premium-Auswahl an Luxusfahrzeugen in Deutschland',
                    'ro' => 'Selecție premium de vehicule de lux în Germania',
                ],
                'city' => 'Munich',
                'country' => 'DE',
                'verified' => true,
            ],
            [
                'email' => 'dealer2@autosite.com',
                'company_name' => 'AutoHaus München',
                'description' => [
                    'en' => 'Trusted dealership with 20+ years of experience',
                    'de' => 'Vertrauenswürdiges Autohaus mit über 20 Jahren Erfahrung',
                    'ro' => 'Dealer de încredere cu peste 20 de ani de experiență',
                ],
                'city' => 'Munich',
                'country' => 'DE',
                'verified' => true,
            ],
            [
                'email' => 'dealer3@autosite.com',
                'company_name' => 'CarCenter București SRL',
                'description' => [
                    'en' => 'Leading automotive center in Romania',
                    'de' => 'Führendes Automobilzentrum in Rumänien',
                    'ro' => 'Centru auto de top în România',
                ],
                'city' => 'Bucharest',
                'country' => 'RO',
                'verified' => true,
            ],
            [
                'email' => 'dealer4@autosite.com',
                'company_name' => 'Elite Automobiles Ltd',
                'description' => [
                    'en' => 'Specialist in premium and sports cars',
                    'de' => 'Spezialist für Premium- und Sportwagen',
                    'ro' => 'Specialist în mașini premium și sport',
                ],
                'city' => 'London',
                'country' => 'GB',
                'verified' => true,
            ],
            [
                'email' => 'dealer5@autosite.com',
                'company_name' => 'AutoGallery Madrid S.A.',
                'description' => [
                    'en' => 'Your trusted partner for quality vehicles',
                    'de' => 'Ihr vertrauenswürdiger Partner für Qualitätsfahrzeuge',
                    'ro' => 'Partenerul tău de încredere pentru vehicule de calitate',
                ],
                'city' => 'Madrid',
                'country' => 'ES',
                'verified' => true,
            ],
            [
                'email' => 'dealer6@autosite.com',
                'company_name' => 'Luxury Cars Paris SARL',
                'description' => [
                    'en' => 'Exclusive luxury and exotic cars in France',
                    'de' => 'Exklusive Luxus- und Exotenwagen in Frankreich',
                    'ro' => 'Mașini de lux și exotice exclusive în Franța',
                ],
                'city' => 'Paris',
                'country' => 'FR',
                'verified' => true,
            ],
            [
                'email' => 'dealer7@autosite.com',
                'company_name' => 'TopAuto Roma',
                'description' => [
                    'en' => 'Italian excellence in automotive sales',
                    'de' => 'Italienische Exzellenz im Automobilverkauf',
                    'ro' => 'Excelență italiană în vânzarea de automobile',
                ],
                'city' => 'Rome',
                'country' => 'IT',
                'verified' => true,
            ],
            [
                'email' => 'dealer8@autosite.com',
                'company_name' => 'DriveZone Berlin',
                'description' => [
                    'en' => 'Modern dealership in the heart of Berlin',
                    'de' => 'Modernes Autohaus im Herzen Berlins',
                    'ro' => 'Dealer modern în inima Berlinului',
                ],
                'city' => 'Berlin',
                'country' => 'DE',
                'verified' => true,
            ],
            [
                'email' => 'dealer9@autosite.com',
                'company_name' => 'AutoPlaza London',
                'description' => [
                    'en' => 'Premium vehicles for discerning customers',
                    'de' => 'Premium-Fahrzeuge für anspruchsvolle Kunden',
                    'ro' => 'Vehicule premium pentru clienți pretențioși',
                ],
                'city' => 'London',
                'country' => 'GB',
                'verified' => true,
            ],
            [
                'email' => 'dealer10@autosite.com',
                'company_name' => 'CarWorld Vienna',
                'description' => [
                    'en' => 'Quality vehicles in Austria',
                    'de' => 'Qualitätsfahrzeuge in Österreich',
                    'ro' => 'Vehicule de calitate în Austria',
                ],
                'city' => 'Vienna',
                'country' => 'AT',
                'verified' => true,
            ],
        ];

        foreach ($dealers as $dealerData) {
            $user = User::where('email', $dealerData['email'])->first();
            if ($user) {
                Dealer::updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'company_name' => $dealerData['company_name'],
                        'description' => $dealerData['description'],
                        'city' => $dealerData['city'],
                        'country' => $dealerData['country'],
                        'verified' => $dealerData['verified'],
                        'verification_date' => $dealerData['verified'] ? now() : null,
                    ]
                );
            }
        }
    }
}
