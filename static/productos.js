// Crear el elemento para mostrar el ancho de pantalla y el ancho dividido por 4
const widthBox = document.createElement('div');
widthBox.style.position = 'fixed';
widthBox.style.bottom = '10px';
widthBox.style.left = '10px';
widthBox.style.backgroundColor = '#fff';
widthBox.style.padding = '10px';
widthBox.style.border = '1px solid #ccc';

// Función para actualizar el contenido de la caja flotante con el ancho de pantalla y el ancho dividido por 4
function updateWidthBox() {
  const screenWidth = window.innerWidth;
  const widthDividedByFour = screenWidth / 4;
  widthBox.textContent = `Ancho de pantalla: ${screenWidth}px | Ancho dividido por 4: ${widthDividedByFour}px`;
}

// Agregar el elemento a la página
document.body.appendChild(widthBox);

// Actualizar el contenido inicial de la caja flotante
updateWidthBox();

// Actualizar el contenido de la caja flotante cuando la ventana se redimensiona
window.addEventListener('resize', updateWidthBox);

// Función para obtener las categorías del backend
function obtenerCategorias() {
  return fetch('/productos/filtros')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
}

// Función recursiva para construir el árbol de categorías
function construirArbolCategorias(categorias, idPadre) {
  var arbol = [];

  categorias.forEach(function(categoria) {
    if (categoria.idfiltropadre === idPadre) {
      var subcategorias = construirArbolCategorias(categorias, categoria.idfiltro);
      categoria.subcategorias = subcategorias;
      arbol.push(categoria);
    }
  });

  return arbol;
}

function mostrarCategorias() {
  var listaCategorias = document.getElementById('lista-categorias');

  obtenerCategorias()
    .then(categorias => {
      listaCategorias.innerHTML = '';

      var arbolCategorias = construirArbolCategorias(categorias, null);

      // Función recursiva para construir la lista de categorías
      function construirListaCategorias(categorias, ul) {
        categorias.forEach(function(categoria) {
          var li = document.createElement('li');

          if (categoria.subcategorias.length > 0) {
            var subUl = document.createElement('ul');
            subUl.style.maxHeight = '0'; // Establecer la altura máxima inicialmente a cero
            subUl.style.overflow = 'hidden';
            subUl.style.transition = 'max-height 0.3s ease'; // Agregar transición suave

            // Agregar la imagen "v.png" al HTML de las categorías "hijas"
            var vIcon = document.createElement('img');
            vIcon.src = 'static/images/icons/v.png';
            vIcon.classList.add('v-icon');

            // Agregar la palabra de la categoría
            var palabra = document.createElement('span');
            palabra.innerText = categoria.nombre;

            li.appendChild(palabra);
            li.appendChild(vIcon);

            li.appendChild(subUl);
            construirListaCategorias(categoria.subcategorias, subUl);

            // Agregar una clase a las categorías "hijas"
            li.classList.add('categoria-hija');

            // Agregar evento de clic al ícono para mostrar/ocultar las subcategorías
            vIcon.addEventListener('click', function(event) {
              if (subUl.style.maxHeight === '0px') {
                subUl.style.maxHeight = subUl.scrollHeight + 'px';
              } else {
                subUl.style.maxHeight = '0';
              }
            });
          } else {
            // Agregar la palabra de la categoría si no hay subcategorías
            li.innerText = categoria.nombre;
          }

          ul.appendChild(li);
        });
      }

      construirListaCategorias(arbolCategorias, listaCategorias);
    });
}

mostrarCategorias();
