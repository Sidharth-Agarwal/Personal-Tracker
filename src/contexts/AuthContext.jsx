import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Authentication Context
 * Manages user authentication state and operations
 */

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    checkAuthState();
  }, []);

  /**
   * Check if user is authenticated (on mount and refresh)
   */
  const checkAuthState = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual Firebase auth check
      // const unsubscribe = auth.onAuthStateChanged((user) => {
      //   if (user) {
      //     setUser({
      //       uid: user.uid,
      //       email: user.email,
      //       displayName: user.displayName,
      //       photoURL: user.photoURL,
      //     });
      //   } else {
      //     setUser(null);
      //   }
      //   setLoading(false);
      // });
      
      // For now, check localStorage
      const storedUser = localStorage.getItem('tracker_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Auth state check error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  /**
   * Sign up with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User name
   */
  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase signup
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { displayName: name });
      
      // Temporary mock signup
      const newUser = {
        uid: Date.now().toString(),
        email,
        displayName: name,
        photoURL: null,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('tracker_user', JSON.stringify(newUser));
      
      setLoading(false);
      return newUser;
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase signin
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Temporary mock signin
      const mockUser = {
        uid: Date.now().toString(),
        email,
        displayName: email.split('@')[0],
        photoURL: null,
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('tracker_user', JSON.stringify(mockUser));
      
      setLoading(false);
      return mockUser;
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Sign out
   */
  const signout = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual Firebase signout
      // await signOut(auth);
      
      setUser(null);
      localStorage.removeItem('tracker_user');
      
      setLoading(false);
    } catch (err) {
      console.error('Signout error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Reset password
   * @param {string} email - User email
   */
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase password reset
      // await sendPasswordResetEmail(auth, email);
      
      console.log('Password reset email sent to:', email);
      
      setLoading(false);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   */
  const updateUserProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase profile update
      // await updateProfile(auth.currentUser, updates);
      
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      setUser(updatedUser);
      localStorage.setItem('tracker_user', JSON.stringify(updatedUser));
      
      setLoading(false);
      return updatedUser;
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Update email
   * @param {string} newEmail - New email address
   */
  const updateEmail = async (newEmail) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase email update
      // await updateEmail(auth.currentUser, newEmail);
      
      const updatedUser = {
        ...user,
        email: newEmail,
        updatedAt: new Date().toISOString(),
      };
      
      setUser(updatedUser);
      localStorage.setItem('tracker_user', JSON.stringify(updatedUser));
      
      setLoading(false);
    } catch (err) {
      console.error('Email update error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Update password
   * @param {string} newPassword - New password
   */
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase password update
      // await updatePassword(auth.currentUser, newPassword);
      
      console.log('Password updated successfully');
      
      setLoading(false);
    } catch (err) {
      console.error('Password update error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Delete account
   */
  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase account deletion
      // await deleteUser(auth.currentUser);
      
      setUser(null);
      localStorage.removeItem('tracker_user');
      
      setLoading(false);
    } catch (err) {
      console.error('Account deletion error:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    resetPassword,
    updateUserProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};