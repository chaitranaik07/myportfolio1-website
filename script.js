document.addEventListener('DOMContentLoaded', function() {
            
            // --- Initialization ---
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                anchorPlacement: 'top-bottom',
            });

            // Initialize Lucide Icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Dynamic Year
            document.getElementById('currentYear').textContent = new Date().getFullYear();

            // --- Navbar Logic ---
            const navbar = document.getElementById('navbar');
            const navToggleBtn = document.getElementById('navToggleBtn');
            const navMenu = document.getElementById('navMenu');
            const navIcon = document.getElementById('navIcon');

            // Sticky Navbar Effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    // Optimized: Use a single classList.add call
                    navbar.classList.add('bg-gray-950/80', 'backdrop-blur-xl', 'shadow-lg', 'border-b', 'border-gray-800');
                } else {
                    // Optimized: Use a single classList.remove call
                    navbar.classList.remove('bg-gray-950/80', 'backdrop-blur-xl', 'shadow-lg', 'border-b', 'border-gray-800');
                }
            });

            // Mobile Nav Toggle
            navToggleBtn.addEventListener('click', () => {
                const isHidden = navMenu.classList.toggle('hidden');
                navIcon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
                lucide.createIcons();
            });

            // Close Mobile Menu on Link Click
            document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Better scrolling behavior
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    if (!navMenu.classList.contains('hidden')) {
                        navMenu.classList.add('hidden');
                        navIcon.setAttribute('data-lucide', 'menu');
                        lucide.createIcons();
                    }
                });
            });

            // --- Custom Cursor Logic ---
            const cursor = document.getElementById('cursor-glow');
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;
            const easingFactor = 0.15; // Smoothness factor

            // Track mouse position
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.opacity = '1';
            });

            // Smooth animation loop
            function animateCursor() {
                // Linear interpolation (Lerp)
                const distX = mouseX - cursorX;
                const distY = mouseY - cursorY;
                
                cursorX += distX * easingFactor;
                cursorY += distY * easingFactor;
                
                cursor.style.left = `${cursorX}px`;
                cursor.style.top = `${cursorY}px`;
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
        });
