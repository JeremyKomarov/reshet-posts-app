import { useState } from 'react';
import axios from 'axios';

export const usePost = (post, title, body) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, { title, body });
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { 
    isEditing, 
    loading, 
    error, 
    handleEdit, 
    handleSave 
  };
};
