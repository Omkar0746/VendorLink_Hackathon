// Supplier Marketplace JavaScript - Vendor Requirements Platform

let sentProposals = JSON.parse(localStorage.getItem('sentProposals') || '[]');
let currentRequirementId = '';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateProposalCount();
  initializeFilters();
  showSkeletons();
  loadRequirements();

  // Listen for global notification events
  window.addEventListener('new-requirement-alert', (e) => {
    console.log('🔄 Marketplace refreshing due to global alert:', e.detail);
    loadRequirements();
  });
});

// Initialize filters
function initializeFilters() {
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', filterRequirements);

  // Material filter
  document.getElementById('materialFilter').addEventListener('change', filterRequirements);

  // Budget filter
  document.getElementById('budgetFilter').addEventListener('change', filterRequirements);

  // Sort functionality
  document.getElementById('sortSelect').addEventListener('change', () => {
    sortRequirements();
    renderRequirements(filteredRequirements);
  });

  // Refresh functionality
  document.getElementById('refreshBtn').addEventListener('click', () => {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('fa-spin');
    showSkeletons();
    setTimeout(() => {
      loadRequirements().then(() => {
        btn.classList.remove('fa-spin');
        showNotification('Requirements refreshed!', 'success');
      });
    }, 500);
  });

  // Clear filters
  document.getElementById('clearFilters').addEventListener('click', clearFilters);

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      filterRequirements();
    });
  });
}

// Mock requirement data - Real Indian Burger Chains + Small Businesses
let mockRequirements = []; // Will be fetched from API

let filteredRequirements = [...mockRequirements];

// Load requirements
async function loadRequirements() {
  try {
    const response = await fetch('/api/marketplace/requirements');
    mockRequirements = await response.json();
    filteredRequirements = [...mockRequirements];

    // Fetch user's proposals
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      const propResponse = await fetch(`/api/marketplace/proposals/supplier/${user.id}`);
      sentProposals = await propResponse.json();
    }

    renderRequirements(filteredRequirements);
    updateRequirementCount();
    updateDashboardStats();
    updateProposalCount();
  } catch (error) {
    console.error('Error fetching requirements:', error);
    showNotification('Error loading requirements', 'error');
  }
}

// Update dashboard stats
function updateDashboardStats() {
  const reqCount = filteredRequirements.length;
  const propCount = sentProposals.length;

  if (document.getElementById('stat-total-req')) {
    document.getElementById('stat-total-req').textContent = reqCount;
  }
  if (document.getElementById('stat-proposals')) {
    document.getElementById('stat-proposals').textContent = propCount;
  }
}

// Render requirements
function renderRequirements(requirements) {
  const grid = document.getElementById('requirementsGrid');
  grid.innerHTML = '';

  if (requirements.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 empty-state">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fas fa-search text-4xl text-gray-300"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">No requirements found</h3>
        <p>Try adjusting your filters or search terms</p>
        <button onclick="clearFilters()" class="mt-4 text-green-600 font-medium hover:underline">
          Clear all filters
        </button>
      </div>
    `;
    return;
  }

  requirements.forEach((requirement, index) => {
    const card = createRequirementCard(requirement, index);
    grid.innerHTML += card;
  });
}

// Show skeleton loaders
function showSkeletons() {
  const grid = document.getElementById('requirementsGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    grid.innerHTML += `
      <div class="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="h-4 w-24 skeleton mb-2"></div>
            <div class="h-6 w-48 skeleton mb-2"></div>
            <div class="h-4 w-32 skeleton"></div>
          </div>
          <div class="w-12 h-12 rounded-lg skeleton"></div>
        </div>
        <div class="h-4 w-full skeleton mb-2"></div>
        <div class="h-4 w-2/3 skeleton mb-4"></div>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="h-10 skeleton rounded"></div>
          <div class="h-10 skeleton rounded"></div>
          <div class="h-10 skeleton rounded"></div>
          <div class="h-10 skeleton rounded"></div>
        </div>
        <div class="flex space-x-2">
          <div class="h-10 flex-1 skeleton rounded-lg"></div>
          <div class="h-10 flex-1 skeleton rounded-lg"></div>
        </div>
      </div>
    `;
  }
}

// Create requirement card HTML
function createRequirementCard(requirement, index) {
  const hasProposal = sentProposals.some(p => p.requirementId === (requirement._id || requirement.id));
  const daysLeft = Math.ceil((new Date(requirement.requiredBy) - new Date()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysLeft <= 7 || requirement.urgency === 'high';
  const isNew = (new Date() - new Date(requirement.postedDate)) / (1000 * 60 * 60 * 24) <= 1;

  return `
    <div class="requirement-card bg-white rounded-xl shadow-sm p-6 slide-up ${isUrgent ? 'border-l-4 border-red-500' : ''}" 
         style="animation-delay: ${index * 0.1}s;" data-requirement-id="${requirement._id || requirement.id}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-2">
            ${isUrgent ? `
              <span class="urgency-high bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                <i class="fas fa-exclamation-circle mr-1"></i>Urgent
              </span>
            ` : ''}
            ${isNew ? `
              <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                <i class="fas fa-clock mr-1"></i>Posted Today
              </span>
            ` : ''}
            ${requirement.budget > 60000 ? `
              <span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                <i class="fas fa-fire mr-1"></i>High Budget
              </span>
            ` : ''}
            ${requirement.verified ? `
              <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                <i class="fas fa-check-circle mr-1"></i>Verified Vendor
              </span>
            ` : ''}
          </div>
          <h3 class="font-semibold text-lg mb-1">${requirement.title}</h3>
          <p class="text-sm text-gray-600">${requirement.vendorName} • ${requirement.vendorLocation}</p>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" class="w-12 h-12 rounded-lg">
      </div>
      
      <p class="text-sm text-gray-700 mb-4">${requirement.description}</p>
      
      <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div class="bg-gray-50 p-2 rounded">
          <span class="text-gray-500">Quantity:</span>
          <span class="font-medium block">${requirement.quantity}</span>
        </div>
        <div class="bg-gray-50 p-2 rounded">
          <span class="text-gray-500">Budget:</span>
          <span class="font-medium text-green-600 block">₹${requirement.budget.toLocaleString('en-IN')}</span>
        </div>
        <div class="bg-gray-50 p-2 rounded">
          <span class="text-gray-500">Required by:</span>
          <span class="font-medium ${isUrgent ? 'text-red-600' : ''} block">${formatDate(requirement.requiredBy)}</span>
        </div>
        <div class="bg-gray-50 p-2 rounded">
          <span class="text-gray-500">Posted:</span>
          <span class="font-medium block">${getTimeAgo(requirement.postedDate)}</span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button onclick="viewRequirementDetails('${requirement._id || requirement.id}')" 
                class="flex-1 px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-sm">
          <i class="fas fa-eye mr-1"></i>View Details
        </button>
        <button onclick="sendProposal('${requirement._id || requirement.id}')" 
                class="flex-1 px-3 py-2 ${hasProposal ? 'bg-gray-400' : 'bg-green-600'} text-white rounded-lg hover:${hasProposal ? 'bg-gray-500' : 'bg-green-700'} transition text-sm"
                ${hasProposal ? 'disabled' : ''}>
          <i class="fas fa-${hasProposal ? 'check' : 'paper-plane'} mr-1"></i>
          ${hasProposal ? 'Proposal Sent' : 'Send Proposal'}
        </button>
      </div>
    </div>
  `;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Get time ago
function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffSecs = Math.floor(diffTime / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Filter requirements
function filterRequirements() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const materialFilter = document.getElementById('materialFilter').value;
  const budgetFilter = document.getElementById('budgetFilter').value;

  const activeChips = Array.from(document.querySelectorAll('.filter-chip.active'))
    .map(chip => chip.dataset.filter);

  filteredRequirements = mockRequirements.filter(requirement => {
    // Search filter
    if (searchTerm && !requirement.title.toLowerCase().includes(searchTerm) &&
      !requirement.vendorName.toLowerCase().includes(searchTerm) &&
      !requirement.vendorLocation.toLowerCase().includes(searchTerm) &&
      !requirement.material.toLowerCase().includes(searchTerm)) {
      return false;
    }

    // Material filter
    if (materialFilter && !requirement.material.toLowerCase().includes(materialFilter.toLowerCase())) {
      return false;
    }

    // Budget filter
    if (budgetFilter) {
      if (budgetFilter === '0-50000' && requirement.budget > 50000) return false;
      if (budgetFilter === '50000-100000' && (requirement.budget < 50000 || requirement.budget > 100000)) return false;
      if (budgetFilter === '100000+' && requirement.budget < 100000) return false;
    }

    // Chip filters
    if (activeChips.includes('urgent') && requirement.urgency !== 'high') {
      return false;
    }
    if (activeChips.includes('verified') && !requirement.verified) {
      return false;
    }
    if (activeChips.includes('local')) {
      // Local check - assume Bangalore is local for test purpose
      if (!requirement.vendorLocation.includes('Bangalore')) return false;
    }
    if (activeChips.includes('new')) {
      const hoursSincePosted = (new Date() - new Date(requirement.postedDate)) / (1000 * 60 * 60);
      if (hoursSincePosted > 24) return false;
    }

    return true;
  });

  // Handle Clear Filters visibility
  const hasActiveFilters = searchTerm || materialFilter || budgetFilter || activeChips.length > 0;
  document.getElementById('clearFilters').classList.toggle('hidden', !hasActiveFilters);

  sortRequirements();
  renderRequirements(filteredRequirements);
  updateRequirementCount();
}

// Sort requirements
function sortRequirements() {
  const sortType = document.getElementById('sortSelect').value;

  filteredRequirements.sort((a, b) => {
    if (sortType === 'urgency') {
      const priority = { 'high': 0, 'normal': 1, 'low': 2 };
      return priority[a.urgency] - priority[b.urgency];
    }
    if (sortType === 'budget-high') return b.budget - a.budget;
    if (sortType === 'budget-low') return a.budget - b.budget;
    if (sortType === 'newest') return new Date(b.postedDate) - new Date(a.postedDate);

    // Default: Best Match (mix of new + verified)
    return (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || new Date(b.postedDate) - new Date(a.postedDate);
  });
}

// Clear filters
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('materialFilter').value = '';
  document.getElementById('budgetFilter').value = '';
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
  filterRequirements();
}

// Update requirement count
function updateRequirementCount() {
  document.getElementById('requirementCount').textContent = filteredRequirements.length;
}

// Update proposal count
function updateProposalCount() {
  const count = sentProposals.length;
  document.getElementById('proposalCount').textContent = count;
  if (document.getElementById('stat-proposals')) {
    document.getElementById('stat-proposals').textContent = count;
  }
}

// View requirement details
function viewRequirementDetails(requirementId) {
  const requirement = mockRequirements.find(r => (r._id || r.id) === requirementId);
  if (requirement) {
    // Store requirement data and redirect to details page
    localStorage.setItem('viewingRequirement', JSON.stringify(requirement));
    // window.location.href = 'requirement-details.html';
    alert(`Requirement Details:\n\nTitle: ${requirement.title}\nVendor: ${requirement.vendorName}\nLocation: ${requirement.vendorLocation}\nBudget: ₹${requirement.budget.toLocaleString('en-IN')}\nQuantity: ${requirement.quantity}\nRequired by: ${formatDate(requirement.requiredBy)}\n\nFull details page coming soon!`);
  }
}

// Send proposal
function sendProposal(requirementId) {
  currentRequirementId = requirementId;
  document.getElementById('proposalModal').classList.remove('hidden');
}

// Close proposal modal
function closeProposalModal() {
  document.getElementById('proposalModal').classList.add('hidden');
  currentRequirementId = '';
}

// Submit proposal
async function submitProposal(event) {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || (!user.id && !user._id)) {
    showNotification('Please login to send proposals', 'error');
    return;
  }

  const formData = new FormData(event.target);
  const proposalData = {
    requirementId: currentRequirementId,
    supplierId: user._id || user.id,
    supplierName: user.companyName || user.name || 'Anonymous Supplier',
    pricePerUnit: formData.get('pricePerUnit') || event.target[0].value,
    availableQuantity: formData.get('availableQuantity') || event.target[1].value,
    deliveryTimeline: formData.get('deliveryTimeline') || event.target[2].value,
    additionalNotes: formData.get('additionalNotes') || event.target[3].value,
  };

  try {
    const response = await fetch('/api/marketplace/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposalData)
    });

    if (response.ok) {
      const result = await response.json();
      sentProposals.push(result.proposal);

      // Show success message
      showNotification('Proposal sent successfully!', 'success');

      // Close modal
      closeProposalModal();

      // Reset form
      event.target.reset();

      // Update counts and re-render
      updateProposalCount();
      loadRequirements();
    } else {
      throw new Error('Failed to submit proposal');
    }
  } catch (error) {
    console.error('Error submitting proposal:', error);
    showNotification('Error sending proposal', 'error');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'
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

// Analytics functions (placeholder for future implementation)
function showAnalytics() {
  alert('Analytics dashboard coming soon!\n\nTrack:\n• Proposal conversion rates\n• Revenue trends\n• Top performing materials\n• Customer satisfaction');
}

function setAlerts() {
  alert('Alert system coming soon!\n\nGet notified for:\n• New requirements in your area\n• Price changes\n• Urgent requirements\n• Preferred vendor postings');
}

// Custom Event Listener for new requirements
document.addEventListener('new-requirement-alert', (event) => {
  const { title, message, requirement } = event.detail;
  console.log('🔔 New requirement alert (via custom event):', event.detail);
  showRealTimeNotification(title, message, 'requirement', requirement);
  // Optional: reload requirements to show new one
  loadRequirements();
});

window.showRealTimeNotification = function (title, message, type = 'info', data = null) {
  const container = document.getElementById('notification-container') || createNotificationContainer();

  const toast = document.createElement('div');
  toast.className = 'bg-white rounded-xl shadow-2xl p-4 mb-3 transform transition-all duration-500 translate-x-full opacity-0 max-w-sm border-l-4 ' + getBorderColor(type);

  const icon = getIcon(type);

  toast.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0 mr-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(type)}">
          <i class="fas ${icon} ${getTextColor(type)}"></i>
        </div>
      </div>
      <div class="flex-1">
        <h4 class="font-bold text-sm text-gray-900">${title}</h4>
        <p class="text-xs text-gray-600 mb-2">${message}</p>
        ${data ? `
          <button onclick="viewRequirementDetails('${data._id || data.id}')" class="text-xs font-semibold text-green-600 hover:underline">
            View New Requirement
          </button>
        ` : ''}
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
        <i class="fas fa-times text-xs"></i>
      </button>
    </div>
  `;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  }, 100);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 8000);
}

function createNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'notification-container';
  container.className = 'fixed bottom-6 right-6 z-[100] flex flex-col items-end';
  document.body.appendChild(container);
  return container;
}

function getBorderColor(type) {
  switch (type) {
    case 'requirement': return 'border-blue-500';
    case 'order': return 'border-orange-500';
    case 'success': return 'border-green-500';
    case 'error': return 'border-red-500';
    default: return 'border-blue-500';
  }
}

function getBgColor(type) {
  switch (type) {
    case 'requirement': return 'bg-blue-100';
    case 'order': return 'bg-orange-100';
    case 'success': return 'bg-green-100';
    case 'error': return 'bg-red-100';
    default: return 'bg-blue-100';
  }
}

function getTextColor(type) {
  switch (type) {
    case 'requirement': return 'text-blue-600';
    case 'order': return 'text-orange-600';
    case 'success': return 'text-green-600';
    case 'error': return 'text-red-600';
    default: return 'text-blue-600';
  }
}

function getIcon(type) {
  switch (type) {
    case 'requirement': return 'fa-briefcase';
    case 'order': return 'fa-box';
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-triangle';
    default: return 'fa-info-circle';
  }
}
