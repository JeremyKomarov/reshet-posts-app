
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import UserProfile from '../UserProfile/UserProfile';
import NavBar from '../NavBar/NavBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';
import styles from './Dashboard.module.scss';

const POSTS_PER_PAGE = 5;

const Dashboard = () => {
  const { posts, loading, error } = useDashboard();
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'posts':
        return (
          <>
            <CreatePost />
            <ul className={styles.postsContainer}>
              {paginatedPosts.map((post, idx) => (
                <Post key={`${post.title}${idx}`} post={post} />
              ))}
            </ul>
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {loading && <p aria-live="polite">Loading posts...</p>}
      {error && <ErrorMessage message={error}/>}

      {!loading && !error && renderContent()}
    </div>
  );
};

export default Dashboard;
