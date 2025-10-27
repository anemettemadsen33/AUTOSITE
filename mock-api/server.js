const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Mock data
const mockVehicles = {
  data: [
    {
      id: 1,
      make: "BMW",
      model: "X5",
      year: 2023,
      price: 65000,
      currency: "EUR",
      mileage: 12000,
      fuel_type: "Diesel",
      transmission: "Automatic",
      body_type: "SUV",
      color: "Black",
      location: "Bucharest",
      description: "Luxury SUV in excellent condition",
      images: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ],
      dealer: {
        id: 1,
        name: "Premium Motors",
        location: "Bucharest",
        phone: "+40 21 123 4567"
      },
      featured: true,
      created_at: "2023-10-20T10:00:00Z"
    },
    {
      id: 2,
      make: "Audi",
      model: "A4",
      year: 2022,
      price: 42000,
      currency: "EUR",
      mileage: 25000,
      fuel_type: "Petrol",
      transmission: "Manual",
      body_type: "Sedan",
      color: "White",
      location: "Cluj-Napoca",
      description: "Elegant sedan, well maintained",
      images: [
        "/api/placeholder/400/300"
      ],
      dealer: {
        id: 2,
        name: "Auto Excellence",
        location: "Cluj-Napoca",
        phone: "+40 264 123 456"
      },
      featured: false,
      created_at: "2023-10-19T14:30:00Z"
    },
    {
      id: 3,
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2023,
      price: 55000,
      currency: "EUR",
      mileage: 8000,
      fuel_type: "Hybrid",
      transmission: "Automatic",
      body_type: "Sedan",
      color: "Silver",
      location: "Timisoara",
      description: "Latest model with hybrid technology",
      images: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ],
      dealer: {
        id: 3,
        name: "Mercedes Center",
        location: "Timisoara",
        phone: "+40 256 123 789"
      },
      featured: true,
      created_at: "2023-10-18T09:15:00Z"
    }
  ],
  meta: {
    total: 3,
    current_page: 1,
    per_page: 15,
    last_page: 1
  }
};

const mockDealers = {
  data: [
    {
      id: 1,
      name: "Premium Motors",
      location: "Bucharest",
      phone: "+40 21 123 4567",
      email: "contact@premiummotors.ro",
      address: "Strada Victoriei 123, Bucharest",
      rating: 4.8,
      total_reviews: 156,
      verified: true,
      vehicles_count: 45
    },
    {
      id: 2,
      name: "Auto Excellence",
      location: "Cluj-Napoca",
      phone: "+40 264 123 456",
      email: "info@autoexcellence.ro",
      address: "Calea Dorobantilor 87, Cluj-Napoca",
      rating: 4.6,
      total_reviews: 89,
      verified: true,
      vehicles_count: 32
    },
    {
      id: 3,
      name: "Mercedes Center",
      location: "Timisoara",
      phone: "+40 256 123 789",
      email: "sales@mercedescentertm.ro",
      address: "Bulevardul Revolutiei 45, Timisoara",
      rating: 4.9,
      total_reviews: 234,
      verified: true,
      vehicles_count: 67
    }
  ]
};

const mockSettings = {
  data: {
    app_name: "AUTOSITE",
    default_currency: "EUR",
    supported_currencies: ["EUR", "RON", "USD"],
    contact_email: "contact@autosite.ro",
    contact_phone: "+40 21 000 0000",
    office_address: "Bucharest, Romania"
  }
};

// API Routes
app.get('/api/v1/vehicles', (req, res) => {
  console.log('GET /api/v1/vehicles called');
  res.json(mockVehicles);
});

app.get('/api/v1/vehicles/:slug', (req, res) => {
  const slug = req.params.slug;
  const vehicle = mockVehicles.data.find(v => v.id == slug);
  
  if (vehicle) {
    res.json({ data: vehicle });
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
});

app.get('/api/v1/dealers', (req, res) => {
  console.log('GET /api/v1/dealers called');
  res.json(mockDealers);
});

app.get('/api/v1/dealers/:id', (req, res) => {
  const id = req.params.id;
  const dealer = mockDealers.data.find(d => d.id == id);
  
  if (dealer) {
    res.json({ data: dealer });
  } else {
    res.status(404).json({ message: 'Dealer not found' });
  }
});

app.get('/api/v1/settings', (req, res) => {
  console.log('GET /api/v1/settings called');
  res.json(mockSettings);
});

// Favorites routes (require authentication in real app)
app.get('/api/v1/favorites', (req, res) => {
  console.log('GET /api/v1/favorites called');
  res.json({ data: [] }); // Empty favorites for now
});

app.post('/api/v1/favorites/toggle', (req, res) => {
  console.log('POST /api/v1/favorites/toggle called');
  res.json({
    success: true,
    is_favorited: Math.random() > 0.5 // Random toggle for demo
  });
});

// Exchange rate routes  
app.get('/api/v1/exchange/latest', (req, res) => {
  console.log('GET /api/v1/exchange/latest called');
  res.json({
    data: {
      EUR: 1.0,
      RON: 4.95,
      USD: 1.08
    },
    last_updated: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock API server is running' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: `Route ${req.method} ${req.url} not found`,
    available_routes: [
      'GET /api/v1/vehicles',
      'GET /api/v1/vehicles/:slug',
      'GET /api/v1/dealers', 
      'GET /api/v1/dealers/:id',
      'GET /api/v1/settings',
      'GET /api/v1/favorites',
      'POST /api/v1/favorites/toggle',
      'GET /api/v1/exchange/latest'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/v1/vehicles`);
  console.log(`   GET  /api/v1/vehicles/:slug`);
  console.log(`   GET  /api/v1/dealers`);
  console.log(`   GET  /api/v1/dealers/:id`);
  console.log(`   GET  /api/v1/settings`);
  console.log(`   GET  /api/v1/favorites`);
  console.log(`   POST /api/v1/favorites/toggle`);
  console.log(`   GET  /api/v1/exchange/latest`);
});