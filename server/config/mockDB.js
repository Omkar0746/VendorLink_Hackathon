// config/mockDB.js - Mock database for testing without MongoDB
// This creates in-memory mock data structures that mimic MongoDB models

const mockDB = {
  // Mock Users collection
  users: [
    {
      _id: "user1",
      username: "john_customer",
      email: "john@example.com",
      role: "customer",
      preferences: {
        categories: ["Vegetables", "Dairy", "Spices"],
        priceRange: { min: 10, max: 1000 },
        location: "Mumbai"
      },
      createdAt: new Date()
    },
    {
      _id: "user2",
      username: "alice_restaurant",
      email: "alice@restaurant.com",
      role: "customer",
      preferences: {
        categories: ["Meat", "Vegetables", "Grains"],
        priceRange: { min: 50, max: 5000 },
        location: "Delhi"
      },
      createdAt: new Date()
    },
    {
      _id: "user3",
      username: "bob_shop",
      email: "bob@shop.com",
      role: "customer",
      preferences: {
        categories: ["Dairy", "Grains", "Fruits"],
        priceRange: { min: 20, max: 2000 },
        location: "Bangalore"
      },
      createdAt: new Date()
    }
  ],

  // Mock Vendors collection
  vendors: [
    {
      _id: "vendor1",
      shopName: "Fresh Vegetables Direct",
      email: "fresh@veg.com",
      phone: "9876543210",
      category: "Vegetables",
      location: "Mumbai",
      address: "123 Market Street, Mumbai",
      rating: 4.5,
      totalOrders: 150,
      responseTime: "2 hours",
      priceRange: { min: 10, max: 500 },
      description: "Direct from farms, fresh produce delivered daily",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    },
    {
      _id: "vendor2",
      shopName: "Premium Dairy Farm",
      email: "dairy@farm.com",
      phone: "9876543211",
      category: "Dairy",
      location: "Mumbai",
      address: "456 Dairy Lane, Mumbai",
      rating: 4.7,
      totalOrders: 220,
      responseTime: "1 hour",
      priceRange: { min: 50, max: 1000 },
      description: "Pure, organic dairy products from certified farms",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    },
    {
      _id: "vendor3",
      shopName: "Spice King",
      email: "spices@king.com",
      phone: "9876543212",
      category: "Spices",
      location: "Mumbai",
      address: "789 Spice Market, Mumbai",
      rating: 4.3,
      totalOrders: 180,
      responseTime: "3 hours",
      priceRange: { min: 20, max: 800 },
      description: "Authentic Indian spices, bulk orders available",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    },
    {
      _id: "vendor4",
      shopName: "Organic Fruits Hub",
      email: "fruits@organic.com",
      phone: "9876543213",
      category: "Fruits",
      location: "Delhi",
      address: "321 Fruit Bazaar, Delhi",
      rating: 4.6,
      totalOrders: 200,
      responseTime: "1.5 hours",
      priceRange: { min: 30, max: 900 },
      description: "Seasonal, organic fruits delivered fresh",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    },
    {
      _id: "vendor5",
      shopName: "Grain Wholesale",
      email: "grains@wholesale.com",
      phone: "9876543214",
      category: "Grains",
      location: "Bangalore",
      address: "654 Wholesale Center, Bangalore",
      rating: 4.4,
      totalOrders: 160,
      responseTime: "2.5 hours",
      priceRange: { min: 25, max: 700 },
      description: "Wholesale prices on all grains and cereals",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    },
    {
      _id: "vendor6",
      shopName: "Meat Masters",
      email: "meat@masters.com",
      phone: "9876543215",
      category: "Meat",
      location: "Delhi",
      address: "987 Butcher Lane, Delhi",
      rating: 4.5,
      totalOrders: 140,
      responseTime: "2 hours",
      priceRange: { min: 100, max: 2000 },
      description: "Premium quality meat, hygienically processed",
      imageUrl: "https://via.placeholder.com/300",
      createdAt: new Date()
    }
  ],

  // Mock Orders collection
  orders: [
    {
      _id: "order1",
      userId: "user1",
      vendorId: "vendor1",
      items: [{ productName: "Tomatoes", quantity: 5, price: 50 }],
      totalPrice: 50,
      status: "delivered",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order2",
      userId: "user1",
      vendorId: "vendor2",
      items: [{ productName: "Milk", quantity: 2, price: 100 }],
      totalPrice: 100,
      status: "delivered",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order3",
      userId: "user1",
      vendorId: "vendor3",
      items: [{ productName: "Turmeric", quantity: 1, price: 150 }],
      totalPrice: 150,
      status: "delivered",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order4",
      userId: "user2",
      vendorId: "vendor2",
      items: [{ productName: "Butter", quantity: 3, price: 200 }],
      totalPrice: 200,
      status: "delivered",
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order5",
      userId: "user2",
      vendorId: "vendor6",
      items: [{ productName: "Chicken", quantity: 2, price: 400 }],
      totalPrice: 400,
      status: "delivered",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order6",
      userId: "user3",
      vendorId: "vendor5",
      items: [{ productName: "Rice", quantity: 10, price: 250 }],
      totalPrice: 250,
      status: "delivered",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order7",
      userId: "user3",
      vendorId: "vendor4",
      items: [{ productName: "Apples", quantity: 5, price: 200 }],
      totalPrice: 200,
      status: "delivered",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "order8",
      userId: "user1",
      vendorId: "vendor2",
      items: [{ productName: "Yogurt", quantity: 4, price: 120 }],
      totalPrice: 120,
      status: "delivered",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ],

  // Mock Reviews collection
  reviews: [
    {
      _id: "review1",
      userId: "user1",
      vendorId: "vendor1",
      rating: 5,
      comment: "Fresh vegetables, excellent quality",
      createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "review2",
      userId: "user1",
      vendorId: "vendor2",
      rating: 5,
      comment: "Best dairy products in the market",
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "review3",
      userId: "user2",
      vendorId: "vendor6",
      rating: 4,
      comment: "Good quality meat, fast delivery",
      createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "review4",
      userId: "user3",
      vendorId: "vendor5",
      rating: 4,
      comment: "Affordable grains, reliable vendor",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ],

  // Helper methods to simulate Mongoose operations
  async findUserById(userId) {
    return this.users.find(u => u._id === userId);
  },

  async findVendorById(vendorId) {
    return this.vendors.find(v => v._id === vendorId);
  },

  async findAllVendors() {
    return this.vendors;
  },

  async findOrdersByUserId(userId) {
    return this.orders.filter(o => o.userId === userId);
  },

  async findOrdersByVendorId(vendorId) {
    return this.orders.filter(o => o.vendorId === vendorId);
  },

  async findReviewsByVendorId(vendorId) {
    return this.reviews.filter(r => r.vendorId === vendorId);
  },

  async findReviewsByUserId(userId) {
    return this.reviews.filter(r => r.userId === userId);
  }
};

module.exports = mockDB;
