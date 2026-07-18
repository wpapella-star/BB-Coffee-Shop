document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('bb_coffee_cart')) || [];
    
    function saveCart() {
        localStorage.setItem('bb_coffee_cart', JSON.stringify(cart));
    }

    function cleanPrice(priceText) {
        let sanitizedText = priceText.toLowerCase()
                                     .replace('mwk', '')
                                     .replace(/,/g, '')
                                     .replace(/\s+/g, '');
        return parseFloat(sanitizedText) || 0;
    }

    function formatPrice(number) {
        return 'mwk' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

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
        setTimeout(() => { discountModal.classList.add('show-modal'); }, 1500);
        closeBtn.addEventListener('click', () => { discountModal.classList.remove('show-modal'); });
        window.addEventListener('click', (e) => {
            if (e.target === discountModal) discountModal.classList.remove('show-modal');
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('Searchbutton');
    const coffeeCards = document.querySelectorAll('.coffee-card');

    if (searchInput && searchButton) {
        const handleSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            coffeeCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const matches = title.includes(query) || description.includes(query);

                if (matches) {
                    card.classList.remove('hidden-card');
                } else {
                    card.classList.add('hidden-card');
                }
            });
        };
        searchInput.addEventListener('keyup', handleSearch);
        searchButton.addEventListener('click', handleSearch);
    }

    if (coffeeCards.length > 0) {
        const cartButtons = document.querySelectorAll('.coffee-card .btn');
        cartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.parentElement;
                const title = card.querySelector('h3').textContent.trim();
                const priceRaw = card.querySelector('h3').textContent.trim();
                const imageSrc = card.querySelector('img').getAttribute('src');
                const price = cleanPrice(priceRaw);
                const existingItem = cart.find(item => item.title === title);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ title, price, imageSrc, quantity: 1 });
                }

                saveCart();
                alert(`"${title}" has been successfully added to your cart basket!`);
            });
        });
    }

    const cartItemsContainer = document.getElementById('cartItems');
    const grandTotalElement = document.getElementById('grandTotal');

    if (cartItemsContainer && grandTotalElement) {
        function renderCart() {
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-cart-message">
                            Your shopping cart is currently empty. <br><br>
                            <a href="coffee.html" class="btn checkout-redirect">Go Shop Coffee</a>
                        </td>
                    </tr>`;
                grandTotalElement.textContent = "Grand Total: mwk0.00";
                return;
            }

            let grandTotal = 0;
            cart.forEach((item, index) => {
                const rowTotal = item.price * item.quantity;
                grandTotal += rowTotal;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="cart-product-cell">
                        <img src="${item.imageSrc}" alt="${item.title}" class="cart-item-img">
                        <strong>${item.title}</strong>
                    </td>
                    <td>${formatPrice(item.price)}</td>
                    <td>
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <span class="qty-count">${item.quantity}</span>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </td>
                    <td>${formatPrice(rowTotal)}</td>
                    <td>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </td>
                `;
                cartItemsContainer.appendChild(tr);
            });

            grandTotalElement.textContent = `Grand Total: ${formatPrice(grandTotal)}`;
            attachCartEventListeners();
        }

        function attachCartEventListeners() {
            document.querySelectorAll('.qty-btn.plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart[idx].quantity += 1;
                    saveCart();
                    renderCart();
                });
            });

            document.querySelectorAll('.qty-btn.minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    if (cart[idx].quantity > 1) {
                        cart[idx].quantity -= 1;
                    } else {
                        cart.splice(idx, 1);
                    }
                    saveCart();
                    renderCart();
                });
            });

            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    saveCart();
                    renderCart();
                });
            });
        }

        renderCart();
    }
});
