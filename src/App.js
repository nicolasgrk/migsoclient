import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './Routes/LoginPage';
import QuestionsPage from './Routes/QuestionsPage';
import SignUpPage from './Routes/SignUpPage';
import ResultatPage from './Routes/ResultatPage';
import HomePage from './Routes/HomePage';

import Menu from './components/menu';
import Profile from './components/Users/ProfileComponents';
import Logo from './components/logo';

import { useAuth } from './AuthContext'; // Assurez-vous que ce chemin est correct

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser } = useAuth();

  function AppContent() {
    const location = useLocation();

    return (
      <>
        {/* Logo et Menu conditionnellement affiché, sauf sur la page de login */}
        <Logo />
        {location.pathname !== '/login' && location.pathname !== '/' && location.pathname !== '/signup' && <Menu onProfileClick={() => setIsProfileOpen(true)} />}
        
        {/* Vos Routes ici */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/resultat" element={<ResultatPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        
        {/* Modal Profile */}
        {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
      </>
    );
  }
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
    <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <Router>
        <AppContent />
      </Router>
      <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
    </div>
  );
}

export default App;
