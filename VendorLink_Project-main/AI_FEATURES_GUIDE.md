# VendorLink: AI & Machine Learning Features Guide

## 📊 Current AI Status
- ✅ **Existing:** Random Forest price prediction model (Street Food products)
- ✅ **API:** Flask ML API running on port 5001
- ✅ **Data:** Street food commodity prices dataset
- ✅ **Integration:** Hybrid recommendation system (content-based + collaborative)

---

## 🤖 AI FEATURES TO ADD (Ranked by Impact)

### 1. **Demand Forecasting** ⭐⭐⭐⭐⭐
**Impact:** 🟢 Critical | **Effort:** 🟡 Medium | **Value:** $$$

**Problem Solved:** 
- Vendors waste resources on overstocking/understocking
- Suppliers can't plan production
- Lost sales opportunities

**Solution:**
- Use Time Series forecasting (ARIMA, Prophet, LSTM)
- Predict weekly/monthly demand per product category
- Show predicted trends in analytics dashboard

**Implementation:**
```python
# ml_price_api/demand_forecasting.py
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose
import pandas as pd

# Data: Order history by product, date
# Train on historical orders
# Predict next 30 days demand

def forecast_demand(product_id, days=30):
    orders = get_order_history(product_id)  # time-series data
    model = ARIMA(orders, order=(1,1,1))
    fitted = model.fit()
    forecast = fitted.get_forecast(steps=days)
    return forecast.predicted_mean
```

**Frontend:**
- Vendor dashboard shows: "Expected demand next week: 500 units"
- Graph showing predicted vs actual
- Alerts for unusual patterns

**Estimated Time:** 12-16 hours | **ROI:** Very High 💰

---

### 2. **Dynamic Pricing Optimization** ⭐⭐⭐⭐
**Impact:** 🟡 High | **Effort:** 🟡 Medium | **Value:** $$

**Problem Solved:**
- Static pricing loses competitiveness
- Suppliers miss revenue optimization opportunities
- Price wars unnecessary

**Solution:**
- Analyze competitor prices, demand, inventory levels
- Recommend optimal price point
- A/B test different prices to find sweet spot

**Algorithm:**
```python
# Factors to consider:
# 1. Competitor average price
# 2. Your inventory level (excess = lower price)
# 3. Seasonal demand (high demand = higher price)
# 4. Customer loyalty (loyal customers = slight premium)
# 5. Profit margin target

def recommend_price(product_id):
    base_price = get_base_cost(product_id)
    competitor_avg = get_competitor_average(product_id)
    demand_multiplier = get_demand_level(product_id)
    inventory_level = get_inventory(product_id)
    
    # Adjust based on inventory
    if inventory_level < threshold:
        price_multiplier = 1.1  # Increase price
    elif inventory_level > max_level:
        price_multiplier = 0.9  # Decrease price
    else:
        price_multiplier = 1.0
    
    # Adjust based on demand
    price_multiplier *= demand_multiplier
    
    recommended_price = competitor_avg * price_multiplier * margin_target
    return recommended_price, confidence_score
```

**Estimated Time:** 10-14 hours

---

### 3. **Inventory Optimization** ⭐⭐⭐⭐
**Impact:** 🟡 High | **Effort:** 🟡 Medium | **Value:** $$

**Problem Solved:**
- Vendors order too much (waste) or too little (lost sales)
- Seasonal products not managed well
- Stockouts frustrate customers

**Solution:**
- Predict optimal stock levels
- Alerts for reorder points
- Seasonal adjustment recommendations

**Algorithm:**
```python
def calculate_optimal_stock(product_id, supplier_id):
    # Variables:
    avg_daily_demand = calculate_moving_average(product_id, days=30)
    lead_time_days = get_supplier_leadtime(supplier_id)
    demand_variability = calculate_std_deviation(product_id)
    holding_cost_per_unit = get_holding_cost(product_id)
    shortage_cost = get_shortage_cost(product_id)
    
    # Safety stock = Z * σ * √L
    Z = 1.65  # 95% service level
    safety_stock = Z * demand_variability * (lead_time_days ** 0.5)
    
    # Reorder point = (avg_daily_demand * lead_time) + safety_stock
    reorder_point = (avg_daily_demand * lead_time_days) + safety_stock
    
    # Economic order quantity (EOQ)
    annual_demand = avg_daily_demand * 365
    ordering_cost = 50  # per order
    eoq = (2 * annual_demand * ordering_cost / holding_cost_per_unit) ** 0.5
    
    return {
        'reorder_point': reorder_point,
        'optimal_order_qty': eoq,
        'safety_stock': safety_stock
    }
```

**Estimated Time:** 12-16 hours

---

### 4. **Customer Churn Prediction** ⭐⭐⭐
**Impact:** 🟡 High | **Effort:** 🟡 Medium | **Value:** $$

**Problem Solved:**
- Lose customers without warning
- Can't take preventive action
- Unknown reasons for churn

**Solution:**
- Predict which vendors/suppliers likely to churn
- Identify at-risk customers
- Suggest retention actions

**Data Required:**
```
- User activity (login frequency, purchases, support tickets)
- Order value trends
- Engagement scores (message responses, reviews, etc.)
- Days since last purchase
```

**Implementation:**
```python
from sklearn.ensemble import RandomForestClassifier

def predict_churn(user_id):
    features = extract_user_features(user_id)
    # Features: order frequency, avg order value, days inactive, etc.
    
    model = load_pretrained_churn_model()
    churn_probability = model.predict_proba(features)[0][1]
    
    if churn_probability > 0.7:
        trigger_retention_actions(user_id, churn_probability)
    
    return churn_probability
```

**Estimated Time:** 8-12 hours

---

### 5. **Automated Review/Sentiment Analysis** ⭐⭐⭐
**Impact:** 🟡 High | **Effort:** 🟢 Low | **Value:** $

**Problem Solved:**
- Manual review moderation is time-consuming
- Can't identify trending issues
- Negative reviews not properly highlighted

**Solution:**
- Auto-classify reviews (positive/negative/neutral)
- Extract key complaints/compliments
- Flag suspicious reviews (spam, fake)

**Implementation:**
```python
# Using transformers library (pre-trained models)
from transformers import pipeline

sentiment_analyzer = pipeline('sentiment-analysis')

def analyze_review(review_text):
    result = sentiment_analyzer(review_text)
    # Returns: {'label': 'POSITIVE/NEGATIVE', 'score': 0.95}
    
    sentiment = result[0]['label']
    confidence = result[0]['score']
    
    # Extract key topics
    issues = extract_keywords(review_text)  # complaint type, shipping, quality, etc.
    
    return {
        'sentiment': sentiment,
        'confidence': confidence,
        'key_topics': issues,
        'requires_moderation': confidence < 0.7  # uncertain reviews
    }
```

**Tools:** Use HuggingFace Transformers (free, no API key needed)

**Estimated Time:** 4-6 hours

---

### 6. **Fraud Detection & Anomaly Detection** ⭐⭐⭐
**Impact:** 🟡 Medium | **Effort:** 🟡 Medium | **Value:** $$$

**Problem Solved:**
- Fake accounts, payment fraud
- Vendor manipulation (fake orders/reviews)
- Unusual transactions

**Solution:**
- Detect suspicious patterns
- Flag high-risk transactions
- Real-time alerts

**Anomalies to Detect:**
```
1. Sudden spike in orders from single user
2. Multiple accounts from same IP
3. Very high order value compared to history
4. Impossible shipping addresses
5. Duplicate product entries with different pricing
6. Sudden rating drop (fake negative reviews)
```

**Implementation:**
```python
from sklearn.ensemble import IsolationForest

def detect_fraud(transaction_data):
    features = extract_transaction_features(transaction_data)
    # Features: order_value, vendor_age, user_age, location_match, etc.
    
    model = IsolationForest(contamination=0.05)
    predictions = model.predict(features)
    
    if predictions[-1] == -1:  # -1 indicates anomaly
        flag_transaction_for_review()
    
    return predictions
```

**Estimated Time:** 10-14 hours

---

### 7. **Chatbot for Customer Support** ⭐⭐⭐
**Impact:** 🟡 Medium | **Effort:** 🟡 Medium | **Value:** $

**Problem Solved:**
- Manual support is time-consuming
- Customers wait for responses
- Common questions asked repeatedly

**Solution:**
- AI chatbot handles FAQs
- Routes complex issues to human support
- 24/7 support availability

**Implementation Options:**

**Option A: Simple Rule-Based (Easy)**
```python
import spacy
from fuzzywuzzy import fuzz

FAQ = {
    'order status': 'You can check your order status in the Orders page',
    'return policy': 'We accept returns within 7 days...',
    'payment methods': 'We accept credit cards, UPI, wallet...'
}

def simple_chatbot(user_query):
    best_match = None
    best_score = 0
    
    for question, answer in FAQ.items():
        score = fuzz.token_set_ratio(user_query.lower(), question)
        if score > best_score:
            best_score = score
            best_match = answer
    
    if best_score > 70:
        return best_match
    else:
        return "Let me connect you with a support agent..."
```

**Option B: LLM-Based (Advanced)**
```python
from openai import OpenAI  # or use local models like Ollama

def ai_chatbot(user_query, context_user_id):
    user_context = get_user_data(context_user_id)
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are VendorLink support assistant..."},
            {"role": "user", "content": user_query}
        ]
    )
    
    return response.choices[0].message.content
```

**Estimated Time:** 6-10 hours (simple) / 16-20 hours (advanced)

---

### 8. **Product Recommendation Enhancement** ⭐⭐⭐
**Impact:** 🟡 Medium | **Effort:** 🟢 Low-Medium | **Value:** $

**Current:** Hybrid recommendations exist  
**Enhancement:** Add AI-based personalization

**Features to Add:**
```
1. Cross-selling: "Customers who bought X also bought Y"
2. Upselling: "Premium alternative to your usual purchase"
3. Bundle recommendations: "Save 15% with this bundle"
4. Trending products: "Trending in your region this week"
5. Seasonal suggestions: "Weather-based recommendations"
```

**Implementation:**
```python
# Using collaborative filtering with matrix factorization
from sklearn.decomposition import NMF

def get_bundle_recommendations(product_id):
    # Find products frequently bought together
    frequently_bought_together = get_association_rules(product_id)
    
    # Calculate bundle discount
    individual_total = sum(p.price for p in frequently_bought_together)
    bundle_price = individual_total * 0.85  # 15% discount
    
    return frequently_bought_together, bundle_price

# Trending products
def get_trending(category, region, days=7):
    recent_orders = get_orders_by_date_and_region(category, region, days)
    trend_scores = calculate_trend_velocity(recent_orders)
    return sorted(trend_scores, reverse=True)[:5]
```

**Estimated Time:** 6-8 hours

---

### 9. **Email Campaign Optimization** ⭐⭐
**Impact:** 🟡 Medium | **Effort:** 🟡 Medium | **Value:** $

**Problem Solved:**
- Email campaigns have low open rates
- Wrong message to wrong person at wrong time

**Solution:**
- Predict best time to send email
- Personalize subject lines
- AI-generated email templates

**Estimated Time:** 8-10 hours

---

### 10. **Image Recognition for Products** ⭐⭐
**Impact:** 🟡 Medium | **Effort:** 🟡 Medium | **Value:** $

**Problem Solved:**
- Product quality control
- Automatic product categorization
- Detect counterfeit/low-quality products

**Solution:**
- ML model to classify product images
- Quality score based on visual inspection
- Auto-categorize when uploading

**Implementation:**
```python
from PIL import Image
from transformers import pipeline

image_classifier = pipeline('image-classification', 
                            model='google/vit-base-patch16-224')

def classify_product_image(image_file):
    image = Image.open(image_file)
    results = image_classifier(image)
    
    # Returns: vegetable, fruit, grain, dairy, etc.
    # With confidence scores
    
    return results

# Quality detection
def assess_product_quality(image_file):
    # Check for: freshness, packaging condition, damage
    # Return quality score 1-5
    
    image = Image.open(image_file)
    # Run through quality assessment model
    quality_score = quality_model.predict(image)
    
    if quality_score < 3:
        flag_for_vendor_review()
    
    return quality_score
```

**Estimated Time:** 12-16 hours

---

## 📈 QUICK IMPLEMENTATION ROADMAP

### Phase 1: Easy Wins (Week 1-2)
```
1. ✅ Review Sentiment Analysis (4-6h)
2. ✅ Trending Products Analysis (4-6h)
3. ✅ Expand existing Price Model (4-6h)
```

### Phase 2: Medium Complexity (Week 3-4)
```
4. ✅ Demand Forecasting (12-16h)
5. ✅ Simple Chatbot (6-10h)
6. ✅ Dynamic Pricing (10-14h)
```

### Phase 3: Advanced (Week 5-6)
```
7. ✅ Fraud Detection (10-14h)
8. ✅ Churn Prediction (8-12h)
9. ✅ Image Recognition (12-16h)
```

### Phase 4: Polish (Week 7+)
```
10. ✅ Email Optimization (8-10h)
11. ✅ Inventory Optimization (12-16h)
```

---

## 🛠️ TECH STACK FOR AI FEATURES

### Already Installed:
```
✅ scikit-learn (machine learning)
✅ pandas (data processing)
✅ numpy (numeric computing)
✅ joblib (model serialization)
✅ Flask (API framework)
```

### New Packages Needed:
```bash
# Time series forecasting
pip install statsmodels prophet

# NLP and sentiment
pip install transformers torch

# Fraud/anomaly detection
pip install pyod

# Image recognition
pip install Pillow torchvision torch

# LLMs (optional)
pip install openai

# Feature extraction
pip install python-dateutil scipy

# Data visualization
pip install matplotlib seaborn
```

---

## 📊 EXPECTED BUSINESS IMPACT

| AI Feature | Revenue Impact | Cost Reduction | User Retention | Dev Time |
|-----------|-----------------|-----------------|-----------------|----------|
| Demand Forecasting | 📈📈 +20-30% | 💰💰 High | 📊 Medium | 12-16h |
| Dynamic Pricing | 📈📈 +15-25% | 💰 Medium | 📊 Low | 10-14h |
| Churn Prediction | 📈 +5-10% | 💰 Medium | 📊📊 High | 8-12h |
| Sentiment Analysis | 📈 +5% | 💰 Medium | 📊 Medium | 4-6h |
| Fraud Detection | 📈 +2% | 💰💰 Very High | 📊 Medium | 10-14h |
| Chatbot | 📈 +3% | 💰💰 High | 📊 Medium | 6-10h |
| Inventory Optimization | 📈 +10-15% | 💰💰💰 Very High | 📊 Medium | 12-16h |

---

## 🎯 TOP 3 RECOMMENDATIONS (Start Here!)

### 1️⃣ **Demand Forecasting** (Highest ROI)
- **Why First?** Directly increases revenue, reduces waste
- **Tech:** ARIMA or Prophet
- **Dashboard Impact:** Show predicted vs actual demand
- **Time:** 12-16 hours
- **Business Value:** $$$

### 2️⃣ **Review Sentiment Analysis** (Easiest)
- **Why Easy?** Pre-trained models available, no training needed
- **Tech:** HuggingFace Transformers
- **Impact:** Auto-moderation, identify trends
- **Time:** 4-6 hours
- **Business Value:** Quick win

### 3️⃣ **Dynamic Pricing** (Revenue Booster)
- **Why Third?** Needs demand data, works with forecasting
- **Tech:** Algorithm-based optimization
- **Impact:** Increase margins, stay competitive
- **Time:** 10-14 hours
- **Business Value:** $$

---

## 🔗 HOW TO INTEGRATE AI WITH EXISTING PROJECT

### Current Setup:
```
Node.js Backend (Express) → MongoDB
    ↓
Python ML API (Flask) → ML Models
    ↓
Frontend (Vanilla JS)
```

### Integration Points:

**1. Add AI Route to Express:**
```javascript
// server/routes/aiRoutes.js
const router = require("express").Router();
const axios = require("axios");

// Call Python ML API
router.get("/demand-forecast/:productId", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/demand-forecast",
      { productId: req.params.productId }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

**2. Register in server/index.js:**
```javascript
app.use("/api/ai", require("./routes/aiRoutes"));
```

**3. Frontend Call:**
```javascript
fetch("/api/ai/demand-forecast/product123")
  .then(res => res.json())
  .then(data => {
    console.log("Predicted demand:", data.forecast);
    // Display on dashboard
  });
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Start with **Sentiment Analysis** (easiest, quick win)
- [ ] Expand **Price Prediction Model** with more features
- [ ] Add **Demand Forecasting** (high ROI)
- [ ] Implement **Dynamic Pricing** (revenue impact)
- [ ] Add **Fraud Detection**
- [ ] Build **Chatbot** (support automation)
- [ ] Create **Churn Prediction** (customer retention)
- [ ] Add **Image Recognition** (quality control)
- [ ] Optimize **Recommendations** (cross-sell/upsell)
- [ ] Build **Analytics Dashboard** with ML insights

---

## 💡 QUICK START CODE EXAMPLE

Here's how to add a simple AI feature (trending products):

```python
# ml_price_api/trending.py
from collections import Counter
from datetime import datetime, timedelta

def get_trending_products(days=7, limit=5):
    """Get trending products in last N days"""
    
    # Get orders from last N days
    start_date = datetime.now() - timedelta(days=days)
    orders = db.orders.find({"createdAt": {"$gte": start_date}})
    
    # Count product occurrences
    product_counts = Counter()
    for order in orders:
        for item in order['items']:
            product_counts[item['productId']] += 1
    
    # Get top products
    trending = product_counts.most_common(limit)
    
    # Get product details
    result = []
    for product_id, count in trending:
        product = db.products.findOne({"_id": product_id})
        result.append({
            "id": product_id,
            "name": product['name'],
            "orders_count": count,
            "trend_rank": len(result) + 1
        })
    
    return result
```

---

## 🎓 LEARNING RESOURCES

- **Scikit-learn docs:** https://scikit-learn.org
- **Prophet (forecasting):** https://facebook.github.io/prophet/
- **HuggingFace Transformers:** https://huggingface.co/
- **Statsmodels (ARIMA):** https://www.statsmodels.org/

---

