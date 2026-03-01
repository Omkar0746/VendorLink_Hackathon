# VendorLink - Demo Credentials & Test Guide

## 🚀 Quick Start

- **Frontend:** http://localhost:5500
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/api-docs

---

## 👤 Demo User Accounts

### **Customer Accounts**

| Email | Password | Role | Location |
|-------|----------|------|----------|
| john@example.com | password123 | customer | Mumbai |
| alice@restaurant.com | password123 | customer | Delhi |
| bob@shop.com | password123 | customer | Bangalore |

### **How to Login**
1. Go to http://localhost:5500/login.html
2. Enter any email from the table above
3. Enter password: `password123`
4. Select role: `customer`
5. Click **Login**

---

## 🏪 Demo Vendors/Suppliers

| Vendor Name | Category | Location | Rating |
|---|---|---|---|
| Fresh Vegetables Direct | Vegetables | Mumbai | 4.5 ⭐ |
| Premium Dairy Farm | Dairy | Mumbai | 4.7 ⭐ |
| Spice King | Spices | Delhi | 4.4 ⭐ |
| Organic Fruits Hub | Fruits | Bangalore | 4.6 ⭐ |
| Grain Wholesale | Grains | Mumbai | 4.3 ⭐ |
| Meat Masters | Meat | Delhi | 4.8 ⭐ |

---

## 📱 Test the Features

### **1. Browse Products**
- Go to http://localhost:5500/ or click **Marketplace**
- See all 6 vendors with their products
- Filter by category, price, location, rating
- Search for products

### **2. Login & Authentication**
- Use any demo credential above
- You'll get a JWT token
- Token is stored in browser localStorage
- Token expires in 7 days

### **3. Shopping Cart**
- Click on any product
- Add to cart
- Go to **Cart** page
- See items and total price

### **4. Recommendations**
- After login, go to **Marketplace**
- See personalized recommendations based on your role
- Algorithm: 60% content-based + 40% collaborative filtering

### **5. Wishlist**
- Click heart ❤️ on any product
- View all wishlisted items
- Remove from wishlist

### **6. View Suppliers**
- Go to **Suppliers** page
- See all vendor profiles with ratings
- Click on vendor to see details

### **7. Community & Reviews**
- Go to **Community** page  
- See reviews from other users
- Leave your own review (if logged in)

### **8. Order Tracking**
- Go to **Orders** page (after "placing" an order)
- View order history
- See order status

---

## 🔌 API Endpoints - Try in Terminal

### **Products**
```bash
# Get all products
curl http://localhost:5000/api/products

# Search products
curl "http://localhost:5000/api/products/search?q=dairy&category=Dairy"

# Get specific product
curl http://localhost:5000/api/products/vendor1
```

### **Authentication**
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123","role":"customer"}'

# Signup new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123","role":"customer"}'
```

### **Recommendations**
```bash
# Get recommendations for user1
curl http://localhost:5000/api/recommend/user1?limit=3

# Get user stats
curl http://localhost:5000/api/recommend/stats/user1

# Get specific recommendation
curl http://localhost:5000/api/recommend/user1/vendor/vendor6
```

### **Wishlist**
```bash
# Get wishlist
curl http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN"

# Add to wishlist
curl -X POST http://localhost:5000/api/wishlist/vendor1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Remove from wishlist
curl -X DELETE http://localhost:5000/api/wishlist/vendor1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **Suppliers**
```bash
# Get all suppliers
curl http://localhost:5000/api/suppliers

# Get specific supplier
curl http://localhost:5000/api/suppliers/vendor1
```

---

## 📊 Database Info

**Type:** Mock In-Memory Database  
**Data Resets:** On each server restart  
**Sample Data:** 3 users, 6 vendors, 6 products

---

## ⚙️ Configuration

### **.env File Settings**
```
PORT=5000
MONGODB_URI=                    # Empty for mock DB
JWT_SECRET=some_long_random_secret_here
FRONTEND_URL=http://127.0.0.1:5500
```

**Notes:**
- Leave `MONGODB_URI` empty to use mock DB
- Rate limiter: 500 requests/15min (development mode)
- Mock DB uses plaintext passwords for testing
- All data persists only until server restart

---

## 🐛 Troubleshooting

### **LOGIN FAILS - "Unexpected token" error**
**Solution:** Rate limiter was blocking requests. Refreshed and improved it. If still having issues:
- Try a different browser or incognito window
- Clear browser cookies/localStorage
- Restart backend with `npm run dev`

### **API Returns 429 Too Many Requests**
**Solution:** You've exceeded rate limit.
- Wait 15 minutes or restart the server

### **Products not showing**
**Solution:** Ensure backend is running:
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok",...}
```

### **Frontend not loading**
**Solution:** Ensure frontend server is running:
```bash
curl http://localhost:5500/index.html
# Should return HTML content
```

---

## 🚀 Next Steps

1. **Add Real MongoDB**
   - Get MongoDB Atlas cluster
   - Update `.env` with `MONGODB_URI`
   - Restart backend

2. **Enable Redis Caching**
   - Install Redis
   - Add to `.env`: `REDIS_HOST=localhost` & `REDIS_PORT=6379`

3. **Enable Email Service**
   - Configure Gmail app password
   - Add to `.env`: `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`

4. **Run Tests**
   - `cd server && npm test`

---

## 📞 Support

If anything isn't working:
1. Check the backend logs in terminal
2. Open browser DevTools (F12) → Console tab
3. Look for error messages
4. Try restarting backend: `npm run dev`
5. Check `.env` file is set correctly

**Everything is configured and ready to go!** 🎉
