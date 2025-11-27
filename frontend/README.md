# VendorLink Hackathon Project
A smart sourcing platform connecting street food vendors with raw material suppliers, built to streamline the procurement process.

## 📜 About The Project
VendorLink is a web application designed to solve a key challenge for street food vendors: sourcing quality raw materials efficiently and at competitive prices. This platform creates a digital bridge between vendors and suppliers, fostering a more organized and transparent B2B ecosystem.
The application features two distinct user roles with dedicated interfaces:
* **Vendors:** Can browse a marketplace of raw materials, compare prices from multiple suppliers, place orders, and connect with the vendor community.
* **Suppliers:** Can manage their product listings, update their business profiles, and track incoming orders from vendors.

This project was built as a front-end application, using browser `localStorage` to simulate database and user session management.

## ✨ Key Features :-

### For Vendors (`index.html`):
* **🛒 Marketplace:** Search and filter for products like vegetables, spices, and grains.
* **📊 Price Comparison:** View a product and see a list of all suppliers offering it, sorted by price.
* **🛍️ Shopping Cart:** A fully functional cart to add items, adjust quantities, and simulate a checkout.
* **🤝 Supplier Directory:** Browse and search for verified suppliers and view their ratings.
* **🌐 Community Hub:** Share and view tips on hygiene, licensing, and best practices with other vendors.

### For Suppliers (`supplier_dashboard.html`):
* **📦 Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for product listings.
* **👤 Profile Management:** Update shop details, contact information, and location.
* **📋 Order Dashboard:** View and manage incoming orders from vendors.

## 🛠️ Technologies Used
* **HTML5**
* **Tailwind CSS**
* **JavaScript (ES6+)**

## 🚀 Getting Started
To run this project locally, follow these simple steps.
1.  Clone the repository:
    ```sh
    git clone [https://github.com/Omkar0746/VendorLink_Hackathon.git](https://github.com/Omkar0746/VendorLink_Hackathon.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd VendorLink_Hackathon
    ```
3.  Open the `index.html` file in your web browser.

> **Note:** All user and product data is stored in your browser's `localStorage`. Signing up or adding products on one browser will not reflect in another.
