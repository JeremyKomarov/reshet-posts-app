import { useUserProfile } from '../../hooks/useUserProfile';
import { addressBuilder } from "../../utils/addressBuilder";
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { user } = useUserProfile();

  if (!user) return null;

  return (
    <div className={styles.userProfile}>
      <h3>{user.name}'s Profile</h3>
      <p>Address: { addressBuilder(user.address) }</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};

export default UserProfile;