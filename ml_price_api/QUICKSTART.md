# Quick Start Guide - Street Food Price Predictor

## Step 1: Navigate to the Project Directory
```powershell
cd "c:\Users\potte\Downloads\perdication"
```

## Step 2: Install Dependencies
Run this command to install all required packages:
```powershell
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- pandas (data handling)
- numpy (numerical computing)
- scikit-learn (machine learning)
- joblib (model serialization)

## Step 3: Train the Model
Run the model training script:
```powershell
python model.py
```

Expected output:
```
Model R² Score: 0.9234
RMSE: 12.45
Model trained and saved successfully!
Products: 50
Seasons: 3
Locations: 10
```

This creates:
- `price_model.pkl` - trained ML model
- `le_product.pkl` - product encoder
- `le_season.pkl` - season encoder
- `le_location.pkl` - location encoder

## Step 4: Run the Web Application
Start the Flask server:
```powershell
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

## Step 5: Open in Browser
Click the link or open:
```
http://localhost:5000
```

## How to Use

1. **Select Product**: Choose from 50+ street food ingredients
2. **Choose Season**: Select Summer, Monsoon, or Winter
3. **Pick Location**: Choose from major Indian cities
4. **Click Predict**: Get the predicted price
5. **View Results**: See predicted price and comparison with actual average

## Features

✅ Real-time predictions
✅ Beautiful responsive UI
✅ Mobile-friendly design
✅ Compare with actual prices
✅ Percentage difference calculation
✅ Error handling

## Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"
Solution: Run `pip install -r requirements.txt` again

### Port 5000 already in use
Change the port in app.py:
```python
app.run(debug=True, port=5001)  # Change to different port
```

### Model not found error
Make sure to run `python model.py` first to train the model

### No data in dropdowns
Check that `Street_Food_Raw_Material_Prices_in_India.csv` is in the same directory

## File Structure After Setup

```
perdication/
├── Street_Food_Raw_Material_Prices_in_India.csv
├── model.py
├── app.py
├── requirements.txt
├── README.md
├── QUICKSTART.md (this file)
├── price_model.pkl (created after training)
├── le_product.pkl (created after training)
├── le_season.pkl (created after training)
├── le_location.pkl (created after training)
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Testing the Application

### Test 1: Basic Prediction
1. Select "Rice" product
2. Choose "Summer" season
3. Pick "Bangalore" location
4. Click Predict
5. Should show predicted price around ₹45-50

### Test 2: Check Accuracy
1. Make several predictions
2. Compare predicted vs actual prices
3. Percentage difference should be reasonable (typically ±10-20%)

## Advanced Usage

### View Raw Predictions
Check the browser console (F12) to see API responses:
- Network tab shows POST requests to `/api/predict`
- Console logs any errors

### Model Performance
The model's accuracy can be checked by:
1. Looking at output from `python model.py` (R² and RMSE)
2. Comparing predictions with actual values in UI

### Data Insights
The dataset contains:
- 10,000+ price records
- 50+ products
- 3 seasons
- 10 major cities (Bangalore, Mumbai, Delhi, etc.)

## Support

If you encounter issues:
1. Ensure all files are in the correct directory
2. Verify requirements are installed: `pip list | findstr flask`
3. Check Python version: `python --version` (3.6+)
4. Look for error messages in console or browser

## Next Steps

1. ✅ Install dependencies
2. ✅ Train the model
3. ✅ Run the application
4. ✅ Make predictions
5. 🎯 Customize for your needs

Enjoy! 🍲
