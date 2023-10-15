// JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    const serviceCards = document.querySelectorAll(".services_card");
  
    serviceCards.forEach(card => {
      const rating = parseInt(card.getAttribute("data-rating"));
  
      const stars = card.querySelectorAll(".star");
      for (let i = 0; i < stars.length; i++) {
        if (i < rating) {
          stars[i].classList.add("filled");
        } else {
          stars[i].classList.remove("filled");
        }
      }
    });
  });