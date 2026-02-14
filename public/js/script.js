// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
// Delete Listing Modal Functions
  function openDeleteModal() {
    document.getElementById('deleteModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Delete Review Modal Functions
  function openDeleteReviewModal(listingId, reviewId) {
    const form = document.getElementById('deleteReviewForm');
    form.action = `/listings/${listingId}/reviews/${reviewId}?_method=DELETE`;
    document.getElementById('deleteReviewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteReviewModal() {
    document.getElementById('deleteReviewModal').classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Close modals on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeDeleteModal();
      closeDeleteReviewModal();
    }
  });

  // Auto-hide toasts after 5 seconds
  document.addEventListener('DOMContentLoaded', function() {
    const toasts = document.querySelectorAll('.toast-card');
    toasts.forEach(toast => {
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.4s ease-out';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 400);
      }, 5000);
    });
  });