import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { mockPasswordBuilder } from '../utils/mockPasswordBuilder'
import axios from 'axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, logout } = useAuthStore();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      const user = data.find(user => user.email === email);

      if (user) {
        const mockPassword = mockPasswordBuilder(user.name)

        if (password === mockPassword) {
          login(user);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/dashboard');
        } else {
          setError('Invalid password');
        }
      } else {
        setError('User not found');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
    navigate('/');
  };

  return { 
    loading, 
    error, 
    handleLogin, 
    handleLogout
  };
};
