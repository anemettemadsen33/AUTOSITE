<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PartnerToken;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExportController extends Controller
{
    /**
     * Export vehicles as XML
     */
    public function xml(Request $request): Response
    {
        $token = $request->query('token');
        
        if (!$this->validateToken($token)) {
            return response('Unauthorized', 401);
        }

        $vehicles = Vehicle::where('status', 'approved')
            ->with(['dealer', 'user'])
            ->get();

        $xml = $this->generateXml($vehicles);

        return response($xml, 200)
            ->header('Content-Type', 'application/xml')
            ->header('Content-Disposition', 'attachment; filename="vehicles.xml"');
    }

    /**
     * Export vehicles as CSV
     */
    public function csv(Request $request): Response
    {
        $token = $request->query('token');
        
        if (!$this->validateToken($token)) {
            return response('Unauthorized', 401);
        }

        $vehicles = Vehicle::where('status', 'approved')
            ->with(['dealer', 'user'])
            ->get();

        $csv = $this->generateCsv($vehicles);

        return response($csv, 200)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="vehicles.csv"');
    }

    /**
     * Validate partner token
     */
    private function validateToken(?string $token): bool
    {
        if (!$token) {
            return false;
        }

        $partnerToken = PartnerToken::verify($token);
        
        return $partnerToken !== null;
    }

    /**
     * Generate XML from vehicles
     */
    private function generateXml($vehicles): string
    {
        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><vehicles/>');
        
        foreach ($vehicles as $vehicle) {
            $vehicleNode = $xml->addChild('vehicle');
            
            $vehicleNode->addChild('id', $vehicle->id);
            $vehicleNode->addChild('make', htmlspecialchars($vehicle->make));
            $vehicleNode->addChild('model', htmlspecialchars($vehicle->model));
            $vehicleNode->addChild('year', $vehicle->year);
            $vehicleNode->addChild('price', $vehicle->price);
            $vehicleNode->addChild('mileage', $vehicle->mileage);
            $vehicleNode->addChild('fuel_type', htmlspecialchars($vehicle->fuel_type ?? ''));
            $vehicleNode->addChild('transmission', htmlspecialchars($vehicle->transmission ?? ''));
            $vehicleNode->addChild('body_type', htmlspecialchars($vehicle->body_type ?? ''));
            $vehicleNode->addChild('color', htmlspecialchars($vehicle->color ?? ''));
            $vehicleNode->addChild('engine_size', $vehicle->engine_size);
            $vehicleNode->addChild('power', $vehicle->power);
            $vehicleNode->addChild('doors', $vehicle->doors);
            $vehicleNode->addChild('seats', $vehicle->seats);
            $vehicleNode->addChild('description', htmlspecialchars($vehicle->description ?? ''));
            $vehicleNode->addChild('location', htmlspecialchars($vehicle->location ?? ''));
            $vehicleNode->addChild('country', htmlspecialchars($vehicle->country ?? ''));
            $vehicleNode->addChild('city', htmlspecialchars($vehicle->city ?? ''));
            $vehicleNode->addChild('vin', htmlspecialchars($vehicle->vin ?? ''));
            $vehicleNode->addChild('registration_number', htmlspecialchars($vehicle->registration_number ?? ''));
            $vehicleNode->addChild('first_registration', $vehicle->first_registration?->format('Y-m-d'));
            
            if ($vehicle->dealer) {
                $dealerNode = $vehicleNode->addChild('dealer');
                $dealerNode->addChild('name', htmlspecialchars($vehicle->dealer->name));
                $dealerNode->addChild('email', htmlspecialchars($vehicle->dealer->email ?? ''));
                $dealerNode->addChild('phone', htmlspecialchars($vehicle->dealer->phone ?? ''));
            }
            
            if ($vehicle->images) {
                $imagesNode = $vehicleNode->addChild('images');
                foreach ($vehicle->images as $image) {
                    $imagesNode->addChild('image', htmlspecialchars($image));
                }
            }
            
            $vehicleNode->addChild('url', url("/vehicles/{$vehicle->id}"));
            $vehicleNode->addChild('created_at', $vehicle->created_at->format('Y-m-d H:i:s'));
            $vehicleNode->addChild('updated_at', $vehicle->updated_at->format('Y-m-d H:i:s'));
        }
        
        return $xml->asXML();
    }

    /**
     * Generate CSV from vehicles
     */
    private function generateCsv($vehicles): string
    {
        $output = fopen('php://temp', 'r+');
        
        // CSV Header
        fputcsv($output, [
            'ID', 'Make', 'Model', 'Year', 'Price', 'Mileage', 'Fuel Type', 
            'Transmission', 'Body Type', 'Color', 'Engine Size', 'Power', 
            'Doors', 'Seats', 'Description', 'Location', 'Country', 'City', 
            'VIN', 'Registration Number', 'First Registration', 
            'Dealer Name', 'Dealer Email', 'Dealer Phone', 
            'URL', 'Created At', 'Updated At'
        ]);
        
        // CSV Data
        foreach ($vehicles as $vehicle) {
            fputcsv($output, [
                $vehicle->id,
                $vehicle->make,
                $vehicle->model,
                $vehicle->year,
                $vehicle->price,
                $vehicle->mileage,
                $vehicle->fuel_type ?? '',
                $vehicle->transmission ?? '',
                $vehicle->body_type ?? '',
                $vehicle->color ?? '',
                $vehicle->engine_size,
                $vehicle->power,
                $vehicle->doors,
                $vehicle->seats,
                $vehicle->description ?? '',
                $vehicle->location ?? '',
                $vehicle->country ?? '',
                $vehicle->city ?? '',
                $vehicle->vin ?? '',
                $vehicle->registration_number ?? '',
                $vehicle->first_registration?->format('Y-m-d') ?? '',
                $vehicle->dealer?->name ?? '',
                $vehicle->dealer?->email ?? '',
                $vehicle->dealer?->phone ?? '',
                url("/vehicles/{$vehicle->id}"),
                $vehicle->created_at->format('Y-m-d H:i:s'),
                $vehicle->updated_at->format('Y-m-d H:i:s'),
            ]);
        }
        
        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);
        
        return $csv;
    }
}
