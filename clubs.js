function navigateToWebpage2() {
    window.location.href = "http://127.0.0.1:5500/clubsinfo.html/index.html"; // Replace with the actual URL of webpage 2
  }
  
  // Attach event listeners to clickable cards
  document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".services_card");
    cards.forEach(function(card) {
      card.addEventListener("click", navigateToWebpage2);
    });
  });
  