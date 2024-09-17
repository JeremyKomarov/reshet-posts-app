import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

export const useComments = (postId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(false); 
  const { comments, setComments } = useAuthStore();

  useEffect(() => {
    if (comments[postId] || !commentsVisible) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        setComments(postId, data);
      } catch (error) {
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, comments, setComments, commentsVisible]);

  const toggleComments = () => {
    setCommentsVisible((prev) => !prev);
  };

  return { 
    comments: comments[postId] || [], 
    loading, 
    error, 
    commentsVisible, 
    toggleComments 
  };
};
