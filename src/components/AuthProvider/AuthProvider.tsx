import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
    
  }, [setUser, setLoading]);

  return <>{children}</>;
};