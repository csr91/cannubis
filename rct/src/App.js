import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/Productos'; 
import Aviso from './components/Aviso'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/rct/productos" element={<Productos />} />
        <Route path="/rct/aviso/:id" element={<Aviso />} />
      </Routes>
    </Router>
  );
};

export default App;