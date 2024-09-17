import { useAuthStore } from '../stores/authStore';

export const useUserProfile = () => {
  const { user } = useAuthStore();
  return { user };
};
