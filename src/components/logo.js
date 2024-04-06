import React from 'react';

import { Link } from 'react-router-dom';

const Logo = () => {

  return (
    <div className="flex items-center justify-between w-full px-8 py-4 mt-6">
      {/* Espacer vide pour équilibrer le layout et centrer le logo visuellement */}
      <div></div>
      
      {/* Logo centré visuellement */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link to="/questions"> {/* Assurez-vous que le chemin correspond à votre route QuestionPage */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} className="w-80" alt="Logo"/>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
