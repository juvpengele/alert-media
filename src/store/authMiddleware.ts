import { RootState } from './index';
import { Middleware, Store } from "@reduxjs/toolkit";

// TODO:: Add corresponding types
export const authMiddleware: any = (store: Store) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type?.startsWith('auth/') ) {
    const { auth } = store.getState().auth;
    localStorage.setItem('auth', JSON.stringify(auth))
  } 
  return result;
};