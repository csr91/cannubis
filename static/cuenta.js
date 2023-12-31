
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const cardContainer = document.querySelector('.card');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
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

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  if (jqxhr.status == 401) {
      // Redirigir a la página de inicio de sesión
      window.location.href = '/login';
  }
});