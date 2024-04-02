import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/menu';

function ResultsPage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [rankings, setRankings] = useState([]);
    const [compatibilityMatrix, setCompatibilityMatrix] = useState([]);

    useEffect(() => {
        // S'assurer que currentUser existe et a une propriété 'id' avant de continuer
        if (currentUser && currentUser.id) {
            // Récupérer le classement pour l'utilisateur actuel
            fetch(`/Compatibility/Compatibilty_by_CurrentUser.php?userID=${currentUser.id}`)
                .then(response => response.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => b.CompatibilityPercent - a.CompatibilityPercent);
                    setRankings(sortedData.slice(0, 5)); // Ne conserver que les 5 premiers pour le classement
                })
                .catch(error => console.log(error));

            // Récupérer la matrice de compatibilité complète
            fetch(`/Compatibility/Compatibilty_Matrice_Table.php?userID=${currentUser.id}`)
                .then(response => response.json())
                .then(matrix => {
                    setCompatibilityMatrix(matrix);
                })
                .catch(error => console.log(error));
        } else {
            // Si currentUser est null ou n'a pas de 'id', rediriger vers la page d'accueil
            navigate('/');
        }
    }, [currentUser, navigate]); // Ajouter navigate dans le tableau de dépendances


    return (
        <div>
            <Menu />
            <h2 className="text-2xl font-bold mt-5 mb-3">Résultats de Compatibilité</h2>
            <h3 className="text-xl font-semibold mt-5 mb-2">Classement</h3>
            <ul className="list-decimal list-inside mb-5">
                {rankings.map((rank, index) => (
                    <li key={index} className="ml-4">
                        {rank.OtherUserFirstName} {rank.OtherUserLastName} : {rank.CompatibilityPercent}% compatible
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-5 mb-2">Matrice de Compatibilité</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Joueurs</th>
                            {compatibilityMatrix.map((row, index) => (
                                <th key={index} className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                    {row.FirstName} {row.LastName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {compatibilityMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-left py-3 px-4">{row.FirstName} {row.LastName}</td>
                                {Object.keys(row.compatibility).map((key, index) => (
                                    <td key={index} className="text-left py-3 px-4">
                                        {row.compatibility[key] !== null ? `${row.compatibility[key]}%` : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ResultsPage;
