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

            