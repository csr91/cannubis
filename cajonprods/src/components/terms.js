import React from 'react';

const TermsAndConditions = () => {
  const handleBlurEffect = () => {
    const elementsToBlur = Array.from(document.body.children);
    elementsToBlur.forEach(element => {
      element.style.transition = 'filter 0.5s ease';
      element.style.filter = 'blur(5px)';
    });
  };

  const handleRemoveBlurEffect = () => {
    const elementsToBlur = Array.from(document.body.children);
    elementsToBlur.forEach(element => {
      element.style.transition = 'filter 0.5s ease';
      element.style.filter = 'none';
    });
  };

  const handleRedirect = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>Términos y Condiciones de la Tienda Cannubis.store</h1>
      <p style={styles.paragraph}>
        Bienvenido/a a nuestra tienda de comercio electrónico. Antes de realizar una compra, te invitamos a leer
        detenidamente nuestros términos y condiciones. Al acceder y utilizar este sitio web, aceptas cumplir y estar
        sujeto/a a estos términos y condiciones.
      </p>

      <h2 style={styles.h2}>1. Uso del Sitio Web</h2>
      <ul style={styles.list}>
        <li>Nuestro sitio web está destinado únicamente para uso personal y no comercial...</li>
        <li>Te comprometes a utilizar este sitio web de acuerdo con todas las leyes, regulaciones y normativas aplicables.</li>
      </ul>

      {/* Resto del contenido ... */}

      <script>
        {/* Redireccionar al hacer clic en el botón */}
        document.getElementById('volverButton').addEventListener('click', handleRedirect);
      </script>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
    margin: 0,
    padding: '20px',
  },
  h1: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  h2: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    marginBottom: '10px',
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
  },
};

export default TermsAndConditions;
