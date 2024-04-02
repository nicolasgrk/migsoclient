import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Routes/LoginPage';
import QuestionsPage from './Routes/QuestionsPage';
import SignUpPage from './Routes/SignUpPage';
import ResultatPage from './Routes/ResultatPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/resultat" element={<ResultatPage />} />
        {/* Rediriger vers la page de login par défaut */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
