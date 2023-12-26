import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/Productos'; 
import MiImagen from './192.png';  // Importa la imagen

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Ruta para el componente HelloWorld */}
        <Route path="/rct/productos" element={<Productos />} />

        {/* Otras rutas ... */}
      </Routes>
      <img src={MiImagen} alt="Descripción de la imagen" />
    </Router>
  );
};

export default App;