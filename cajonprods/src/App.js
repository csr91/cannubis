import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/Productos'; 
import TermsAndConditions from './components/Terms'; 
import MiImagen from './192.png';  // Importa la imagen

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Ruta para el componente HelloWorld */}
        <Route path="/rct/productos" element={<Productos />} />

        {/* Ruta para el componente TermsAndConditions */}
        <Route path="/rct/categoris" element={<TermsAndConditions />} />

        {/* Otras rutas ... */}
      </Routes>
      <img src={MiImagen} alt="Descripción de la imagen" />
    </Router>
  );
};

export default App;