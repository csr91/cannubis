document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
  });
});

// // Crear el cuadro
// var cuadro = document.createElement("div");
// cuadro.id = "cuadro";

// var titulo = document.createElement("h1");
// titulo.textContent = "Ancho y Alto de la Pantalla";
// cuadro.appendChild(titulo);

// var dimensionesElemento = document.createElement("p");
// dimensionesElemento.id = "dimensiones";
// cuadro.appendChild(dimensionesElemento);

// // Estilos del cuadro
// cuadro.style.position = "fixed";
// cuadro.style.top = "50%";
// cuadro.style.left = "50%";
// cuadro.style.transform = "translate(-50%, -50%)";
// cuadro.style.backgroundColor = "lightgray";
// cuadro.style.padding = "20px";
// cuadro.style.textAlign = "center";

// // Agregar el cuadro al documento
// document.body.appendChild(cuadro);

// // Obtener el ancho y alto de la pantalla
// var ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// var alto = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// // Mostrar las dimensiones en el cuadro
// var dimensionesElemento = document.getElementById('dimensiones');
// dimensionesElemento.innerHTML = "Ancho: " + ancho + "px<br>Alto: " + alto + "px";

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

      const h3 = document.createElement('h3');
      h3.textContent = tienda.Nombre;

      const p = document.createElement('p');
      p.textContent = tienda.Descripcion;

      const enlace = document.createElement('a');
      enlace.classList.add('rounded-button');
      enlace.textContent = 'Ver Detalles';

      recuadro.appendChild(imagen);
      recuadro.appendChild(h3);
      recuadro.appendChild(p);
      recuadro.appendChild(enlace);

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

// Obtener referencia al contenedor de productos destacados
const recuadrossContainer = document.getElementById('productos-destacados');

// Obtener referencia a los contenedores de productos destacados
const recuadrosContainerSuperior = document.getElementById('productos-destacados-superior');
const recuadrosContainerInferior = document.getElementById('productos-destacados-inferior');

// Realizar una solicitud a la API para obtener los productos destacados
fetch('/productos/destacados')
  .then(response => response.json())
  .then(productos => {
    // Obtener 8 productos aleatorios
    const productosAleatorios = obtenerProductosAleatorios(productos, 8);

    // Dividir los productos en dos grupos de 4
    const productosSuperior = productosAleatorios.slice(0, 4);
    const productosInferior = productosAleatorios.slice(4);

    // Generar los elementos HTML para mostrar los productos destacados en la parte superior
    productosSuperior.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerSuperior.appendChild(recuadro);
    });

    // Generar los elementos HTML para mostrar los productos destacados en la parte inferior
    productosInferior.forEach(producto => {
      const recuadro = generarRecuadro(producto);
      recuadrosContainerInferior.appendChild(recuadro);
    });
  })
  .catch(error => {
    console.error('Error al obtener los productos destacados:', error);
  });

// Función para generar un recuadro de producto destacado
function generarRecuadro(producto) {
  const recuadro = document.createElement('div');
  recuadro.classList.add('recuadro');

  // Agregar el ID del aviso como atributo de datos personalizados
  const imagen = document.createElement('img');
  imagen.src = producto.Imagenes[0];
  imagen.alt = producto.Titulo;

  const h3 = document.createElement('h3');
  h3.textContent = producto.Titulo;

  const p = document.createElement('p');
  p.textContent = producto.Descripcion;

  const enlace = document.createElement('a');
  enlace.classList.add('rounded-button');
  enlace.textContent = 'Ver Detalles';

  recuadro.appendChild(imagen);
  recuadro.appendChild(h3);
  recuadro.appendChild(p);
  recuadro.appendChild(enlace);

  return recuadro;
}

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

function redireccionarAviso(idAviso) {
  const url = new URL('/aviso', window.location.origin);
  url.searchParams.append('id', idAviso);
  window.location.href = url.toString();
}

function generarRecuadro(producto) {
  const recuadro = document.createElement('div');
  recuadro.classList.add('recuadro');

  const imagen = document.createElement('img');
  imagen.src = producto.Imagenes[0];
  imagen.alt = producto.Titulo;

  // imagen.style.width = '300px';
  // imagen.style.height = '300px';
  // imagen.style.objectFit = 'cover';
  // imagen.style.objectPosition = 'center';

  const h3 = document.createElement('h3');
  h3.textContent = producto.Titulo;

  const p = document.createElement('p');
  p.textContent = producto.Descripcion;

  const enlace = document.createElement('a');
  enlace.classList.add('rounded-button');
  enlace.textContent = 'Ver Detalles';

  // Asignar el evento de clic al enlace
  enlace.addEventListener('click', function() {
    redireccionarAviso(producto.Idaviso);
  });

  recuadro.appendChild(imagen);
  recuadro.appendChild(h3);
  recuadro.appendChild(p);
  recuadro.appendChild(enlace);

  return recuadro;
}


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


function handleSearch() {
  var searchInput = document.getElementById('searchInput');
  var searchText = searchInput.value;
  // Realizar acciones con el texto de búsqueda ingresado, como filtrar resultados o redirigir a una página de resultados.
  console.log('Texto de búsqueda:', searchText);
}

document.getElementById('searchInput').addEventListener('input', handleSearch);

