import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuthStore } from './stores/authStore';
import styles from './App.module.scss'

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className={styles.appContainer}>
        <h1>Reshet Posts App</h1>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
