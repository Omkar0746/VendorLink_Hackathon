## Personalized Vendor Recommendation System - Documentation

### Overview
The recommendation system uses a hybrid approach combining:
- **Content-Based Filtering** (60%): Recommends vendors based on user's past purchase history
- **Collaborative Filtering** (40%): Recommends vendors liked by similar users

### API Endpoints

#### 1. Get Recommended Vendors
```
GET /api/recommend/:userId
```

**Query Parameters:**
- `limit` (optional, default: 5): Number of recommendations to return

**Response Example:**
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
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j3",
      "shopName": "Daily Supplies Ltd",
      "location": "Pune",
      "rating": 4.5,
      "contactNumber": "9876543212",
      "image": "vendor3.jpg",
      "recommendationScore": 0.681
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j4",
      "shopName": "Premium Foods",
      "location": "Mumbai",
      "rating": 4.7,
      "contactNumber": "9876543213",
      "image": "vendor4.jpg",
      "recommendationScore": 0.634
    },
    {
      "_id": "65a8f2b1c3d4e5f6g7h8i9j5",
      "shopName": "Local Grocers",
      "location": "Bangalore",
      "rating": 4.4,
      "contactNumber": "9876543214",
      "image": "vendor5.jpg",
      "recommendationScore": 0.567
    }
  ]
}
```

#### 2. Get Vendor Details with Recommendation Context
```
GET /api/recommend/:userId/vendor/:vendorId
```

**Response Example:**
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
    }
  ]
}
```

#### 3. Get Recommendation Statistics
```
GET /api/recommend/stats/:userId
```

**Response Example:**
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

### How It Works

#### Content-Based Filtering (60% weight)
1. **Extract User Preferences** from order history:
   - Product categories purchased
   - Supplier locations
   - Average price points

2. **Create Feature Vectors**:
   - Category Match: Does vendor have products in user's favorite categories?
   - Location Match: Is vendor in same location as user's preferred suppliers?
   - Price Similarity: Does vendor's price range match user's spending pattern?

3. **Calculate Score** using weighted average:
   ```
   contentScore = (0.5 × categoryMatch) + (0.3 × locationMatch) + (0.2 × priceSimilarity)
   ```

#### Collaborative Filtering (40% weight)
1. **Find Similar Users**:
   - Users who have ordered from the same suppliers

2. **Identify Vendor Popularity**:
   - Count how many similar users have ordered from this vendor
   - Higher count = higher recommendation

3. **Calculate Score**:
   ```
   collaborativeScore = (vendorOrdersBySimlarUsers) / (totalSimilarUsers)
   ```

#### Hybrid Score
```
finalScore = (0.6 × contentScore) + (0.4 × collaborativeScore)
```

### Performance Optimization

1. **Lean Queries**: Uses `.lean()` for read-only operations
2. **Selective Projections**: Only fetches required fields
3. **Early Exit**: Returns neutral scores for new users quickly
4. **Caching Ready**: Can implement Redis caching for frequently accessed scores

### Error Handling

- **Invalid User**: Returns 404 if user not found
- **No Vendors**: Returns empty recommendations array gracefully
- **New Users**: Returns neutral scores (0.5) while they build order history
- **Database Errors**: Caught and logged with meaningful error messages

### Usage Examples

#### Frontend - Fetch Recommendations
```javascript
// Get recommendations for current user
const userId = localStorage.getItem('userId'); // From login

fetch(`/api/recommend/${userId}?limit=5`)
  .then(res => res.json())
  .then(data => {
    console.log('Recommended vendors:', data.recommendations);
    displayRecommendations(data.recommendations);
  })
  .catch(err => console.error('Error:', err));
```

#### Frontend - Display Recommendations
```javascript
function displayRecommendations(vendors) {
  const container = document.getElementById('recommended-vendors');
  
  vendors.forEach(vendor => {
    const card = document.createElement('div');
    card.className = 'vendor-card';
    card.innerHTML = `
      <img src="${vendor.image}" alt="${vendor.shopName}">
      <h3>${vendor.shopName}</h3>
      <p>📍 ${vendor.location}</p>
      <p>⭐ ${vendor.rating}</p>
      <p>Match: ${(vendor.recommendationScore * 100).toFixed(1)}%</p>
      <button onclick="viewVendor('${vendor._id}')">View Details</button>
    `;
    container.appendChild(card);
  });
}
```

### Database Models Used

- **User** (role: "vendor" or "supplier")
  - shopName, location, rating, contactNumber, image

- **Order**
  - vendorId (who placed order)
  - supplierId (who fulfills order)
  - items, totalAmount, status

- **Product**
  - supplier (vendorId)
  - name, category, price, rating

### Future Enhancements

1. **Caching**: Redis for frequent queries
2. **ML Models**: TensorFlow.js for advanced pattern recognition
3. **Real-time Updates**: WebSocket for live score updates
4. **A/B Testing**: Compare different recommendation strategies
5. **User Feedback Loop**: Track if users click/buy recommended vendors
6. **Seasonal Adjustments**: Adjust recommendations based on time of year
7. **Geolocation**: Use actual GPS coordinates for better location matching
