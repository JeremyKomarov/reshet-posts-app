import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { 
    loading, 
    error, 
    handleLogin 
  } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          aria-label="Email Input"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          aria-label="Password Input"
        />
        <button type="submit" disabled={loading} aria-label="Submit Login">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <ErrorMessage message={error}/>}
    </div>
  );
};

export default Login;
