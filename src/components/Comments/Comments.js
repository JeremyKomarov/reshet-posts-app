import { useComments } from '../../hooks/useComments';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './Comments.module.scss';

const Comments = ({ postId }) => {
  const { 
    comments, 
    loading, 
    error 
  } = useComments(postId);

  return (
    <div className={styles.commentsContainer}>
      {loading && <p>Loading comments...</p>}
      {error && <ErrorMessage message={error}/>}
      {!loading && !error && comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <h4>Written By: {comment.name}</h4>
          <p>{comment.body}</p>
          <p><strong>{comment.email}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
