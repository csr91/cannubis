import React from 'react';

const Categorias = ({ categorias }) => {
    // Agrupar las categorías según idfiltropadre
    const categoriasAgrupadas = categorias.reduce((acc, categoria) => {
      const idfiltropadre = categoria.idfiltropadre || categoria.idfiltro;
      if (!acc[idfiltropadre]) {
        acc[idfiltropadre] = [];
      }
      acc[idfiltropadre].push(categoria);
      return acc;
    }, {});
  
    // Agregamos un console.log para mostrar las categorías obtenidas
    console.log("Categorías obtenidas desde la API:", categoriasAgrupadas);
  
    return (
      <div className="categorias">
        {/* Recorrer cada categoría padre */}
        {categoriasAgrupadas[null]?.map((categoriaPadre) => (
          <div key={categoriaPadre.idfiltro} className="categoria-padre">
            <h3>{categoriaPadre.nombre}</h3>
            {/* Recorrer las subcategorías colapsables */}
            {categoriasAgrupadas[categoriaPadre.idfiltro]?.map((subcategoria) => (
              <div key={subcategoria.idfiltro} className="subcategoria">
                <p>{subcategoria.nombre}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
};

export default Categorias;
