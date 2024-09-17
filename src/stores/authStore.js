import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  posts: [],
  comments: {},
  login: (user) => set({ user }),
  logout: () => set({ user: null, posts: [], comments: {} }),
  setPosts: (posts) => set({ posts }),
  setComments: (postId, comments) => set((state) => ({
    comments: { ...state.comments, [postId]: comments }
  }))
}));
