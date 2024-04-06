import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct

const QuestionForm = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stocke les réponses sélectionnées
  const { currentUser, clearUser } = useAuth(); // Utiliser useAuth pour accéder à l'utilisateur actuel et à la fonction clearUser
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Mise à jour pour enregistrer la sélection de l'utilisateur
  const handleAnswerSelect = (choiceID, questionID) => {
    setAnswers({
      ...answers,
      [questionID]: choiceID,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Réponses envoyées:", answers);

    // Assurez-vous d'avoir accès à currentUser.id ici
    const userID = currentUser.id; // Exemple de récupération de l'ID de l'utilisateur

    try {
      const response = await fetch('/Answer/Answer_create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ajouter l'ID de l'utilisateur aux données envoyées
        body: JSON.stringify({ answers: Object.entries(answers).map(([questionID, choiceID]) => ({ UserID: userID, QuestionID: questionID, ChoiceID: choiceID })) }),
      });

      const responseData = await response.json();
      console.log(responseData); // Traiter la réponse

      navigate('/resultat');

    } catch (error) {
      console.error('Erreur lors de l\'envoi des réponses', error);
    }
};
  const isLastQuestionAnswered = answers[questions[questions.length - 1]?.QuestionID] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="App mt-24">
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div
            key={question.QuestionID}
            className={`transition-opacity duration-500 ease-in-out ${index === currentQuestionIndex ? 'opacity-100' : 'opacity-0 absolute'} w-full`}
          >
            {index === currentQuestionIndex && (
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5 my-4">
                <p className="text-lg md:text-xl font-semibold text-indigo-600">{question.QuestionText}</p>
                <div className="mt-2">
                  {question.Choices.map((choice) => (
                    <div key={choice.ChoiceID} className="flex items-center mb-4">
                      <input
                        type="radio"
                        name={`question-${question.QuestionID}`}
                        value={choice.ChoiceID}
                        className="mr-2"
                        // Modifiez cette ligne pour enregistrer la réponse sélectionnée
                        onChange={() => handleAnswerSelect(choice.ChoiceID, question.QuestionID)}
                      />
                      <label className="text-md text-gray-700">{choice.ChoiceText}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          {/* Boutons Précédent et Suivant */}
          {isLastQuestion ? (
            <button
              type="submit"
              disabled={!isLastQuestionAnswered} // Désactive le bouton si la dernière question n'a pas été répondue
              className={`px-6 py-2 border rounded-md ${isLastQuestionAnswered ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-indigo-600 bg-white'} focus:outline-none`}
            >
              Envoyer le questionnaire
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Suivant
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
