import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from './components/HelloWorld'; 
import TermsAndConditions from './components/terms'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para el componente HelloWorld */}
        <Route path="/0/hello" element={<HelloWorld />} />

        {/* Ruta para el componente TermsAndConditions */}
        <Route path="/0/terms" element={<TermsAndConditions />} />

        {/* Otras rutas ... */}
      </Routes>
    </Router>
  );
};

export default App;