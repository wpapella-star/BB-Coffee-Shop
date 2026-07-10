const slides = document.querySelectorAll(".Slide");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    slides[index].classList.add("active");
}
showSlide(currentSlide);
setInterval(function () {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}, 3000);


const modal = document.getElementById("Discount");
const closeBtn = document.querySelector(".close");

window.addEventListener("load", function () {
    if (!sessionStorage.getItem("popupShown")) {
        modal.style.display = "block";
        sessionStorage.setItem("popupShown", "true");
    }
});

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ==========================
// DISPLAY CART
// ==========================

const cartBody = document.getElementById("cartItems");

if (cartBody) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let grandTotal = 0;

    cart.forEach((item, index) => {

        const total = item.price * item.quantity;

        grandTotal += total;

        cartBody.innerHTML += `

        <tr>

        <td>${item.name}</td>

        <td>$${item.price}</td>

        <td>${item.quantity}</td>

        <td>$${total}</td>

        <td>

        <button class="remove" onclick="removeItem(${index})">

        Remove

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("grandTotal").textContent =
        "Grand Total: $" + grandTotal;

}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    location.reload();

}