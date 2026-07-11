document.addEventListener('DOMContentLoaded', () => {
   const slides = document.querySelectorAll('.Slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 4000);
    }
    const discountModal = document.getElementById('Discount');
    const closeBtn = document.querySelector('.Modal .close');
    
    if (discountModal && closeBtn) {
        // Automatically show the popup on screen after a short delay
        setTimeout(() => {
            discountModal.style.display = 'block';
        }, 1500);
        closeBtn.addEventListener('click', () => {
            discountModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === discountModal) {
                discountModal.style.display = 'none';
            }
        });
    }

  
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('Searchbutton');
    const catalogue = document.querySelector('.coffee-catalogue');
    const coffeeCards = document.querySelectorAll('.coffee-card');

    if (searchInput && searchButton) {
        const handleSearch = () => {
            const query = searchInput.value.toLowerCase().trim();

            coffeeCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const descElement = card.querySelector('p');
                
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                const description = descElement ? descElement.textContent.toLowerCase() : '';
                
                const matches = title.includes(query) || description.includes(query);

                if (matches) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); 
                }
            });
        };

        searchInput.addEventListener('keyup', handleSearch);
        searchButton.addEventListener('click', handleSearch);
    }

    if (coffeeCards.length > 0) {
        coffeeCards.forEach(card => {
            card.style.transition = 'all 0.3s ease-in-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });

        const cartButtons = document.querySelectorAll('.btn');
        cartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const h3Element = e.target.parentElement.querySelector('h3');
                if (h3Element) {
                    alert(`${h3Element.textContent} has been added to your cart!`);
                }
            });
        });
    }

    if (catalogue && coffeeCards.length > 0) {
        function handleResponsiveResize() {
            const width = window.innerWidth;
            if (width < 600) {
                catalogue.style.display = 'grid';
                catalogue.style.gridTemplateColumns = '1fr';
                catalogue.style.gap = '15px';
            } else if (width >= 600 && width < 1024) {
                catalogue.style.display = 'grid';
                catalogue.style.gridTemplateColumns = 'repeat(2, 1fr)';
                catalogue.style.gap = '20px';
            } else {
                catalogue.style.display = 'grid';
                catalogue.style.gridTemplateColumns = 'repeat(3, 1fr)';
                catalogue.style.gap = '30px';
            }
        }

        function debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        }

        handleResponsiveResize();
        window.addEventListener('resize', debounce(handleResponsiveResize, 100));
    }
});
