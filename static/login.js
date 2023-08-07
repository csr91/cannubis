// Redirige al usuario cuando haga clic en el botón "Crear cuenta"
document.getElementById("crear-cuenta-btn").addEventListener("click", function () {
  // Reemplaza "URL_DESTINO" con la URL a la que deseas redirigir al usuario
  window.location.href = "/signin";
});

function enviarDatos(event) {
    event.preventDefault();
  
    const formulario = document.getElementById('formulario');
    const correo = formulario.correo.value;
    const contraseña = formulario.contraseña.value;
  
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: correo,
        contraseña: contraseña
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        // Redirigir a la página de inicio
        window.location.href = "/inicio";
      }
    })
    .catch(error => alert('Ocurrió un error al iniciar sesión.'));
  }
  
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', enviarDatos);
  