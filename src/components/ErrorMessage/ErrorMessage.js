import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p className={styles.errorMessage} aria-live="assertive">
      {message}
    </p>
  );
};

export default ErrorMessage;