import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

  return (
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
                Trouvez votre partenaire de travail idéal
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Notre application web révolutionnaire vous invite à explorer les dynamiques de travail au sein de votre équipe d'une manière tout à fait unique et innovante. 
            Grâce à notre formulaire interactif, chaque salarié a la possibilité de découvrir ses affinités professionnelles et de déterminer avec qui il pourrait former les duos les plus performants. 
            En participant à notre test de compatibilité, vous obtiendrez des insights précieux sur la manière dont vos traits de personnalité, compétences et préférences professionnelles s'alignent avec ceux de vos collègues. 
            Cette approche ludique mais fondée sur des données concrètes est conçue pour renforcer les liens entre collègues, optimiser la collaboration et maximiser l'efficacité au sein de votre organisation. 
            N'attendez plus pour découvrir avec qui vous avez le plus d'affinités au travail et transformez votre environnement professionnel en un espace plus harmonieux et productif !
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/questions" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Faire le test
                </Link>

              <Link to="/resultat"className="text-sm font-semibold leading-6 text-gray-900">
                Accéder aux résultats <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
  
      </div>
  );
}

export default HomePage;
