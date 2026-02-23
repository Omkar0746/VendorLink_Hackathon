<!-- 
  HTML INTEGRATION SNIPPET
  File: frontend/NOTIFICATION_SETUP.md
  
  How to integrate notifications into your existing HTML files
-->

# Notification System - Frontend Integration Guide

## Step 1: Include Required Files

Add these lines to the `<head>` section of every HTML file that needs notifications:

```html
<!-- Notification CSS -->
<link rel="stylesheet" href="/assets/css/notifications.css">

<!-- Socket.IO Client Library (must come before notifications.js) -->
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>

<!-- Notification JavaScript -->
<script src="/assets/js/notifications.js"></script>
```

## Step 2: Complete Example

Here's a complete example for `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VendorLink - Home</title>
    
    <!-- Existing styles -->
    <link rel="stylesheet" href="/assets/css/styles.css">
    
    <!-- ADD NOTIFICATION STYLES -->
    <link rel="stylesheet" href="/assets/css/notifications.css">
</head>
<body>
    <!-- Navbar with notification icon -->
    <nav class="navbar">
        <div class="navbar-content">
            <h1>VendorLink</h1>
            
            <!-- Notification Icon with Badge -->
            <div class="notification-icon" id="notification-icon">
                <i class="fas fa-bell"></i>
                <!-- Badge will be added dynamically -->
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container">
        <h1>Welcome to VendorLink</h1>
        <!-- Your existing content -->
    </main>

    <!-- Footer -->
    <footer>
        <!-- Your existing footer -->
    </footer>

    <!-- Existing Scripts -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/api.js"></script>
    
    <!-- ADD SOCKET.IO AND NOTIFICATION SCRIPTS -->
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <script src="/assets/js/notifications.js"></script>
</body>
</html>
```

## Step 3: Test Notifications

Once you've added the files, test using the browser console:

```javascript
// Test different notification types
testNotification('success', 'Test Success', 'This is a success message');
testNotification('error', 'Test Error', 'This is an error message');
testNotification('info', 'Test Info', 'This is an info message');
testNotification('warning', 'Test Warning', 'This is a warning message');

// Debug socket connection
debugSocketEvents();
```

## Step 4: Add to All Key Pages

Include the Socket.IO and notifications.js in these pages:

1. **index.html** - Home page (notifications for new vendors, price drops)
2. **marketplace.html** - Product listing (price drops, high demand alerts)
3. **orders.html** - Order tracking (order status updates)
4. **profile.html** - User profile (account notifications)
5. **supplier_dashboard.html** - Vendor dashboard (order updates, high demand)
6. **product.html** - Individual product (related notifications)

## Step 5: Optional - Add Notification Sounds

Create an `assets/sounds/` folder and add these audio files:
- `success.mp3` - For successful actions
- `error.mp3` - For errors
- `info.mp3` - For general info
- `warning.mp3` - For warnings

If these files don't exist, the system will silently continue without sound.

## Step 6: Update Navbar Styling

Make sure your navbar has space for the notification icon. Add this to your CSS if needed:

```css
.notification-icon {
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    padding: 10px 15px;
    transition: color 0.2s;
}

.notification-icon:hover {
    color: #007bff;
}

.notification-icon i {
    position: relative;
}
```

## Features Included

### 1. Real-Time Notifications
- **new_vendor_added** - When a new vendor joins
- **order_status_updated** - When order status changes
- **price_drop_alert** - When prices drop significantly
- **high_demand_alert** - When products are in high demand
- **generic notification** - For other events

### 2. Visual Indicators
- Toast notifications with icons
- Animated appearance/disappearance
- Color-coded by type (success, error, info, warning)
- Badge with unread count

### 3. Sound Alerts (optional)
- Different sounds for different notification types
- Adjustable volume (30% default)
- Graceful fallback if sounds not available

### 4. Auto-Dismiss
- Notifications disappear after 5 seconds
- Warnings stay 10 seconds
- Manual close button available

### 5. Mobile Responsive
- Works on all screen sizes
- Adjusted positioning for mobile
- Touch-friendly close buttons

## Debugging

If notifications aren't working:

1. **Check Console**: Open browser DevTools → Console
2. **Test Connection**: Run `debugSocketEvents()` in console
3. **Verify Files**: Ensure all files are in correct paths
4. **Check Server**: Make sure Node.js server is running with Socket.IO
5. **Check Logs**: Look at server terminal for connection logs

Common Issues:
- Socket.IO fails to connect → Check server is running on correct port
- Notifications don't show → Check CSS file is loaded
- Sounds don't play → Check audio files exist in `/assets/sounds/`
- No events received → Check user is logged in and has an ID

## API Reference

### Functions Available

```javascript
// Show a notification
showNotification('success', 'Title', 'Message');

// Close specific notification
closeNotification('notif-1234567890');

// Update notification badge
updateNotificationBadge(3); // Shows "3"

// Set user online/offline
setUserOnline();
setUserOffline();

// Test notifications
testNotification('info', 'Test', 'Test message');

// Debug socket connection
debugSocketEvents();
```

### Events to Handle

Server sends these events:
- `new_vendor_added` - {vendorName, category, location, rating}
- `order_status_updated` - {orderId, status, vendorName, items}
- `price_drop_alert` - {productName, oldPrice, newPrice, discountPercentage}
- `high_demand_alert` - {productName, stockLevel, demandCount}
- `notification` - Generic {type, title, message}

## Next Steps

1. Add notification files to your HTML pages
2. Test in browser console
3. Implement backend notifications in controllers
4. Add database persistence for notification history (optional)
5. Create a notifications history page (optional)

## Support

For issues or questions, check:
- Browser console for errors
- Server logs for connection issues
- Socket.IO documentation: https://socket.io/docs/

