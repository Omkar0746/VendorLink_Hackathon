## Recommendation System - API Testing & Examples

### Base URL
```
http://localhost:5000/api/recommend
```

### 1. Get Personalized Recommendations
**Endpoint:** `GET /api/recommend/:userId`

**Parameters:**
- `userId` (required, path): MongoDB User ID
- `limit` (optional, query): Number of recommendations (default: 5)

**Example Request:**
```bash
# Get 5 recommendations
curl -X GET "http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0"

# Get 10 recommendations
curl -X GET "http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0?limit=10"
```

**JavaScript Fetch:**
```javascript
const userId = "65a8f2b1c3d4e5f6g7h8i9j0";
const limit = 5;

fetch(`/api/recommend/${userId}?limit=${limit}`)
  .then(res => res.json())
  .then(data => {
    console.log("Recommendations:", data.recommendations);
    // Expected: Array of 5 vendors with scores
  })
  .catch(err => console.error("Error:", err));
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Personalized vendor recommendations",
  "userId": "65a8f2b1c3d4e5f6g7h8i9j0",
  "totalVendorsAnalyzed": 15,
  "recommendationsReturned": 5,
  "recommendations": [
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j1",
      "shopName": "Fresh Vegetables Co.",
      "location": "Mumbai",
      "rating": 4.8,
      "contactNumber": "9876543210",
      "image": "vendor1.jpg",
      "recommendationScore": 0.872
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j2",
      "shopName": "Organic Farms",
      "location": "Mumbai",
      "rating": 4.6,
      "contactNumber": "9876543211",
      "image": "vendor2.jpg",
      "recommendationScore": 0.745
    }
  ]
}
```

**Error Response (404):**
```json
{
  "message": "User not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to generate recommendations",
  "details": "Error message here"
}
```

---

### 2. Get Vendor Details with Recommendation Context
**Endpoint:** `GET /api/recommend/:userId/vendor/:vendorId`

**Parameters:**
- `userId` (required, path): MongoDB User ID
- `vendorId` (required, path): MongoDB Vendor ID

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0/vendor/65a8f2b1c3d4e5f6g7h8i9j1"
```

**JavaScript Fetch:**
```javascript
const userId = "65a8f2b1c3d4e5f6g7h8i9j0";
const vendorId = "65a8f2b1c3d4e5f6g7h8i9j1";

fetch(`/api/recommend/${userId}/vendor/${vendorId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Vendor Details:", data.vendor);
    console.log("Content Score:", data.recommendationBreakdown.contentBasedScore);
    console.log("Collaborative Score:", data.recommendationBreakdown.collaborativeScore);
  })
  .catch(err => console.error("Error:", err));
```

**Success Response (200):**
```json
{
  "success": true,
  "vendor": {
    "_id": "65a8f2b1c3d4e5f6g7h8i9j1",
    "shopName": "Fresh Vegetables Co.",
    "location": "Mumbai",
    "rating": 4.8,
    "contactNumber": "9876543210",
    "image": "vendor1.jpg"
  },
  "recommendationBreakdown": {
    "contentBasedScore": 0.92,
    "collaborativeScore": 0.78,
    "hybridScore": 0.872,
    "explanation": {
      "contentBased": "Based on your purchase history, categories, location preferences, and typical price range",
      "collaborative": "Based on what similar users (with similar purchasing patterns) have ordered",
      "hybrid": "Combined recommendation using both content and collaborative signals"
    }
  },
  "topProducts": [
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j6",
      "name": "Tomatoes",
      "category": "Vegetables",
      "price": 40,
      "rating": 4.7
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j7",
      "name": "Spinach",
      "category": "Vegetables",
      "price": 30,
      "rating": 4.5
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j8",
      "name": "Onions",
      "category": "Vegetables",
      "price": 35,
      "rating": 4.6
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j9",
      "name": "Cabbage",
      "category": "Vegetables",
      "price": 25,
      "rating": 4.4
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9ja",
      "name": "Carrots",
      "category": "Vegetables",
      "price": 32,
      "rating": 4.8
    }
  ]
}
```

---

### 3. Get Recommendation Statistics
**Endpoint:** `GET /api/recommend/stats/:userId`

**Parameters:**
- `userId` (required, path): MongoDB User ID

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/recommend/stats/65a8f2b1c3d4e5f6g7h8i9j0"
```

**JavaScript Fetch:**
```javascript
const userId = "65a8f2b1c3d4e5f6g7h8i9j0";

fetch(`/api/recommend/stats/${userId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Total Orders:", data.orderHistory.totalOrders);
    console.log("Total Spent:", data.orderHistory.totalSpent);
    console.log("Favorite Categories:", data.preferences.favoriteCategories);
    console.log("Price Range:", data.preferences.priceRange);
  })
  .catch(err => console.error("Error:", err));
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "65a8f2b1c3d4e5f6g7h8i9j0",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "vendor"
  },
  "orderHistory": {
    "totalOrders": 12,
    "totalSpent": 45000,
    "uniqueSuppliers": 6
  },
  "preferences": {
    "favoriteCategories": ["Vegetables", "Fruits", "Dairy"],
    "priceRange": {
      "min": 25,
      "max": 500,
      "average": 150.50
    }
  }
}
```

---

## Testing Workflow

### Step 1: Ensure You Have Test Data
1. Create at least 2 users with role "vendor" in MongoDB
2. Create at least 3 users with role "supplier" in MongoDB
3. Create products under different suppliers
4. Create orders linking vendors to suppliers

**Sample MongoDB Data:**
```javascript
// Create a vendor user
db.users.insertOne({
  name: "Test Vendor",
  email: "vendor@test.com",
  password: "hashed_password",
  role: "vendor",
  shopName: "My Shop",
  location: "Mumbai",
  rating: 4.5
});

// Create supplier users
db.users.insertOne({
  name: "Test Supplier 1",
  email: "supplier1@test.com",
  role: "supplier",
  shopName: "Supplier 1",
  location: "Mumbai",
  rating: 4.7
});

// Create products
db.products.insertOne({
  supplier: ObjectId("supplier_id_here"),
  name: "Tomatoes",
  category: "Vegetables",
  price: 40,
  inStock: true
});

// Create an order
db.orders.insertOne({
  vendorId: ObjectId("vendor_id_here"),
  supplierId: ObjectId("supplier_id_here"),
  items: [
    {
      productId: ObjectId("product_id_here"),
      name: "Tomatoes",
      price: 40,
      quantity: 10
    }
  ],
  totalAmount: 400,
  status: "Delivered"
});
```

### Step 2: Test Each Endpoint

**Test 1: Get Recommendations**
```bash
# Replace the ID with actual vendor user ID from database
curl -X GET "http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0?limit=5"
```

**Expected Result:**
- Status: 200
- Response contains array of 5 vendors (or fewer if less than 5 exist)
- Each vendor has `recommendationScore` between 0-1

**Test 2: Get Vendor Details**
```bash
curl -X GET "http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0/vendor/65a8f2b1c3d4e5f6g7h8i9j1"
```

**Expected Result:**
- Status: 200
- Contains breakdown of contentBasedScore and collaborativeScore
- Includes top 5 products from vendor

**Test 3: Get User Profile**
```bash
curl -X GET "http://localhost:5000/api/recommend/stats/65a8f2b1c3d4e5f6g7h8i9j0"
```

**Expected Result:**
- Status: 200
- Shows order history and user preferences
- Lists favorite categories and price range

### Step 3: Test Edge Cases

**New User (No Order History):**
- Should return scores around 0.5 (neutral)
- Should not error

**Invalid User ID:**
- Should return 404 error

**Non-existent Vendor:**
- Should return 404 error

---

## Performance Benchmarks

| Operation | Expected Time |
|-----------|--------------|
| Get 5 recommendations | < 500ms |
| Get 10 recommendations | < 1000ms |
| Get vendor details | < 300ms |
| Get user profile | < 200ms |

---

## Debugging Tips

### Enable Logging
Check console output in your Node.js terminal:
```
📊 Calculating recommendations for user 65a8f2b1c3d4e5f6g7h8i9j0...
✅ Successfully generated 5 recommendations
```

### Check Database Connectivity
```javascript
// In server logs, you should see:
// ✔ Server running on port 5000
// Connected to MongoDB
```

### Verify Route Registration
```javascript
// In index.js, verify this line exists:
app.use("/api/recommend", require("./routes/recommendationRoutes"));
```

### Monitor Network Requests
Open browser DevTools → Network tab:
1. Load marketplace.html
2. Should see GET request to `/api/recommend/{userId}`
3. Check Response tab for recommendations data

---

## Common Issues & Solutions

### Issue: "User not found" (404)
**Solution:** Verify the userId exists in MongoDB
```bash
# Check in MongoDB
db.users.findOne({_id: ObjectId("your_id")})
```

### Issue: Empty recommendations array
**Solution:** User may be new with no order history
- Create sample orders in MongoDB
- Or scores are correctly returning 0.5 for new users

### Issue: Slow API response
**Solution:** 
- Check database indexes
- Reduce limit parameter
- Consider implementing caching with Redis

### Issue: Vendor details endpoint returns 404
**Solution:** Verify both userId and vendorId exist in database

---

## Frontend Testing in Browser Console

```javascript
// Test from browser console on marketplace page

// 1. Initialize recommendation system
console.log(window.recommendationSystem);

// 2. Get current user ID
console.log(window.recommendationSystem.userId);

// 3. Fetch and display recommendations
window.recommendationSystem.fetchRecommendations(5)
  .then(recs => {
    console.log("Fetched recommendations:", recs);
    window.recommendationSystem.displayRecommendations(recs);
  });

// 4. Get vendor details
window.recommendationSystem.fetchVendorDetails("vendor_id_here")
  .then(data => console.log("Vendor data:", data));

// 5. Get user profile
window.recommendationSystem.fetchUserProfile()
  .then(profile => console.log("User profile:", profile));
```
