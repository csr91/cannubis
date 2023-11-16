document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  
  const cardContainer = document.querySelector('.card');

  navToggle.addEventListener('click', function() {
    
    cardContainer.classList.toggle('show');
  });
});