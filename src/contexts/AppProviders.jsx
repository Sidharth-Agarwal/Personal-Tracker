import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { UserProfileProvider } from './UserProfileContext';
import { NotificationProvider } from './NotificationContext';

/**
 * Combined App Providers
 * Wraps all context providers in the correct order
 * 
 * Order matters:
 * 1. Theme - Independent, needed by all
 * 2. Notification - Independent, used by all
 * 3. Auth - Depends on nothing
 * 4. UserProfile - Depends on Auth
 */

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <UserProfileProvider>
            {children}
          </UserProfileProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default AppProviders;