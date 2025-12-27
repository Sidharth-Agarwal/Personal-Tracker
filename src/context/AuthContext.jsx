import { createContext, useContext, useState, useEffect } from 'react';
import { observeAuthState, loginUser, registerUser, logoutUser } from '../firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = observeAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setError(null);
    const { user: loggedInUser, error: loginError } = await loginUser(email, password);
    if (loginError) {
      setError(loginError);
      return { success: false, error: loginError };
    }
    return { success: true, user: loggedInUser };
  };

  const register = async (email, password) => {
    setError(null);
    const { user: registeredUser, error: registerError } = await registerUser(email, password);
    if (registerError) {
      setError(registerError);
      return { success: false, error: registerError };
    }
    return { success: true, user: registeredUser };
  };

  const logout = async () => {
    setError(null);
    const { error: logoutError } = await logoutUser();
    if (logoutError) {
      setError(logoutError);
      return { success: false, error: logoutError };
    }
    return { success: true };
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
