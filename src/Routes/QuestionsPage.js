import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout
import QuestionForm from '../components/Question/QuestionForm';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // Initialisation de useNavigate


  useEffect(() => {
    // Assurez-vous que cette URL pointe vers votre API qui renvoie les questions avec leurs choix
    //fetch('http://localhost:8888/migso/api/src/controllers/Question/Question_read.php')
    fetch('/Question/Question_readWithChoice.php')
    .then(response => response.json())
    .then(data => setQuestions(data.data))
    .catch(error => console.error("Il y a eu un problème avec l'opération fetch: ", error));
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  // Logique d'envoi des réponses
  console.log("Questionnaire soumis.");
};
  // Fonction pour naviguer vers la page de résultats
  const goToResults = () => {
    navigate('/resultat'); // Assurez-vous que le chemin est correct
  };
return (
  <div>
    <QuestionForm questions={questions} handleSubmit={handleSubmit} />
    <div className="flex justify-center mt-4">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={goToResults}
      >
      Voir les Résultats
      </button>
    </div>

  </div>

);
}

export default QuestionsPage;
