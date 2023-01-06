// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeWIFRS6g3dIK40WvCo8Rv74fW8YFbR94",
  authDomain: "netflix-clone-6c25c.firebaseapp.com",
  projectId: "netflix-clone-6c25c",
  storageBucket: "netflix-clone-6c25c.appspot.com",
  messagingSenderId: "58957768415",
  appId: "1:58957768415:web:3e82c5b201313dce5eeb6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

type AuthContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user ? setUser(user) : setUser(null);
      setLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      // setUser(user);
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      // setUser(user);
      return user;
    });

  const signOutUser = () => signOut(auth);
  return {
    signUp,
    signIn,
    signOut: signOutUser,
    user,
    loading,
  };
}

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);
