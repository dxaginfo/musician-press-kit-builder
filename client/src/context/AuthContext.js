import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import authService from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      toast({
        title: 'Login successful.',
        description: `Welcome back, ${data.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return data.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      toast({
        title: 'Login failed.',
        description: err.message || 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      toast({
        title: 'Registration successful.',
        description: `Welcome, ${data.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return data.user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      toast({
        title: 'Registration failed.',
        description: err.message || 'Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    toast({
      title: 'Logged out successfully.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
      toast({
        title: 'Password reset email sent.',
        description: 'Please check your email for password reset instructions.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
      toast({
        title: 'Failed to send reset email.',
        description: err.message || 'Please check your email address and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword(token, newPassword);
      toast({
        title: 'Password reset successful.',
        description: 'Your password has been updated. You can now log in with your new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      toast({
        title: 'Failed to reset password.',
        description: err.message || 'The reset link may be invalid or expired. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setCurrentUser({
        ...currentUser,
        ...updatedUser,
      });
      toast({
        title: 'Profile updated.',
        description: 'Your profile information has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      toast({
        title: 'Profile update failed.',
        description: err.message || 'Please check your information and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;