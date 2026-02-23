<!-- 
  MARKETPLACE.HTML INTEGRATION GUIDE
  Add the following sections to your existing marketplace.html
  
  1. Add this CSS to the <style> section
  2. Add the HTML sections in the appropriate locations
  3. Add the script imports at the bottom
-->

<!-- ============================================
     CSS STYLES TO ADD TO <style> SECTION
     ============================================ -->

<style>
  /* RECOMMENDATIONS SECTION */
  .recommendations-section {
    margin: 40px 0;
    padding: 24px;
    background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
    border-radius: 16px;
    border: 2px solid #d97706;
  }

  .recommendations-header {
    font-size: 1.5rem;
    font-weight: bold;
    color: #92400e;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .vendor-recommendation-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  .vendor-recommendation-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(217, 119, 6, 0.2);
  }

  .vendor-card-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #f3f4f6;
  }

  .vendor-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .match-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: bold;
    color: white;
  }

  .badge-gold {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }

  .badge-silver {
    background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
  }

  .badge-bronze {
    background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  }

  .ranking-badge {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .vendor-card-content {
    padding: 16px;
  }

  .vendor-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .vendor-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 12px;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .recommendation-detail {
    background: #f9fafb;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 12px;
    border-left: 3px solid #d97706;
  }

  .recommendation-detail small {
    display: block;
    color: #6b7280;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .recommendation-reason {
    font-size: 0.8rem;
    color: #374151;
    margin: 0;
  }

  .vendor-card-actions {
    display: flex;
    gap: 8px;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: #d97706;
    color: white;
  }

  .btn-primary:hover {
    background: #b45309;
  }

  .btn-secondary {
    background: #e5e7eb;
    color: #374151;
  }

  .btn-secondary:hover {
    background: #d1d5db;
  }

  /* RECOMMENDATION MODAL */
  .modal {
    display: block;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 0;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close:hover {
    color: #1f2937;
  }

  .modal-body {
    padding: 20px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .modal-footer {
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 12px;
  }

  .vendor-info {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .vendor-modal-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    background: #f3f4f6;
  }

  .vendor-details p {
    margin: 8px 0;
    font-size: 0.95rem;
  }

  .vendor-details a {
    color: #d97706;
    text-decoration: none;
    font-weight: 600;
  }

  .vendor-details a:hover {
    text-decoration: underline;
  }

  .recommendation-breakdown {
    background: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .recommendation-breakdown h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 1.1rem;
    color: #1f2937;
  }

  .score-breakdown {
    margin-bottom: 16px;
  }

  .score-item {
    margin-bottom: 16px;
  }

  .score-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 4px;
  }

  .score-bar {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .score-fill {
    height: 100%;
    background: linear-gradient(90deg, #fbbf24 0%, #d97706 100%);
    transition: width 0.3s ease;
  }

  .score-value {
    font-size: 0.8rem;
    color: #6b7280;
    text-align: right;
  }

  .score-explanations {
    margin-top: 12px;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .score-explanations p {
    margin: 8px 0;
    color: #4b5563;
  }

  .top-products {
    margin-top: 20px;
  }

  .top-products h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.1rem;
    color: #1f2937;
  }

  .products-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: white;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    font-size: 0.85rem;
  }

  .product-name {
    font-weight: 600;
    color: #1f2937;
  }

  .product-category {
    color: #d97706;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .product-price {
    font-weight: bold;
    color: #059669;
  }

  .no-recommendations {
    text-align: center;
    padding: 40px;
    color: #6b7280;
    font-style: italic;
  }

  .profile-section {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
  }

  .profile-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 16px 0;
  }

  .stat-item {
    text-align: center;
    padding: 12px;
    background: #f9fafb;
    border-radius: 8px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #d97706;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 4px;
  }

  .profile-preferences {
    margin-top: 16px;
  }

  .profile-preferences h4 {
    margin: 12px 0 8px 0;
    font-size: 0.95rem;
    color: #1f2937;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .category-tag {
    display: inline-block;
    background: #fef3c7;
    color: #92400e;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
</style>

<!-- ============================================
     HTML SECTIONS TO ADD TO MARKETPLACE.HTML
     ============================================ -->

<!-- ADD THIS AFTER THE INTRO PARAGRAPH (around line 25) -->

<!-- PERSONALIZED RECOMMENDATIONS SECTION -->
<section class="recommendations-section">
  <div id="recommended-vendors">
    <p class="no-recommendations">Loading recommendations...</p>
  </div>
</section>

<!-- ============================================
     SCRIPT IMPORTS TO ADD AT BOTTOM (before </body>)
     ============================================ -->

<!-- Add these script imports along with existing marketplace scripts -->
<script src="assets/js/recommendations.js"></script>
<script>
  // Initialize and display recommendations when page loads
  document.addEventListener("DOMContentLoaded", async () => {
    if (window.recommendationSystem && window.recommendationSystem.userId) {
      const recommendations =
        await window.recommendationSystem.fetchRecommendations(5);
      window.recommendationSystem.displayRecommendations(
        recommendations,
        "recommended-vendors"
      );
    } else {
      console.log("User not logged in - recommendations disabled");
    }
  });
</script>

<!-- ============================================
     UPDATED MARKETPLACE.HTML (FULL FILE)
     ============================================ -->

<!-- Copy the HTML below and replace your marketplace.html -->
