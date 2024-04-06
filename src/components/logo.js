import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';

const Logo = () => {
    let navigate = useNavigate();
    const { currentUser, clearUser } = useAuth(); // Utiliser useAuth pour accéder à l'utilisateur actuel et à la fonction clearUser
    //console.log(currentUser);

    const handleLogout = async () => {
        const response = await fetch('/User/User_logout.php', {
            method: 'POST',
            credentials: 'include' // Nécessaire pour les cookies de session avec CORS
        });
    
        if (response.ok) {
            // Déconnexion réussie côté serveur
            console.log("Déconnexion réussie");
            // Rediriger l'utilisateur ou mettre à jour l'état de l'interface utilisateur ici
            clearUser(); // Effacer les informations de l'utilisateur du contexte

            navigate('/login');

        } else {
            // Gérer l'erreur de déconnexion
            console.error("Erreur lors de la tentative de déconnexion");
        }
    };
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
