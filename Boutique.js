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