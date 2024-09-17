import { useState } from 'react';
import Comments from './../Comments/Comments';
import { usePost } from '../../hooks/usePost';
import { useComments } from '../../hooks/useComments';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './Post.module.scss';

const Post = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const {
    isEditing,
    loading,
    error,
    handleEdit,
    handleSave
  } = usePost(post, title, body);
  
  const { 
    commentsVisible, 
    toggleComments 
  } = useComments(post.id);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }
  
  return (
    <li className={styles.postContainer}>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={handleTitleChange}
            aria-label="Post Title Input"
          />
          <textarea
            value={body}
            onChange={handleBodyChange}
            aria-label="Post Body Input"
          />
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
            aria-label="Save Post"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          {error && <ErrorMessage message={error}/>}
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{body}</p>
          <div className={styles.buttons}>
            <button 
              onClick={handleEdit} 
              aria-label="Edit Post"
            >
              Edit
            </button>
            <button 
              onClick={toggleComments}
              aria-label="Toggle Comments"
            >
              {commentsVisible ? 'Hide Comments' : 'See Comments'}
            </button>
          </div>
        </>
      )}

      {commentsVisible && <Comments postId={post.id} />}
    </li>
  );
};

export default Post;
