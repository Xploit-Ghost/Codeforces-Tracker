import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [cfHandle, setCfHandle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or update user's CF handle from Firestore
  const loadUserHandle = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCfHandle(docSnap.data().cfHandle || null);
      } else {
        setCfHandle(null);
      }
    } catch (error) {
      console.error("Error loading handle:", error);
    }
  };

  const updateHandle = async (handle) => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), { cfHandle: handle }, { merge: true });
      setCfHandle(handle);
    } catch (error) {
      console.error("Error saving handle:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserHandle(user.uid);
      } else {
        setCfHandle(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    cfHandle,
    loginWithGoogle,
    logout,
    updateHandle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
