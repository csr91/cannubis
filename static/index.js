window.addEventListener("scroll", function() {
  var barraNavegacion = document.getElementById("nav-izquierda");
  var porcentajeScroll = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  if (porcentajeScroll > 30) {
    barraNavegacion.classList.add("oculto");
  } else {
    barraNavegacion.classList.remove("oculto");
  }
});

function scrollToProductosDestacados() {
  const sepaSection = document.getElementById('sepa');
  const sepaPosition = sepaSection.getBoundingClientRect().top;
  const offset = sepaPosition * 0.05; // Ajusta el porcentaje de detención aquí

  window.scrollTo({
    top: sepaPosition - offset,
    behavior: 'smooth'
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav1 = document.querySelector('.nav1');
  const navMenu = document.querySelector('.nav-menu');
  const cardContainer = document.querySelector('.card');

  navToggle.addEventListener('click', function() {
    nav1.classList.toggle('show');
    navMenu.classList.toggle('show');
    cardContainer.classList.toggle('show');
  });
});

// Obtener referencia al contenedor de productos destacados
const recuadrossContainer = document.getElementById('productos-destacados');

// Obtener referencia a los contenedores de productos destacados
const recuadrosContainerSuperior = document.getElementById('productos-destacados-superior');
const recuadrosContainerInferior = document.getElementById('productos-destacados-inferior');

// Realizar una solicitud a la API para obtener los productos destacados
fetch('/productos/destacados')
  .then(response => response.json())
  .then(productos => {
    // Obtener 16 productos aleatorios
    const productosAleatorios = obtenerProductosAleatorios(productos, 16);

    // Dividir los productos en cuatro grupos de cuatro
    const productosGrupo1 = productosAleatorios.slice(0, 4);
    const productosGrupo2 = productosAleatorios.slice(4, 8);
    const productosGrupo3 = productosAleatorios.slice(8, 12);
    const productosGrupo4 = productosAleatorios.slice(12, 16);

    // Generar los elementos HTML para mostrar los productos en cada grupo
    productosGrupo1.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerSuperior.appendChild(recuadro);
    });

    productosGrupo2.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerSuperior.appendChild(recuadro);
    });

    productosGrupo3.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerSuperior.appendChild(recuadro);
    });

    productosGrupo4.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerInferior.appendChild(recuadro);
    });
  })
  .catch(error => {
    console.error('Error al obtener los productos destacados:', error);
  });

// Función para obtener productos aleatorios
function obtenerProductosAleatorios(productos, cantidad) {
  const productosAleatorios = [];
  const copiaProductos = productos.slice(); // Hacemos una copia del array de productos para no modificar el original

  while (productosAleatorios.length < cantidad && copiaProductos.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * copiaProductos.length);
    const productoAleatorio = copiaProductos.splice(indiceAleatorio, 1)[0];
    productosAleatorios.push(productoAleatorio);
  }

  return productosAleatorios;
}

// Función para generar un recuadro de producto
function generarRecuadro(producto) {
  const recuadro = document.createElement('div');
  recuadro.textContent = producto.nombre;
  // Agregar más contenido y estilos según tus necesidades
  return recuadro;
}


// Función para redireccionar a un aviso específico
function redireccionarAviso(idAviso) {
  const url = new URL(`/rct/aviso/${idAviso}`, window.location.origin);
  window.location.href = url.toString();
}


// Función para generar un recuadro HTML para un producto
function generarRecuadro(producto) {
  const recuadro = document.createElement('div');
  recuadro.classList.add('recuadro');

  const imagen = document.createElement('img');
  imagen.src = producto.Imagenes[0];
  imagen.alt = producto.Titulo;

  const contenido = document.createElement('div'); // Contenedor para h3 y p
  contenido.classList.add('contenido');

  const h3 = document.createElement('h3');
  h3.textContent = producto.Titulo;

  const p = document.createElement('p');
  p.textContent = producto.Descripcion;

  // Asignar el evento de clic al recuadro
  recuadro.addEventListener('click', function() {
    redireccionarAviso(producto.Idaviso);
  });

  contenido.appendChild(h3);
  contenido.appendChild(p);
  recuadro.appendChild(contenido);
  recuadro.appendChild(imagen);

  return recuadro;
}

// Obtener el contenedor de tiendas destacadas
const recuadrosContainer = document.getElementById('tiendas-arriba');

// Realizar una solicitud a la API para obtener las tiendas destacadas
fetch('/tiendas/destacadas')
  .then(response => response.json())
  .then(tiendas => {
    // Obtener 4 tiendas aleatorias
    const tiendasAleatorias = obtenerTiendasAleatorias(tiendas, 4);

    // Generar los recuadros de tiendas destacadas
    tiendasAleatorias.forEach(tienda => {
      const recuadro = document.createElement('div');
      recuadro.classList.add('recuadro');

      const imagen = document.createElement('img');
      imagen.src = tienda.Imagen;
      imagen.alt = tienda.Nombre;

      const contenido = document.createElement('div'); // Contenedor para h3 y p
      contenido.classList.add('contenido');

      const h3 = document.createElement('h3');
      h3.textContent = tienda.Nombre;

      const p = document.createElement('p');
      p.textContent = tienda.Descripcion;

      // Asignar el evento de clic al recuadro
      recuadro.addEventListener('click', function() {
      redireccionarAviso(producto.Idaviso);
      });

      contenido.appendChild(h3);
      contenido.appendChild(p);
      recuadro.appendChild(contenido);
      recuadro.appendChild(imagen);

      recuadrosContainer.appendChild(recuadro);
    });
  })
  .catch(error => {
    console.error('Error al obtener las tiendas destacadas:', error);
  });

// Función para obtener tiendas aleatorias
function obtenerTiendasAleatorias(tiendas, cantidad) {
  const tiendasAleatorias = [];
  const copiaTiendas = tiendas.slice(); // Hacemos una copia del array de tiendas para no modificar el original

  while (tiendasAleatorias.length < cantidad && copiaTiendas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * copiaTiendas.length);
    const tiendaAleatoria = copiaTiendas.splice(indiceAleatorio, 1)[0];
    tiendasAleatorias.push(tiendaAleatoria);
  }

  return tiendasAleatorias;
}
