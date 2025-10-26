<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    /**
     * Generate XML sitemap
     */
    public function sitemap(): Response
    {
        $vehicles = Vehicle::where('status', 'active')
            ->where('published_at', '<=', now())
            ->orderBy('updated_at', 'desc')
            ->get();

        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');

        // Add homepage
        $url = $xml->addChild('url');
        $url->addChild('loc', url('/'));
        $url->addChild('lastmod', now()->toAtomString());
        $url->addChild('changefreq', 'daily');
        $url->addChild('priority', '1.0');

        // Add vehicles page
        $url = $xml->addChild('url');
        $url->addChild('loc', url('/vehicles'));
        $url->addChild('lastmod', now()->toAtomString());
        $url->addChild('changefreq', 'daily');
        $url->addChild('priority', '0.9');

        // Add individual vehicles
        foreach ($vehicles as $vehicle) {
            $url = $xml->addChild('url');
            $url->addChild('loc', url('/vehicles/' . $vehicle->slug));
            $url->addChild('lastmod', $vehicle->updated_at->toAtomString());
            $url->addChild('changefreq', 'weekly');
            $url->addChild('priority', '0.8');
        }

        return response($xml->asXML(), 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Generate robots.txt
     */
    public function robots(): Response
    {
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin\n";
        $content .= "Disallow: /api\n";
        $content .= "\n";
        $content .= "Sitemap: " . url('/sitemap.xml') . "\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Generate structured data for a vehicle
     */
    public function structuredData(Vehicle $vehicle): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Car',
            'name' => $vehicle->title['en'] ?? $vehicle->make . ' ' . $vehicle->model,
            'description' => $vehicle->description['en'] ?? '',
            'brand' => [
                '@type' => 'Brand',
                'name' => $vehicle->make,
            ],
            'model' => $vehicle->model,
            'vehicleModelDate' => $vehicle->year,
            'mileageFromOdometer' => [
                '@type' => 'QuantitativeValue',
                'value' => $vehicle->mileage,
                'unitCode' => 'KMT',
            ],
            'fuelType' => $vehicle->fuel_type,
            'vehicleTransmission' => $vehicle->transmission,
            'color' => $vehicle->color,
            'offers' => [
                '@type' => 'Offer',
                'price' => $vehicle->price_amount,
                'priceCurrency' => $vehicle->price_currency,
                'availability' => $vehicle->status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                'seller' => [
                    '@type' => 'Organization',
                    'name' => $vehicle->dealer->name ?? 'Auto Dealer',
                ],
            ],
        ];
    }
}
