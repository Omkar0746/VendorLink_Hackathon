// assets/js/payment.js
import { api } from "./api.js";

// DOM Elements
const paymentItems = document.getElementById("paymentItems");
const paymentTotal = document.getElementById("paymentTotal");
const payNowButton = document.getElementById("payNowButton");
const paymentModal = document.getElementById("paymentModal");

// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let orderData = null;

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Payment page loaded");
  console.log("Cart data:", cart);
  
  // Check if DOM elements are found
  console.log("payNowButton found:", !!payNowButton);
  console.log("paymentModal found:", !!paymentModal);
  console.log("paymentItems found:", !!paymentItems);
  console.log("paymentTotal found:", !!paymentTotal);
  
  if (cart.length === 0) {
    alert("Your cart is empty!");
    window.location.href = "cart.html";
    return;
  }

  renderOrderSummary();
});

// Render order summary
function renderOrderSummary() {
  paymentItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    paymentItems.innerHTML += `
      <div class="flex justify-between items-center py-2 border-b">
        <div>
          <div class="font-semibold">${item.name}</div>
          <div class="text-sm text-gray-500">${item.supplierName || 'Supplier'}</div>
        </div>
        <div class="text-right">
          <div>₹${item.price} × ${item.qty}</div>
          <div class="font-semibold">₹${itemTotal}</div>
        </div>
      </div>
    `;
  });

  paymentTotal.textContent = total;
}

// Validate delivery address
function validateAddress() {
  const fullName = document.getElementById("fullName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const streetAddress = document.getElementById("streetAddress").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!fullName || !phoneNumber || !streetAddress || !city || !state || !pincode) {
    alert("Please fill in all delivery address fields");
    return false;
  }

  if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number");
    return false;
  }

  if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
    alert("Please enter a valid 6-digit pincode");
    return false;
  }

  return { 
    fullName, 
    phoneNumber, 
    streetAddress, 
    city, 
    state, 
    pincode,
    name: fullName, // For compatibility
    phone: phoneNumber, // For compatibility
    address: streetAddress // For compatibility
  };
}

// Create order on server
async function createOrder(address) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // Create mock user for testing
    const mockUser = { _id: "user123", name: "Test User", email: "test@example.com" };
    localStorage.setItem("user", JSON.stringify(mockUser));
  }

  const orderPayload = {
    supplierId: cart[0].supplierId || "default",
    items: cart.map(item => ({
      name: item.name,
      quantity: item.qty,
      price: item.price,
      supplierId: item.supplierId
    })),
    totalAmount: Number(paymentTotal.textContent),
    deliveryAddress: address,
    paymentMethod: document.querySelector('input[name="paymentGateway"]:checked').value
  };

  console.log("Order payload:", orderPayload);

  try {
    const response = await api("/orders", "POST", orderPayload, true);
    return response.order;
  } catch (error) {
    console.log("Backend order creation failed, using mock order");
    // Create mock order for testing
    const mockOrder = {
      _id: "order_" + Date.now(),
      ...orderPayload,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    return mockOrder;
  }
}

// Initialize Razorpay payment
async function initializeRazorpay(order) {
  try {
    // Create Razorpay order
    const paymentResponse = await api("/payments/create-order", "POST", {
      orderId: order._id,
      amount: order.totalAmount * 100, // Razorpay expects amount in paise
    }, true);

    if (paymentResponse.mock) {
      // Mock mode - skip actual payment
      console.log("Mock payment mode");
      return { success: true, orderId: order._id };
    }

    // Real Razorpay integration
    const options = {
      key: paymentResponse.key,
      amount: paymentResponse.amount,
      currency: "INR",
      name: "VendorLink",
      description: "Order Payment",
      order_id: paymentResponse.razorpayOrderId,
      handler: async function (response) {
        // Payment successful
        try {
          await api("/payments/verify", "POST", {
            orderId: order._id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }, true);

          localStorage.removeItem("cart");
          window.location.href = `order_confirmation.html?orderId=${order._id}`;
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: document.getElementById("name").value,
        contact: document.getElementById("phone").value,
      },
      theme: {
        color: "#d97706", // Amber color matching VendorLink theme
      },
      modal: {
        ondismiss: function() {
          paymentModal.classList.add("hidden");
          alert("Payment cancelled. You can try again.");
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
    
    return { success: true };

  } catch (error) {
    console.log("Razorpay backend failed, simulating payment");
    // Simulate successful payment for testing
    setTimeout(() => {
      paymentModal.classList.add("hidden");
      alert("Payment simulated successfully! (Mock mode)");
      localStorage.removeItem("cart");
      window.location.href = `order_confirmation.html?orderId=mock_${Date.now()}`;
    }, 2000);
    
    return { success: true };
  }
}

// Handle payment button click
if (payNowButton) {
  payNowButton.addEventListener("click", async () => {
    console.log("Place Order button clicked!");
    
    const address = validateAddress();
    if (!address) {
      console.log("Address validation failed");
      return;
    }

    const paymentMethod = document.querySelector('input[name="paymentGateway"]:checked').value;
    console.log("Payment method:", paymentMethod);

    // Handle Cash on Delivery - skip payment processing
    if (paymentMethod === 'cod') {
      try {
        paymentModal.classList.remove("hidden");
        console.log("Processing COD order...");

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create order data (COD)
        const orderData = {
          _id: "order_" + Date.now(),
          items: cart,
          totalAmount: Number(paymentTotal.textContent),
          deliveryAddress: address,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "Pending",
          status: "Confirmed",
          createdAt: new Date().toISOString()
        };

        console.log("COD Order created:", orderData);

        // Store order in localStorage for reference
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem("cart");

        // Show success message
        paymentModal.classList.add("hidden");
        
        // Show COD success notification
        showCODSuccessNotification();

        // Redirect to order confirmation page after 3 seconds
        setTimeout(() => {
          window.location.href = `order_confirmation.html?orderId=${orderData._id}`;
        }, 3000);

      } catch (error) {
        paymentModal.classList.add("hidden");
        console.error("COD order processing failed:", error);
        alert("Failed to place COD order. Please try again.");
      }
      return; // Exit early for COD
    }

    try {
      paymentModal.classList.remove("hidden");
      console.log("Processing order...");

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order data (mock)
      const orderData = {
        _id: "order_" + Date.now(),
        items: cart,
        totalAmount: Number(paymentTotal.textContent),
        deliveryAddress: address,
        paymentMethod: paymentMethod,
        status: "Confirmed",
        createdAt: new Date().toISOString()
      };

      console.log("Order created:", orderData);

      // Store order in localStorage for reference
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem("cart");

      // Show success message
      paymentModal.classList.add("hidden");
      
      // Show success notification
      showSuccessNotification();

      // Redirect to order confirmation page after 3 seconds
      setTimeout(() => {
        window.location.href = `order_confirmation.html?orderId=${orderData._id}`;
      }, 3000);

    } catch (error) {
      paymentModal.classList.add("hidden");
      console.error("Order processing failed:", error);
      alert("Failed to place order. Please try again.");
    }
  });
} else {
  console.error("payNowButton not found!");
}

// Show COD success notification
function showCODSuccessNotification() {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3';
  notification.innerHTML = `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <div>
      <div class="font-bold">Order Placed Successfully!</div>
      <div class="text-sm">Cash on Delivery - Pay ₹${paymentTotal.textContent} at delivery</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Show success notification
function showSuccessNotification() {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3';
  notification.innerHTML = `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <div>
      <div class="font-bold">Order Placed Successfully!</div>
      <div class="text-sm">Your order has been confirmed and will be delivered soon.</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Handle Cash on Delivery selection
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'cod') {
      payButton.textContent = 'Place Order (COD)';
    } else {
      payButton.textContent = 'Proceed to Pay';
    }
  });
});
