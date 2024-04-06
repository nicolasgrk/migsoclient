import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';


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
                <div className="max-w-md mx-auto bg-white mt-8 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <h3 className="text-xl font-semibold mt-5 mb-2 text-center">Classement</h3>
                    <div className="p-4">
                        <div className="flex flex-col space-y-4">
                        {rankings.map((rank, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-lg font-semibold">{index + 1}.</div>
                                            <Award className="ml-2 text-yellow-500" size={24} />
                                        <div className="ml-4 text-md font-medium">{rank.OtherUserFirstName} {rank.OtherUserLastName}</div>
                                    </div>
                                    <div className="font-medium">{rank.CompatibilityPercent} % compatible</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto bg-white mt-8 rounded-xl shadow-md overflow-hidden mb-24">
                    <h3 className="text-xl font-semibold mt-5 mb-2 text-center">Matrice de Compatibilité</h3>
                    <div className="overflow-x-auto px-4">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                <th scope="col" className="py-3 px-6">Joueurs</th>
                                    {compatibilityMatrix.map((row, index) => (
                                        <th key={index} className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                            {row.FirstName} {row.LastName}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {compatibilityMatrix.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="py-4 px-6">{row.FirstName} {row.LastName}</td>
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

        </div>
    );
}

export default ResultsPage;
