import { useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './CreatePost.module.scss';

const CreatePost = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { 
    title, 
    body, 
    loading, 
    error, 
    handleTitleChange, 
    handleBodyChange, 
    createPost 
  } = useCreatePost();

  const toggleCreatePost = () => {
    setIsCreatePostOpen(prevState => !prevState);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost();
    toggleCreatePost();
  };

  return (
    <div className={styles.createPostContainer}>
      <button className={styles.openButton} onClick={toggleCreatePost}>
        {isCreatePostOpen ? 'Close' : 'Create A New Post'}
      </button>

      {isCreatePostOpen && (
        <form className={styles.createPostForm} onSubmit={(e) => handleCreatePost(e)}>
          <input
            className={styles.input}
            value={title}
            onChange={handleTitleChange}
            placeholder="Post Title"
            required
          />
          <textarea
            className={styles.textarea}
            value={body}
            onChange={handleBodyChange}
            placeholder="Post Body"
            required
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          {error && <ErrorMessage message={error}/>}
        </form>
      )}
    </div>
  );
};

export default CreatePost;
