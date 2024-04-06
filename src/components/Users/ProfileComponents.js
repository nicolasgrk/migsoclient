import React, { useEffect, useState } from 'react';
import { CircleX} from 'lucide-react';
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct

function Profile({ setIsProfileOpen }){
    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState({
        Username: '',
        Email: '',
        FirstName: '',
        LastName: ''
    });

    useEffect(() => {
        if (currentUser && currentUser.id) {
            fetch(`/User/User_readOne.php?UserID=${currentUser.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Réponse réseau non ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Pour le débogage
    
                    setUserInfo(userInfo => ({
                        ...userInfo,
                        Username: data.Username, // Assurez-vous que ces clés correspondent
                        Email: data.Email,
                        FirstName: data.FirstName,
                        LastName: data.LastName
                    }));
                })
                .catch(error => console.error("Il y a eu un problème avec l'opération fetch: ", error));
        }
    }, [currentUser]); // `userInfo` est omis ici, car nous utilisons une mise à jour fonctionnelle
    

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-full lg:w-8/12 px-4 mx-auto mt-6 rounded-lg" >
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 mt-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">
                                    Mon profile
                                </h6>
                                <button onClick={() => setIsProfileOpen(false)} className="" type="button">
                                    <CircleX color="red" size="24" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Vos informations
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="FirstName">
                                            Prénom
                                            </label>
                                            <input type="text" id="FirstName" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={userInfo.FirstName} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="LastName">
                                            Nom
                                            </label>
                                            <input type="text" id="LastName" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={userInfo.LastName} />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Email">
                                            Email
                                            </label>
                                            <input type="email" id="Email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={userInfo.Email} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
