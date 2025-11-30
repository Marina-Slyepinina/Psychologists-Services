import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { useFavoritesStore } from '../../store/favoritesStore';


type AuthProviderProps = {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setLoading } = useAuthStore();

  const { startFavoritesListener, stopFavoritesListener } = useFavoritesStore.getState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); 

      if (user) {
        startFavoritesListener(user.uid);
      } else {
        stopFavoritesListener();
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};