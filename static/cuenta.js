document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  
  const cardContainer = document.querySelector('.card');

  navToggle.addEventListener('click', function() {
    
    cardContainer.classList.toggle('show');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Agrega un evento de clic al botón "Cerrar Sesión"
  var cerrarSesionBtn = document.querySelector(".boton-cuenta:last-of-type");
  cerrarSesionBtn.addEventListener("click", function() {
      // Redirige a la URL que ejecutará la acción de logout (puedes cambiarla según tu configuración)
      window.location.href = "/logout";
  });
});