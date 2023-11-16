function enviarDatos(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los valores del formulario
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Crear un objeto con los datos que quieres enviar
    const datos = {
        correo: correo,
        contraseña: contraseña
    };

    // Realizar una solicitud POST al servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })

    
    .then(response => {
      if (response.ok) {
          // Redirigir al usuario a la página de inicio ("/")
          window.location.href = '/';
      } else {
          // Mostrar un mensaje de error si la respuesta no es exitosa
          alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
  })
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        }
    
        // Obtener la cookie del servidor
        const cookieValue = data['nombre_de_la_cookie'];
    
        // Establecer la cookie en el navegador del cliente
        if (cookieValue) {
            document.cookie = 'nombre_de_la_cookie=' + cookieValue;
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}
