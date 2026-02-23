# 🎯 VendorLink Personalized Recommendation System

## Overview

A production-ready **Hybrid Recommendation Engine** that provides personalized vendor suggestions to VendorLink users based on their purchasing behavior and preferences. The system combines **Content-Based Filtering** (60%) and **Collaborative Filtering** (40%) to deliver accurate, relevant recommendations.

---

## 🎨 Features

### Core Features
✨ **Hybrid Recommendation Algorithm**
- Content-based filtering using user purchase history
- Collaborative filtering based on similar users
- Weighted hybrid scoring for balanced recommendations

📊 **Smart Scoring System**
- Analyzes user categories, locations, and price ranges
- Identifies similar users with matching preferences
- Ranks vendors by relevance score (0-1)

🎯 **Personalization**
- Different recommendations for each user
- Improves over time as users make more purchases
- Handles new users gracefully with neutral scores

🚀 **Performance Optimized**
- Async/await non-blocking operations
- Lean database queries
- Ready for caching with Redis

### User Interface
🎨 **Beautiful Recommendation Cards**
- Vendor images with gradient overlays
- Color-coded match percentage badges
- Ranking badges (#1, #2, #3, etc.)
- One-click contact and details view

📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Optimized layouts for all screen sizes
- Touch-friendly buttons and modals

🔍 **Detailed Vendor Modals**
- Recommendation breakdown visualization
- Content vs collaborative score comparison
- Top products from vendor
- Direct contact options

---

## 🏗️ Architecture

### Backend Stack
- **Node.js + Express** - REST API
- **MongoDB** - Data persistence
- **Mongoose** - ODM for MongoDB

### Frontend Stack
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern responsive styling
- **Fetch API** - HTTP requests

### Database Models
```
User (vendor/supplier)
├── Order
│   └── items[]
│       └── Product
│           └── supplier (User)
└── Vendor (reference for suppliers)
```

---

## 📦 Files Included

### Backend Files
| File | Purpose |
|------|---------|
| `server/controllers/recommendationController.js` | Core recommendation logic (320 lines) |
| `server/routes/recommendationRoutes.js` | API endpoint definitions |
| `server/index.js` | Updated with recommendation routes |

### Frontend Files
| File | Purpose |
|------|---------|
| `frontend/assets/js/recommendations.js` | Frontend recommendation client (400 lines) |
| `frontend/css/recommendations.css` | Complete styling (700+ lines) |
| `frontend/marketplace.html` | Integration guide |

### Documentation Files
| File | Purpose |
|------|---------|
| `IMPLEMENTATION_SUMMARY.md` | Complete implementation overview |
| `RECOMMENDATION_SYSTEM_DOCS.md` | Algorithm and concept documentation |
| `API_TESTING_GUIDE.md` | Testing procedures and examples |
| `MARKETPLACE_INTEGRATION_GUIDE.md` | Step-by-step integration instructions |
| `README.md` | This file |

---

## 🚀 Quick Start

### Prerequisites
- Node.js and npm installed
- MongoDB running
- VendorLink backend server

### Installation

1. **Backend Setup** (Already Done)
```bash
# No additional packages needed!
# Just verify index.js has the recommendation routes:
app.use("/api/recommend", require("./routes/recommendationRoutes"));
```

2. **Frontend Setup**

Add to `marketplace.html` head:
```html
<link rel="stylesheet" href="css/recommendations.css">
<script src="assets/js/recommendations.js"></script>
```

Add HTML section:
```html
<section class="recommendations-section">
  <div id="recommended-vendors">
    <p class="no-recommendations">Loading recommendations...</p>
  </div>
</section>
```

Add initialization script:
```javascript
<script>
document.addEventListener("DOMContentLoaded", async () => {
  if (window.recommendationSystem?.userId) {
    const recs = await window.recommendationSystem.fetchRecommendations(5);
    window.recommendationSystem.displayRecommendations(recs);
  }
});
</script>
```

3. **Start the Server**
```bash
cd server
npm run dev  # or npm start
```

4. **Test It**
```bash
# In another terminal
curl http://localhost:5000/api/recommend/{userId}
```

---

## 📡 API Endpoints

### 1. Get Recommendations
```http
GET /api/recommend/:userId?limit=5
```

Returns top N recommended vendors with scores.

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "_id": "...",
      "shopName": "Fresh Vegetables Co.",
      "location": "Mumbai",
      "rating": 4.8,
      "recommendationScore": 0.872
    }
  ]
}
```

### 2. Get Vendor Details
```http
GET /api/recommend/:userId/vendor/:vendorId
```

Returns vendor with recommendation breakdown.

**Response:**
```json
{
  "vendor": {...},
  "recommendationBreakdown": {
    "contentBasedScore": 0.92,
    "collaborativeScore": 0.78,
    "hybridScore": 0.872
  },
  "topProducts": [...]
}
```

### 3. Get User Profile
```http
GET /api/recommend/stats/:userId
```

Returns user's preference profile and statistics.

**Response:**
```json
{
  "orderHistory": {
    "totalOrders": 12,
    "totalSpent": 45000
  },
  "preferences": {
    "favoriteCategories": ["Vegetables", "Fruits"],
    "priceRange": {"min": 25, "max": 500}
  }
}
```

---

## 🧮 Algorithm Details

### Content-Based Filtering (60% weight)

Recommends vendors based on user's past purchase patterns:

1. **Extract User Profile**
   - Favorite product categories
   - Preferred locations
   - Typical price range

2. **Feature Matching**
   - Category Match: Does vendor sell what user likes?
   - Location Match: Is vendor in preferred location?
   - Price Match: Does vendor's prices align with user's budget?

3. **Calculate Score**
   ```
   contentScore = (0.5 × category) + (0.3 × location) + (0.2 × price)
   ```

### Collaborative Filtering (40% weight)

Recommends vendors based on similar users' preferences:

1. **Find Similar Users**
   - Users who ordered from same suppliers as current user

2. **Identify Popular Vendors**
   - Count how many similar users ordered from vendor
   - Higher count = higher recommendation

3. **Calculate Score**
   ```
   collaborativeScore = (vendorOrdersBySimular / totalSimilar)
   ```

### Hybrid Score

Combines both approaches for balanced recommendations:

```javascript
finalScore = (0.6 × contentScore) + (0.4 × collaborativeScore)
```

**Score Interpretation:**
- 0.85-1.0: Highly Recommended 🏆
- 0.65-0.84: Recommended 🥈
- 0.45-0.64: Somewhat Relevant 🥉
- 0.0-0.44: Not Recommended

---

## 💻 Frontend Usage

### Initialize System
```javascript
// Automatically initialized on page load
const recommender = window.recommendationSystem;
```

### Fetch Recommendations
```javascript
const vendors = await recommender.fetchRecommendations(5);
```

### Display on Page
```javascript
recommender.displayRecommendations(vendors, "recommended-vendors");
```

### Show Vendor Details
```javascript
recommender.showVendorModal(vendorId);
```

### Get User Profile
```javascript
const profile = await recommender.fetchUserProfile();
console.log(profile.preferences);
```

---

## 🧪 Testing

### Quick API Test
```bash
# Get recommendations for user
curl http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0

# Get vendor details
curl http://localhost:5000/api/recommend/65a8f2b1c3d4e5f6g7h8i9j0/vendor/65a8f2b1c3d4e5f6g7h8i9j1

# Get user profile
curl http://localhost:5000/api/recommend/stats/65a8f2b1c3d4e5f6g7h8i9j0
```

### Browser Console Test
```javascript
// Check initialization
console.log(window.recommendationSystem);

// Fetch recommendations
window.recommendationSystem.fetchRecommendations(5)
  .then(data => console.log(data));

// Display recommendations
window.recommendationSystem.displayRecommendations(vendors);
```

### Create Test Data
```javascript
// MongoDB commands to create test data
db.users.insertOne({
  name: "Test Vendor",
  email: "vendor@test.com",
  role: "vendor",
  shopName: "My Shop",
  location: "Mumbai",
  rating: 4.5
});
```

See `API_TESTING_GUIDE.md` for detailed testing procedures.

---

## ⚡ Performance

### Optimization Techniques
- ✅ Lean queries (`.lean()`) for read-only operations
- ✅ Selective field projections (`.select()`)
- ✅ Async/await non-blocking operations
- ✅ Early exit for new users
- ✅ Minimal database round-trips

### Expected Response Times
| Operation | Time |
|-----------|------|
| Get 5 recommendations | < 500ms |
| Get 10 recommendations | < 1000ms |
| Get vendor details | < 300ms |
| Get user profile | < 200ms |

### Future Optimizations
- Redis caching for frequent queries
- Pre-computed user vectors
- Batch recommendation generation
- Background score updates
- Database indexing

---

## 🎨 UI Components

### Recommendation Card
- Vendor image with hover effect
- Match percentage badge (animated)
- Ranking badge (#1, #2, etc.)
- Quick view and contact buttons
- Responsive grid layout

### Vendor Modal
- Large vendor image
- Recommendation score breakdown
- Visual score representation
- Top products listing
- Contact options

### User Profile Section
- Order statistics
- Favorite categories
- Price range summary
- Visual indicators

---

## 🔧 Configuration

### Adjust Algorithm Weights

Edit `server/controllers/recommendationController.js`:

```javascript
// Change line ~290 (in getHybridScore function)
const hybridScore = 0.6 * contentScore + 0.4 * collaborativeScore;

// Adjust weights as needed:
// 0.7 * contentScore + 0.3 * collaborativeScore
// 0.5 * contentScore + 0.5 * collaborativeScore
```

### Customize Default Recommendations Count

Edit `frontend/assets/js/recommendations.js`:

```javascript
// Line ~45 (in displayRecommendations)
const recommendations = await this.fetchRecommendations(5);
// Change 5 to desired number
```

---

## 📚 Documentation

1. **IMPLEMENTATION_SUMMARY.md**
   - Complete project overview
   - File-by-file breakdown
   - Feature descriptions

2. **RECOMMENDATION_SYSTEM_DOCS.md**
   - Algorithm explanations
   - API endpoint details
   - Usage examples

3. **API_TESTING_GUIDE.md**
   - Testing procedures
   - Curl examples
   - Debugging tips

4. **MARKETPLACE_INTEGRATION_GUIDE.md**
   - Step-by-step integration
   - CSS and HTML code
   - Code snippets

---

## 🐛 Troubleshooting

### Issue: "User not found"
**Solution:** Verify user ID exists in MongoDB
```bash
db.users.findOne({_id: ObjectId("your_id")})
```

### Issue: Empty recommendations
**Solution:** Ensure user has order history or create sample orders

### Issue: Slow API response
**Solution:** Check database indexes and reduce limit parameter

### Issue: Recommendations not showing on page
**Solution:** Verify recommendations.js is loaded and userId is set

See `API_TESTING_GUIDE.md` for more troubleshooting tips.

---

## 🚀 Future Enhancements

### Short Term
- [ ] Implement Redis caching
- [ ] Add pagination to results
- [ ] User feedback loop integration
- [ ] A/B testing framework

### Medium Term
- [ ] Machine learning model integration
- [ ] Real-time score updates
- [ ] Advanced filtering options
- [ ] Recommendation explanation in natural language

### Long Term
- [ ] TensorFlow.js integration
- [ ] Deep learning recommendations
- [ ] Seasonal adjustment
- [ ] Geographic optimization

---

## 🔐 Security

### Current Security Measures
- ✅ User authentication via JWT
- ✅ Input validation on routes
- ✅ Error message sanitization
- ✅ No sensitive data exposure

### Recommendations
- Always verify user ownership before returning recommendations
- Implement rate limiting on API endpoints
- Add request validation middleware
- Use HTTPS in production

---

## 📄 License

Same as VendorLink project

---

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API_TESTING_GUIDE.md
3. Check server console logs
4. Review browser console for errors

---

## 🎉 Credits

Built as part of VendorLink hackathon project - A modern B2B marketplace for street food vendors.

---

**Happy Recommending! 🚀**
