import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

export const useCreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, posts, setPosts } = useAuthStore();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const createPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: user.id,
      });
      setPosts([...posts, data]);
      setTitle('');
      setBody('');
    } catch (error) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { 
    title, 
    body, 
    loading, 
    error, 
    handleTitleChange, 
    handleBodyChange, 
    createPost 
  };
};
