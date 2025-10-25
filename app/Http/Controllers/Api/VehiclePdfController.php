<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;

class VehiclePdfController extends Controller
{
    /**
     * Generate PDF brochure for a vehicle
     */
    public function generatePdf(Vehicle $vehicle)
    {
        $data = [
            'vehicle' => $vehicle->load('user'),
            'qrCode' => $this->generateQrCode($vehicle),
        ];

        $pdf = Pdf::loadView('pdf.vehicle-brochure', $data)
            ->setPaper('a4', 'portrait');

        return $pdf->download("vehicle-{$vehicle->id}-brochure.pdf");
    }

    /**
     * Generate QR code for a vehicle
     */
    public function generateQrCode(Vehicle $vehicle)
    {
        $url = env('APP_URL') . "/vehicles/{$vehicle->id}";
        
        return base64_encode(QrCode::format('png')
            ->size(200)
            ->generate($url));
    }

    /**
     * Get QR code image
     */
    public function qrCode(Vehicle $vehicle)
    {
        $url = env('APP_URL') . "/vehicles/{$vehicle->id}";
        
        return response(QrCode::format('png')
            ->size(300)
            ->generate($url))
            ->header('Content-Type', 'image/png');
    }
}
