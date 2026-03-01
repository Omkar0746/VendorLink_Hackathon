// Vendor Marketplace JavaScript - Supplier Discovery Platform

let savedSuppliers = JSON.parse(localStorage.getItem('savedSuppliers') || '[]');
let compareList = [];
let currentRFQSupplier = '';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateSavedCount();
  initializeFilters();
  loadSuppliers();
});

// Initialize filters
function initializeFilters() {
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', filterSuppliers);
  
  // Material filter
  document.getElementById('materialFilter').addEventListener('change', filterSuppliers);
  
  // Location filter
  document.getElementById('locationFilter').addEventListener('change', filterSuppliers);
  
  // Capacity filter
  const capacityFilter = document.getElementById('capacityFilter');
  const capacityValue = document.getElementById('capacityValue');
  
  capacityFilter.addEventListener('input', (e) => {
    capacityValue.textContent = `${e.target.value} tons/month`;
    filterSuppliers();
  });
  
  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      filterSuppliers();
    });
  });
}

// Mock supplier data - Real Indian Food Suppliers + Farmers & Small Businesses
const mockSuppliers = [
  {
    id: 'supplier_1',
    name: 'Safal (Mother Dairy)',
    type: 'Producer',
    location: 'Delhi NCR',
    materials: ['Fresh Potatoes', 'Iceberg Lettuce', 'Tomatoes', 'Onions', 'Pickles'],
    capacity: 500,
    leadTime: '1 day',
    rating: 4.6,
    reviews: 892,
    verified: true,
    available: true,
    contact: '+91 11-2747-3747',
    email: 'safal@motherdairy.com',
    specialties: 'FSSAI Certified, Daily Fresh, 100+ Outlets',
    website: 'www.motherdairy.com'
  },
  {
    id: 'supplier_2',
    name: 'Amul',
    type: 'Manufacturer',
    location: 'Anand, Gujarat',
    materials: ['Cheddar Cheese Slices', 'Mozzarella', 'American Cheese', 'Butter', 'Cream'],
    capacity: 2000,
    leadTime: '2-3 days',
    rating: 4.8,
    reviews: 2341,
    verified: true,
    available: true,
    contact: '+91 2692-258-041',
    email: 'amul@amul.com',
    specialties: 'Largest Dairy Cooperative, ISO Certified, 50+ Years',
    website: 'www.amul.com'
  },
  {
    id: 'supplier_3',
    name: 'Ramesh Kumar - Local Vegetable Farmer',
    type: 'Farmer',
    location: 'Bangalore Rural, Karnataka',
    materials: ['Fresh Potatoes', 'Tomatoes', 'Onions', 'Lettuce', 'Coriander'],
    capacity: 100,
    leadTime: '1 day',
    rating: 4.4,
    reviews: 67,
    verified: true,
    available: true,
    contact: '+91 9448234567',
    email: 'ramesh.farmer@gmail.com',
    specialties: 'Organic Farming, Direct from Farm, No Pesticides',
    supportType: 'Small Farmer Support'
  },
  {
    id: 'supplier_4',
    'name': 'Shanti Dairy Farm - Small Scale',
    type: 'Small Dairy Farmer',
    location: 'Pune Rural, Maharashtra',
    materials: ['Fresh Milk', 'Butter', 'Paneer', 'Yogurt', 'Cream'],
    capacity: 150,
    leadTime: '1 day',
    rating: 4.7,
    reviews: 89,
    verified: true,
    available: true,
    contact: '+91 9887123456',
    email: 'shanti.dairy@gmail.com',
    specialties: 'Farm Fresh, Pasture Fed, Daily Delivery',
    supportType: 'Small Dairy Farmer'
  },
  {
    id: 'supplier_5',
    name: 'Britannia Industries',
    type: 'Bakery',
    location: 'Bangalore, Karnataka',
    materials: ['Burger Buns', 'Sesame Seed Buns', 'Brioche Buns', 'Whole Wheat Buns'],
    capacity: 1500,
    leadTime: '1 day',
    rating: 4.5,
    reviews: 1567,
    verified: true,
    available: true,
    contact: '+91 80-6624-2000',
    email: 'contact@britannia.co.in',
    specialties: '100+ Years Heritage, National Distribution',
    website: 'www.britannia.co.in'
  },
  {
    id: 'supplier_6',
    name: 'Mohan Bakery - Local Artisan',
    type: 'Small Bakery',
    location: 'Hyderabad, Telangana',
    materials: ['Fresh Burger Buns', 'Wheat Buns', 'Multigrain Buns', 'Brioche Buns'],
    capacity: 200,
    leadTime: '1 day',
    rating: 4.6,
    reviews: 134,
    verified: true,
    available: true,
    contact: '+91 9123456789',
    email: 'mohan.bakery@gmail.com',
    specialties: 'Handmade, Wood Fired Oven, No Preservatives',
    supportType: 'Small Business Support'
  },
  {
    id: 'supplier_7',
    name: 'Godrej Tyson Foods',
    type: 'Processor',
    location: 'Mumbai, Maharashtra',
    materials: ['Chicken Patties', 'Veggie Patties', 'Bacon Strips', 'Sausages'],
    capacity: 800,
    leadTime: '2 days',
    rating: 4.4,
    reviews: 743,
    verified: true,
    available: true,
    contact: '+91 22-6172-8000',
    email: 'info@godrejtyson.com',
    specialties: 'FSSAI Approved, Cold Chain Logistics',
    website: 'www.godrejtyson.com'
  },
  {
    id: 'supplier_8',
    name: 'Rahul Meat Shop - Local Butcher',
    type: 'Local Meat Vendor',
    location: 'Delhi NCR',
    materials: ['Fresh Chicken Patties', 'Mutton Seekh', 'Veggie Patties', 'Fresh Sausages'],
    capacity: 80,
    leadTime: '1 day',
    rating: 4.5,
    reviews: 112,
    verified: true,
    available: true,
    contact: '+91 9876543210',
    email: 'rahul.meat@gmail.com',
    specialties: 'Halal Certified, Fresh Daily, Local Sourcing',
    supportType: 'Small Business Support'
  },
  {
    id: 'supplier_9',
    name: 'Veeba Foods',
    type: 'Manufacturer',
    location: 'Gurgaon, Haryana',
    materials: ['Mayonnaise', 'Ketchup', 'Mustard Sauce', 'BBQ Sauce', 'Hot Sauce'],
    capacity: 1200,
    leadTime: '3-4 days',
    rating: 4.7,
    reviews: 521,
    verified: true,
    available: false,
    contact: '+91 124-466-3000',
    email: 'info@veeba.in',
    specialties: 'Premium Sauces, Export Quality, McDonalds Supplier',
    website: 'www.veeba.in'
  },
  {
    id: 'supplier_10',
    name: 'Priya Homemade Sauces',
    type: 'Small Sauce Maker',
    location: 'Chennai, Tamil Nadu',
    materials: ['Homemade Mayonnaise', 'Tomato Ketchup', 'Green Chutney', 'Tamarind Sauce'],
    capacity: 50,
    leadTime: '2-3 days',
    rating: 4.8,
    reviews: 78,
    verified: true,
    available: true,
    contact: '+91 9876543211',
    email: 'priya.sauces@gmail.com',
    specialties: 'Homemade, No Preservatives, Traditional Recipes',
    supportType: 'Women Entrepreneur Support'
  },
  {
    id: 'supplier_11',
    name: 'Hyfun Foods',
    type: 'Processor',
    location: 'Ahmedabad, Gujarat',
    materials: ['Frozen French Fries', 'Potato Wedges', 'Onion Rings', 'Crispy Potatoes'],
    capacity: 1000,
    leadTime: '2-3 days',
    rating: 4.3,
    reviews: 289,
    verified: true,
    available: true,
    contact: '+91 79-6630-9000',
    email: 'info@hyfunfoods.com',
    specialties: 'Export Quality Frozen Foods, McDonalds Supplier',
    website: 'www.hyfunfoods.com'
  },
  {
    id: 'supplier_12',
    name: 'Farmers Co-op - Direct from Fields',
    type: 'Farmers Cooperative',
    location: 'Nashik, Maharashtra',
    materials: ['Fresh Potatoes', 'Onions', 'Tomatoes', 'Chillies', 'Herbs'],
    capacity: 300,
    leadTime: '1-2 days',
    rating: 4.3,
    reviews: 145,
    verified: true,
    available: true,
    contact: '+91 9423456789',
    email: 'farmers.coop@gmail.com',
    specialties: 'Direct from Farmers, Fair Trade, Organic Options',
    supportType: 'Farmers Cooperative'
  },
  {
    id: 'supplier_13',
    name: 'ITC Limited (Packaging Division)',
    type: 'Manufacturer',
    location: 'Kolkata, West Bengal',
    materials: ['Burger Boxes', 'Paper Wrappers', 'Food Grade Paper', 'Napkins'],
    capacity: 3000,
    leadTime: '4-5 days',
    rating: 4.6,
    reviews: 445,
    verified: true,
    available: true,
    contact: '+91 33-2288-8878',
    email: 'packaging@itc.in',
    specialties: '100+ Years Company, Eco-Friendly, National Reach',
    website: 'www.itcportal.com'
  },
  {
    id: 'supplier_14',
    name: 'Green Earth Packaging - Eco Friendly',
    type: 'Small Packaging Business',
    location: 'Jaipur, Rajasthan',
    materials: ['Eco Burger Boxes', 'Paper Wrappers', 'Biodegradable Packaging', 'Recycled Napkins'],
    capacity: 500,
    leadTime: '3-4 days',
    rating: 4.7,
    reviews: 89,
    verified: true,
    available: true,
    contact: '+91 9312345678',
    email: 'green.earth@gmail.com',
    specialties: '100% Biodegradable, Recycled Materials, Sustainable',
    supportType: 'Eco-Friendly Small Business'
  },
  {
    id: 'supplier_15',
    name: 'Reliance Fresh',
    type: 'Distributor',
    location: 'Mumbai, Maharashtra',
    materials: ['Fresh Vegetables', 'Fruits', 'Herbs', 'Dairy Products'],
    capacity: 800,
    leadTime: '1 day',
    rating: 4.2,
    reviews: 1876,
    verified: true,
    available: true,
    contact: '+91 22-3030-3030',
    email: 'support@relianceretail.com',
    specialties: '1000+ Stores, Daily Fresh, Pan India Presence',
    website: 'www.relianceretail.com'
  }
];

let filteredSuppliers = [...mockSuppliers];

// Load suppliers
function loadSuppliers() {
  renderSuppliers(filteredSuppliers);
  updateSupplierCount();
}

// Render suppliers
function renderSuppliers(suppliers) {
  const grid = document.getElementById('suppliersGrid');
  grid.innerHTML = '';
  
  suppliers.forEach((supplier, index) => {
    const card = createSupplierCard(supplier, index);
    grid.innerHTML += card;
  });
  
  // Re-attach event listeners
  attachCardListeners();
}

// Create supplier card HTML
function createSupplierCard(supplier, index) {
  const isSaved = savedSuppliers.includes(supplier.id);
  const materialColors = {
    'Steel': 'blue',
    'Cement': 'gray',
    'Chemical': 'purple',
    'Plastic': 'green',
    'Textile': 'yellow'
  };
  
  const firstMaterial = supplier.materials[0].split(' ')[0];
  const color = materialColors[firstMaterial] || 'gray';
  
  return `
    <div class="supplier-card bg-white rounded-xl shadow-sm p-6 slide-up" style="animation-delay: ${index * 0.1}s;" data-supplier-id="${supplier.id}">
      <div class="flex items-start justify-between mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" class="w-16 h-16 rounded-lg">
        <div class="flex items-center space-x-2">
          ${supplier.verified ? `
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              <i class="fas fa-check-circle mr-1"></i>Verified
            </span>
          ` : ''}
          ${!supplier.available ? `
            <span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
              <i class="fas fa-times-circle mr-1"></i>Unavailable
            </span>
          ` : ''}
          <button onclick="toggleSaveSupplier('${supplier.id}')" class="text-gray-400 hover:text-red-500 transition">
            <i class="${isSaved ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
      </div>
      
      <h3 class="font-semibold text-lg mb-1">${supplier.name}</h3>
      <p class="text-sm text-gray-600 mb-3">${supplier.type} • ${supplier.location}</p>
      
      <div class="flex items-center mb-3">
        <div class="flex text-yellow-400">
          ${generateStars(supplier.rating)}
        </div>
        <span class="ml-2 text-sm text-gray-600">${supplier.rating} (${supplier.reviews} reviews)</span>
      </div>
      
      <div class="mb-4">
        <p class="text-sm font-medium text-gray-700 mb-2">Materials:</p>
        <div class="flex flex-wrap gap-1">
          ${supplier.materials.map(material => `
            <span class="px-2 py-1 bg-${color}-50 text-${color}-700 rounded text-xs">${material}</span>
          `).join('')}
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <span class="text-gray-500">Capacity:</span>
          <span class="font-medium">${supplier.capacity} tons/month</span>
        </div>
        <div>
          <span class="text-gray-500">Lead Time:</span>
          <span class="font-medium">${supplier.leadTime}</span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button onclick="viewSupplierProfile('${supplier.id}')" 
                class="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm">
          <i class="fas fa-eye mr-1"></i>View Profile
        </button>
        <button onclick="sendRFQ('${supplier.id}')" 
                class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          <i class="fas fa-file-alt mr-1"></i>Send RFQ
        </button>
      </div>
      
      <div class="mt-3 pt-3 border-t">
        <label class="flex items-center">
          <input type="checkbox" onchange="toggleCompare('${supplier.id}')" class="mr-2">
          <span class="text-sm text-gray-600">Add to compare</span>
        </label>
      </div>
    </div>
  `;
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// Attach event listeners to cards
function attachCardListeners() {
  // Event listeners are now inline in the HTML
}

// Filter suppliers
function filterSuppliers() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const materialFilter = document.getElementById('materialFilter').value;
  const locationFilter = document.getElementById('locationFilter').value;
  const capacityFilter = parseInt(document.getElementById('capacityFilter').value);
  
  const activeChips = Array.from(document.querySelectorAll('.filter-chip.active'))
    .map(chip => chip.dataset.filter);
  
  filteredSuppliers = mockSuppliers.filter(supplier => {
    // Search filter
    if (searchTerm && !supplier.name.toLowerCase().includes(searchTerm) && 
        !supplier.location.toLowerCase().includes(searchTerm) &&
        !supplier.materials.some(m => m.toLowerCase().includes(searchTerm))) {
      return false;
    }
    
    // Material filter
    if (materialFilter && !supplier.materials.some(m => m.toLowerCase().includes(materialFilter))) {
      return false;
    }
    
    // Location filter
    if (locationFilter && !supplier.location.toLowerCase().includes(locationFilter)) {
      return false;
    }
    
    // Capacity filter
    if (capacityFilter > 0 && supplier.capacity < capacityFilter) {
      return false;
    }
    
    // Chip filters
    if (activeChips.includes('verified') && !supplier.verified) {
      return false;
    }
    if (activeChips.includes('rating') && supplier.rating < 4.0) {
      return false;
    }
    if (activeChips.includes('available') && !supplier.available) {
      return false;
    }
    
    return true;
  });
  
  renderSuppliers(filteredSuppliers);
  updateSupplierCount();
}

// Update supplier count
function updateSupplierCount() {
  document.getElementById('supplierCount').textContent = filteredSuppliers.length;
}

// Toggle save supplier
function toggleSaveSupplier(supplierId) {
  const index = savedSuppliers.indexOf(supplierId);
  
  if (index > -1) {
    savedSuppliers.splice(index, 1);
  } else {
    savedSuppliers.push(supplierId);
  }
  
  localStorage.setItem('savedSuppliers', JSON.stringify(savedSuppliers));
  updateSavedCount();
  
  // Update heart icon
  const button = event.currentTarget;
  const icon = button.querySelector('i');
  icon.className = index > -1 ? 'far fa-heart' : 'fas fa-heart';
}

// Update saved count
function updateSavedCount() {
  document.getElementById('savedCount').textContent = savedSuppliers.length;
}

// Toggle compare
function toggleCompare(supplierId) {
  const index = compareList.indexOf(supplierId);
  
  if (index > -1) {
    compareList.splice(index, 1);
  } else {
    if (compareList.length < 3) {
      compareList.push(supplierId);
    } else {
      alert('You can compare maximum 3 suppliers at a time');
      event.target.checked = false;
      return;
    }
  }
  
  updateCompareSection();
}

// Update compare section
function updateCompareSection() {
  const compareSection = document.getElementById('compareSection');
  const compareCount = document.getElementById('compareCount');
  const compareListDiv = document.getElementById('compareList');
  
  if (compareList.length > 0) {
    compareSection.classList.remove('hidden');
    compareCount.textContent = `(${compareList.length} selected)`;
    
    compareListDiv.innerHTML = compareList.map(id => {
      const supplier = mockSuppliers.find(s => s.id === id);
      return `
        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span class="text-sm">${supplier.name}</span>
          <button onclick="removeFromCompare('${id}')" class="text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
    }).join('');
  } else {
    compareSection.classList.add('hidden');
  }
}

// Remove from compare
function removeFromCompare(supplierId) {
  const index = compareList.indexOf(supplierId);
  if (index > -1) {
    compareList.splice(index, 1);
    updateCompareSection();
    
    // Uncheck the checkbox
    const checkbox = document.querySelector(`input[onchange*="${supplierId}"]`);
    if (checkbox) checkbox.checked = false;
  }
}

// Compare suppliers
function compareSuppliers() {
  if (compareList.length < 2) {
    alert('Please select at least 2 suppliers to compare');
    return;
  }
  
  // Store compare list and redirect to compare page
  localStorage.setItem('compareList', JSON.stringify(compareList));
  // window.location.href = 'compare-suppliers.html';
  alert('Compare feature coming soon! Selected suppliers: ' + compareList.join(', '));
}

// View supplier profile
function viewSupplierProfile(supplierId) {
  const supplier = mockSuppliers.find(s => s.id === supplierId);
  if (supplier) {
    // Store supplier data and redirect to profile page
    localStorage.setItem('viewingSupplier', JSON.stringify(supplier));
    // window.location.href = 'supplier-profile.html';
    alert(`Viewing profile for: ${supplier.name}\n\nContact: ${supplier.contact}\nEmail: ${supplier.email}\n\nFull profile page coming soon!`);
  }
}

// Send RFQ
function sendRFQ(supplierId) {
  currentRFQSupplier = supplierId;
  document.getElementById('rfqModal').classList.remove('hidden');
}

// Close RFQ modal
function closeRFQModal() {
  document.getElementById('rfqModal').classList.add('hidden');
  currentRFQSupplier = '';
}

// Submit RFQ
function submitRFQ(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const rfqData = {
    id: 'rfq_' + Date.now(),
    supplierId: currentRFQSupplier,
    material: formData.get('material') || event.target[0].value,
    quantity: formData.get('quantity') || event.target[1].value,
    requiredBy: formData.get('requiredBy') || event.target[2].value,
    details: formData.get('details') || event.target[3].value,
    status: 'sent',
    createdAt: new Date().toISOString()
  };
  
  // Store RFQ
  const rfqs = JSON.parse(localStorage.getItem('rfqs') || '[]');
  rfqs.push(rfqData);
  localStorage.setItem('rfqs', JSON.stringify(rfqs));
  
  // Show success message
  showNotification('RFQ sent successfully!', 'success');
  
  // Close modal
  closeRFQModal();
  
  // Reset form
  event.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 ${
    type === 'success' ? 'bg-green-500' : 'bg-blue-500'
  } text-white`;
  
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} text-2xl"></i>
    <div>
      <div class="font-bold">${type === 'success' ? 'Success!' : 'Info'}</div>
      <div class="text-sm">${message}</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
