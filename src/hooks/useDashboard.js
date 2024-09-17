import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export const useDashboard = () => {
  const { user, posts, setPosts } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
          setPosts(data);
        } catch (error) {
          setError('Failed to fetch posts. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [user, navigate, setPosts]);

  return { 
    user, 
    posts, 
    loading, 
    error 
  };
};
