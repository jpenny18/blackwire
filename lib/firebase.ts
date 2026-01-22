import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, doc, setDoc, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions
const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create user document in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email: userCredential.user.email,
    createdAt: serverTimestamp(),
  });
  
  return userCredential;
};

const signOut = () => {
  return firebaseSignOut(auth);
};

// Feedback vote functions
const submitFeedbackVote = async (vote: 'ready' | 'interested' | 'not_yet') => {
  try {
    await addDoc(collection(db, 'feedback_votes'), {
      vote,
      timestamp: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting vote:', error);
    return { success: false, error };
  }
};

// Get user count (for signup counter)
const getUserCount = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.size;
  } catch (error) {
    console.error('Error getting user count:', error);
    return 0;
  }
};

// Get vote counts for each option
const getVoteCounts = async () => {
  try {
    const votesSnapshot = await getDocs(collection(db, 'feedback_votes'));
    const counts = {
      ready: 0,
      interested: 0,
      not_yet: 0
    };
    
    votesSnapshot.forEach((doc) => {
      const vote = doc.data().vote;
      if (vote in counts) {
        counts[vote as keyof typeof counts]++;
      }
    });
    
    return counts;
  } catch (error) {
    console.error('Error getting vote counts:', error);
    return { ready: 0, interested: 0, not_yet: 0 };
  }
};

export { 
  auth, 
  db, 
  signIn, 
  signUp, 
  signOut,
  onAuthStateChanged,
  submitFeedbackVote,
  getUserCount,
  getVoteCounts,
  type User 
};
