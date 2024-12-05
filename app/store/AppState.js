import {create} from 'zustand';

const useAppState = create(set => ({
  isAuthenticated: false,
  user: null,
  login: userData => set({isAuthenticated: true, user: userData}),
  logout: () => set({isAuthenticated: false, user: null}),
  signup: userData => set({isAuthenticated: true, user: userData}),
}));

export default useAppState;
