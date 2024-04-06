import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';
// Importez les icônes Lucide nécessaires
import { LogOut, User, Settings, Home,SquarePen } from 'lucide-react';

const Menu = ({ onProfileClick }) => {
    console.log(onProfileClick); // Doit afficher la fonction dans la console
    let navigate = useNavigate();
    const { currentUser, clearUser } = useAuth(); // Utiliser useAuth pour accéder à l'utilisateur actuel et à la fonction clearUser

    const handleLogout = async () => {
        const response = await fetch('/User/User_logout.php', {
            method: 'POST',
            credentials: 'include' // Nécessaire pour les cookies de session avec CORS
        });
    
        if (response.ok) {
            console.log("Déconnexion réussie");
            clearUser(); // Effacer les informations de l'utilisateur du contexte
            navigate('/login');
        } else {
            console.error("Erreur lors de la tentative de déconnexion");
        }
    };

    return (
        <div className="flex flex-col rounded-3xl z-50">
            <div className="backdrop-blur-3xl text-sm border bg-black/5 rounded-2xl text-neutral-500 p-6 fixed bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex justify-center items-center h-full w-full">
                    <div className="flex items-center justify-center space-x-4"> 
                        <Link to="/home" className="hover:text-blue-700"> 
                            <Home color="black" size="24" />
                        </Link>
                        <button onClick={onProfileClick} className="hover:text-blue-700">
                            <User color="black" size="24" />
                        </button>
                        <a className="hover:text-blue-700" target="_blank" href="https://www.producthunt.com/@salnetx">
                            <Settings color="black" size="28" />
                        </a>
                        <Link to="/questions" className="hover:text-blue-700"> 
                            <SquarePen color="black" size="28" />
                        </Link>
                        <a className="hover:text-blue-700"     
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout(); 
                        }} 
                        href="#">
                            <LogOut color="black" size="24" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Menu;
