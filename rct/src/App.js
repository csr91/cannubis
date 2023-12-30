import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/Productos'; 
import Aviso from './components/Aviso';
import Cuenta from './components/Cuenta'; 
import Inicio from './components/Inicio';
import TiendasDestacadas from './components/tiendas-destacadas/TiendasDestacadas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/rct/productos" element={<Productos />} />
        <Route path="/rct/aviso/:id" element={<Aviso />} />
        <Route path="/rct/cuenta" element={<Cuenta />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/tiendas" element={<TiendasDestacadas />} />
      </Routes>
    </Router>
  );
};

export default App;