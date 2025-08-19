// Responsive JavaScript for Mini Badge Generator and Product Listing
(function() {
    'use strict';

    function adjustLayout() {
        const formContainer = document.querySelector('.form-container');
        const navbar = document.querySelector('.navbar');

        if (window.innerWidth < 768) {
            // Adjust styles for mobile view
            formContainer.style.padding = '20px';
            navbar.style.flexDirection = 'column';
        } else {
            // Reset styles for desktop view
            formContainer.style.padding = '40px';
            navbar.style.flexDirection = 'row';
        }
    }

    // Initial adjustment
    adjustLayout();

    // Add event listener for window resize
    window.addEventListener('resize', adjustLayout);
})();
