function enviarDatos(event) {
    event.preventDefault();
  
    const formulario = document.getElementById('formulario');
    const correo = formulario.correo.value;
    const contraseña = formulario.contraseña.value;
    const confirmarContraseña = formulario['contraseña-confirmar'].value;
  
    // Validar que la contraseña y la confirmación sean iguales
    if (contraseña !== confirmarContraseña) {
      alert('La contraseña y la confirmación de contraseña no coinciden.');
      return;
    }
  
    // Validar que la contraseña tenga al menos 6 caracteres y contenga letras y números
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(contraseña)) {
      alert('La contraseña debe tener al menos 6 caracteres y contener letras y números.');
      return;
    }
  
    // Enviar los datos a la API
    fetch('http://localhost:5000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: correo,
        password: contraseña
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          if (data.error === 'email_existe') {
            alert('Usuario ya registrado.');
          } else {
            alert(data.error);
          }
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        if (error.toString().includes("Duplicate entry")) {
          alert('Usuario ya registrado.');
        } else {
          alert('Ocurrió un error al crear la cuenta.');
        }
      });
  }
  
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', enviarDatos);