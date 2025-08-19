// Responsive JavaScript for Mini Badge Generator and Product Listing
(function() {
    'use strict';

    // Configuration object for responsive breakpoints
    const breakpoints = {
        mobile: 768,
        tablet: 1024
    };

    // Utility functions
    const utils = {
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        isMobile: function() {
            return window.innerWidth <= breakpoints.mobile;
        },

        isTablet: function() {
            return window.innerWidth > breakpoints.mobile && window.innerWidth <= breakpoints.tablet;
        },

        isDesktop: function() {
            return window.innerWidth > breakpoints.tablet;
        }
    };

    // Responsive adjustments
    const responsive = {
        adjustNavbar: function() {
            const navbar = document.querySelector('.navbar');
            const navItems = document.querySelector('.nav-item');
            
            if (!navbar || !navItems) return;

            if (utils.isMobile()) {
                navbar.style.flexDirection = 'column';
                navbar.style.padding = '10px';
                navItems.style.flexDirection = 'column';
                navItems.style.alignItems = 'center';
                navItems.style.padding = '5px';
                
                // Add mobile menu toggle if not exists
                if (!document.querySelector('.mobile-menu-toggle')) {
                    this.createMobileMenu(navbar, navItems);
                }
            } else {
                navbar.style.flexDirection = 'row';
                navbar.style.padding = '8px 20px';
                navItems.style.flexDirection = 'row';
                navItems.style.alignItems = 'center';
                navItems.style.padding = '10px';
                
                // Remove mobile menu toggle
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (toggle) toggle.remove();
            }
        },

        createMobileMenu: function(navbar, navItems) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                display: block;
                margin: 10px;
            `;
            
            toggle.addEventListener('click', function() {
                navItems.style.display = navItems.style.display === 'none' ? 'flex' : 'none';
            });
            
            navbar.insertBefore(toggle, navItems);
            navItems.style.display = 'none';
        },

        adjustForm: function() {
            const formContainer = document.querySelector('.form-container');
            const formGroups = document.querySelectorAll('.form-group');
            
            if (!formContainer) return;

            if (utils.isMobile()) {
                formContainer.style.padding = '20px';
                formContainer.style.marginTop = '10px';
                
                formGroups.forEach(group => {
                    const inputs = group.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        if (input) {
                            input.style.width = '100%';
                            input.style.maxWidth = '100%';
                        }
                    });
                });
            } else if (utils.isTablet()) {
                formContainer.style.padding = '30px';
                formContainer.style.marginTop = '15px';
                
                formGroups.forEach(group => {
                    const inputs = group.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        if (input) {
                            input.style.width = '100%';
                            input.style.maxWidth = '400px';
                        }
                    });
                });
            } else {
                formContainer.style.padding = '40px';
                formContainer.style.marginTop = '20px';
                
                formGroups.forEach(group => {
                    const inputs = group.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        if (input) {
                            input.style.width = '300px';
                        }
                    });
                });
            }
        },

        adjustBadge: function() {
            const badge = document.getElementById('badge');
            if (!badge) return;

            if (utils.isMobile()) {
                badge.style.maxWidth = '90%';
                badge.style.margin = '10px auto';
                badge.style.padding = '15px';
                badge.style.fontSize = '14px';
            } else {
                badge.style.maxWidth = '400px';
                badge.style.margin = '20px auto';
                badge.style.padding = '20px';
                badge.style.fontSize = '16px';
            }
        },

        handleImageUpload: function() {
            const uploadArea = document.querySelector('.upload-area');
            if (!uploadArea) return;

            if (utils.isMobile()) {
                uploadArea.style.padding = '20px';
                const p = uploadArea.querySelector('p');
                if (p) p.style.fontSize = '12px';
            } else {
                uploadArea.style.padding = '40px 20px';
                const p = uploadArea.querySelector('p');
                if (p) p.style.fontSize = '14px';
            }
        },

        enhanceTouchTargets: function() {
            const buttons = document.querySelectorAll('button, .submit-btn, .upload-btn');
            buttons.forEach(button => {
                if (utils.isMobile()) {
                    button.style.minHeight = '44px';
                    button.style.minWidth = '44px';
                    button.style.padding = '12px 20px';
                } else {
                    button.style.minHeight = 'auto';
                    button.style.minWidth = 'auto';
                }
            });
        }
    };

    // Initialize responsive features
    function initResponsive() {
        responsive.adjustNavbar();
        responsive.adjustForm();
        responsive.adjustBadge();
        responsive.handleImageUpload();
        responsive.enhanceTouchTargets();
    }

    // Debounced resize handler
    const handleResize = utils.debounce(initResponsive, 250);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', initResponsive);
    window.addEventListener('orientationchange', initResponsive);

    // Handle initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initResponsive);
    } else {
        initResponsive();
    }

    // Export for global access
    window.ResponsiveManager = {
        refresh: initResponsive,
        isMobile: utils.isMobile,
        isTablet: utils.isTablet,
        isDesktop: utils.isDesktop
    };
})();
