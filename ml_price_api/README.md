# Street Food Price Prediction Model

A machine learning-powered web application that predicts raw material prices for street food items across India based on product, season, and location.

## Features

✨ **Machine Learning Model**
- Trained on street food commodity price data
- Uses Random Forest algorithm for accurate predictions
- Considers product, season, and location factors

🎨 **Beautiful Web UI**
- Responsive HTML/CSS interface
- Real-time price predictions
- Comparison with actual average prices
- Mobile-friendly design

📊 **Data Insights**
- 50+ street food products
- 3 seasons (Summer, Monsoon, Winter)
- 10+ major Indian cities

## Project Structure

```
perdication/
├── Street_Food_Raw_Material_Prices_in_India.csv  # Dataset
├── model.py                                        # Model training script
├── app.py                                          # Flask backend
├── requirements.txt                                # Dependencies
├── templates/
│   └── index.html                                  # Web interface
└── static/
    ├── style.css                                   # Styling
    └── script.js                                   # Frontend logic
```

## Installation & Setup

### 1. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 2. Train the Model
```powershell
python model.py
```

This will:
- Load the CSV dataset
- Train a Random Forest model
- Save the model and encoders as pickle files
- Display model performance metrics (R² score, RMSE)

### 3. Run the Web Application
```powershell
python app.py
```

The application will start at `http://localhost:5000`

## Usage

1. Open your browser and go to `http://localhost:5000`
2. Select a product from the dropdown
3. Choose a season (Summer, Monsoon, or Winter)
4. Pick a location from major Indian cities
5. Click "Predict Price" to get the prediction
6. View the predicted price and compare with actual average

## Model Performance

- **Algorithm**: Random Forest Regressor
- **Features**: Product, Season, Location (encoded)
- **Training**: 80% of data
- **Testing**: 20% of data
- **Metrics**: R² Score, RMSE

## API Endpoints

### GET `/`
Returns the main web interface

### GET `/api/options`
Returns available products, seasons, and locations
```json
{
  "products": ["Salt", "Sugar", "Rice", ...],
  "seasons": ["Summer", "Monsoon", "Winter"],
  "locations": ["Bangalore", "Delhi", "Mumbai", ...]
}
```

### POST `/api/predict`
Makes a price prediction
**Request:**
```json
{
  "product": "Rice",
  "season": "Summer",
  "location": "Bangalore"
}
```

**Response:**
```json
{
  "predicted_price": 45.50,
  "actual_average": 43.20,
  "product": "Rice",
  "season": "Summer",
  "location": "Bangalore"
}
```

## Technologies Used

- **Backend**: Python, Flask
- **ML/Data**: scikit-learn, pandas, numpy
- **Frontend**: HTML5, CSS3, JavaScript
- **Model Serialization**: joblib

## Features Explained

### Prediction Logic
The model takes three categorical features:
1. **Product** - The food item (50+ options)
2. **Season** - Summer, Monsoon, or Winter
3. **Location** - Major Indian cities

All features are encoded numerically and passed to the Random Forest model.

### Price Comparison
When available, the UI shows:
- **Predicted Price**: ML model's prediction
- **Actual Average**: Historical average from dataset
- **Difference**: Percentage difference and interpretation

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Descriptions

### model.py
- Loads the CSV dataset
- Encodes categorical variables (Product, Season, Location)
- Trains Random Forest model
- Saves model and encoders for later use
- Evaluates and prints model metrics

### app.py
- Flask web server
- Provides HTML template and static files
- `/api/options` endpoint for dropdown data
- `/api/predict` endpoint for predictions
- Loads trained model and encoders

### templates/index.html
- Main web interface
- Responsive design
- Interactive form elements
- Result display section

### static/style.css
- Modern gradient design
- Responsive layouts
- Smooth animations
- Mobile optimization

### static/script.js
- Fetches dropdown options
- Handles form submission
- Makes API calls to backend
- Displays results with calculations

## Customization

### Change Model Parameters
Edit `model.py` to modify:
```python
model = RandomForestRegressor(
    n_estimators=100,      # Change number of trees
    max_depth=10,          # Change tree depth
    random_state=42
)
```

### Update UI Styling
Modify `static/style.css` to change colors, fonts, and layout.

### Add More Features
Extend the model with additional columns from the dataset in `model.py`.

## Future Enhancements

- Historical price trends visualization
- Batch prediction export (CSV)
- Price comparison charts between cities
- Seasonal trend analysis
- Mobile app version
- API rate limiting
- User authentication

## License

Free to use for educational and commercial purposes.

## Author

AI-powered Street Food Price Prediction System
