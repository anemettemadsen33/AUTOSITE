<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $order->invoice_number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 11pt; }
        .header { margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .company-name { font-size: 20pt; font-weight: bold; color: #2563eb; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #2563eb; color: white; padding: 12px; }
        td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">AUTOSITE MARKETPLACE</div>
        <div>Invoice: {{ $order->invoice_number }}</div>
    </div>
    <div>
        <h3>Customer:</h3>
        @if($order->buyer_type === 'individual')
            <p>{{ $order->first_name }} {{ $order->last_name }}</p>
        @else
            <p>{{ $order->company_name }}</p>
        @endif
    </div>
    <table>
        <tr><th>Vehicle</th><th>Price</th></tr>
        <tr>
            <td>{{ $order->vehicle->make }} {{ $order->vehicle->model }}</td>
            <td>€{{ number_format($order->total_amount, 2) }}</td>
        </tr>
    </table>
</body>
</html>
