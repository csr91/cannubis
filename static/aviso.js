// Obtener el elemento div del título
var tituloDiv = document.querySelector('.aviso-titulo');

// Obtener el idaviso de la URL (suponiendo que lo has obtenido previamente)
var idAviso = obtenerIdAvisoDesdeURL();

// Hacer la solicitud a la API para obtener los datos del aviso
fetch(`http://127.0.0.1:5000/avisos/${idAviso}`)
  .then(response => response.json())
  .then(data => {
    // Obtener el título del aviso desde los datos obtenidos
    var titulo = data.Titulo;

    // Mostrar el título en el div correspondiente
    tituloDiv.textContent = titulo;
  })
  .catch(error => console.error(error));

// Función para obtener el idaviso de la URL (puedes ajustarla según tus necesidades)
function obtenerIdAvisoDesdeURL() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const cardContainer = document.querySelector('.card');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    cardContainer.classList.toggle('show');
  });
});

// Obtener el parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const idaviso = urlParams.get('id');

// Hacer la solicitud GET a tu API
fetch(`/avisos/${idaviso}`)
  .then(response => response.json())
  .then(data => {
    // Obtener los valores de condicion, unidades_vendidas y calificacion
    const condicion = data.condicion;
    const unidades_vendidas = data.unidades_vendidas;
    const calificacion = data.calificacion;
    const Titulo = data.Titulo;
    const Descripcion = data.Descripcion;
    const Precio = data.Precio;
    
    // Actualizar los valores en el HTML
    document.getElementById("condicion").textContent = condicion;
    document.getElementById("cantidad").textContent = unidades_vendidas;
    document.getElementById("estrellas").textContent = "★".repeat(calificacion);
    document.getElementById("titulo").textContent = Titulo;
    document.getElementById("desc-corta").textContent = Descripcion;
    document.getElementById("precio").textContent = Precio;
  })
  .catch(error => {
    console.error('Error:', error);
  });

let currentIndex = 0;
let totalImages = 0;

function showSlide(index) {
  const carouselImages = document.getElementById('carousel-images');
  const slideWidth = document.querySelector('.carousel-image').clientWidth;
  const offset = -index * slideWidth;
  carouselImages.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalImages;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  showSlide(currentIndex);
}

window.addEventListener('load', function () {
  const images = document.querySelectorAll('.carousel-image');
  images.forEach(image => {
    image.style.width = '500px';
  });

  showSlide(currentIndex);
});

fetch(`/avisos/${idaviso}`)
  .then(response => response.json())
  .then(data => {
    const imagenes = [
      data.Imagen1,
      data.Imagen2,
      data.Imagen3,
      data.Imagen4,
      data.Imagen5,
      data.Imagen6
    ];

    totalImages = imagenes.filter(Boolean).length;

    const carouselImages = document.getElementById("carousel-images");

    let loadedImagesCount = 0;

    imagenes.forEach(imagen => {
      if (imagen) {
        const img = document.createElement("img");

        img.addEventListener('load', function() {
          loadedImagesCount++;

          if (loadedImagesCount === totalImages) {
            showSlide(currentIndex);
          }
        });

        img.src = imagen;
        img.className = 'carousel-image';
        carouselImages.appendChild(img);
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
