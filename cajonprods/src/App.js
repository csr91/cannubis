import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/productos'; 
import TermsAndConditions from './components/terms'; 

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
    </Router>
  );
};

export default App;