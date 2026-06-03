import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [cfHandle, setCfHandle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('guestMode') === 'true');

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('guestMode', 'true');
  };

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

  const updateHandle = async (handle, lcHandle = '') => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), { 
        cfHandle: handle,
        lcHandle: lcHandle,
        email: currentUser.email,
        name: currentUser.displayName,
        photoUrl: currentUser.photoURL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setCfHandle(handle);
    } catch (error) {
      console.error("Error saving handle:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        console.warn('Popup blocked by browser. Falling back to redirect...');
        return await signInWithRedirect(auth, googleProvider);
      }
      throw error;
    }
  };

  const logout = async () => {
    setIsGuest(false);
    localStorage.removeItem('guestMode');
    try {
      await signOut(auth);
      setCfHandle(null);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsGuest(false);
        localStorage.removeItem('guestMode');
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
    isGuest,
    loginWithGoogle,
    logout,
    updateHandle,
    continueAsGuest
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
