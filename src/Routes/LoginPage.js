import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth} from '../AuthContext';

function LoginPage() {
  let navigate = useNavigate();
  const { setUser } = useAuth(); // Ajoutez cette ligne pour extraire setUser du contexte d'authentification

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/User/User_login.php', { // Assurez-vous de remplacer par l'URL correcte de votre API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: formData.email,
        Password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Stockez les données de l'utilisateur en utilisant setUser
      //console.log(data); // Inspectez les données reçues

      const user = { 
        id: data.UserID, 
        lastName: data.LastName,  // Utilisez les données réelles reçues de la réponse
        firstName: data.FirstName 
      };
      setUser(user); // Mettez à jour l'état global de l'utilisateur
      
      navigate('/questions');
    }else {
      // Gérez l'erreur de connexion
      alert("Échec de la connexion");
    }
  };

  const redirectToSignup = () => {
    navigate('/signup'); // Assurez-vous que le chemin correspond à celui défini pour SignUpPage dans vos routes
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="******************"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={redirectToSignup}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
