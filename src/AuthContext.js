import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // S'abonner aux changements de currentUser et mettre à jour localStorage
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const clearUser = () => {
    localStorage.removeItem('user'); // Assurez-vous de nettoyer le localStorage
    setCurrentUser(null);
  };

  const value = { currentUser, setUser, clearUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
