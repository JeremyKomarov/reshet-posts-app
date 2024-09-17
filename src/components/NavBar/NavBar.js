import styles from './NavBar.module.scss';

const NavBar = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSide}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
          aria-label="Profile Tab"
        >
          Profile
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
          onClick={() => setActiveTab('posts')}
          aria-label="Posts Tab"
        >
          Posts
        </button>
      </div>
      <button
        className={styles.logoutButton}
        onClick={handleLogout}
        aria-label="Logout Button"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
