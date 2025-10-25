<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vehicle Brochure - {{ $vehicle->make }} {{ $vehicle->model }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
        }
        .container {
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #f59e0b;
        }
        .header h1 {
            font-size: 28px;
            color: #1f2937;
            margin-bottom: 5px;
        }
        .header h2 {
            font-size: 20px;
            color: #6b7280;
            font-weight: normal;
        }
        .price {
            font-size: 32px;
            color: #f59e0b;
            font-weight: bold;
            margin: 15px 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e5e7eb;
        }
        .specs-grid {
            display: table;
            width: 100%;
        }
        .spec-row {
            display: table-row;
        }
        .spec-label {
            display: table-cell;
            padding: 8px;
            font-weight: bold;
            color: #4b5563;
            width: 40%;
            background-color: #f9fafb;
        }
        .spec-value {
            display: table-cell;
            padding: 8px;
            color: #1f2937;
        }
        .description {
            text-align: justify;
            line-height: 1.8;
            color: #4b5563;
        }
        .qr-code {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
        }
        .qr-code img {
            max-width: 150px;
            height: auto;
        }
        .qr-code p {
            margin-top: 10px;
            font-size: 11px;
            color: #6b7280;
        }
        .dealer-info {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .dealer-info h3 {
            font-size: 14px;
            color: #1f2937;
            margin-bottom: 8px;
        }
        .dealer-info p {
            font-size: 11px;
            color: #4b5563;
            margin: 3px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 10px;
            color: #9ca3af;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            margin-right: 8px;
        }
        .badge-success {
            background-color: #d1fae5;
            color: #065f46;
        }
        .badge-info {
            background-color: #dbeafe;
            color: #1e40af;
        }
        .badge-warning {
            background-color: #fef3c7;
            color: #92400e;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>{{ $vehicle->make }} {{ $vehicle->model }}</h1>
            <h2>{{ $vehicle->year }}</h2>
            <div class="price">${{ number_format($vehicle->price, 0) }}</div>
            @if($vehicle->status === 'available')
                <span class="badge badge-success">Available</span>
            @endif
            @if($vehicle->featured)
                <span class="badge badge-warning">Featured</span>
            @endif
        </div>

        <!-- Description -->
        @if($vehicle->description)
        <div class="section">
            <div class="section-title">Description</div>
            <div class="description">{{ $vehicle->description }}</div>
        </div>
        @endif

        <!-- Specifications -->
        <div class="section">
            <div class="section-title">Specifications</div>
            <div class="specs-grid">
                <div class="spec-row">
                    <div class="spec-label">Make</div>
                    <div class="spec-value">{{ $vehicle->make }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Model</div>
                    <div class="spec-value">{{ $vehicle->model }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Year</div>
                    <div class="spec-value">{{ $vehicle->year }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Mileage</div>
                    <div class="spec-value">{{ number_format($vehicle->mileage) }} km</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Fuel Type</div>
                    <div class="spec-value">{{ ucfirst($vehicle->fuel_type) }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Transmission</div>
                    <div class="spec-value">{{ ucfirst($vehicle->transmission) }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Engine Size</div>
                    <div class="spec-value">{{ $vehicle->engine_size ? $vehicle->engine_size . 'L' : 'N/A' }}</div>
                </div>
                <div class="spec-row">
                    <div class="spec-label">Color</div>
                    <div class="spec-value">{{ $vehicle->color ?? 'N/A' }}</div>
                </div>
                @if($vehicle->vin)
                <div class="spec-row">
                    <div class="spec-label">VIN</div>
                    <div class="spec-value">{{ $vehicle->vin }}</div>
                </div>
                @endif
            </div>
        </div>

        <!-- Dealer Information -->
        @if($vehicle->user)
        <div class="dealer-info">
            <h3>Dealer Information</h3>
            <p><strong>Name:</strong> {{ $vehicle->user->name }}</p>
            <p><strong>Email:</strong> {{ $vehicle->user->email }}</p>
            @if($vehicle->user->phone)
            <p><strong>Phone:</strong> {{ $vehicle->user->phone }}</p>
            @endif
        </div>
        @endif

        <!-- QR Code -->
        <div class="qr-code">
            <img src="data:image/png;base64,{{ $qrCode }}" alt="QR Code">
            <p>Scan to view this vehicle online</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Generated on {{ now()->format('F d, Y') }} | AutoSite - Your Trusted Vehicle Marketplace</p>
        </div>
    </div>
</body>
</html>
