import {create} from 'zustand';

const useAuth = create(set => ({
  isAuthenticated: false,
  user: null,
  login: userData => set({isAuthenticated: true, user: userData}),
}));

export default useAuth;
